# CareFlow Data Sources & Provenance Documentation

This document records the exact provenance, schema mapping, and data freshness for public/official datasets imported into the CareFlow Government Service Compatibility Layer.

---

## 1. Primary Public Dataset: OGD India Directory of Government Hospitals

| Field | Detail |
| :--- | :--- |
| **Dataset Name** | Directory of Government Hospitals & Public Health Facilities in India |
| **Source Organization** | Ministry of Health and Family Welfare (MoHFW), Government of India |
| **Official Portal** | Open Government Data (OGD) Platform India (`data.gov.in`) |
| **Catalog Resource ID** | `OGD-INDIA-HOSP-DIR-RESOURCE-ID-6a0` |
| **Publication Date** | `2023-11-15` |
| **Last Updated Date** | `2024-01-20` |
| **Provider Operational Mode** | `PROTOTYPE_DATASET` |
| **Data Freshness** | Static OGD Snapshot (Periodic Public Release) |

---

## 2. Fields Used & Schema Mapping

| Source Field | CareFlow Entity Field | Transformation / Processing | Provenance Tag |
| :--- | :--- | :--- | :--- |
| `ninId` | `GovFacilityEntity.ninId` | Trimmed, indexed for deduplication | Public OGD Catalog ID |
| `name` | `GovFacilityEntity.name` | Trimmed string | Public OGD Catalog Field |
| `facilityType` | `GovFacilityEntity.facilityType` | Normalized (PHC, CHC, DISTRICT_HOSPITAL, TERTIARY) | Public OGD Classification |
| `district` | `GovFacilityEntity.district` | Trimmed string, query indexed | Public OGD District |
| `state` | `GovFacilityEntity.state` | Defaulted to "Uttar Pradesh" if omitted | Public OGD State |
| `latitude` | `GovFacilityEntity.latitude` | Double precision coordinate | Public OGD Geolocation |
| `longitude` | `GovFacilityEntity.longitude` | Double precision coordinate | Public OGD Geolocation |
| `capabilities` | `GovFacilityEntity.capabilities` | Comma-separated service tags | Public OGD Service Directory |
| `ownership` | `GovFacilityEntity.ownership` | Government ownership tag | Public OGD Ownership Tag |
| `contactPhone` | `GovFacilityEntity.contactPhone` | Public facility helpline | Public OGD Helpline |

---

## 3. Data Ingestion & Idempotency Rules

1. **Ingestion Pipeline**: Executed automatically during Spring Boot application startup via `DatasetIngestionService`.
2. **Idempotency Guarantee**: Primary deduplication check performed on `ninId` (`GovFacilityRepository.findByNinId(ninId)`). Re-running the application or restarting PostgreSQL will not create duplicate facility records.
3. **Database Target**: Persisted directly into PostgreSQL table `gov_facilities`.
