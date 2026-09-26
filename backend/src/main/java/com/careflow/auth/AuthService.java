package com.careflow.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public String login(String username, String rawPassword) {
        User user = validateUser(username, rawPassword);
        return tokenProvider.generateToken(user.getUsername(), user.getRole(), user.getId(), user.getFacilityId());
    }

    public Map<String, Object> loginDetails(String username, String rawPassword) {
        User user = validateUser(username, rawPassword);
        String token = tokenProvider.generateToken(user.getUsername(), user.getRole(), user.getId(), user.getFacilityId());

        Map<String, Object> map = new HashMap<>();
        map.put("token", token);
        map.put("username", user.getUsername());
        map.put("fullName", user.getFullName());
        map.put("role", user.getRole().name());
        map.put("facilityId", user.getFacilityId() != null ? user.getFacilityId() : "NIN-TN-CBE-001");
        return map;
    }

    private User validateUser(String username, String rawPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        return user;
    }

    public User registerUser(User user, String rawPassword) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists: " + user.getUsername());
        }
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        return userRepository.save(user);
    }
}
