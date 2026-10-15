---
title: "Before commissioning: a field loop check checklist"
date: 2026-10-15
summary: "Signal-by-signal steps to catch wiring, addressing, scaling and alarm errors before the process starts."
---

The cheapest commissioning error is the one found before the process starts. A loop check verifies every I/O point end to end, from the device in the field to the text on the SCADA screen. The list below is meant to be printed and used on site.

## Preparation

- Current **I/O list** and electrical drawings (with revision numbers).
- Instrument data sheets and calibration certificates (range, output type).
- A **test sheet** with one row per signal: tag, address, expected value, result, signature.
- Radio/phone between the field team and the control room; work permit and lock-out/tag-out where required.
- 4–20 mA calibrator (measure + source), multimeter, insulation tester.

## Digital inputs

1. Actually change the contact in the field (operate the switch, level switch, limit switch) — with the device itself where possible, not a jumper.
2. Confirm the right input bit changes in the PLC.
3. Is the SCADA status colour and **alarm text** correct? The text should include the tag and equipment name.
4. Check normally-open / normally-closed logic. Safety signals must fall to the safe state on a broken wire (fail-safe).

## Digital outputs

1. Command from SCADA → PLC output → relay/contactor → field device.
2. A **feedback** signal (running/open) must arrive; if not, a timeout alarm must be raised.
3. Check motor rotation, with the coupling disconnected where possible.

## Analog inputs (4–20 mA)

1. Inject 0, 25, 50, 75 and 100 % with the calibrator.
2. Watch the raw value in the PLC (nominal range 0–27648 on S7-1500) and the value scaled to engineering units.
3. Do the SCADA value and unit match? Does the transmitter range match the PLC scaling (e.g. not a 0–10 bar transmitter with 0–16 bar in the PLC)?
4. Test broken-wire and out-of-range behaviour: per NAMUR NE 43, below 3.6 mA and above 21 mA indicate a fault, and the PLC should alarm on it.

## Analog outputs

- Send 0, 50 and 100 % to the positioner; check the physical valve position and the position feedback if present.

## Fieldbus and drives

- Do Profinet/Profibus device names and addresses match the list? Are drive parameters (rated current, ramp times) recorded?

## Records and close-out

- Complete and sign the sheet for every signal. Put open items on a **punch list** with an owner and a date.
- Common faults: scaling mismatch, a reversed two-wire loop, a cable shield earthed at both ends, wrong or missing alarm text, jumpers forgotten after testing.

When the test is done, every tag in SCADA should have a counterpart in the field, and every device in the field a correct representation in SCADA.
