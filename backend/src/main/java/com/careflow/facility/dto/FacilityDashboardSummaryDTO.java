package com.careflow.facility.dto;

import com.careflow.caregap.CareGap;
import com.careflow.followup.FollowUp;
import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.referral.Referral;
import com.careflow.task.CareTask;

import java.time.ZonedDateTime;
import java.util.List;

public class FacilityDashboardSummaryDTO {

    private GovFacilityDTO facilityReference;
    private String operatingStatus;
    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;
    private boolean isStale;

    private long totalDoctors;
    private long availableDoctors;
    private long totalDiagnostics;
    private long availableDiagnostics;
    private long totalEquipment;
    private long availableEquipment;
    private long totalSlotsAvailable;

    private List<Referral> pendingReferrals;
    private List<FollowUp> overdueFollowUps;
    private List<CareGap> openCareGaps;
    private List<CareTask> pendingCareTasks;

    public FacilityDashboardSummaryDTO() {}

    public FacilityDashboardSummaryDTO(GovFacilityDTO facilityReference, String operatingStatus, ZonedDateTime lastVerifiedAt, String lastVerifiedBy, boolean isStale, long totalDoctors, long availableDoctors, long totalDiagnostics, long availableDiagnostics, long totalEquipment, long availableEquipment, long totalSlotsAvailable, List<Referral> pendingReferrals, List<FollowUp> overdueFollowUps, List<CareGap> openCareGaps, List<CareTask> pendingCareTasks) {
        this.facilityReference = facilityReference;
        this.operatingStatus = operatingStatus;
        this.lastVerifiedAt = lastVerifiedAt;
        this.lastVerifiedBy = lastVerifiedBy;
        this.isStale = isStale;
        this.totalDoctors = totalDoctors;
        this.availableDoctors = availableDoctors;
        this.totalDiagnostics = totalDiagnostics;
        this.availableDiagnostics = availableDiagnostics;
        this.totalEquipment = totalEquipment;
        this.availableEquipment = availableEquipment;
        this.totalSlotsAvailable = totalSlotsAvailable;
        this.pendingReferrals = pendingReferrals;
        this.overdueFollowUps = overdueFollowUps;
        this.openCareGaps = openCareGaps;
        this.pendingCareTasks = pendingCareTasks;
    }

    public GovFacilityDTO getFacilityReference() { return facilityReference; }
    public void setFacilityReference(GovFacilityDTO facilityReference) { this.facilityReference = facilityReference; }

    public String getOperatingStatus() { return operatingStatus; }
    public void setOperatingStatus(String operatingStatus) { this.operatingStatus = operatingStatus; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public boolean isStale() { return isStale; }
    public void setStale(boolean stale) { isStale = stale; }

    public long getTotalDoctors() { return totalDoctors; }
    public void setTotalDoctors(long totalDoctors) { this.totalDoctors = totalDoctors; }

    public long getAvailableDoctors() { return availableDoctors; }
    public void setAvailableDoctors(long availableDoctors) { this.availableDoctors = availableDoctors; }

    public long getTotalDiagnostics() { return totalDiagnostics; }
    public void setTotalDiagnostics(long totalDiagnostics) { this.totalDiagnostics = totalDiagnostics; }

    public long getAvailableDiagnostics() { return availableDiagnostics; }
    public void setAvailableDiagnostics(long availableDiagnostics) { this.availableDiagnostics = availableDiagnostics; }

    public long getTotalEquipment() { return totalEquipment; }
    public void setTotalEquipment(long totalEquipment) { this.totalEquipment = totalEquipment; }

    public long getAvailableEquipment() { return availableEquipment; }
    public void setAvailableEquipment(long availableEquipment) { this.availableEquipment = availableEquipment; }

    public long getTotalSlotsAvailable() { return totalSlotsAvailable; }
    public void setTotalSlotsAvailable(long totalSlotsAvailable) { this.totalSlotsAvailable = totalSlotsAvailable; }

    public List<Referral> getPendingReferrals() { return pendingReferrals; }
    public void setPendingReferrals(List<Referral> pendingReferrals) { this.pendingReferrals = pendingReferrals; }

    public List<FollowUp> getOverdueFollowUps() { return overdueFollowUps; }
    public void setOverdueFollowUps(List<FollowUp> overdueFollowUps) { this.overdueFollowUps = overdueFollowUps; }

    public List<CareGap> getOpenCareGaps() { return openCareGaps; }
    public void setOpenCareGaps(List<CareGap> openCareGaps) { this.openCareGaps = openCareGaps; }

    public List<CareTask> getPendingCareTasks() { return pendingCareTasks; }
    public void setPendingCareTasks(List<CareTask> pendingCareTasks) { this.pendingCareTasks = pendingCareTasks; }
}
