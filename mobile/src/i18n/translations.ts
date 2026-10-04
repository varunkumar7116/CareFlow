// Localization Translations for CareFlow Mobile Application (मराठी, हिंदी, English)

export interface MobileTranslationDict {
  appName: string;
  workerRole: string;
  syncStatusOnline: string;
  syncStatusOffline: string;
  syncStatusPending: string;
  syncStatusSynced: string;
  selectLanguageTitle: string;
  selectLanguageDesc: string;
  loginTitle: string;
  loginDesc: string;
  userIdLabel: string;
  passwordLabel: string;
  signInBtn: string;
  dashboardGreeting: string;
  todaySummaryTitle: string;
  tasksDueLabel: string;
  followUpDueLabel: string;
  careGapsLabel: string;
  quickActionsTitle: string;
  actionRegister: string;
  actionScreening: string;
  actionTasks: string;
  actionFollowUp: string;
  patientSectionTitle: string;
  patientSearchPlaceholder: string;
  currentJourneyLabel: string;
  nextActionLabel: string;
  careGapAlertTitle: string;
  careGapAlertDesc: string;
  actionEscalate: string;
  actionConfirmAppt: string;
  actionTransport: string;
  actionArrival: string;
  actionTreatment: string;
  actionMedicine: string;
  actionCloseCare: string;
  careClosedBanner: string;
}

export const translations: Record<string, MobileTranslationDict> = {
  mr: {
    appName: 'केअर फ्लो मोबाइल',
    workerRole: 'आशा / समुदाय आरोग्य कार्यकत्री',
    syncStatusOnline: 'ऑनलाइन • सिंक जोडलेले',
    syncStatusOffline: 'ऑफलाइन • स्थानिक डेटा जतन',
    syncStatusPending: 'प्रलंबित बदल सिंक होत आहेत',
    syncStatusSynced: 'सर्व बदल सर्वरवर सिंक झाले',
    selectLanguageTitle: 'भाषा निवडा',
    selectLanguageDesc: 'केअर फ्लो मोबाइल ॲप वापरण्यासाठी आपली भाषा निवडा.',
    loginTitle: 'आशा / कार्यकत्री साइन इन',
    loginDesc: 'शासकीय आरोग्य समन्वय पोर्टलमध्ये प्रवेश करा',
    userIdLabel: 'वापरकर्ता आयडी',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'साइन इन करा',
    dashboardGreeting: 'सस्नेह नमस्कार, मीरा बाई (आशा)',
    todaySummaryTitle: 'आजची कार्ये व स्थिती',
    tasksDueLabel: 'कार्य प्रलंबित',
    followUpDueLabel: 'पाठपुरावा भेट',
    careGapsLabel: 'काळजी त्रुटी / गॅप्स',
    quickActionsTitle: 'त्वरित कृती',
    actionRegister: 'रुग्ण नोंदणी',
    actionScreening: 'आरोग्य तपासणी',
    actionTasks: 'माझी कार्ये',
    actionFollowUp: 'गृह भेट पाठपुरावा',
    patientSectionTitle: 'नियुक्त रुग्ण व काळजी प्रवास',
    patientSearchPlaceholder: 'रुग्ण नाव किंवा आयडी शोधा...',
    currentJourneyLabel: 'सध्याचा काळजी टप्पा',
    nextActionLabel: 'पुढील आवश्यक कृती',
    careGapAlertTitle: '⚠ काळजी त्रुटी / गॅप आढळला (SLA उल्लंघन)',
    careGapAlertDesc: 'विशेषज्ज्ञ नियुक्ती वेळ ५ तासांपेक्षा जास्त विलंबाने प्रलंबित आहे.',
    actionEscalate: '↗ सुयोग्य रुग्णालयात पुनर्निर्देशित करा',
    actionConfirmAppt: '✓ नियुक्ती निश्चित करा',
    actionTransport: 'रुग्ण वाहतूक / रुग्णवाहिका',
    actionArrival: 'रुग्ण रुग्णालय आगमन नोंद',
    actionTreatment: 'उपचार पूर्ण नोंद करा',
    actionMedicine: 'औधध वितरण नोंद करा',
    actionCloseCare: '✅ काळजी प्रवास बंद करा',
    careClosedBanner: '✅ काळजी प्रवास यशस्वीरीत्या पूर्ण व बंद झाला',
  },
  hi: {
    appName: 'केयर फ्लो मोबाइल',
    workerRole: 'आशा / स्वास्थ्य कार्यकर्ता',
    syncStatusOnline: 'ऑनलाइन • सिंक कनेक्टेड',
    syncStatusOffline: 'ऑफलाइन • स्थानीय डेटा सुरक्षित',
    syncStatusPending: 'लंबित बदलाव सिंक हो रहे हैं',
    syncStatusSynced: 'सभी बदलाव सर्वर पर सिंक हुए',
    selectLanguageTitle: 'भाषा चुनें',
    selectLanguageDesc: 'केयर फ्लो मोबाइल ऐप का उपयोग करने के लिए अपनी भाषा चुनें।',
    loginTitle: 'आशा / कार्यकर्ता साइन इन',
    loginDesc: 'शासकीय स्वास्थ्य समन्वय पोर्टल में प्रवेश करें',
    userIdLabel: 'उपयोगकर्ता आईडी',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'साइन इन करें',
    dashboardGreeting: 'नमस्कार, मीरा बाई (आशा)',
    todaySummaryTitle: 'आज के कार्य एवं स्थिति',
    tasksDueLabel: 'कार्य लंबित',
    followUpDueLabel: 'फॉलो-अप दौरा',
    careGapsLabel: 'केयर गैप्स',
    quickActionsTitle: 'त्वरित कार्य',
    actionRegister: 'मरीज पंजीकरण',
    actionScreening: 'स्वास्थ्य जांच',
    actionTasks: 'मेरे कार्य',
    actionFollowUp: 'गृह भेट फॉलो-अप',
    patientSectionTitle: 'आवंटित मरीज एवं केयर यात्रा',
    patientSearchPlaceholder: 'मरीज नाम या आईडी खोजें...',
    currentJourneyLabel: 'वर्तमान केयर चरण',
    nextActionLabel: 'अगली आवश्यक कार्रवाई',
    careGapAlertTitle: '⚠ केयर गैप पाया गया (SLA उल्लंघन)',
    careGapAlertDesc: 'विशेषज्ञ अपॉइंटमेंट पुष्टि समय से अधिक विलंबित है।',
    actionEscalate: '↗ उपलब्ध अस्पताल में री-रूट करें',
    actionConfirmAppt: '✓ अपॉइंटमेंट पुष्ट करें',
    actionTransport: 'मरीज परिवहन / एम्बुलेंस',
    actionArrival: 'अस्पताल आगमन दर्ज करें',
    actionTreatment: 'उपचार पूर्ण दर्ज करें',
    actionMedicine: 'दवा वितरण दर्ज करें',
    actionCloseCare: '✅ केयर यात्रा पूर्ण करें',
    careClosedBanner: '✅ केयर यात्रा सफलतापूर्वक पूर्ण एवं बंद हुई',
  },
  en: {
    appName: 'CareFlow Mobile',
    workerRole: 'ASHA / CHW Field Health Worker',
    syncStatusOnline: 'Online • Connected & Synced',
    syncStatusOffline: 'Offline • Saved on Device',
    syncStatusPending: 'Pending local actions syncing...',
    syncStatusSynced: 'All actions synced to server',
    selectLanguageTitle: 'Select Language',
    selectLanguageDesc: 'Choose your preferred language for CareFlow Field Mobile app.',
    loginTitle: 'Field Worker Sign In',
    loginDesc: 'Government Healthcare Coordination Portal Access',
    userIdLabel: 'User ID / Username',
    passwordLabel: 'Password',
    signInBtn: 'Sign In',
    dashboardGreeting: 'Good Morning, Meera Bai (ASHA)',
    todaySummaryTitle: "Today's Field Action Summary",
    tasksDueLabel: 'Tasks Pending',
    followUpDueLabel: 'Follow-ups Due',
    careGapsLabel: 'Care Gaps Open',
    quickActionsTitle: 'Quick Field Actions',
    actionRegister: 'Register Patient',
    actionScreening: 'Field Screening',
    actionTasks: 'My Action Tasks',
    actionFollowUp: 'Home Visit Follow-up',
    patientSectionTitle: 'Assigned Patients & Care Journey',
    patientSearchPlaceholder: 'Search patient name or ID...',
    currentJourneyLabel: 'Current Journey Stage',
    nextActionLabel: 'Next Action Required',
    careGapAlertTitle: '⚠ CARE GAP DETECTED — SLA BREACH',
    careGapAlertDesc: 'Specialist appointment confirmation exceeded 24h SLA.',
    actionEscalate: '↗ Reroute to Available Matching Facility',
    actionConfirmAppt: '✓ Confirm Appointment B',
    actionTransport: 'Arrange Transport',
    actionArrival: 'Record Patient Arrival',
    actionTreatment: 'Complete Treatment',
    actionMedicine: 'Dispense Medicine',
    actionCloseCare: '✅ Safely Close Care Journey',
    careClosedBanner: '✅ CARE JOURNEY COMPLETED & SAFELY CLOSED',
  },
};

export const getMobileTranslation = (code: string = 'mr'): MobileTranslationDict => {
  return translations[code] || translations['mr'] || translations['en'];
};
