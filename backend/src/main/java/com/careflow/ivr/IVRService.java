package com.careflow.ivr;

import com.careflow.appointment.Appointment;
import com.careflow.appointment.AppointmentRepository;
import com.careflow.common.I18nService;
import com.careflow.followup.FollowUp;
import com.careflow.followup.FollowUpRepository;
import com.careflow.patient.Patient;
import com.careflow.patient.PatientRepository;
import com.careflow.referral.Referral;
import com.careflow.referral.ReferralRepository;
import com.careflow.task.CareTask;
import com.careflow.task.CareTaskRepository;
import com.careflow.task.TaskPriority;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class IVRService implements TelephonyProvider {

    private final PatientRepository patientRepository;
    private final ReferralRepository referralRepository;
    private final AppointmentRepository appointmentRepository;
    private final FollowUpRepository followUpRepository;
    private final CareTaskRepository taskRepository;

    public IVRService(
            PatientRepository patientRepository,
            ReferralRepository referralRepository,
            AppointmentRepository appointmentRepository,
            FollowUpRepository followUpRepository,
            CareTaskRepository taskRepository
    ) {
        this.patientRepository = patientRepository;
        this.referralRepository = referralRepository;
        this.appointmentRepository = appointmentRepository;
        this.followUpRepository = followUpRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public String getProviderName() {
        return "CareFlow Native IVR Telephony Gateway (Mock/Live Ready)";
    }

    @Override
    public IVRResponse processIncomingCall(String callerPhone, String digitPressed, String currentSessionState, String language) {
        String lang = (language != null && !language.isBlank()) ? language : "en";
        String state = (currentSessionState != null && !currentSessionState.isBlank()) ? currentSessionState : "LANGUAGE_SELECT";

        // Step 1: Language selection state
        if ("LANGUAGE_SELECT".equalsIgnoreCase(state)) {
            if ("1".equals(digitPressed)) lang = "en";
            else if ("2".equals(digitPressed)) lang = "hi";
            else if ("3".equals(digitPressed)) lang = "ta";
            else if ("4".equals(digitPressed)) lang = "te";
            else if ("5".equals(digitPressed)) lang = "kn";

            if (digitPressed != null && !digitPressed.isBlank()) {
                return renderMainMenu(lang);
            }

            return new IVRResponse(
                    "Welcome to CareFlow Healthcare Coordination. Press 1 for English, 2 for Hindi (हिंदी), 3 for Tamil (தமிழ்), 4 for Telugu (తెలుగు), 5 for Kannada (கன்னಡ).",
                    "LANGUAGE_SELECT",
                    lang,
                    Arrays.asList("1: English", "2: Hindi", "3: Tamil", "4: Telugu", "5: Kannada"),
                    false
            );
        }

        // Step 2: Main Menu options
        if ("MAIN_MENU".equalsIgnoreCase(state)) {
            switch (digitPressed) {
                case "1": // Check Appointment Status
                    return handleAppointmentQuery(callerPhone, lang);
                case "2": // Check Referral Status
                    return handleReferralQuery(callerPhone, lang);
                case "3": // Check Follow-up Reminder
                    return handleFollowUpQuery(callerPhone, lang);
                case "4": // Request Assistance
                    return handleAssistanceRequest(callerPhone, lang);
                case "5": // Basic Service Information
                    return handleServiceInfo(lang);
                default:
                    return renderMainMenu(lang);
            }
        }

        return renderMainMenu(lang);
    }

    private IVRResponse renderMainMenu(String lang) {
        String message = switch (lang) {
            case "hi" -> "केयरफ्लो मेनू: अपॉइंटमेंट स्थिति के लिए 1 दबाएं, रेफरल स्थिति के लिए 2 दबाएं, फॉलो-अप रिमाइंडर के लिए 3 दबाएं, सहायता अनुरोध के लिए 4 दबाएं, सेवा जानकारी के लिए 5 दबाएं।";
            case "ta" -> "கேர்ஃபுளோ முதன்மை மெனு: சந்திப்பு நிலைக்கு 1 ஐ அழுத்தவும், பரிந்துரை நிலைக்கு 2 ஐ அழுத்தவும், பின்தொடர்தல் நினைவூட்டலுக்கு 3 ஐ அழுத்தவும், உதவி கோர 4 ஐ அழுத்தவும்.";
            default -> "CareFlow Main Menu: Press 1 for Appointment Status, Press 2 for Referral Status, Press 3 for Follow-up Reminders, Press 4 to Request Staff Assistance, Press 5 for Facility Info.";
        };

        return new IVRResponse(
                message,
                "MAIN_MENU",
                lang,
                Arrays.asList("1: Appointment", "2: Referral", "3: Follow-up", "4: Request Staff Help", "5: Facility Info"),
                false
        );
    }

    private IVRResponse handleAppointmentQuery(String phone, String lang) {
        List<Patient> patients = patientRepository.findAll().stream()
                .filter(p -> phone.equals(p.getPhoneNumber()))
                .toList();

        if (patients.isEmpty()) {
            return new IVRResponse(
                    "No patient account found registered with phone number " + phone + ". Press 4 to request staff assistance.",
                    "MAIN_MENU", lang, List.of("4: Assistance", "0: Main Menu"), false
            );
        }

        Patient patient = patients.get(0);
        List<Appointment> apps = appointmentRepository.findByPatientId(patient.getId());

        if (apps.isEmpty()) {
            return new IVRResponse(
                    "Hello " + patient.getFirstName() + ", you currently have no scheduled appointments. Press 0 to return to main menu.",
                    "MAIN_MENU", lang, List.of("0: Main Menu"), false
            );
        }

        Appointment app = apps.get(apps.size() - 1);
        String msg = "Hello " + patient.getFirstName() + ". Your appointment status is " + app.getStatus() +
                ". Scheduled Date: " + (app.getScheduledDate() != null ? app.getScheduledDate().toString() : "Pending confirmation") + ".";

        return new IVRResponse(msg, "MAIN_MENU", lang, List.of("0: Main Menu"), false);
    }

    private IVRResponse handleReferralQuery(String phone, String lang) {
        List<Patient> patients = patientRepository.findAll().stream()
                .filter(p -> phone.equals(p.getPhoneNumber()))
                .toList();

        if (patients.isEmpty()) {
            return new IVRResponse(
                    "No patient record found for phone " + phone + ". Press 4 to request help from a Community Health Worker.",
                    "MAIN_MENU", lang, List.of("4: Assistance"), false
            );
        }

        Patient patient = patients.get(0);
        List<Referral> referrals = referralRepository.findByPatientId(patient.getId());

        if (referrals.isEmpty()) {
            return new IVRResponse(
                    "Hello " + patient.getFirstName() + ", there are no active referrals on record for your care journey.",
                    "MAIN_MENU", lang, List.of("0: Main Menu"), false
            );
        }

        Referral ref = referrals.get(referrals.size() - 1);
        String msg = "Hello " + patient.getFirstName() + ". Your referral status to target facility is " + ref.getStatus() + ". Reason: " + ref.getReason();

        return new IVRResponse(msg, "MAIN_MENU", lang, List.of("0: Main Menu"), false);
    }

    private IVRResponse handleFollowUpQuery(String phone, String lang) {
        List<Patient> patients = patientRepository.findAll().stream()
                .filter(p -> phone.equals(p.getPhoneNumber()))
                .toList();

        if (patients.isEmpty()) {
            return new IVRResponse("No patient record found for phone " + phone + ".", "MAIN_MENU", lang, List.of("0: Main Menu"), false);
        }

        Patient patient = patients.get(0);
        List<FollowUp> followUps = followUpRepository.findByPatientId(patient.getId());

        if (followUps.isEmpty()) {
            return new IVRResponse("Hello " + patient.getFirstName() + ", you have no pending follow-up check-ins.", "MAIN_MENU", lang, List.of("0: Main Menu"), false);
        }

        FollowUp fu = followUps.get(followUps.size() - 1);
        String msg = "Hello " + patient.getFirstName() + ". Your " + fu.getType() + " follow-up is status " + fu.getStatus() + ". Due date: " + fu.getDueDate();
        return new IVRResponse(msg, "MAIN_MENU", lang, List.of("0: Main Menu"), false);
    }

    private IVRResponse handleAssistanceRequest(String phone, String lang) {
        List<Patient> patients = patientRepository.findAll().stream()
                .filter(p -> phone.equals(p.getPhoneNumber()))
                .toList();

        String patientId = patients.isEmpty() ? "UNKNOWN" : patients.get(0).getId();
        String patientName = patients.isEmpty() ? "Phone caller " + phone : patients.get(0).getFirstName() + " " + patients.get(0).getLastName();

        // Create CareTask for CHW
        CareTask task = new CareTask(
                null,
                patientId,
                patients.isEmpty() ? null : patients.get(0).getChwId(),
                null,
                "IVR ASSISTANCE REQUEST: " + patientName,
                "Patient called IVR system from " + phone + " requesting urgent callback / home visit.",
                TaskPriority.URGENT,
                ZonedDateTime.now().plusHours(12),
                "IVR_CALL_REQUEST"
        );
        taskRepository.save(task);

        return new IVRResponse(
                "Your request for assistance has been registered. An assigned Community Health Worker will contact you shortly. Call ending. Thank you.",
                "CALL_ENDED", lang, List.of(), true
        );
    }

    private IVRResponse handleServiceInfo(String lang) {
        String msg = "CareFlow coordinates primary healthcare centers, specialist referrals, diagnostic labs, transport services, and maternal/chronic follow-up care across your district.";
        return new IVRResponse(msg, "MAIN_MENU", lang, List.of("0: Main Menu"), false);
    }
}
