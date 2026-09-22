package com.careflow.ivr;

import java.util.List;

public class IVRResponse {
    private String promptMessage;
    private String sessionState;
    private String selectedLanguage;
    private List<String> availableOptions;
    private boolean callEnded;

    public IVRResponse() {}

    public IVRResponse(String promptMessage, String sessionState, String selectedLanguage, List<String> availableOptions, boolean callEnded) {
        this.promptMessage = promptMessage;
        this.sessionState = sessionState;
        this.selectedLanguage = selectedLanguage;
        this.availableOptions = availableOptions;
        this.callEnded = callEnded;
    }

    public String getPromptMessage() { return promptMessage; }
    public void setPromptMessage(String promptMessage) { this.promptMessage = promptMessage; }

    public String getSessionState() { return sessionState; }
    public void setSessionState(String sessionState) { this.sessionState = sessionState; }

    public String getSelectedLanguage() { return selectedLanguage; }
    public void setSelectedLanguage(String selectedLanguage) { this.selectedLanguage = selectedLanguage; }

    public List<String> getAvailableOptions() { return availableOptions; }
    public void setAvailableOptions(List<String> availableOptions) { this.availableOptions = availableOptions; }

    public boolean isCallEnded() { return callEnded; }
    public void setCallEnded(boolean callEnded) { this.callEnded = callEnded; }
}
