package com.careflow.interoperability;

import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class MockNationalHealthAdapter implements HealthcareServiceAdapter {

    @Override
    public String getServiceName() {
        return "National Digital Health Interoperability Gateway (Mock)";
    }

    @Override
    public ServiceAvailability checkAvailability(ServiceRequest request) {
        return new ServiceAvailability(true, request.getServiceType(), "15-30 minutes");
    }

    @Override
    public IntegrationResult submit(ServiceRequest request) {
        String extRef = "NDHM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return new IntegrationResult(true, extRef, "Successfully transmitted service request to national registry.");
    }

    @Override
    public IntegrationResult getStatus(String externalReference) {
        return new IntegrationResult(true, externalReference, "Status: IN_PROGRESS - Verified by regional health exchange.");
    }
}
