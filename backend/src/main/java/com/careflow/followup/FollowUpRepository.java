package com.careflow.followup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, String> {
    List<FollowUp> findByPatientId(String patientId);
    List<FollowUp> findByAssignedChwId(String assignedChwId);
    List<FollowUp> findByStatus(FollowUpStatus status);
}
