package com.careflow.government.dto;

import java.time.ZonedDateTime;

public class SourceMetadataDTO {

    private String sourceName;
    private String sourceOrganization;
    private String datasetTitle;
    private String sourceReference;
    private String publicationDate;
    private ZonedDateTime importTimestamp;
    private ProviderMode providerMode;
    private String dataFreshness;
    private String metadataLabel;

    public SourceMetadataDTO() {}

    public SourceMetadataDTO(String sourceName, String sourceOrganization, String datasetTitle, String sourceReference, String publicationDate, ZonedDateTime importTimestamp, ProviderMode providerMode, String dataFreshness) {
        this.sourceName = sourceName;
        this.sourceOrganization = sourceOrganization;
        this.datasetTitle = datasetTitle;
        this.sourceReference = sourceReference;
        this.publicationDate = publicationDate;
        this.importTimestamp = importTimestamp;
        this.providerMode = providerMode;
        this.dataFreshness = dataFreshness;
        this.metadataLabel = "Prototype Government Service | Source: Public/Official Dataset (" + datasetTitle + ")";
    }

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
}
