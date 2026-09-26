package com.careflow.government.provider;

import com.careflow.facility.HealthcareProfessional;
import com.careflow.facility.HealthcareProfessionalRepository;
import com.careflow.government.dto.ProviderMode;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Primary
public class DatasetProfessionalProvider implements HealthcareProfessionalProvider {

    private final HealthcareProfessionalRepository professionalRepository;

    public DatasetProfessionalProvider(HealthcareProfessionalRepository professionalRepository) {
        this.professionalRepository = professionalRepository;
    }

    @Override
    public ProviderMode getProviderMode() {
        return ProviderMode.PROTOTYPE_DATASET;
    }

    @Override
    public List<HealthcareProfessional> getProfessionalsByFacility(String facilityId) {
        return professionalRepository.findByFacilityId(facilityId);
    }

    @Override
    public Optional<HealthcareProfessional> getProfessionalById(String professionalId) {
        return professionalRepository.findById(professionalId);
    }
}
