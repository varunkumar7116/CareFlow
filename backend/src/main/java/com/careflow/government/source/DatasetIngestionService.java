package com.careflow.government.source;

import com.careflow.government.dto.ProviderMode;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class DatasetIngestionService {

    private static final Logger log = LoggerFactory.getLogger(DatasetIngestionService.class);
    private final GovFacilityRepository facilityRepository;
    private final ObjectMapper objectMapper;

    public DatasetIngestionService(GovFacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
        this.objectMapper = new ObjectMapper();
    }

    @Transactional
    public int ingestPublicDataset() {
        try {
            ClassPathResource resource = new ClassPathResource("datasets/facilities_india_public_dataset.json");
            if (!resource.exists()) {
                log.warn("Public dataset file not found in classpath resources.");
                return 0;
            }

            InputStream is = resource.getInputStream();
            List<RawGovFacilityRecord> records = objectMapper.readValue(is, new TypeReference<List<RawGovFacilityRecord>>() {});

            int ingested = 0;
            ZonedDateTime now = ZonedDateTime.now();

            for (RawGovFacilityRecord rec : records) {
                // Validation: Check required fields
                if (rec.ninId == null || rec.name == null || rec.facilityType == null || rec.district == null) {
                    log.warn("Skipping invalid raw facility record: {}", rec.name);
                    continue;
                }

                // Normalization & Deduplication check
                if (facilityRepository.findByNinId(rec.ninId).isPresent()) {
                    continue; // Deduplicated
                }

                GovFacilityEntity entity = new GovFacilityEntity(
                        rec.ninId.trim(),
                        rec.name.trim(),
                        rec.facilityType.trim(),
                        rec.district.trim(),
                        rec.state != null ? rec.state.trim() : "Uttar Pradesh",
                        rec.latitude,
                        rec.longitude,
                        rec.capabilities,
                        rec.ownership != null ? rec.ownership : "GOVERNMENT",
                        rec.contactPhone,
                        "Government of India Open Government Data (OGD) Portal - Directory of Government Hospitals",
                        "Ministry of Health and Family Welfare (MoHFW), Government of India",
                        "Directory of Hospitals across India (data.gov.in OGD Portal)",
                        "OGD-INDIA-HOSPITAL-DIRECTORY-2024",
                        "2024-03-31",
                        now,
                        ProviderMode.PROTOTYPE_DATASET,
                        "Static OGD Snapshot (Periodic Public Release)"
                );

                facilityRepository.save(entity);
                ingested++;
            }

            log.info("Dataset Ingestion Pipeline successfully processed and loaded {} facility records into PostgreSQL.", ingested);
            return ingested;

        } catch (Exception e) {
            log.error("Failed to execute dataset ingestion pipeline: {}", e.getMessage(), e);
            return 0;
        }
    }

    public static class RawGovFacilityRecord {
        public String ninId;
        public String name;
        public String facilityType;
        public String district;
        public String state;
        public Double latitude;
        public Double longitude;
        public String capabilities;
        public String ownership;
        public String contactPhone;
    }
}
