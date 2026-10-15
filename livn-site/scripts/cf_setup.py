#!/usr/bin/env python3
"""
livn.tr -> Cloudflare Pages kurulumu (tek seferlik).

Kullanim:
  CLOUDFLARE_API_TOKEN=... python3 scripts/cf_setup.py plan     # yalniz okur, ne yapacagini yazar
  CLOUDFLARE_API_TOKEN=... python3 scripts/cf_setup.py apply    # uygular
  CLOUDFLARE_API_TOKEN=... python3 scripts/cf_setup.py rollback backups/dns-....json

Ilkeler:
- Token asla ekrana/dosyaya yazilmaz.
- Degisiklikten once tum DNS kayitlari backups/ altina JSON olarak kaydedilir.
- Yalniz livn.tr ve www.livn.tr adlarindaki A/AAAA/CNAME kayitlarina dokunulur; MX/TXT vb. korunur.
- Kok kaydi silme + yeni CNAME tek atomik DNS "batch" istegiyle yapilir; /win yonlendirmesi
  bir an bile proxy'siz kalmaz (yonlendirme kurali proxy'li kayit gerektirir).
- /win icin tanimli Cloudflare kurali okunur ve kayit edilir; DEGISTIRILMEZ.
"""
import json, os, ssl, subprocess, sys, time, urllib.request, urllib.error
from datetime import datetime, timezone

API = 'https://api.cloudflare.com/client/v4'
ZONE_NAME = 'livn.tr'
HOSTS = ['livn.tr', 'www.livn.tr']
PROJECT = os.environ.get('PAGES_PROJECT', 'livn-site')
WIN_TARGET = 'https://raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TOKEN = os.environ.get('CLOUDFLARE_API_TOKEN', '').strip()
if not TOKEN:
    sys.exit('CLOUDFLARE_API_TOKEN ortam degiskeni yok.')
CTX = ssl.create_default_context(cafile=os.environ.get('SSL_CERT_FILE') or None)


def call(method, path, body=None, ok404=False):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(API + path, data=data, method=method, headers={
        'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, context=CTX, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        txt = e.read().decode(errors='replace')
        if ok404 and e.code == 404:
            return None
        try:
            errs = json.loads(txt).get('errors')
        except Exception:
            errs = txt[:300]
        raise SystemExit(f'API hatasi {e.code} {method} {path}: {errs}')


def log(msg):
    print(msg, flush=True)


def ctx():
    v = call('GET', '/user/tokens/verify')
    log(f"Token: {v['result']['status']} (son kullanma: {v['result'].get('expires_on') or 'yok'})")
    z = call('GET', f'/zones?name={ZONE_NAME}')['result']
    if not z:
        raise SystemExit(f'{ZONE_NAME} bolgesi bu token ile gorunmuyor (Zone:Read izni?).')
    z = z[0]
    return z['id'], z['account']['id'], z


def dns_records(zid):
    out, page = [], 1
    while True:
        r = call('GET', f'/zones/{zid}/dns_records?per_page=100&page={page}')
        out += r['result']
        if page >= r['result_info']['total_pages']:
            return out
        page += 1


def show_win_rules(zid):
    """/win yonlendirmesini bulur (Single Redirect veya Page Rule). Yalniz okur."""
    found = []
    r = call('GET', f'/zones/{zid}/rulesets/phases/http_request_dynamic_redirect/entrypoint', ok404=True)
    for rule in ((r or {}).get('result') or {}).get('rules', []) or []:
        txt = json.dumps(rule)
        if '/win' in txt or 'win.ps1' in txt:
            found.append(('Single Redirect', rule.get('description') or rule.get('id'), rule.get('enabled'), rule.get('expression')))
    try:
        pr = call('GET', f'/zones/{zid}/pagerules')
        for rule in pr.get('result', []):
            txt = json.dumps(rule)
            if '/win' in txt or 'win.ps1' in txt:
                found.append(('Page Rule', rule.get('id'), rule.get('status'), [t['constraint']['value'] for t in rule.get('targets', [])]))
    except SystemExit as e:
        log(f'  (Page Rules okunamadi: {e})')
    return found


def project(aid):
    p = call('GET', f'/accounts/{aid}/pages/projects/{PROJECT}', ok404=True)
    return p['result'] if p else None


def plan():
    zid, aid, z = ctx()
    log(f'Bolge: {z["name"]} durum={z["status"]} plan={z["plan"]["name"]}')
    recs = dns_records(zid)
    log(f'DNS kayitlari ({len(recs)}):')
    for r in recs:
        mark = '  <- degisecek' if r['name'] in HOSTS and r['type'] in ('A', 'AAAA', 'CNAME') else ''
        log(f"  {r['type']:6} {r['name']:28} {r['content'][:60]:60} proxied={r.get('proxied')}{mark}")
    win = show_win_rules(zid)
    log('/win kurali: ' + ('; '.join(map(str, win)) if win else 'BULUNAMADI (izin eksik olabilir; site icindeki yedek yonlendirme devreye girer)'))
    p = project(aid)
    log(f'Pages projesi {PROJECT}: ' + (f"var, adres {p['subdomain']}, alan adlari {p.get('domains')}" if p else 'yok, olusturulacak'))
    return zid, aid, recs, p


def backup(recs):
    os.makedirs(os.path.join(ROOT, 'backups'), exist_ok=True)
    path = os.path.join(ROOT, 'backups', f"dns-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}.json")
    with open(path, 'w') as f:
        json.dump(recs, f, indent=2)
    log(f'DNS yedegi: {path}')
    return path


def apply():
    zid, aid, recs, p = plan()
    backup(recs)
    if not p:
        log(f'Pages projesi olusturuluyor: {PROJECT}')
        p = call('POST', f'/accounts/{aid}/pages/projects', {'name': PROJECT, 'production_branch': 'main'})['result']
    sub = p['subdomain']
    log(f'Proje adresi: https://{sub}')

    log('Derleme ve yukleme (wrangler pages deploy)...')
    subprocess.run(['npm', 'run', 'build'], cwd=ROOT, check=True, stdout=subprocess.DEVNULL)
    env = dict(os.environ, CLOUDFLARE_ACCOUNT_ID=aid, WRANGLER_SEND_METRICS='false')
    subprocess.run(['npx', 'wrangler', 'pages', 'deploy', 'dist', '--project-name', PROJECT, '--branch', 'main', '--commit-dirty=true'],
                   cwd=ROOT, check=True, env=env)

    have = {d['name'] for d in call('GET', f'/accounts/{aid}/pages/projects/{PROJECT}/domains')['result']}
    for h in HOSTS:
        if h not in have:
            log(f'Ozel alan adi ekleniyor: {h}')
            call('POST', f'/accounts/{aid}/pages/projects/{PROJECT}/domains', {'name': h})

    deletes = [{'id': r['id']} for r in recs if r['name'] in HOSTS and r['type'] in ('A', 'AAAA', 'CNAME')
               and not (r['type'] == 'CNAME' and r['content'] == sub)]
    existing = {r['name'] for r in recs if r['type'] == 'CNAME' and r['content'] == sub}
    posts = [{'type': 'CNAME', 'name': h, 'content': sub, 'proxied': True, 'ttl': 1, 'comment': 'Cloudflare Pages (livn-site)'}
             for h in HOSTS if h not in existing]
    if deletes or posts:
        log(f'DNS: {len(deletes)} kayit silinip {len(posts)} CNAME ekleniyor (tek atomik islem)')
        call('POST', f'/zones/{zid}/dns_records/batch', {'deletes': deletes, 'posts': posts})
    else:
        log('DNS zaten dogru.')

    log('Alan adi dogrulamasi bekleniyor...')
    for _ in range(30):
        ds = {d['name']: d['status'] for d in call('GET', f'/accounts/{aid}/pages/projects/{PROJECT}/domains')['result']}
        log(f'  {ds}')
        if all(ds.get(h) == 'active' for h in HOSTS):
            break
        time.sleep(20)
    log('Bitti. Simdi /win ve ana sayfayi dogrulayin.')


def rollback(path):
    zid, aid, _ = ctx()
    old = [r for r in json.load(open(path)) if r['name'] in HOSTS and r['type'] in ('A', 'AAAA', 'CNAME')]
    cur = [r for r in dns_records(zid) if r['name'] in HOSTS and r['type'] in ('A', 'AAAA', 'CNAME')]
    posts = [{k: r[k] for k in ('type', 'name', 'content', 'proxied', 'ttl') if k in r} for r in old]
    log(f'Geri donus: {len(cur)} kayit silinip {len(posts)} eski kayit geri konuyor')
    call('POST', f'/zones/{zid}/dns_records/batch', {'deletes': [{'id': r['id']} for r in cur], 'posts': posts})
    for h in HOSTS:
        call('DELETE', f'/accounts/{aid}/pages/projects/{PROJECT}/domains/{h}', ok404=True)
    log('Geri donus tamam.')


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'plan'
    if cmd == 'plan':
        plan()
    elif cmd == 'apply':
        apply()
    elif cmd == 'rollback' and len(sys.argv) > 2:
        rollback(sys.argv[2])
    else:
        sys.exit(__doc__)
