package com.careflow.referral;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "referrals")
public class Referral extends BaseEntity {

    @Column(nullable = false)
    private String patientId;

    @Column(nullable = false)
    private String journeyId;

    private String sourceFacilityId;

    @Column(nullable = false)
    private String targetFacilityId;

    private String specialtyRequired;

    @Column(columnDefinition = "TEXT")
    private String reason;

    private String priority = "MEDIUM"; // LOW, MEDIUM, HIGH, URGENT

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReferralStatus status = ReferralStatus.CREATED;

    private String referringUserId;

    public Referral() {}

    public Referral(String patientId, String journeyId, String sourceFacilityId, String targetFacilityId, String specialtyRequired, String reason, String priority, String referringUserId) {
        this.patientId = patientId;
        this.journeyId = journeyId;
        this.sourceFacilityId = sourceFacilityId;
        this.targetFacilityId = targetFacilityId;
        this.specialtyRequired = specialtyRequired;
        this.reason = reason;
        if (priority != null && !priority.isBlank()) {
            this.priority = priority;
        }
        this.referringUserId = referringUserId;
        this.status = ReferralStatus.CREATED;
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public String getSourceFacilityId() { return sourceFacilityId; }
    public void setSourceFacilityId(String sourceFacilityId) { this.sourceFacilityId = sourceFacilityId; }

    public String getTargetFacilityId() { return targetFacilityId; }
    public void setTargetFacilityId(String targetFacilityId) { this.targetFacilityId = targetFacilityId; }

    public String getSpecialtyRequired() { return specialtyRequired; }
    public void setSpecialtyRequired(String specialtyRequired) { this.specialtyRequired = specialtyRequired; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public ReferralStatus getStatus() { return status; }
    public void setStatus(ReferralStatus status) { this.status = status; }

    public String getReferringUserId() { return referringUserId; }
    public void setReferringUserId(String referringUserId) { this.referringUserId = referringUserId; }
}
