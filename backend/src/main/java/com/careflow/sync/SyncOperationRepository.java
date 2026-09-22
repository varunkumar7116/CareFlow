package com.careflow.sync;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SyncOperationRepository extends JpaRepository<SyncOperation, String> {
    List<SyncOperation> findByUserId(String userId);
    List<SyncOperation> findByDeviceId(String deviceId);
    List<SyncOperation> findByStatus(SyncStatus status);
}
