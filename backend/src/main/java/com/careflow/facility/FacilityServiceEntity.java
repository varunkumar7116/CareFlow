package com.careflow.facility;

import com.careflow.common.BaseEntity;
import com.careflow.common.SourceType;
import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "facility_services")
public class FacilityServiceEntity extends BaseEntity {

    @Column(nullable = false)
    private String facilityId;

    @Column(nullable = false)
    private String serviceName; // General Consultation, Maternal Care, Child Health, NCD Screening, Emergency Care, Teleconsultation, Diagnostics

    private String category; // CLINICAL, PREVENTIVE, DIAGNOSTIC, EMERGENCY
    
    @Column(nullable = false)
    private String availabilityStatus; // AVAILABLE, LIMITED, UNAVAILABLE, MAINTENANCE

    private String operatingHours;
    private String description;
    
    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SourceType sourceType = SourceType.FACILITY_MANAGED;

    public FacilityServiceEntity() {}

    public FacilityServiceEntity(String facilityId, String serviceName, String category, String availabilityStatus, String operatingHours, String description, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.serviceName = serviceName;
        this.category = category;
        this.availabilityStatus = availabilityStatus;
        this.operatingHours = operatingHours;
        this.description = description;
        this.lastVerifiedBy = lastVerifiedBy;
        this.lastVerifiedAt = ZonedDateTime.now();
        this.sourceType = SourceType.FACILITY_MANAGED;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }
}
