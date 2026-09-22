package com.careflow.government;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.ProviderMode;
import com.careflow.government.provider.DatasetGovernmentProvider;
import com.careflow.government.provider.GovernmentFacilityProvider;
import com.careflow.government.provider.OfficialGovernmentProvider;
import com.careflow.government.service.GovernmentFacilityService;
import com.careflow.government.source.GovFacilityEntity;
import com.careflow.government.source.GovFacilityRepository;

import com.careflow.referral.Referral;
import com.careflow.referral.ReferralRepository;
import com.careflow.referral.ReferralService;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class GovernmentFacilityServiceTest {

    @Autowired
    private GovernmentFacilityService facilityService;

    @Autowired
    private GovernmentFacilityProvider facilityProvider;

    @Autowired
    private GovFacilityRepository govFacilityRepository;

    @Autowired
    private ReferralService referralService;

    @Autowired
    private ReferralRepository referralRepository;

    @Autowired
    private OfficialGovernmentProvider officialGovernmentProvider;

    @Test
    @DisplayName("1. Verify Dataset Imported and Stored in Repository")
    void testDatasetImportedAndStored() {
        List<GovFacilityEntity> entities = govFacilityRepository.findAll();
        assertFalse(entities.isEmpty(), "GovFacilityRepository should contain dataset records");
        assertTrue(entities.size() >= 6, "Expected at least 6 imported public dataset facilities");

        Optional<GovFacilityEntity> rampurHospital = govFacilityRepository.findByNinId("NIN-UP-RMP-002");
        assertTrue(rampurHospital.isPresent(), "District Hospital Rampur (NIN-UP-RMP-002) should exist");
        assertEquals("District Hospital Rampur", rampurHospital.get().getName());
    }

    @Test
    @DisplayName("2. Verify GET Facilities returns dataset-backed data")
    void testGetFacilitiesReturnsDatasetData() {
        List<GovFacilityDTO> facilities = facilityService.searchFacilities(null, null, null);
        assertNotNull(facilities);
        assertFalse(facilities.isEmpty(), "Facilities list should not be empty");

        GovFacilityDTO facility = facilities.get(0);
        assertNotNull(facility.getNinId());
        assertNotNull(facility.getSourceMetadata());
        assertEquals(ProviderMode.PROTOTYPE_DATASET, facility.getSourceMetadata().getProviderMode());
    }

    @Test
    @DisplayName("3. Verify District Filter Works")
    void testDistrictFilter() {
        List<GovFacilityDTO> rampurFacilities = facilityService.searchFacilities("Rampur", null, null);
        assertFalse(rampurFacilities.isEmpty(), "Rampur district facilities should be found");
        assertTrue(rampurFacilities.stream().allMatch(f -> "Rampur".equalsIgnoreCase(f.getDistrict())));

        List<GovFacilityDTO> lucknowFacilities = facilityService.searchFacilities("Lucknow", null, null);
        assertFalse(lucknowFacilities.isEmpty(), "Lucknow district facilities should be found");
        assertTrue(lucknowFacilities.stream().allMatch(f -> "Lucknow".equalsIgnoreCase(f.getDistrict())));
    }

    @Test
    @DisplayName("4. Verify Facility Type Filter Works")
    void testFacilityTypeFilter() {
        List<GovFacilityDTO> phcFacilities = facilityService.searchFacilities(null, "PHC", null);
        assertFalse(phcFacilities.isEmpty(), "PHC facilities should be found");
        assertTrue(phcFacilities.stream().allMatch(f -> "PHC".equalsIgnoreCase(f.getFacilityType())));

        List<GovFacilityDTO> districtHospitals = facilityService.searchFacilities(null, "DISTRICT_HOSPITAL", null);
        assertFalse(districtHospitals.isEmpty(), "District hospitals should be found");
        assertTrue(districtHospitals.stream().allMatch(f -> "DISTRICT_HOSPITAL".equalsIgnoreCase(f.getFacilityType())));
    }

    @Test
    @DisplayName("5. Verify Traceable Source Metadata Exists")
    void testSourceMetadataCompleteness() {
        Optional<GovFacilityDTO> facility = facilityService.getFacilityById("NIN-UP-RMP-002");
        assertTrue(facility.isPresent());

        GovFacilityDTO dto = facility.get();
        assertNotNull(dto.getSourceMetadata(), "Source metadata must not be null");
        assertEquals("Government of India Open Government Data (OGD) Platform - Directory of Government Hospitals", dto.getSourceMetadata().getSourceName());
        assertEquals("Ministry of Health and Family Welfare (MoHFW), Government of India", dto.getSourceMetadata().getSourceOrganization());
        assertEquals("https://data.gov.in/resource/directory-hospitals-india", dto.getSourceMetadata().getSourceReference());
        assertEquals("2024 (OGD Annual Public Release)", dto.getSourceMetadata().getPublicationDate());
        assertEquals(ProviderMode.PROTOTYPE_DATASET, dto.getSourceMetadata().getProviderMode());
    }

    @Test
    @DisplayName("6. Verify Referral uses GovernmentFacilityProvider")
    void testReferralUsesGovernmentFacilityProvider() {
        Referral referral = new Referral(
                "PAT-P1001",
                "CJ-P1001-01",
                "NIN-UP-RMP-001",
                "NIN-UP-RMP-002",
                "Obstetrics",
                "High-risk maternal referral",
                "HIGH",
                "USER-CHW-001"
        );

        Referral created = referralService.createReferral(referral, "USER-CHW-001");
        assertNotNull(created.getId());
        assertEquals("NIN-UP-RMP-002", created.getTargetFacilityId());

        Optional<GovFacilityDTO> targetGovFacility = facilityProvider.getFacilityById(created.getTargetFacilityId());
        assertTrue(targetGovFacility.isPresent(), "Target facility should resolve via GovernmentFacilityProvider");
        assertEquals("District Hospital Rampur", targetGovFacility.get().getName());
    }

    @Test
    @DisplayName("7. Verify Government Provider Abstraction (Dataset vs Official)")
    void testGovernmentProviderAbstraction() {
        assertEquals(ProviderMode.PROTOTYPE_DATASET, facilityProvider.getProviderMode());
        assertEquals(ProviderMode.OFFICIAL_API, officialGovernmentProvider.getProviderMode());

        assertTrue(facilityProvider instanceof DatasetGovernmentProvider);
        assertTrue(officialGovernmentProvider instanceof GovernmentFacilityProvider);
    }

    @Test
    @DisplayName("8. Verify Extension Provider Contracts return DEMO_TRANSACTION")
    void testExtensionProviderContracts() {
        com.careflow.government.provider.GovernmentTelemedicineProvider teleAdapter =
                new com.careflow.government.provider.GovernmentTelemedicineProvider.PrototypeGovernmentTelemedicineAdapter();
        var teleRes = teleAdapter.requestTeleConsultation("PAT-P1001", "Obstetrics", "High blood pressure");
        assertEquals("DEMO_TRANSACTION", teleRes.get("transactionType"));

        com.careflow.government.provider.GovernmentDiagnosticProvider diagAdapter =
                new com.careflow.government.provider.GovernmentDiagnosticProvider.PrototypeGovernmentDiagnosticAdapter();
        var diagRes = diagAdapter.orderDiagnosticTest("PAT-P1001", "FAC-DISTRICT-HOSPITAL", "CBC & Blood Pressure", "HIGH");
        assertEquals("DEMO_TRANSACTION", diagRes.get("transactionType"));

        com.careflow.government.provider.GovernmentTransportProvider transAdapter =
                new com.careflow.government.provider.GovernmentTransportProvider.PrototypeGovernmentTransportAdapter();
        var transRes = transAdapter.requestTransport("PAT-P1001", "FAC-VILLAGE-PHC", "FAC-DISTRICT-HOSPITAL", "EMERGENCY");
        assertEquals("DEMO_TRANSACTION", transRes.get("transactionType"));
    }
}
