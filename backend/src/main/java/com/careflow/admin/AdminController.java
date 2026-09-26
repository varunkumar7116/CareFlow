package com.careflow.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
public class AdminController {

    @GetMapping("/status")
    public ResponseEntity<?> getAdminStatus() {
        return ResponseEntity.ok(Map.of("status", "ACTIVE", "roleRequired", "ADMIN"));
    }
}
