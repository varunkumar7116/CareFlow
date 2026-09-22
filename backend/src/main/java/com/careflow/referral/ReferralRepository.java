package com.careflow.referral;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, String> {
    List<Referral> findByPatientId(String patientId);
    List<Referral> findByTargetFacilityId(String targetFacilityId);
    List<Referral> findBySourceFacilityId(String sourceFacilityId);
    List<Referral> findByStatus(ReferralStatus status);
}
