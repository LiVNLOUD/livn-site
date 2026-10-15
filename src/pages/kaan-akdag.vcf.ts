import type { APIRoute } from 'astro';
import { vcard } from '../lib/vcard';

export const GET: APIRoute = () => new Response(vcard('tr', true), { headers: { 'Content-Type': 'text/vcard; charset=utf-8' } });
