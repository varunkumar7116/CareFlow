package com.careflow.patient;

import com.careflow.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String uhid;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    private String phoneNumber;

    @Column(nullable = false)
    private String preferredLanguage = "en";

    private String householdId;
    private String chwId;

    public Patient() {}

    public Patient(String uhid, String firstName, String lastName, String gender, LocalDate dateOfBirth, String phoneNumber, String preferredLanguage, String householdId, String chwId) {
        this.uhid = uhid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        if (preferredLanguage != null && !preferredLanguage.isBlank()) {
            this.preferredLanguage = preferredLanguage;
        }
        this.householdId = householdId;
        this.chwId = chwId;
    }

    public String getUhid() { return uhid; }
    public void setUhid(String uhid) { this.uhid = uhid; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public String getHouseholdId() { return householdId; }
    public void setHouseholdId(String householdId) { this.householdId = householdId; }

    public String getChwId() { return chwId; }
    public void setChwId(String chwId) { this.chwId = chwId; }
}
