# CARE FLOW — Healthcare Coordination Platform & Facility Portal

CareFlow is an enterprise healthcare coordination platform connecting Primary Health Centres (PHCs), Clinics, Laboratories, District Hospitals, Community Health Workers (CHWs), and patient IVR hotlines through a secure operational facility portal and Government Service Compatibility Layer.

---

## 1. Core Purpose & Healthcare Safety Principle

> [!IMPORTANT]
> **Most Important Product Principle**:
> **CareFlow does NOT replace existing healthcare services.** CareFlow **ACCESSes** them, **CONNECTs** to them, **COORDINATEs** them, **TRACKs** the care journey, **IDENTIFIEs** care gaps, and **SUPPORTs** follow-up care. Existing healthcare facilities, hospitals, and licensed clinicians remain fully responsible for providing actual medical care.

---

## 2. Platform Architecture

```
                       CARE FLOW
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
   Facility Web Portal   CHW Prototype   IVR Telephony
   (React+TS Enterprise)  (Mobile View)   (5 Languages)
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                    CAREFLOW CORE
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
        Care Journey   Care Gap    Referral &
           Engine       Engine    Appointments
             │            │            │
             └────────────┼────────────┘
                          ▼
                GOVERNMENT SERVICE
                COMPATIBILITY LAYER
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
   Dataset/Managed Provider      Future Official Provider
   (DatasetGovernmentProvider)   (OfficialGovernmentProvider)
             │                         │
             ▼                         ▼
   Public OGD Dataset Snapshot      Authorized Government API
   + Facility Operational State      (ABDM / HFR / HPR)
```

---

## 3. Data Provenance Model (5 Categories)

CareFlow explicitly tags every piece of data with its provenance to eliminate silent data mixing:

1. `GOVERNMENT_REFERENCE`: Public dataset metadata from OGD India National Hospital Directory (Name, Type, District, State, Lat/Long, Ownership, NIN ID).
2. `FACILITY_MANAGED`: Operational information maintained by facility staff (Doctor availability, Equipment status, Diagnostic tests, Operating status, Capacity beds).
3. `CAREFLOW_TRANSACTION`: Operational workflow records (Appointments, Inter-facility referrals, Follow-ups, Care Gaps, CHW Care Tasks, Journey stages).
4. `OFFICIAL_API`: Reserved for future authorized live government gateway integrations (ABDM/HFR/HPR).
5. `SYNTHETIC_DEMO`: Explicitly labeled synthetic records used in demonstration scenarios.

---

## 4. Operational Facility Portal Capabilities

The upgraded Web Facility Portal provides operational capabilities for authorized healthcare staff:

- **Dashboard**: Live operational counts for doctors, diagnostics, equipment, slots, pending referrals, overdue follow-ups, and open care gaps.
- **Facility Profile**: Normalized side-by-side view separating Government Reference info from Facility-Managed operational info.
- **Services Registry**: Service listings, categories, and availability status toggles.
- **Doctors & Professionals Registry**: Staff profiles, specializations, consultation schedules, availability, and teleconsultation toggles.
- **Equipment Registry**: Equipment tracking, categories, available quantities, status (`AVAILABLE`, `PARTIALLY_AVAILABLE`, `IN_USE`, `MAINTENANCE`, `UNAVAILABLE`), and maintenance notes.
- **Diagnostics Registry**: Pathology & radiology test listings, turnaround times, and required equipment links.
- **Appointment Slots**: Slot creation & capacity tracking.
- **Referrals & Matcher**: Incoming referral management with requirement matching ("Matches referral requirements").
- **Care Tasks & Care Gaps**: Automated safety net inbox for SLA breaches and assigned CHW tasks.
- **Care Journey**: Interactive 13-stage lifecycle runner and history timeline.
- **Audit Log**: Operational and security audit trail for all changes.
- **Administration**: User role management and facility-level access boundary controls.

---

## 5. Security & Facility-Level Authorization

- **Stateless JWT Authentication**: JWT tokens signed with SHA-256 HMAC containing role and `facilityId` claims.
- **Role-Based Access Control (RBAC)**: Enforces `FACILITY_ADMIN`, `DOCTOR`, `FACILITY_STAFF`, `CHW`, `DISTRICT_SUPERVISOR`, `SYSTEM_ADMIN`, `ADMIN`.
- **Facility Access Boundary**: Facility staff can ONLY modify data belonging to their authorized facility. (e.g. Facility A admin cannot edit Facility B equipment or doctors).
- **Password Hashing**: BCrypt password hashing. Government credentials are NEVER imported or stored.

---

## 6. Working Prototype & Honest System Stack

### WORKING V1
- **Spring Boot Backend**: Java 17 / 21 REST API with PostgreSQL / H2 database.
- **Facility Portal**: React 18 + TypeScript 5.2 + Vite 5.4 enterprise UI.
- **30/30 Passing Test Suite**: Automated JUnit 5 integration & unit test suite (`mvn test`).
- **Data Provenance**: Explicit metadata DTOs across all facility endpoints.
- **IVR Telephony Simulator**: 5-language DTMF state machine (`IVRService.java`).

### PROTOTYPE LIMITATIONS
- **Government Facility Data**: Static Open Government Data (OGD) snapshot (`facilities_india_public_dataset.json`).
- **Live Government APIs**: No active live HFR / HPR / ABDM API connection (ready for drop-in when authorization is granted).
- **IVR Telephony**: REST mock telephony simulator (no PSTN / SIP gateway).
- **Mobile Prototype**: React/Vite web prototype styled as mobile viewport.

---

## 7. 5-Minute Quickstart Guide

### Step 1: Run Backend Automated Tests
```powershell
cd backend
..\tools\apache-maven-3.9.6\bin\mvn.cmd clean test
```

### Step 2: Start Backend API (Port 8080)
```powershell
cd backend
..\tools\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
```

### Step 3: Start Web Facility Portal (Port 3000)
```powershell
cd frontend
npm run build
npm run dev
```
