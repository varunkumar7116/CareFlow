package com.careflow.facility.dto;

import java.time.ZonedDateTime;
import java.util.List;

public class ReferralRequirementMatchDTO {

    private String facilityId;
    private String facilityName;
    private String facilityType;
    private String district;
    private String matchLabel; // "Matches referral requirements"
    private boolean specialtyMatched;
    private String matchedSpecialty;
    private boolean diagnosticMatched;
    private String matchedDiagnostic;
    private boolean appointmentAvailable;
    private int availableSlotsCount;
    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    public ReferralRequirementMatchDTO() {}

    public ReferralRequirementMatchDTO(String facilityId, String facilityName, String facilityType, String district, boolean specialtyMatched, String matchedSpecialty, boolean diagnosticMatched, String matchedDiagnostic, boolean appointmentAvailable, int availableSlotsCount, ZonedDateTime lastVerifiedAt, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.facilityName = facilityName;
        this.facilityType = facilityType;
        this.district = district;
        this.matchLabel = "Matches referral requirements";
        this.specialtyMatched = specialtyMatched;
        this.matchedSpecialty = matchedSpecialty;
        this.diagnosticMatched = diagnosticMatched;
        this.matchedDiagnostic = matchedDiagnostic;
        this.appointmentAvailable = appointmentAvailable;
        this.availableSlotsCount = availableSlotsCount;
        this.lastVerifiedAt = lastVerifiedAt;
        this.lastVerifiedBy = lastVerifiedBy;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getFacilityName() { return facilityName; }
    public void setFacilityName(String facilityName) { this.facilityName = facilityName; }

    public String getFacilityType() { return facilityType; }
    public void setFacilityType(String facilityType) { this.facilityType = facilityType; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getMatchLabel() { return matchLabel; }
    public void setMatchLabel(String matchLabel) { this.matchLabel = matchLabel; }

    public boolean isSpecialtyMatched() { return specialtyMatched; }
    public void setSpecialtyMatched(boolean specialtyMatched) { this.specialtyMatched = specialtyMatched; }

    public String getMatchedSpecialty() { return matchedSpecialty; }
    public void setMatchedSpecialty(String matchedSpecialty) { this.matchedSpecialty = matchedSpecialty; }

    public boolean isDiagnosticMatched() { return diagnosticMatched; }
    public void setDiagnosticMatched(boolean diagnosticMatched) { this.diagnosticMatched = diagnosticMatched; }

    public String getMatchedDiagnostic() { return matchedDiagnostic; }
    public void setMatchedDiagnostic(String matchedDiagnostic) { this.matchedDiagnostic = matchedDiagnostic; }

    public boolean isAppointmentAvailable() { return appointmentAvailable; }
    public void setAppointmentAvailable(boolean appointmentAvailable) { this.appointmentAvailable = appointmentAvailable; }

    public int getAvailableSlotsCount() { return availableSlotsCount; }
    public void setAvailableSlotsCount(int availableSlotsCount) { this.availableSlotsCount = availableSlotsCount; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }
}
