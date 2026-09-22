# CareFlow V1 - Closed-Loop Healthcare Coordination Platform

CareFlow is a community-first healthcare coordination platform designed to bridge the gap between Community Health Workers (CHWs), Primary Health Centres (PHCs), District Hospitals, and patient IVR hotlines.

---

## 1. Core Purpose & Healthcare Safety Principle

> [!IMPORTANT]
> **Most Important Product Principle**:
> **CareFlow does NOT replace existing healthcare services.** CareFlow **ACCESSes** them, **CONNECTs** to them, **COORDINATEs** them, **TRACKs** the care journey, **IDENTIFIEs** care gaps, and **SUPPORTs** follow-up care. Existing healthcare facilities, hospitals, and licensed clinicians remain fully responsible for providing actual medical care.

---

## 2. V1 Architecture Diagram

```
                     CAREFLOW
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
        Web           CHW           IVR
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                  CAREFLOW CORE
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
        Care Journey  Care Gap   Referral
             │          │          │
             └──────────┼──────────┘
                        ▼
              GOVERNMENT SERVICE
              COMPATIBILITY LAYER
                        │
            ┌───────────┴───────────┐
            ▼                       ▼
    Prototype Dataset          Future Official
       Provider                   Provider
            │                       │
            ▼                       ▼
    Public/Official Data       Government API
```

---

## 3. Core Modules & Key Features

- **Care Journey Engine (`CareJourneyEngine.java`)**: Manages the patient lifecycle across non-linear stages (`REGISTRATION`, `SCREENING`, `REFERRAL`, `APPOINTMENT`, `FOLLOW_UP`, `COMPLETED`).
- **Care Gap Engine (`CareGapEngine.java`)**: Automatically detects SLA breaches (e.g. unconfirmed referrals, missed follow-ups past 24h) and auto-creates actionable tasks assigned to CHWs for closed-loop care.
- **Government Service Compatibility Layer**: Exposes `GovernmentFacilityProvider` backed by an official Open Government Data (OGD) dataset snapshot (`PROTOTYPE_DATASET`). CareFlow Core logic depends strictly on provider interface abstractions, enabling drop-in replacement by `OfficialGovernmentProvider` (`OFFICIAL_API`) without modifying core workflows.
- **IVR Telephony Gateway (`IVRService.java`)**: Multi-language hotline (`MOCK IVR DEMONSTRATION`) supporting English, Hindi, Tamil, Telugu, and Kannada. Allows patients to query appointment/referral statuses or press `4` to dispatch urgent CHW callback tasks.
- **Web Dashboard (`frontend/`)**: React + TypeScript application with an interactive 8-step V1 workflow runner and live IVR phone simulator.
- **CHW Mobile Prototype (`mobile/`)**: React/Vite mobile-viewport interface displaying CHW task inbox, maternal screening form, and offline outbox synchronization indicator.

---

## 4. Integration Terminology Matrix

| Term | Operational Scope & Meaning |
| :--- | :--- |
| `REAL CAREFLOW API` | Core CareFlow backend services running native business rules (Journeys, Care Gaps, Tasks, Patients, Referrals). |
| `PROTOTYPE_DATASET` | Public/official Government of India OGD dataset snapshot stored in PostgreSQL and exposed via dataset-backed service providers. |
| `DEMO_TRANSACTION` | Simulated external transactions for integration boundaries where no authorized external API is currently available (Telemedicine, Diagnostics, Transport). |
| `OFFICIAL_API` | Reserved for future authorized live Government API integrations (e.g., ABDM, eSanjeevani Gateway). |

---

## 5. Provenance & Public Data Source

- **Dataset Source**: Government of India Open Government Data (OGD) Platform — Directory of Government Hospitals
- **Source Organization**: Ministry of Health and Family Welfare (MoHFW), Government of India
- **Official Source URL**: `https://data.gov.in/resource/directory-hospitals-india`
- **Dataset Reference**: `data.gov.in OGD Portal Catalog`
- **Publication Date**: `2024 (OGD Annual Public Release)`
- **Provider Mode**: `PROTOTYPE_DATASET`
- **Data Freshness**: Static OGD Snapshot (Periodic Public Release)

Detailed field classifications (`SOURCE_FIELD`, `DERIVED_FIELD`, `SYNTHETIC_FIELD`) are documented in [`docs/data-sources.md`](file:///e:/camphorforge/docs/data-sources.md).

---

## 6. Technology Stack & Verification

| Component | Stack | Build / Run Command | Status |
| :--- | :--- | :--- | :--- |
| **Backend API** | Java 21, Spring Boot 3.3, Spring Data JPA, PostgreSQL (H2 for tests) | `mvn spring-boot:run` | Executable JAR Ready |
| **Web Dashboard** | React 18, TypeScript 5.2, Vite 5.4, Lucide Icons | `npm run dev` (Port 3000) | Built (0 Errors) |
| **Mobile Prototype** | React 18, TypeScript 5.2, Vite 5.4 (`CHW Mobile-Viewport Prototype`) | `npm run dev` (Port 3001) | Built (0 Errors) |
| **Test Suite** | JUnit 5 + Spring Boot Test | `mvn clean test` | **11/11 Passed** |

---

## 7. 5-Minute Quickstart Guide

### Prerequisites
- JDK 17 / 21
- Node.js 18+
- Apache Maven (Included in `tools/apache-maven-3.9.6`)

### Step 1: Start Backend API (Port 8080)
```powershell
cd backend
..\tools\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
```

### Step 2: Start Web Dashboard (Port 3000)
```powershell
cd frontend
npm run dev
```

### Step 3: Start Mobile Prototype (Port 3001)
```powershell
cd mobile
npm run dev
```

### Step 4: Run Automated Tests
```powershell
cd backend
..\tools\apache-maven-3.9.6\bin\mvn.cmd clean test
```

---

## 8. Documentation Quick Links

- [Walkthrough & Verification Report](file:///C:/Users/varun/.gemini/antigravity-ide/brain/c9cde9c0-38d1-4f43-8fc5-c35afe193c56/walkthrough.md)
- [Government Service Integration Architecture](file:///e:/camphorforge/docs/government-service-integration.md)
- [Data Sources & Provenance Metadata](file:///e:/camphorforge/docs/data-sources.md)
- [System Architecture Specification](file:///e:/camphorforge/docs/ARCHITECTURE.md)
