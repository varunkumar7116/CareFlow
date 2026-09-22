package com.careflow.facility;

import com.careflow.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "facilities")
public class Facility extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String facilityType; // PHC, CHC, SUB_CENTRE, DISTRICT_HOSPITAL, RURAL_HOSPITAL

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String state;

    private Double latitude;
    private Double longitude;

    // Available capabilities (comma-separated or JSON string)
    private String capabilities; // e.g. "SPECIALIST_CARDIOLOGY,LABORATORY,RADIOLOGY,ULTRASOUND,EMERGENCY,MATERNAL_CARE,PHARMACY"

    public Facility() {}

    public Facility(String name, String facilityType, String district, String state, Double latitude, Double longitude, String capabilities) {
        this.name = name;
        this.facilityType = facilityType;
        this.district = district;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.capabilities = capabilities;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFacilityType() { return facilityType; }
    public void setFacilityType(String facilityType) { this.facilityType = facilityType; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getCapabilities() { return capabilities; }
    public void setCapabilities(String capabilities) { this.capabilities = capabilities; }
}
