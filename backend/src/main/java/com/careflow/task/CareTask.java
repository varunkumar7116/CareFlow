package com.careflow.task;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "tasks")
public class CareTask extends BaseEntity {

    private String careGapId;

    @Column(nullable = false)
    private String patientId;

    private String assignedUserId;
    private String assignedFacilityId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskPriority priority = TaskPriority.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.OPEN;

    private ZonedDateTime dueDate;
    private ZonedDateTime resolvedAt;
    private String sourceEvent;

    public CareTask() {}

    public CareTask(String careGapId, String patientId, String assignedUserId, String assignedFacilityId, String title, String description, TaskPriority priority, ZonedDateTime dueDate, String sourceEvent) {
        this.careGapId = careGapId;
        this.patientId = patientId;
        this.assignedUserId = assignedUserId;
        this.assignedFacilityId = assignedFacilityId;
        this.title = title;
        this.description = description;
        this.priority = priority != null ? priority : TaskPriority.MEDIUM;
        this.status = TaskStatus.OPEN;
        this.dueDate = dueDate;
        this.sourceEvent = sourceEvent;
    }

    public String getCareGapId() { return careGapId; }
    public void setCareGapId(String careGapId) { this.careGapId = careGapId; }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getAssignedUserId() { return assignedUserId; }
    public void setAssignedUserId(String assignedUserId) { this.assignedUserId = assignedUserId; }

    public String getAssignedFacilityId() { return assignedFacilityId; }
    public void setAssignedFacilityId(String assignedFacilityId) { this.assignedFacilityId = assignedFacilityId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TaskPriority getPriority() { return priority; }
    public void setPriority(TaskPriority priority) { this.priority = priority; }

    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }

    public ZonedDateTime getDueDate() { return dueDate; }
    public void setDueDate(ZonedDateTime dueDate) { this.dueDate = dueDate; }

    public ZonedDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(ZonedDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public String getSourceEvent() { return sourceEvent; }
    public void setSourceEvent(String sourceEvent) { this.sourceEvent = sourceEvent; }
}
