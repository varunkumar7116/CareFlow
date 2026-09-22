package com.careflow.household;

import com.careflow.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "households")
public class Household extends BaseEntity {

    @Column(nullable = false)
    private String villageName;

    private String headOfFamily;
    private String contactNumber;
    private String chwId;

    public Household() {}

    public Household(String villageName, String headOfFamily, String contactNumber, String chwId) {
        this.villageName = villageName;
        this.headOfFamily = headOfFamily;
        this.contactNumber = contactNumber;
        this.chwId = chwId;
    }

    public String getVillageName() { return villageName; }
    public void setVillageName(String villageName) { this.villageName = villageName; }

    public String getHeadOfFamily() { return headOfFamily; }
    public void setHeadOfFamily(String headOfFamily) { this.headOfFamily = headOfFamily; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getChwId() { return chwId; }
    public void setChwId(String chwId) { this.chwId = chwId; }
}
