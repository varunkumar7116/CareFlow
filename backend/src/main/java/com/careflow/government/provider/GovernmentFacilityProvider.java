package com.careflow.government.provider;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.ProviderMode;

import java.util.List;
import java.util.Optional;

public interface GovernmentFacilityProvider {

    /**
     * Identifies the current provider operational mode (PROTOTYPE_DATASET vs OFFICIAL_API).
     */
    ProviderMode getProviderMode();

    /**
     * Retrieve all government facilities matching optional filters.
     */
    List<GovFacilityDTO> getFacilities(String district, String facilityType, String search);

    /**
     * Retrieve a specific government facility by its NIN ID or primary key.
     */
    Optional<GovFacilityDTO> getFacilityById(String id);

    /**
     * Retrieve all government facilities without filters.
     */
    default List<GovFacilityDTO> getFacilities() {
        return getFacilities(null, null, null);
    }

    /**
     * Retrieve government facilities by district.
     */
    default List<GovFacilityDTO> getFacilitiesByDistrict(String district) {
        return getFacilities(district, null, null);
    }

    /**
     * Retrieve government facilities by facility type.
     */
    default List<GovFacilityDTO> getFacilitiesByType(String facilityType) {
        return getFacilities(null, facilityType, null);
    }
}
