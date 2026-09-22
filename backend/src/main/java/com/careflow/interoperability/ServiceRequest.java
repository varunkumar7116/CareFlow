package com.careflow.interoperability;

public class ServiceRequest {
    private String serviceType;
    private String facilityId;
    private String patientUhid;
    private String details;

    public ServiceRequest() {}

    public ServiceRequest(String serviceType, String facilityId, String patientUhid, String details) {
        this.serviceType = serviceType;
        this.facilityId = facilityId;
        this.patientUhid = patientUhid;
        this.details = details;
    }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getPatientUhid() { return patientUhid; }
    public void setPatientUhid(String patientUhid) { this.patientUhid = patientUhid; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
