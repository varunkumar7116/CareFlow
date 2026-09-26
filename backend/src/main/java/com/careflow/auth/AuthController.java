package com.careflow.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        Map<String, Object> details = authService.loginDetails(username, password);
        return ResponseEntity.ok(details);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user, @RequestParam String password) {
        User registered = authService.registerUser(user, password);
        return ResponseEntity.ok(registered);
    }
}
