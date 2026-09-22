package com.careflow.referral;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.provider.GovernmentFacilityProvider;
import com.careflow.journey.CareJourney;
import com.careflow.journey.CareJourneyEngine;
import com.careflow.journey.CareJourneyRepository;
import com.careflow.journey.CareStage;
import com.careflow.journey.TransitionAction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReferralService {

    private final ReferralRepository referralRepository;
    private final CareJourneyEngine journeyEngine;
    private final CareJourneyRepository journeyRepository;
    private final GovernmentFacilityProvider facilityProvider;

    public ReferralService(ReferralRepository referralRepository, CareJourneyEngine journeyEngine, CareJourneyRepository journeyRepository, GovernmentFacilityProvider facilityProvider) {
        this.referralRepository = referralRepository;
        this.journeyEngine = journeyEngine;
        this.journeyRepository = journeyRepository;
        this.facilityProvider = facilityProvider;
    }

    @Transactional
    public Referral createReferral(Referral referral, String actorId) {
        referral.setStatus(ReferralStatus.SENT);

        // Retrieve and enrich facility metadata via Government Service Compatibility Layer
        String targetName = referral.getTargetFacilityId();
        Optional<GovFacilityDTO> govFac = facilityProvider.getFacilityById(referral.getTargetFacilityId());
        if (govFac.isPresent()) {
            targetName = govFac.get().getName() + " [" + govFac.get().getNinId() + "]";
        }

        Referral saved = referralRepository.save(referral);

        // Progress care journey to REFERRAL stage
        if (referral.getJourneyId() != null) {
            journeyEngine.transition(referral.getJourneyId(), TransitionAction.REFER, CareStage.REFERRAL, "Referred via Government Compatibility Layer to: " + targetName, actorId);
        }

        return saved;
    }

    @Transactional
    public Referral updateStatus(String referralId, ReferralStatus status, String actorId) {
        Referral referral = referralRepository.findById(referralId)
                .orElseThrow(() -> new IllegalArgumentException("Referral not found: " + referralId));

        referral.setStatus(status);
        Referral updated = referralRepository.save(referral);

        if (status == ReferralStatus.ACCEPTED && referral.getJourneyId() != null) {
            journeyEngine.transition(referral.getJourneyId(), TransitionAction.PROGRESS, CareStage.APPOINTMENT, "Referral accepted by facility", actorId);
        }

        return updated;
    }

    public List<Referral> getReferralsForTargetFacility(String facilityId) {
        return referralRepository.findByTargetFacilityId(facilityId);
    }

    public List<Referral> getReferralsForPatient(String patientId) {
        return referralRepository.findByPatientId(patientId);
    }

    public Optional<Referral> getReferralById(String id) {
        return referralRepository.findById(id);
    }
}
