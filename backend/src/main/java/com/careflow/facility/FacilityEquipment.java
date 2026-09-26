package com.careflow.facility;

import com.careflow.common.BaseEntity;
import com.careflow.common.SourceType;
import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "facility_equipment")
public class FacilityEquipment extends BaseEntity {

    @Column(nullable = false)
    private String facilityId;

    @Column(nullable = false)
    private String name; // e.g. Ultrasound Machine, ECG Monitor, Digital X-Ray, Autoclave, Oxygen Concentrator

    private String category; // DIAGNOSTIC, MONITORING, SURGICAL, LIFE_SUPPORT
    private Integer quantity;
    private Integer availableQuantity;

    @Column(nullable = false)
    private String status; // AVAILABLE, PARTIALLY_AVAILABLE, IN_USE, MAINTENANCE, UNAVAILABLE

    private String maintenanceStatus; // Operational, Inspection scheduled 30 Sep, Repair pending

    @Column(columnDefinition = "TEXT")
    private String notes;

    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SourceType sourceType = SourceType.FACILITY_MANAGED;

    public FacilityEquipment() {}

    public FacilityEquipment(String facilityId, String name, String category, Integer quantity, Integer availableQuantity, String status, String maintenanceStatus, String notes, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.availableQuantity = availableQuantity;
        this.status = status;
        this.maintenanceStatus = maintenanceStatus;
        this.notes = notes;
        this.lastVerifiedBy = lastVerifiedBy;
        this.lastVerifiedAt = ZonedDateTime.now();
        this.sourceType = SourceType.FACILITY_MANAGED;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMaintenanceStatus() { return maintenanceStatus; }
    public void setMaintenanceStatus(String maintenanceStatus) { this.maintenanceStatus = maintenanceStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }
}
