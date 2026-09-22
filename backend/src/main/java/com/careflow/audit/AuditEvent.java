package com.careflow.audit;

import com.careflow.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "audit_events")
public class AuditEvent extends BaseEntity {

    @Column(nullable = false)
    private String eventType; // LOGIN, PATIENT_READ, PATIENT_UPDATE, REFERRAL_CREATE, REFERRAL_STATUS_CHANGE, APPOINTMENT_MODIFIED, CARE_GAP_CREATED, TASK_COMPLETED, INTEGRATION_ATTEMPT

    private String actorId;
    private String actorRole;
    private String targetEntityId;
    private String targetEntityType;

    @Column(columnDefinition = "TEXT")
    private String details;

    private String ipAddress;

    public AuditEvent() {}

    public AuditEvent(String eventType, String actorId, String actorRole, String targetEntityId, String targetEntityType, String details) {
        this.eventType = eventType;
        this.actorId = actorId;
        this.actorRole = actorRole;
        this.targetEntityId = targetEntityId;
        this.targetEntityType = targetEntityType;
        this.details = details;
    }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getActorId() { return actorId; }
    public void setActorId(String actorId) { this.actorId = actorId; }

    public String getActorRole() { return actorRole; }
    public void setActorRole(String actorRole) { this.actorRole = actorRole; }

    public String getTargetEntityId() { return targetEntityId; }
    public void setTargetEntityId(String targetEntityId) { this.targetEntityId = targetEntityId; }

    public String getTargetEntityType() { return targetEntityType; }
    public void setTargetEntityType(String targetEntityType) { this.targetEntityType = targetEntityType; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
}
