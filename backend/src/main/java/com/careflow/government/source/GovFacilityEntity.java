package com.careflow.government.source;

import com.careflow.common.BaseEntity;
import com.careflow.government.dto.ProviderMode;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "gov_facilities")
public class GovFacilityEntity extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String ninId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String facilityType;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String state;

    private Double latitude;
    private Double longitude;

    @Column(columnDefinition = "TEXT")
    private String capabilities;

    private String ownership;
    private String contactPhone;

    // Source Metadata fields
    private String sourceName;
    private String sourceOrganization;
    private String datasetTitle;
    private String sourceReference;
    private String publicationDate;
    private ZonedDateTime importTimestamp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProviderMode providerMode = ProviderMode.PROTOTYPE_DATASET;

    private String dataFreshness;

    public GovFacilityEntity() {}

    public GovFacilityEntity(String ninId, String name, String facilityType, String district, String state, Double latitude, Double longitude, String capabilities, String ownership, String contactPhone, String sourceName, String sourceOrganization, String datasetTitle, String sourceReference, String publicationDate, ZonedDateTime importTimestamp, ProviderMode providerMode, String dataFreshness) {
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
        this.sourceName = sourceName;
        this.sourceOrganization = sourceOrganization;
        this.datasetTitle = datasetTitle;
        this.sourceReference = sourceReference;
        this.publicationDate = publicationDate;
        this.importTimestamp = importTimestamp;
        this.providerMode = providerMode;
        this.dataFreshness = dataFreshness;
    }

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

    public String getSourceName() { return sourceName; }
    public void setSourceName(String sourceName) { this.sourceName = sourceName; }

    public String getSourceOrganization() { return sourceOrganization; }
    public void setSourceOrganization(String sourceOrganization) { this.sourceOrganization = sourceOrganization; }

    public String getDatasetTitle() { return datasetTitle; }
    public void setDatasetTitle(String datasetTitle) { this.datasetTitle = datasetTitle; }

    public String getSourceReference() { return sourceReference; }
    public void setSourceReference(String sourceReference) { this.sourceReference = sourceReference; }

    public String getPublicationDate() { return publicationDate; }
    public void setPublicationDate(String publicationDate) { this.publicationDate = publicationDate; }

    public ZonedDateTime getImportTimestamp() { return importTimestamp; }
    public void setImportTimestamp(ZonedDateTime importTimestamp) { this.importTimestamp = importTimestamp; }

    public ProviderMode getProviderMode() { return providerMode; }
    public void setProviderMode(ProviderMode providerMode) { this.providerMode = providerMode; }

    public String getDataFreshness() { return dataFreshness; }
    public void setDataFreshness(String dataFreshness) { this.dataFreshness = dataFreshness; }
}
