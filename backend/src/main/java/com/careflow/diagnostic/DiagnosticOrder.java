package com.careflow.diagnostic;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "diagnostic_orders")
public class DiagnosticOrder extends BaseEntity {

    @Column(nullable = false)
    private String patientId;

    private String journeyId;
    private String facilityId;

    @Column(nullable = false)
    private String testName; // e.g. "Complete Blood Count", "Chest X-Ray", "Ultrasound"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiagnosticStatus status = DiagnosticStatus.ORDERED;

    @Column(columnDefinition = "TEXT")
    private String resultSummary;

    private String orderingDoctorId;

    public DiagnosticOrder() {}

    public DiagnosticOrder(String patientId, String journeyId, String facilityId, String testName, String orderingDoctorId) {
        this.patientId = patientId;
        this.journeyId = journeyId;
        this.facilityId = facilityId;
        this.testName = testName;
        this.orderingDoctorId = orderingDoctorId;
        this.status = DiagnosticStatus.ORDERED;
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public DiagnosticStatus getStatus() { return status; }
    public void setStatus(DiagnosticStatus status) { this.status = status; }

    public String getResultSummary() { return resultSummary; }
    public void setResultSummary(String resultSummary) { this.resultSummary = resultSummary; }

    public String getOrderingDoctorId() { return orderingDoctorId; }
    public void setOrderingDoctorId(String orderingDoctorId) { this.orderingDoctorId = orderingDoctorId; }
}
