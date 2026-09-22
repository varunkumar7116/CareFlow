package com.careflow.common;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class I18nService {
    private final Map<String, Map<String, String>> translations = new HashMap<>();

    public I18nService() {
        // Seed core localization keys across supported Indian languages
        Map<String, String> en = new HashMap<>();
        en.put("caregap.unconfirmed_referral", "Referral created but appointment not confirmed.");
        en.put("caregap.missed_appointment", "Patient missed scheduled appointment.");
        en.put("caregap.overdue_followup", "Post-treatment follow-up date passed without visit.");
        en.put("task.chw_assigned", "Please conduct patient check-in for care continuity.");
        translations.put("en", en);

        Map<String, String> hi = new HashMap<>();
        hi.put("caregap.unconfirmed_referral", "रेफरल बनाया गया लेकिन अपॉइंटमेंट की पुष्टि नहीं हुई।");
        hi.put("caregap.missed_appointment", "मरीज निर्धारित अपॉइंटमेंट में शामिल नहीं हुआ।");
        hi.put("caregap.overdue_followup", "इलाज के बाद की अनुवर्ती तारीख बिना मुलाकात के बीत गई।");
        hi.put("task.chw_assigned", "कृपया देखभाल निरंतरता के लिए मरीज से संपर्क करें।");
        translations.put("hi", hi);

        Map<String, String> ta = new HashMap<>();
        ta.put("caregap.unconfirmed_referral", "பரிந்துரை உருவாக்கப்பட்டது ஆனால் சந்திப்பு உறுதி செய்யப்படவில்லை.");
        ta.put("caregap.missed_appointment", "நோயாளி திட்டமிடப்பட்ட சந்திப்பைத் தவறவிட்டார்.");
        ta.put("caregap.overdue_followup", "சிகிச்சைக்குப் பிந்தைய பின்தொடர்தல் தேதி கடந்துவிட்டது.");
        ta.put("task.chw_assigned", "சிகிச்சைத் தொடர்ச்சிக்கு நோயாளியைத் தொடர்பு கொள்ளவும்.");
        translations.put("ta", ta);
    }

    public String getMessage(String key, String lang) {
        String language = (lang != null && translations.containsKey(lang.toLowerCase())) ? lang.toLowerCase() : "en";
        Map<String, String> langMap = translations.get(language);
        return langMap.getOrDefault(key, translations.get("en").getOrDefault(key, key));
    }
}
