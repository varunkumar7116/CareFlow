package com.careflow.sync;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "sync_operations")
public class SyncOperation extends BaseEntity {

    @Column(nullable = false)
    private String deviceId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String entityId;

    @Column(nullable = false)
    private String entityType; // PATIENT, SCREENING, REFERRAL, FOLLOW_UP, TASK

    @Column(nullable = false)
    private String operationType; // CREATE, UPDATE, DELETE

    @Column(nullable = false, columnDefinition = "TEXT")
    private String payload;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SyncStatus status = SyncStatus.PENDING_SYNC;

    private int retryCount = 0;
    private String errorMessage;

    public SyncOperation() {}

    public SyncOperation(String deviceId, String userId, String entityId, String entityType, String operationType, String payload) {
        this.deviceId = deviceId;
        this.userId = userId;
        this.entityId = entityId;
        this.entityType = entityType;
        this.operationType = operationType;
        this.payload = payload;
        this.status = SyncStatus.PENDING_SYNC;
        this.retryCount = 0;
    }

    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }

    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }

    public String getOperationType() { return operationType; }
    public void setOperationType(String operationType) { this.operationType = operationType; }

    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }

    public SyncStatus getStatus() { return status; }
    public void setStatus(SyncStatus status) { this.status = status; }

    public int getRetryCount() { return retryCount; }
    public void setRetryCount(int retryCount) { this.retryCount = retryCount; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}
