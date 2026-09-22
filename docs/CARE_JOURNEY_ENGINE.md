# Care Journey Engine Specification

## Overview
The Care Journey Engine represents a patient's care progression as a dynamic, stateful lifecycle rather than a static linear pipeline.

## Stages
- `REGISTRATION`: Initial patient entry into CareFlow.
- `SCREENING`: CHW field health assessment / vitals check.
- `TRIAGE`: Facility staff classification of care urgency.
- `CONSULTATION`: Medical officer / specialist review.
- `DIAGNOSTICS`: Lab work, radiology, or diagnostic tests.
- `REFERRAL`: Patient referred to higher-tier facility/specialist.
- `APPOINTMENT`: Scheduled visit date & time.
- `TRANSPORT`: Emergency or community ambulance dispatch.
- `HOSPITAL`: Physical arrival at hospital facility.
- `TREATMENT`: In-patient or out-patient procedure.
- `MEDICINE`: Pharmacy dispensing & prescription check.
- `FOLLOW_UP`: Post-treatment home check-in by CHW.
- `COMPLETED`: Successful resolution of care journey episode.

## Allowed Transitions
- `START`: Initialize new journey for patient.
- `PROGRESS`: Advance to next expected stage.
- `PAUSE`: Temporarily hold journey (e.g., patient traveling).
- `RESUME`: Reactivate paused journey.
- `REPEAT`: Re-enter previous stage (e.g. repeated lab test).
- `SKIP`: Bypass non-applicable stage.
- `REFER`: Transition to referral / transfer flow.
- `ESCALATE`: Elevate priority due to urgent symptoms.
- `COMPLETE`: Mark journey successfully finished.
