package com.careflow.government.source;

import com.careflow.common.BaseEntity;
import com.careflow.government.dto.ProviderMode;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "gov_integration_logs")
public class GovIntegrationLogEntity extends BaseEntity {

    @Column(nullable = false)
    private String service; // FACILITY_DIRECTORY, REFERRAL_SERVICE, DIAGNOSTICS, TELEMEDICINE

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProviderMode providerMode;

    @Column(nullable = false)
    private String operation; // SEARCH_FACILITIES, GET_BY_ID, VERIFY_FACILITY

    private String requestId;
    private String status; // SUCCESS, ERROR, NOT_FOUND
    private Long latencyMs;

    @Column(columnDefinition = "TEXT")
    private String details;

    private ZonedDateTime timestamp;

    public GovIntegrationLogEntity() {}

    public GovIntegrationLogEntity(String service, ProviderMode providerMode, String operation, String requestId, String status, Long latencyMs, String details, ZonedDateTime timestamp) {
        this.service = service;
        this.providerMode = providerMode;
        this.operation = operation;
        this.requestId = requestId;
        this.status = status;
        this.latencyMs = latencyMs;
        this.details = details;
        this.timestamp = timestamp;
    }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public ProviderMode getProviderMode() { return providerMode; }
    public void setProviderMode(ProviderMode providerMode) { this.providerMode = providerMode; }

    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getLatencyMs() { return latencyMs; }
    public void setLatencyMs(Long latencyMs) { this.latencyMs = latencyMs; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public ZonedDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(ZonedDateTime timestamp) { this.timestamp = timestamp; }
}
