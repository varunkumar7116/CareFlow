package com.careflow.journey;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "care_journey_stages")
public class CareJourneyStageHistory extends BaseEntity {

    @Column(nullable = false)
    private String journeyId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CareStage stage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JourneyStatus status;

    @Enumerated(EnumType.STRING)
    private TransitionAction actionTaken;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String actorId;

    public CareJourneyStageHistory() {}

    public CareJourneyStageHistory(String journeyId, CareStage stage, JourneyStatus status, TransitionAction actionTaken, String notes, String actorId) {
        this.journeyId = journeyId;
        this.stage = stage;
        this.status = status;
        this.actionTaken = actionTaken;
        this.notes = notes;
        this.actorId = actorId;
    }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public CareStage getStage() { return stage; }
    public void setStage(CareStage stage) { this.stage = stage; }

    public JourneyStatus getStatus() { return status; }
    public void setStatus(JourneyStatus status) { this.status = status; }

    public TransitionAction getActionTaken() { return actionTaken; }
    public void setActionTaken(TransitionAction actionTaken) { this.actionTaken = actionTaken; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getActorId() { return actorId; }
    public void setActorId(String actorId) { this.actorId = actorId; }
}
