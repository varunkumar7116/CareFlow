package com.careflow.sync;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sync")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'ADMIN', 'SYSTEM_ADMIN')")
public class SyncController {

    private final SyncService syncService;

    public SyncController(SyncService syncService) {
        this.syncService = syncService;
    }

    @PostMapping("/batch")
    public ResponseEntity<List<SyncOperation>> syncBatch(@RequestBody List<SyncOperation> batch) {
        return ResponseEntity.ok(syncService.processSyncBatch(batch));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SyncOperation>> getOperationsForUser(@PathVariable String userId) {
        return ResponseEntity.ok(syncService.getOperationsForUser(userId));
    }
}
