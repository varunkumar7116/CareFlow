package com.careflow.interoperability;

public class IntegrationResult {
    private boolean success;
    private String externalReference;
    private String statusMessage;

    public IntegrationResult() {}

    public IntegrationResult(boolean success, String externalReference, String statusMessage) {
        this.success = success;
        this.externalReference = externalReference;
        this.statusMessage = statusMessage;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getExternalReference() { return externalReference; }
    public void setExternalReference(String externalReference) { this.externalReference = externalReference; }

    public String getStatusMessage() { return statusMessage; }
    public void setStatusMessage(String statusMessage) { this.statusMessage = statusMessage; }
}
