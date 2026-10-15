---
title: "Alarm management in WinCC Runtime Professional: fewer, meaningful alarms"
date: 2026-10-15
summary: "Classes, delay and hysteresis, state-based suppression and clear alarm texts to avoid alarm floods."
---

The more alarms a plant raises, the less likely the operator is to see the critical one. The shared idea behind alarm management standards such as ISA-18.2 and EEMUA 191 is simple: **every alarm should call for an action by the operator.** Information that needs no action is an event, not an alarm.

## Classification

- Define alarm classes in WinCC (e.g. fault, warning, system) and acknowledgement rules up front.
- Set priority by consequence: safety and equipment damage at the top; informational messages belong in the event archive, not the alarm list.

## Reducing noise

- **Delay:** use an on-delay so short fluctuations do not raise alarms.
- **Hysteresis:** without a deadband, analog values hover at the limit and the alarm "chatters".
- **State-based suppression:** a "low flow" alarm is meaningless while the pump is stopped; handle that condition in the PLC logic.
- On S7-1500, generating alarms in the PLC with `Program_Alarm` timestamps them where the event happens.

## Alarm text

A good text answers three questions: **where, what happened, what to do?**

- Weak: `Pump fault`
- Good: `P-101 Feed pump: overload tripped — check the overload relay in the field`

## Regular review

- Review the ten most frequent alarms from the alarm archive at regular intervals. A few "bad" alarms usually make up most of the list.
- Weed out standing (stale) alarms and alarms the operator acknowledges out of habit.

The goal is a quiet alarm screen in normal operation, and an operator who knows immediately what to do when an alarm does appear.
