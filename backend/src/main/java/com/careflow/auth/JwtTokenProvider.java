package com.careflow.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret:careflowSuperSecretKeyForDevelopmentPhaseProductionReady2026!}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms:86400000}")
    private long jwtExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, Role role, String userId) {
        return generateToken(username, role, userId, null);
    }

    public String generateToken(String username, Role role, String userId, String facilityId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        var builder = Jwts.builder()
                .subject(username)
                .claim("role", role.name())
                .claim("userId", userId)
                .issuedAt(now)
                .expiration(expiryDate);

        if (facilityId != null) {
            builder.claim("facilityId", facilityId);
        }

        return builder.signWith(getSigningKey()).compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public String getRoleFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.get("role", String.class);
    }

    public String getUserIdFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.get("userId", String.class);
    }

    public String getFacilityIdFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.get("facilityId", String.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
