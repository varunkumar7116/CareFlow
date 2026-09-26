# Government Service Compatibility Layer Specification

The **CareFlow Government Service Compatibility Layer** decouples CareFlow Core workflows from external facility directories and government health infrastructure via clean interface abstractions.

---

## 1. Core Principle & Architectural Boundaries

> [!IMPORTANT]
> **CareFlow does NOT replace existing healthcare services.**
> CareFlow **ACCESSes** them, **CONNECTs** to them, **COORDINATEs** them, **TRACKs** the care journey, **IDENTIFIEs** care gaps, and **SUPPORTs** follow-up care. Existing healthcare facilities and Clinicians remain fully responsible for providing actual medical care.

---

## 2. Provider Abstraction Architecture

CareFlow Core business logic strictly depends on provider interface contracts, never directly on raw JSON datasets or vendor-specific SQL schemas.

```
CareFlow Core (Journeys, Referrals, Appointments, Care Gaps)
    ↓
Government Compatibility Layer
    ↓
Provider Interfaces
  - GovernmentFacilityProvider
  - HealthcareProfessionalProvider
  - GovernmentDiagnosticProvider
  - GovernmentTelemedicineProvider
  - GovernmentTransportProvider
    ↓
Dataset/Facility-Managed Implementations (Current V1)
  - DatasetGovernmentProvider (Primary)
  - DatasetProfessionalProvider (Primary)
    OR
Official API Implementations (Future)
  - OfficialGovernmentProvider (Future Placeholder)
  - OfficialGovernmentProfessionalProvider (Future Placeholder)
```

---

## 3. Provider Contracts & Operational Modes

| Interface Contract | Current Active Provider Mode | Default Provider Output |
| :--- | :--- | :--- |
| `GovernmentFacilityProvider` | `PROTOTYPE_DATASET` | 7 MoHFW OGD Public Facility Records in PostgreSQL (`GovFacilityEntity`) |
| `HealthcareProfessionalProvider` | `PROTOTYPE_DATASET` | Facility-managed doctor & specialist registry (`HealthcareProfessional`) |
| `GovernmentDiagnosticProvider` | `DEMO_TRANSACTION` | Facility-managed diagnostic services (`FacilityDiagnosticService`) |
| `GovernmentTelemedicineProvider` | `DEMO_TRANSACTION` | Simulated eSanjeevani teleconsultation request |
| `GovernmentTransportProvider` | `DEMO_TRANSACTION` | Simulated 108 Emergency Ambulance dispatch |

---

## 4. Facility-Level Role-Based Access Control (RBAC)

CareFlow enforces strict facility-level boundary checks on all operational endpoints:

1. **`FACILITY_ADMIN` / `FACILITY_STAFF` / `DOCTOR`**: Can ONLY modify operational data (doctors, services, equipment, diagnostics, slots) for their assigned `facilityId`. Any attempt to edit another facility's data produces `403 Forbidden` (`AccessDeniedException`).
2. **`DISTRICT_SUPERVISOR` / `SUPERVISOR` / `DISTRICT_OFFICER`**: Can view and monitor operational status across facilities within their assigned district supervisory scope.
3. **`SYSTEM_ADMIN` / `ADMIN`**: Platform administration across all facilities.

---

## 5. REST APIs & Provenance Metadata

- `GET /api/v1/gov/facilities` — Retrieve reference facility list (supports `district`, `facilityType`, `search`).
- `GET /api/v1/facilities/{facilityId}/details` — Normalized facility details DTO (Government Reference + Facility Managed data).
- `GET /api/v1/facilities/{facilityId}/dashboard` — Aggregated operational dashboard summary (doctors, diagnostics, equipment, slots, pending referrals, overdue followups).
- `GET /api/v1/facilities/{facilityId}/services` & `POST/PUT/DELETE` — Services registry.
- `GET /api/v1/facilities/{facilityId}/professionals` & `POST/PUT/DELETE` — Doctors & staff registry.
- `GET /api/v1/facilities/{facilityId}/equipment` & `POST/PUT/DELETE` — Equipment & maintenance registry.
- `GET /api/v1/facilities/{facilityId}/diagnostics` & `POST/PUT/DELETE` — Diagnostics & tests registry.
- `GET /api/v1/facilities/{facilityId}/appointments/slots` & `POST/PUT` — Appointment slots registry.
- `GET /api/v1/facilities/{facilityId}/matching` — Requirement matching ("Matches referral requirements").
