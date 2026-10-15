---
title: Livn Tools
summary: A Windows 10 / 11 toolbox for pre-format backup, post-format setup and everyday maintenance. Every change is shown first and can be rolled back.
order: 1
status: active
version: 4.0.1
platform: Windows 10 / 11 · PowerShell 5.1
repo: https://github.com/LiVNLOUD/livn-tools
command: irm livn.tr/win | iex
commandNote: Open PowerShell as administrator and paste the command. The installer downloads the latest release and verifies every file with SHA-256. Opening the app does not change any setting by itself.
links:
  - label: Latest release (ZIP)
    href: https://github.com/LiVNLOUD/livn-tools/releases/latest
  - label: Review the installer
    href: https://raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1
---

| Before a reinstall | After a reinstall | Everyday |
|---|---|---|
| Copy drivers, app list and game saves to a USB drive | Install the network driver first, even offline | See problems in System Check |
| Copy Livn itself and your settings into the kit | Install apps in bulk with WinGet | Preview what cleanup will remove |
| | Preview and re-apply your settings | Try settings and return to previous values |

**What's inside:** System Check, Recovery Kit, post-install app setup, cleanup and maintenance, power plans and game settings, network measurement (ping, jitter, DNS), Windows and privacy settings, startup apps and change history. Presets (Gamer, Basic, Privacy, Appearance, Smooth UI, Maximum performance) only select options; none of them includes settings that weaken security.

**How it works:** before a setting is applied you see the current and target value, the risk and whether a restart is needed; the previous value is saved and the result is read back. Cleanup, app installation and driver installation are not covered by rollback.

**Requirements:** Windows 10 22H2 or Windows 11 (x64), Windows PowerShell 5.1, administrator rights; WinGet for app installation. The interface is in Turkish.

**Without the command:** download the latest release ZIP, extract it to its own folder and run `LivnTools.bat`.

**Read first:** Livn Tools can change registry and system settings. Read the preview before applying and create a restore point. Options that turn off security protections (such as VBS or Spectre/Meltdown mitigations) leave your system more exposed. Use at your own risk.
