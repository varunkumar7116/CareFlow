# CareFlow Architecture Specification

## 1. System Overview
CareFlow is an offline-first, multilingual, community-first healthcare care-coordination platform. CareFlow does not replace healthcare professionals or hospital infrastructure; rather, it coordinates and tracks patient care journeys from community-level screening through hospital treatment and post-discharge follow-up.

## 2. System Layers & Stack
- **Web App (`web/`)**: React + TypeScript + Vite. Used by hospital and PHC facility staff.
- **Mobile App (`mobile/`)**: React Native + TypeScript + SQLite. Used by Community Health Workers (CHWs) offline in rural areas and by patients.
- **Backend API (`backend/`)**: Java 21 + Spring Boot 3.3. Modular monolith architecture.
- **Database**: PostgreSQL 16 (Server source of truth), SQLite (Mobile client local storage).
- **Cache & Messaging**: Redis 7 (caching), RabbitMQ 3 (async notifications and background jobs).
- **Interoperability**: FHIR R4 mapping adapters & Mock Integration Gateway for national health platforms.

## 3. Key Core Engines
1. **Care Journey Engine**: Manages non-linear patient stages (`REGISTRATION`, `SCREENING`, `TRIAGE`, `CONSULTATION`, `DIAGNOSTICS`, `REFERRAL`, `APPOINTMENT`, `TRANSPORT`, `HOSPITAL`, `TREATMENT`, `MEDICINE`, `FOLLOW_UP`, `COMPLETED`). Supports transition actions: `start`, `progress`, `pause`, `resume`, `repeat`, `skip`, `refer`, `escalate`, `complete`.
2. **Care Gap Engine**: Detects missed SLA milestones (e.g. unconfirmed referral after 48h, missed follow-up date) and automatically generates actionable tasks assigned to CHWs or facility staff for closed-loop care.
3. **CareFlow Navigate**: 2D indoor map graph engine that calculates optimal routes inside hospitals using node/edge graph data, QR anchor origins, and accessibility constraints (`wheelchair`, `avoid_stairs`, `lift_preferred`).
4. **CHW Offline Sync Outbox**: Client-side SQLite queue and backend outbox processor maintaining idempotency and conflict resolution (`LOCAL_ONLY`, `PENDING_SYNC`, `SYNCING`, `SYNCED`, `FAILED`, `CONFLICT`).

## 4. Healthcare Safety Boundary
CareFlow is strictly an administrative and workflow coordination system. It does NOT make automated clinical diagnoses or independent treatment decisions. Clinical authority remains exclusively with licensed healthcare providers.
