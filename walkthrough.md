# CareFlow OGD Data Source & Provenance Verification Walkthrough

## 1. Executive Summary

This walkthrough documents the verification and correction of the public healthcare facility dataset URL and metadata within CareFlow. The unverified/404 URL (`https://data.gov.in/resource/directory-hospitals-india`) has been replaced with the official, verified Open Government Data (OGD) resource URL. All metadata, field classification mappings, architecture specifications, and unit tests have been updated and verified.

---

## 2. Verified OGD Resource Metadata

| Metadata Field | Value / Details |
| :--- | :--- |
| **Catalogue Name** | Hospital Directory (National Health Portal) |
| **Resource Title** | National Hospital Directory with Geo Code and additional parameters |
| **Publishing Organization** | Ministry of Health and Family Welfare (MoHFW) / National Health Portal (NHP), Government of India |
| **Official Source URL** | `https://www.data.gov.in/resource/national-hospital-directory-geo-code-and-additional-parameters-updated-till-last-month` |
| **Publication Date** | `10/08/2017` |
| **Last Updated Date** | `02/06/2025` |
| **Resource Identifier** | *None* (No invented resource ID per directive) |
| **Provider Mode** | `PROTOTYPE_DATASET` |
| **Data Freshness** | Static OGD Snapshot (Updated 02/06/2025) |

---

## 3. Dataset Field Classification Matrix

Every field in `facilities_india_public_dataset.json` is classified according to its origin:

| Field Name | Classification | Provenance & Description |
| :--- | :--- | :--- |
| `name` | **SOURCE_FIELD** | Official hospital/facility name from OGD National Hospital Directory. |
| `facilityType` | **SOURCE_FIELD** | Official facility category (PHC, CHC, DISTRICT_HOSPITAL, TERTIARY_CARE_INSTITUTE). |
| `district` | **SOURCE_FIELD** | Official administrative district from OGD Directory. |
| `state` | **SOURCE_FIELD** | Official state name from OGD Directory. |
| `latitude` | **SOURCE_FIELD** | Official latitude coordinate from OGD Geo Code directory. |
| `longitude` | **SOURCE_FIELD** | Official longitude coordinate from OGD Geo Code directory. |
| `ownership` | **SOURCE_FIELD** | Official government ownership category from OGD Directory. |
| `ninId` | **DERIVED_FIELD** | **CareFlow-generated internal prototype identifier** derived for primary key lookup (e.g., `NIN-UP-RMP-001`). *Not an official government/NIN identifier.* |
| `capabilities` | **DERIVED_FIELD** | Care capability tags derived from health department service scope for care journey routing (`MATERNAL_CARE`, `OBSTETRICS`). *Not a direct government source field.* |
| `contactPhone` | **SYNTHETIC_FIELD** | Synthetic helpline number generated for demo call/IVR simulation. *Not a direct government source field.* |

---

## 4. Architectural Chain & Governance Alignment

### V1 Active Architecture (Unchanged):
```
                  CAREFLOW
                     ↓
       Government Service Interface
                     ↓
          Current V1 Provider (DatasetGovernmentProvider)
                     ↓
       Verified Public/Official Data (PostgreSQL OGD Snapshot)
```

### Future Phase Architecture (Unchanged):
```
                  CAREFLOW
                     ↓
       Government Service Interface
                     ↓
          Official API Provider (OfficialGovernmentProvider)
                     ↓
          Authorized Government API (e.g. ABDM Gateway)
```

> [!NOTE]
> All core workflows including Care Journey, Care Gap Engine, Referral, Appointment, Follow-up, and IVR implementations remain unchanged and isolated from dataset provider details.

---

## 5. Document Updates Audit

- [docs/data-sources.md](file:///e:/camphorforge/docs/data-sources.md): Catalogue metadata, URL, publication/update dates, and field classification matrix updated.
- [docs/government-service-integration.md](file:///e:/camphorforge/docs/government-service-integration.md): Provenance section and provider architecture aligned with OGD metadata.
- [ARCHITECTURE.md](file:///e:/camphorforge/ARCHITECTURE.md) & [docs/ARCHITECTURE.md](file:///e:/camphorforge/docs/ARCHITECTURE.md): Provenance metadata updated.
- [README.md](file:///e:/camphorforge/README.md): OGD source details and documentation link references updated.
- [walkthrough.md](file:///e:/camphorforge/walkthrough.md): Full walkthrough report created.

---

---

## 7. Working V1 & Prototype Limitations

### WORKING V1
- **Care Journey Engine:** 13-stage lifecycle tracking with state transitions and history logging.
- **Care Gap Safety Net Engine:** Automated 60-second scheduled SLA detection for unconfirmed referrals, missed appointments, overdue follow-ups, and missing lab diagnostics.
- **Referral & Appointment Management:** Inter-facility referral creation enriched via Government Compatibility Layer and appointment lifecycle tracking.
- **Follow-up & Care Tasks:** Scheduled follow-ups and automated CHW task dispatching.
- **Government Facility Compatibility Layer:** Interface abstraction (`GovernmentFacilityProvider`) with dataset provider implementation.
- **Dataset Provider:** Official Ministry of Health and Family Welfare (MoHFW) / National Health Portal (NHP) dataset snapshot loaded into PostgreSQL/H2 database with provenance metadata.
- **JWT & RBAC Security:** Stateless JWT authentication filter (`JwtAuthenticationFilter`) with Spring `@EnableMethodSecurity` and `@PreAuthorize` role enforcement (`CHW`, `FACILITY_STAFF`, `DISTRICT_OFFICER`, `ADMIN`).
- **Web Facility Dashboard:** React 18 + TypeScript V1 workflow runner dashboard with real API integration.
- **IVR Telephony Simulator:** 5-language DTMF state machine (`IVRService.java`) with interactive web modal runner.

### PROTOTYPE LIMITATIONS
- **Mobile Application:** Vite/React/TypeScript mobile-viewport web application (not React Native).
- **Offline Capabilities:** Synchronization-state UI simulation (not SQLite database outbox queue).
- **IVR Telephony:** HTTP REST mock telephony demonstration (no live PSTN / SIP trunk gateway connection).
- **External Transactions:** `DEMO_TRANSACTION` placeholders for telemedicine, transport, and lab integration boundaries.
- **Government Facility Data:** Periodic/static public dataset snapshot (`facilities_india_public_dataset.json`).
- **Interoperability (FHIR):** Read-only JSON mappers (`toFHIRPatient`, `toFHIRServiceRequest`, `toFHIRAppointment`). No HAPI FHIR SDK or inbound bundle processing.
- **Live Government API Connection:** No active connection to official live government API gateway (ready for drop-in when official API key authorization is granted).

