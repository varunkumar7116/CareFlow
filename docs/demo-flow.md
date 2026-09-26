# CareFlow V1 — Demonstration Script (3–5 Minutes)

This script guides evaluators and team members through the complete closed-loop healthcare workflow and government service compatibility demonstration for CareFlow V1.

---

## Prerequisites
1. **Backend Server:** Running on `http://localhost:8080/api/v1` (`mvn spring-boot:run` in `backend/`)
2. **Web Dashboard:** Running on `http://localhost:3000` (`npm run dev` in `frontend/`)
3. **CHW Mobile Prototype:** Running on `http://localhost:3001` (`npm run dev` in `mobile/`)

---

## Step-by-Step Demonstration Flow

### 1. Login & Identity Verification (0:00 - 0:30)
* Open the CareFlow Web Dashboard at `http://localhost:3000`.
* The dashboard authenticates against `POST /api/v1/auth/login` using credentials `chw1` / `password`.
* Observe the header badge displaying `🔒 JWT AUTHENTICATED: CHW-001`.

### 2. Patient Profile Inspection (0:30 - 0:45)
* Inspect the Patient Profile card for **Meena Devi** (`UHID: CF-P1001`).
* Note the assigned CHW (`USER-CHW-001`), primary facility (`Village PHC`), and preferred language (`Hindi`).

### 3. Care Journey & Screening (0:45 - 1:15)
* Review the **Care Journey Stage Lifecycle** timeline.
* Step 1 (`REGISTRATION`) shows check-in at Village PHC.
* Step 2 (`SCREENING`) shows field vitals recording high blood pressure (`140/90 mmHg`), flagging high-risk maternal status.

### 4. Inter-Facility Referral Creation (1:15 - 1:45)
* Click **Step 3: Referral Created**.
* Observe referral dispatch from `Village Primary Health Centre` to `District Hospital Rampur` (`Obstetrics`).

### 5. Government Service Compatibility Layer Lookup (1:45 - 2:15)
* Scroll to the **Government Facility Directory** card.
* Note that facility data is dynamically fetched from `GET /api/v1/gov/facilities` via `GovernmentFacilityProvider` (`DatasetGovernmentProvider` mode).
* Inspect the source metadata card displaying provenance:
  * **Source:** Ministry of Health and Family Welfare (MoHFW) / National Health Portal (NHP) Open Government Data (OGD)
  * **Dataset Reference:** National Hospital Directory with Geo Code
  * **Mode:** `PROTOTYPE_DATASET`

### 6. Appointment Booking (2:15 - 2:30)
* Click **Step 4: Appointment Booked**.
* Specialist consultation appointment is confirmed with Dr. Sharma at District Hospital Rampur.

### 7. Overdue Follow-up & Care Gap Safety Net (2:30 - 3:15)
* Click **Step 5: Overdue Follow-up**.
* Click **Step 6: Care Gap & Task**.
* Observe the **Care Gap Engine** triggering an `OVERDUE_FOLLOW_UP` SLA breach safety net.
* Note that a high-priority task `RESOLVE CARE GAP: OVERDUE_FOLLOW_UP` is automatically generated and assigned to `USER-CHW-001`.

### 8. Task Resolution & Care Completion (3:15 - 3:45)
* Click **Step 7: Follow-up Complete** (or click "Resolve Care Gap").
* CHW completes the home check-in visit. The care gap resolves, and the task status updates to `COMPLETED`.
* Click **Step 8: Completed Care** to transition the Care Journey to `COMPLETED`.

### 9. IVR Hotline Simulator Testing (3:45 - 4:30)
* Click **Test IVR Hotline** button in the header to open `IVRSimulatorModal`.
* Press `2` to select Hindi (or `1` for English).
* Press `1` to query Appointment Status (returns appointment schedule for phone `+919876543210`).
* Press `2` to query Referral Status.
* Press `4` to Request Staff Assistance (triggers an urgent callback `CareTask` for CHW).

### 10. Integration & Provider Status Verification (4:30 - 5:00)
* Query `GET /api/v1/gov/integration/status` to view active integration logs, average latency, and success rates.
* To reset the demo scenario back to initial screening state at any point, issue `POST /api/v1/auth/reset-demo`.
