# CareFlow Data Sources & Provenance Specification

This document records the exact provenance model, dataset specifications, field classifications, and provider architecture for the CareFlow Facility Portal and Government Service Compatibility Layer.

---

## 1. Core Data Provenance Model (5 Categories)

CareFlow strictly classifies every piece of data into one of five provenance categories to ensure absolute transparency and prevent silent data mixing:

| Classification | Category Meaning & Operational Scope | Examples in System |
| :--- | :--- | :--- |
| `GOVERNMENT_REFERENCE` | Official public/reference facility metadata from Open Government Data (OGD) datasets. | Facility name, facility type, district, state, latitude, longitude, ownership, NIN ID. |
| `FACILITY_MANAGED` | Operational data maintained directly by authorized facility staff via the CareFlow Facility Portal. | Doctor profiles, doctor availability, equipment registry, maintenance status, diagnostic services, operating hours, capacity beds. |
| `CAREFLOW_TRANSACTION` | Operational transaction records created within CareFlow business workflows. | CareFlow appointments, inter-facility referrals, follow-up visits, Care Gaps, CHW care tasks, Care Journey lifecycle stages. |
| `OFFICIAL_API` | Reserved for future authorized live government API integration (e.g., ABDM, HFR, HPR). | Future live HPR doctor lookup, live HFR facility synchronization, eSanjeevani gateway. |
| `SYNTHETIC_DEMO` | Explicitly marked demonstration records for testing where no live transaction is available. | Synthetic demo patient contact numbers or simulated IVR telephony calls. |

> [!IMPORTANT]
> **Provenance Guarantee**: CareFlow NEVER fabricates government data or labels CareFlow-generated transactional info as official government data.

---

## 2. Primary Reference Dataset: OGD India National Hospital Directory

| Field | Detail |
| :--- | :--- |
| **Catalogue Name** | Hospital Directory (National Health Portal) |
| **Resource Title** | National Hospital Directory with Geo Code and additional parameters |
| **Source Organization** | Ministry of Health and Family Welfare (MoHFW) / National Health Portal (NHP), Government of India |
| **Official Portal** | Open Government Data (OGD) Platform India (`data.gov.in`) |
| **Official Source URL** | `https://www.data.gov.in/resource/national-hospital-directory-geo-code-and-additional-parameters-updated-till-last-month` |
| **Publication Date** | `10/08/2017` |
| **Last Updated Date** | `02/06/2025` |
| **Provider Mode** | `PROTOTYPE_DATASET` |
| **Data Freshness** | Static OGD Snapshot (Updated 02/06/2025) |

---

## 3. Seed Reference Facilities in CareFlow

| NIN ID | Facility Name | Type | District | State | Capabilities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NIN-TN-CBE-001` | Government PHC, Karamadai | PHC | Coimbatore | Tamil Nadu | Maternal Care, General Medicine, Immunization, Ultrasound, Pharmacy |
| `NIN-UP-RMP-001` | Rampur Primary Health Centre | PHC | Rampur | Uttar Pradesh | Maternal Care, General Medicine, Immunization, Pharmacy |
| `NIN-UP-RMP-002` | District Hospital Rampur | DISTRICT_HOSPITAL | Rampur | Uttar Pradesh | Obstetrics, Cardiology, Emergency, ICU, Radiology, Laboratory, Pharmacy |
| `NIN-UP-RMP-003` | Shahabad Community Health Centre | CHC | Rampur | Uttar Pradesh | Maternal Care, Pediatrics, Dental, Laboratory, Pharmacy |
| `NIN-UP-RMP-004` | Milak Sub-District Hospital | SUB_DISTRICT_HOSPITAL | Rampur | Uttar Pradesh | General Surgery, Obstetrics, Emergency, Laboratory, Pharmacy |
| `NIN-UP-LKO-001` | Sanjay Gandhi Post Graduate Institute | TERTIARY_CARE_INSTITUTE | Lucknow | Uttar Pradesh | Super Specialty, Cardiovascular, Oncology, Trauma Center |
| `NIN-UP-LKO-002` | Dr. Ram Manohar Lohia Combined Hospital | DISTRICT_HOSPITAL | Lucknow | Uttar Pradesh | Emergency, Obstetrics, Orthopedics, Pediatrics, Pharmacy |

---

## 4. Operational Staleness Policy

1. **Last Verified Timestamp**: Every facility operational update (`FACILITY_MANAGED`) requires `lastVerifiedAt` and `lastVerifiedBy` metadata.
2. **Stale Data Warning**: If an operational record has not been verified within 24 hours, the UI automatically displays:
   `"Information may be outdated — last operational verification was over 24 hours ago."`
