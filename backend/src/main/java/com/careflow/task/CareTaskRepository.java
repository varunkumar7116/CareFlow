package com.careflow.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CareTaskRepository extends JpaRepository<CareTask, String> {
    List<CareTask> findByAssignedUserId(String assignedUserId);
    List<CareTask> findByAssignedFacilityId(String assignedFacilityId);
    List<CareTask> findByPatientId(String patientId);
    List<CareTask> findByStatus(TaskStatus status);
}
