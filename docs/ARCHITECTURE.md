# CareFlow Architecture Specification

## 1. System Overview & Core Principle

CareFlow is a community-first healthcare coordination platform connecting Community Health Workers (CHWs), Primary Health Centres (PHCs), District Hospitals, and patient IVR hotlines.

> [!IMPORTANT]
> **Most Important Product Principle**:
> CareFlow does NOT replace existing healthcare services. CareFlow **ACCESSes** them, **CONNECTs** to them, **COORDINATEs** them, **TRACKs** the care journey, **IDENTIFIEs** gaps, and **SUPPORTs** follow-up. Existing healthcare facilities and clinicians remain fully responsible for providing actual healthcare.

---

## 2. V1 Architecture Overview

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

## 3. Technology Verification & Honest System Stack

- **Backend API**: Java 21 + Spring Boot 3.3. REST API, Care Journey Engine, Care Gap Engine, IVR Gateway, Audit Logging.
- **Database**: PostgreSQL 16 (Runtime source of truth), H2 in-memory (Test profile).
- **Web Dashboard**: React 18 + TypeScript 5.2 + Vite 5.4. Interactive 8-step workflow runner & IVR simulator.
- **CHW Mobile**: React / Vite Web Prototype styled as mobile viewport (`CHW Mobile-Viewport Prototype`).
- **Offline Storage**: Offline workflow prototype with synchronization-state simulation.
- **IVR Telephony**: Native Java state machine supporting 5 Indian languages (`MOCK IVR DEMONSTRATION`).

---

## 4. Provider Replacement Architecture

```
Current V1:

                  CAREFLOW
                      ↓
       Government Service Interface
                      ↓
          Current V1 Provider (DatasetGovernmentProvider)
                      ↓
       Verified Public/Official Data (PostgreSQL OGD Snapshot)


Future Phase:

                  CAREFLOW
                      ↓
       Government Service Interface
                      ↓
          Official API Provider (OfficialGovernmentProvider)
                      ↓
          Authorized Government API (e.g. ABDM Gateway)
```

---

## 5. Provenance Metadata & Source URL

- **Catalogue**: Hospital Directory (National Health Portal)
- **Resource Title**: National Hospital Directory with Geo Code and additional parameters
- **Publishing Organization**: Ministry of Health and Family Welfare (MoHFW) / National Health Portal (NHP), Government of India
- **Official Source URL**: `https://www.data.gov.in/resource/national-hospital-directory-geo-code-and-additional-parameters-updated-till-last-month`
- **Published Date**: `10/08/2017` | **Updated Date**: `02/06/2025`
- **Provider Mode**: `PROTOTYPE_DATASET`
