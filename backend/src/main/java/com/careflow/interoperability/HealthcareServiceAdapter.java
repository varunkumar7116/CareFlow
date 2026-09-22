package com.careflow.interoperability;

public interface HealthcareServiceAdapter {
    String getServiceName();
    ServiceAvailability checkAvailability(ServiceRequest request);
    IntegrationResult submit(ServiceRequest request);
    IntegrationResult getStatus(String externalReference);
}
