package com.careflow.facility;

import com.careflow.common.BaseEntity;
import com.careflow.common.SourceType;
import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "facility_diagnostics")
public class FacilityDiagnosticService extends BaseEntity {

    @Column(nullable = false)
    private String facilityId;

    @Column(nullable = false)
    private String testName; // e.g. Obstetric Ultrasound, Complete Blood Count, Blood Glucose (HbA1c), Chest X-Ray, Lipid Profile

    private String category; // PATHOLOGY, RADIOLOGY, CARDIOLOGY, BIOCHEMISTRY
    
    @Column(nullable = false)
    private String availability; // AVAILABLE, LIMITED, UNAVAILABLE, MAINTENANCE

    private String operatingHours;
    private String turnaroundTime; // 2 hours, Same day, 24 hours
    private String requiredEquipment; // Ultrasound Scanner, X-Ray Machine

    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SourceType sourceType = SourceType.FACILITY_MANAGED;

    public FacilityDiagnosticService() {}

    public FacilityDiagnosticService(String facilityId, String testName, String category, String availability, String operatingHours, String turnaroundTime, String requiredEquipment, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.testName = testName;
        this.category = category;
        this.availability = availability;
        this.operatingHours = operatingHours;
        this.turnaroundTime = turnaroundTime;
        this.requiredEquipment = requiredEquipment;
        this.lastVerifiedBy = lastVerifiedBy;
        this.lastVerifiedAt = ZonedDateTime.now();
        this.sourceType = SourceType.FACILITY_MANAGED;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public String getTurnaroundTime() { return turnaroundTime; }
    public void setTurnaroundTime(String turnaroundTime) { this.turnaroundTime = turnaroundTime; }

    public String getRequiredEquipment() { return requiredEquipment; }
    public void setRequiredEquipment(String requiredEquipment) { this.requiredEquipment = requiredEquipment; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }
}
