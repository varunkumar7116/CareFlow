# Care Gap Engine Specification

## Overview
The Care Gap Engine acts as an automated safety net to ensure closed-loop care. It continuously evaluates open Care Journeys against SLA thresholds and flags missing actions.

## Rules & Detection Triggers
1. **Unconfirmed Referral**: Referral created > 48 hours ago without a scheduled appointment.
2. **Missed Appointment**: Appointment date has passed > 24 hours ago without arrival scan.
3. **Overdue Follow-up**: Follow-up due date passed > 24 hours ago without CHW visit report.
4. **Missing Diagnostics**: Diagnostic order placed > 72 hours ago without lab result upload.

## Closed-Loop Task Creation
When a Care Gap is identified:
1. Care Gap record generated with state `OPEN`.
2. Actionable `Task` created and assigned to assigned CHW or Facility Staff.
3. Task Priority set (`HIGH` for emergency referrals, `MEDIUM` for routine follow-ups).
4. CHW contacts patient or conducts home visit.
5. Task marked `RESOLVED`, resolving the Care Gap and resuming the Care Journey.
