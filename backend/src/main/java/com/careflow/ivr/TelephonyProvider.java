package com.careflow.ivr;

public interface TelephonyProvider {
    String getProviderName();
    IVRResponse processIncomingCall(String callerPhone, String digitPressed, String currentSessionState, String language);
}
