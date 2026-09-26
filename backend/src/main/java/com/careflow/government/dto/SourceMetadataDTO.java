package com.careflow.government.dto;

import com.careflow.common.SourceType;
import java.time.ZonedDateTime;

public class SourceMetadataDTO {

    private SourceType sourceType;
    private String sourceName;
    private String sourceOrganization;
    private String datasetTitle;
    private String sourceReference;
    private String publicationDate;
    private ZonedDateTime importTimestamp;
    private ProviderMode providerMode;
    private String dataFreshness;
    private String metadataLabel;
    private String sourceStatus;
    private Boolean isLive;

    public SourceMetadataDTO() {
        this.sourceType = SourceType.GOVERNMENT_REFERENCE;
        this.isLive = false;
        this.sourceStatus = "PUBLIC_DATASET";
    }

    public SourceMetadataDTO(String sourceName, String sourceOrganization, String datasetTitle, String sourceReference, String publicationDate, ZonedDateTime importTimestamp, ProviderMode providerMode, String dataFreshness) {
        this.sourceType = SourceType.GOVERNMENT_REFERENCE;
        this.sourceName = sourceName;
        this.sourceOrganization = sourceOrganization;
        this.datasetTitle = datasetTitle;
        this.sourceReference = sourceReference;
        this.publicationDate = publicationDate;
        this.importTimestamp = importTimestamp;
        this.providerMode = providerMode;
        this.dataFreshness = dataFreshness;
        this.sourceStatus = "PUBLIC_DATASET";
        this.isLive = false;
        this.metadataLabel = "Prototype Government Service | Source: Public/Official Dataset (" + datasetTitle + ")";
    }

    public SourceMetadataDTO(SourceType sourceType, String sourceName, String sourceStatus, Boolean isLive, String dataFreshness) {
        this.sourceType = sourceType;
        this.sourceName = sourceName;
        this.sourceStatus = sourceStatus;
        this.isLive = isLive;
        this.dataFreshness = dataFreshness;
        this.metadataLabel = sourceType.name() + " | " + sourceName;
    }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }

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

    public String getMetadataLabel() { return metadataLabel; }
    public void setMetadataLabel(String metadataLabel) { this.metadataLabel = metadataLabel; }

    public String getSourceStatus() { return sourceStatus; }
    public void setSourceStatus(String sourceStatus) { this.sourceStatus = sourceStatus; }

    public Boolean getIsLive() { return isLive; }
    public void setIsLive(Boolean isLive) { this.isLive = isLive; }
}
