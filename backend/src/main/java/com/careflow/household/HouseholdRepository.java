package com.careflow.household;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HouseholdRepository extends JpaRepository<Household, String> {
    List<Household> findByChwId(String chwId);
    List<Household> findByVillageName(String villageName);
}
