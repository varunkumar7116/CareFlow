package com.careflow.ivr;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ivr")
public class IVRController {

    private final IVRService ivrService;

    public IVRController(IVRService ivrService) {
        this.ivrService = ivrService;
    }

    @PostMapping("/call")
    public ResponseEntity<IVRResponse> handleIVRCall(
            @RequestParam String callerPhone,
            @RequestParam(required = false) String digitPressed,
            @RequestParam(required = false) String currentSessionState,
            @RequestParam(required = false) String language
    ) {
        IVRResponse response = ivrService.processIncomingCall(callerPhone, digitPressed, currentSessionState, language);
        return ResponseEntity.ok(response);
    }
}
