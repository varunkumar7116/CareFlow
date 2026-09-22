package com.careflow.government.dto;

public class GovFacilityDTO {

    private String id;
    private String ninId;
    private String name;
    private String facilityType;
    private String district;
    private String state;
    private Double latitude;
    private Double longitude;
    private String capabilities;
    private String ownership;
    private String contactPhone;
    private SourceMetadataDTO sourceMetadata;

    public GovFacilityDTO() {}

    public GovFacilityDTO(String id, String ninId, String name, String facilityType, String district, String state, Double latitude, Double longitude, String capabilities, String ownership, String contactPhone, SourceMetadataDTO sourceMetadata) {
        this.id = id;
        this.ninId = ninId;
        this.name = name;
        this.facilityType = facilityType;
        this.district = district;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.capabilities = capabilities;
        this.ownership = ownership;
        this.contactPhone = contactPhone;
        this.sourceMetadata = sourceMetadata;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNinId() { return ninId; }
    public void setNinId(String ninId) { this.ninId = ninId; }

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

    public String getOwnership() { return ownership; }
    public void setOwnership(String ownership) { this.ownership = ownership; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public SourceMetadataDTO getSourceMetadata() { return sourceMetadata; }
    public void setSourceMetadata(SourceMetadataDTO sourceMetadata) { this.sourceMetadata = sourceMetadata; }
}
