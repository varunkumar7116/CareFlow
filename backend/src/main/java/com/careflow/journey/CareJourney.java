package com.careflow.journey;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "care_journeys")
public class CareJourney extends BaseEntity {

    @Column(nullable = false)
    private String patientId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CareStage currentStage = CareStage.REGISTRATION;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JourneyStatus status = JourneyStatus.ACTIVE;

    private String assignedChwId;
    private String facilityId;

    private ZonedDateTime updatedAt;

    public CareJourney() {}

    public CareJourney(String patientId, String assignedChwId, String facilityId) {
        this.patientId = patientId;
        this.assignedChwId = assignedChwId;
        this.facilityId = facilityId;
        this.currentStage = CareStage.REGISTRATION;
        this.status = JourneyStatus.ACTIVE;
        this.updatedAt = ZonedDateTime.now();
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public CareStage getCurrentStage() { return currentStage; }
    public void setCurrentStage(CareStage currentStage) { this.currentStage = currentStage; }

    public JourneyStatus getStatus() { return status; }
    public void setStatus(JourneyStatus status) { this.status = status; }

    public String getAssignedChwId() { return assignedChwId; }
    public void setAssignedChwId(String assignedChwId) { this.assignedChwId = assignedChwId; }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
}
