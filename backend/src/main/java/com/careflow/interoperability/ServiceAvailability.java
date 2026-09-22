package com.careflow.interoperability;

public class ServiceAvailability {
    private boolean available;
    private String serviceName;
    private String estimatedWaitTime;

    public ServiceAvailability() {}

    public ServiceAvailability(boolean available, String serviceName, String estimatedWaitTime) {
        this.available = available;
        this.serviceName = serviceName;
        this.estimatedWaitTime = estimatedWaitTime;
    }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getEstimatedWaitTime() { return estimatedWaitTime; }
    public void setEstimatedWaitTime(String estimatedWaitTime) { this.estimatedWaitTime = estimatedWaitTime; }
}
