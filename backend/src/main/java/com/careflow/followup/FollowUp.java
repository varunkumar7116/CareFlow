package com.careflow.followup;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "follow_ups")
public class FollowUp extends BaseEntity {

    @Column(nullable = false)
    private String patientId;

    private String journeyId;
    private String assignedChwId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FollowUpType type;

    @Column(nullable = false)
    private ZonedDateTime dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FollowUpStatus status = FollowUpStatus.SCHEDULED;

    private ZonedDateTime completedAt;

    @Column(columnDefinition = "TEXT")
    private String outcomeNotes;

    public FollowUp() {}

    public FollowUp(String patientId, String journeyId, String assignedChwId, FollowUpType type, ZonedDateTime dueDate) {
        this.patientId = patientId;
        this.journeyId = journeyId;
        this.assignedChwId = assignedChwId;
        this.type = type;
        this.dueDate = dueDate;
        this.status = FollowUpStatus.SCHEDULED;
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public String getAssignedChwId() { return assignedChwId; }
    public void setAssignedChwId(String assignedChwId) { this.assignedChwId = assignedChwId; }

    public FollowUpType getType() { return type; }
    public void setType(FollowUpType type) { this.type = type; }

    public ZonedDateTime getDueDate() { return dueDate; }
    public void setDueDate(ZonedDateTime dueDate) { this.dueDate = dueDate; }

    public FollowUpStatus getStatus() { return status; }
    public void setStatus(FollowUpStatus status) { this.status = status; }

    public ZonedDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(ZonedDateTime completedAt) { this.completedAt = completedAt; }

    public String getOutcomeNotes() { return outcomeNotes; }
    public void setOutcomeNotes(String outcomeNotes) { this.outcomeNotes = outcomeNotes; }
}
