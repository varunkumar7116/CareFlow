package com.careflow.government.dto;

import java.time.ZonedDateTime;
import java.util.Map;

public class GovIntegrationStatusDTO {

    private String serviceName;
    private ProviderMode activeProviderMode;
    private boolean healthy;
    private long totalInvocations;
    private long successCount;
    private long errorCount;
    private double averageLatencyMs;
    private ZonedDateTime lastImportTimestamp;
    private Map<String, Object> details;

    public GovIntegrationStatusDTO() {}

    public GovIntegrationStatusDTO(String serviceName, ProviderMode activeProviderMode, boolean healthy, long totalInvocations, long successCount, long errorCount, double averageLatencyMs, ZonedDateTime lastImportTimestamp, Map<String, Object> details) {
        this.serviceName = serviceName;
        this.activeProviderMode = activeProviderMode;
        this.healthy = healthy;
        this.totalInvocations = totalInvocations;
        this.successCount = successCount;
        this.errorCount = errorCount;
        this.averageLatencyMs = averageLatencyMs;
        this.lastImportTimestamp = lastImportTimestamp;
        this.details = details;
    }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public ProviderMode getActiveProviderMode() { return activeProviderMode; }
    public void setActiveProviderMode(ProviderMode activeProviderMode) { this.activeProviderMode = activeProviderMode; }

    public boolean isHealthy() { return healthy; }
    public void setHealthy(boolean healthy) { this.healthy = healthy; }

    public long getTotalInvocations() { return totalInvocations; }
    public void setTotalInvocations(long totalInvocations) { this.totalInvocations = totalInvocations; }

    public long getSuccessCount() { return successCount; }
    public void setSuccessCount(long successCount) { this.successCount = successCount; }

    public long getErrorCount() { return errorCount; }
    public void setErrorCount(long errorCount) { this.errorCount = errorCount; }

    public double getAverageLatencyMs() { return averageLatencyMs; }
    public void setAverageLatencyMs(double averageLatencyMs) { this.averageLatencyMs = averageLatencyMs; }

    public ZonedDateTime getLastImportTimestamp() { return lastImportTimestamp; }
    public void setLastImportTimestamp(ZonedDateTime lastImportTimestamp) { this.lastImportTimestamp = lastImportTimestamp; }

    public Map<String, Object> getDetails() { return details; }
    public void setDetails(Map<String, Object> details) { this.details = details; }
}
