package com.careflow.caregap;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "care_gaps")
public class CareGap extends BaseEntity {

    @Column(nullable = false)
    private String journeyId;

    @Column(nullable = false)
    private String patientId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CareGapType gapType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CareGapStatus status = CareGapStatus.OPEN;

    private ZonedDateTime dueDate;
    private ZonedDateTime resolvedAt;

    public CareGap() {}

    public CareGap(String journeyId, String patientId, CareGapType gapType, String description, ZonedDateTime dueDate) {
        this.journeyId = journeyId;
        this.patientId = patientId;
        this.gapType = gapType;
        this.description = description;
        this.status = CareGapStatus.OPEN;
        this.dueDate = dueDate;
    }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public CareGapType getGapType() { return gapType; }
    public void setGapType(CareGapType gapType) { this.gapType = gapType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CareGapStatus getStatus() { return status; }
    public void setStatus(CareGapStatus status) { this.status = status; }

    public ZonedDateTime getDueDate() { return dueDate; }
    public void setDueDate(ZonedDateTime dueDate) { this.dueDate = dueDate; }

    public ZonedDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(ZonedDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
