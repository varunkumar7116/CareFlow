# CareFlow System Architecture Specification

## 1. System Overview & Healthcare Safety Principle

CareFlow is a community-first healthcare coordination platform designed to bridge Primary Health Centres (PHCs), Clinics, Laboratories, District Hospitals, Community Health Workers (CHWs), and patient IVR hotlines.

> [!IMPORTANT]
> **Most Important Product Principle**:
> CareFlow does NOT replace existing healthcare services. CareFlow **ACCESSes** them, **CONNECTs** to them, **COORDINATEs** them, **TRACKs** the care journey, **IDENTIFIEs** gaps, and **SUPPORTs** follow-up care. Existing healthcare facilities and clinicians remain fully responsible for providing actual healthcare.

---

## 2. Platform Architecture Diagram

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

## 3. Technology Stack & Verification

- **Backend Framework**: Java 17 / 21 + Spring Boot 3.3. REST APIs, Care Journey Engine, Care Gap Engine, IVR Gateway, Audit Logging.
- **Database**: PostgreSQL 16 (Runtime source of truth), H2 in-memory (Test profile).
- **Web Facility Portal**: React 18 + TypeScript 5.2 + Vite 5.4. Enterprise institutional portal with real backend integration.
- **Security & Authorization**: JWT authentication filter (`JwtAuthenticationFilter`), BCrypt password encoder, method-level RBAC (`@PreAuthorize`), and facility-level access boundaries.
- **Test Suite**: 30/30 passing JUnit 5 tests covering facility retrieval, service CRUD, doctor CRUD, equipment CRUD, diagnostics CRUD, availability updates, facility-level authorization, role authorization, referral matching, and audit logging.

---

## 4. Government Compatibility Layer & Provider Architecture

CareFlow Core business logic strictly depends on provider interface contracts, enabling seamless adapter replacement without modifying core business rules:

- `GovernmentFacilityProvider`: Interface contract implemented by `DatasetGovernmentProvider` (backed by PostgreSQL OGD snapshot) and `OfficialGovernmentProvider` (future live ABDM/HFR API adapter).
- `HealthcareProfessionalProvider`: Interface contract implemented by `DatasetProfessionalProvider` (backed by PostgreSQL facility-managed doctor registry) and `OfficialGovernmentProfessionalProvider` (future HPR API adapter).
- `GovernmentDiagnosticProvider`, `GovernmentTelemedicineProvider`, `GovernmentTransportProvider`: Provider contracts for lab orders, teleconsultations, and emergency ambulance dispatches.

---

## 5. Data Provenance & Staleness Architecture

CareFlow classifies all data into 5 explicit categories:
1. `GOVERNMENT_REFERENCE` (Public OGD dataset metadata)
2. `FACILITY_MANAGED` (Facility staff operational data)
3. `CAREFLOW_TRANSACTION` (Workflow transaction records)
4. `OFFICIAL_API` (Future authorized live API gateway data)
5. `SYNTHETIC_DEMO` (Demonstration data)

Operational updates display explicit timestamps ("Last verified 25 Sep 2026, 10:35 AM"). If operational data is older than 24 hours, the UI automatically flags it as potentially outdated.
