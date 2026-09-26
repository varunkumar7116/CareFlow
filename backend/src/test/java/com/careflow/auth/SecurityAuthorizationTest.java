package com.careflow.auth;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class SecurityAuthorizationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Test
    @DisplayName("1. No token -> Protected endpoint rejected with 401")
    void testNoTokenProtectedEndpointRejected() throws Exception {
        mockMvc.perform(get("/api/v1/patients/PAT-P1001"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("2. Invalid token -> Rejected with 401")
    void testInvalidTokenRejected() throws Exception {
        mockMvc.perform(get("/api/v1/patients/PAT-P1001")
                .header("Authorization", "Bearer invalidTokenString123"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("3. Expired token -> Rejected with 401")
    void testExpiredTokenRejected() throws Exception {
        String expiredToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInJvbGUiOiJDSFciLCJleHAiOjE2MDA0MDI0MDB9.signature";
        mockMvc.perform(get("/api/v1/patients/PAT-P1001")
                .header("Authorization", "Bearer " + expiredToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("4. Valid CHW token -> CHW endpoint allowed")
    void testValidChwTokenAllowed() throws Exception {
        String chwToken = tokenProvider.generateToken("chw1", Role.CHW, "USER-CHW-001");
        mockMvc.perform(get("/api/v1/patients/PAT-P1001")
                .header("Authorization", "Bearer " + chwToken))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("5. CHW token -> ADMIN endpoint rejected with 403")
    void testChwTokenAdminEndpointRejected() throws Exception {
        String chwToken = tokenProvider.generateToken("chw1", Role.CHW, "USER-CHW-001");
        mockMvc.perform(get("/api/v1/admin/status")
                .header("Authorization", "Bearer " + chwToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("6. Facility staff token -> Facility endpoint allowed")
    void testFacilityStaffTokenAllowed() throws Exception {
        String facilityToken = tokenProvider.generateToken("facility1", Role.FACILITY_STAFF, "USER-FACILITY-001");
        mockMvc.perform(get("/api/v1/referrals/facility/FAC-DISTRICT-HOSPITAL")
                .header("Authorization", "Bearer " + facilityToken))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("7. Admin token -> Admin endpoint allowed")
    void testAdminTokenAllowed() throws Exception {
        String adminToken = tokenProvider.generateToken("admin1", Role.ADMIN, "USER-ADMIN-001");
        mockMvc.perform(get("/api/v1/admin/status")
                .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());
    }
}
