---
title: "A readable program structure for S7-1500 projects"
date: 2026-10-15
summary: "OB, FB and DB layers, equipment blocks, analog handling and version tracking for a maintainable TIA Portal project."
---

A PLC program lives for years, and it is read far more by the person chasing a fault on the night shift than by the person who wrote it. Good structure therefore matters more than "it works". A layout that works well with TIA Portal and S7-1500:

## Layers

- **OB1** only makes calls; it contains no logic. Anyone reading it sees the map of the program at a glance.
- Work that needs a fixed period (PID, counters, flow totals) runs in a **cyclic interrupt OB** (e.g. OB30), independent of scan time.
- One FB per **equipment type**: motor, valve, analog measurement, PID loop. Each piece of equipment uses its own instance DB.
- The interface each piece of equipment exposes to the HMI is defined as a **UDT** (command, status, alarms, settings). The same structure is reused on the HMI side as a faceplate.

## Naming

- Tags match the P&ID numbers (`LT101`, `P101`, `FV203`). If the field label, the drawing and the program use the same name, nobody has to translate while troubleshooting.
- Blocks and variables follow one naming rule; mixed-language names are avoided.

## Analog handling

- A single analog FB: scaling (`NORM_X` / `SCALE_X`), broken-wire detection, alarm limits with hysteresis, simulation/maintenance mode.
- Raw value (0–27648) and engineering value are kept separately; both can be shown on the HMI for diagnostics.

## Testing and versions

- Before commissioning, logic and HMI connections are tried at the desk with **PLCSIM Advanced**.
- Project archives are kept with a date and a short description; more structured teams can use TIA Portal's Version Control Interface together with Git.
- A short note for every change: what, why, who, when.

## In short

Put logic in equipment blocks, use OBs only for calls, match names to the P&ID and handle analogs in one place. The program stays easy to read as it grows.
