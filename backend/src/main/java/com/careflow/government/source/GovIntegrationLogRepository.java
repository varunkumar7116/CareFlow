package com.careflow.government.source;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GovIntegrationLogRepository extends JpaRepository<GovIntegrationLogEntity, String> {
    List<GovIntegrationLogEntity> findByService(String service);
    List<GovIntegrationLogEntity> findByStatus(String status);
}
