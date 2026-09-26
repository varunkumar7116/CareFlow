package com.careflow.facility;

import com.careflow.common.BaseEntity;
import com.careflow.common.SourceType;
import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "facility_operational_status")
public class FacilityOperationalStatus extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String facilityId;

    @Column(nullable = false)
    private String operatingStatus; // OPERATIONAL, LIMITED_OPERATIONS, TEMPORARILY_CLOSED, EMERGENCY_ONLY

    private String operatingHours; // e.g. "Mon-Sat: 08:00 - 17:00, Sun: Emergency"
    private String contactPhone;
    private String contactEmail;
    private Integer capacityTotalBeds;
    private Integer capacityAvailableBeds;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SourceType sourceType = SourceType.FACILITY_MANAGED;

    public FacilityOperationalStatus() {}

    public FacilityOperationalStatus(String facilityId, String operatingStatus, String operatingHours, String contactPhone, String contactEmail, Integer capacityTotalBeds, Integer capacityAvailableBeds, String notes, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.operatingStatus = operatingStatus;
        this.operatingHours = operatingHours;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.capacityTotalBeds = capacityTotalBeds;
        this.capacityAvailableBeds = capacityAvailableBeds;
        this.notes = notes;
        this.lastVerifiedBy = lastVerifiedBy;
        this.lastVerifiedAt = ZonedDateTime.now();
        this.sourceType = SourceType.FACILITY_MANAGED;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getOperatingStatus() { return operatingStatus; }
    public void setOperatingStatus(String operatingStatus) { this.operatingStatus = operatingStatus; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public Integer getCapacityTotalBeds() { return capacityTotalBeds; }
    public void setCapacityTotalBeds(Integer capacityTotalBeds) { this.capacityTotalBeds = capacityTotalBeds; }

    public Integer getCapacityAvailableBeds() { return capacityAvailableBeds; }
    public void setCapacityAvailableBeds(Integer capacityAvailableBeds) { this.capacityAvailableBeds = capacityAvailableBeds; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }
}
