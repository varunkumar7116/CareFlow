export interface TranslationDictionary {
  // Brand & Header
  portalTitle: string;
  portalSubtitle: string;
  govTag: string;
  guestMode: string;
  ivrSimulator: string;
  signIn: string;
  signOut: string;
  changeLanguage: string;
  activeLanguage: string;

  // Language Selection Screen
  selectLanguageTitle: string;
  selectLanguageDesc: string;
  primaryLangHeader: string;
  allLangHeader: string;
  searchLangPlaceholder: string;
  selectedText: string;
  continueBtn: string;
  noLangFound: string;

  // Login Screen
  loginHeaderTitle: string;
  loginHeaderDesc: string;
  facilityUserIdLabel: string;
  passwordLabel: string;
  signInBtn: string;
  authenticatingText: string;
  demoAccessTitle: string;
  demoDisclaimer: string;
  invalidCredsError: string;
  connError: string;

  // Roles
  roleAdmin: string;
  roleDoctor: string;
  roleStaff: string;
  roleSupervisor: string;

  // Sidebar Tabs
  tabDashboard: string;
  tabFacility: string;
  tabServices: string;
  tabDoctors: string;
  tabDiagnostics: string;
  tabEquipment: string;
  tabAppointments: string;
  tabReferrals: string;
  tabCareGaps: string;
  tabCareJourney: string;
  tabAuditLog: string;
  tabAdmin: string;

  // Dashboard & Facility Views
  operationalStatus: string;
  statusOperational: string;
  activeDoctors: string;
  equipmentAvailable: string;
  openReferrals: string;
  careGapsAlert: string;
  refreshData: string;
  demoScenarioControls: string;
  runStep: string;
  patientName: string;
  uhid: string;
  currentStage: string;
  journeyStatus: string;
  facilityDetailsTitle: string;
  facilityNameLabel: string;
  facilityTypeLabel: string;
  districtLabel: string;
  stateLabel: string;
  servicesTitle: string;
  doctorsTitle: string;
  diagnosticsTitle: string;
  equipmentTitle: string;
  appointmentsTitle: string;
  referralsTitle: string;
  careGapsTitle: string;
  careJourneyTitle: string;
  auditLogTitle: string;
  adminTitle: string;

  // Common Actions
  actionView: string;
  actionEdit: string;
  actionDelete: string;
  actionClose: string;
  actionSubmit: string;
  actionSave: string;
  actionSearch: string;
  available: string;
  limited: string;
  unavailable: string;
}

export const translations: Record<string, TranslationDictionary> = {
  // MARATHI (मराठी)
  mr: {
    portalTitle: 'केअर फ्लो',
    portalSubtitle: 'आरोग्य सुविधा आणि काळजी समन्वय पोर्टल — महाराष्ट्र प्रोटोटाइप',
    govTag: 'शासकीय आरोग्य सेवा समन्वय',
    guestMode: 'अतिथी कार्य पद्धती',
    ivrSimulator: 'IVR फोन सिम्युलेटर',
    signIn: 'साइन इन करा',
    signOut: 'बाहेर पडा',
    changeLanguage: 'भाषा बदला',
    activeLanguage: 'सक्रिय भाषा',

    selectLanguageTitle: 'भाषा निवडा / Select Language',
    selectLanguageDesc: 'केअर फ्लो सुविधा पोर्टलवर साइन इन करण्यापूर्वी तुमची पसंतीची भाषा निवडा.',
    primaryLangHeader: 'प्राथमिक प्रादेशिक व कार्य भाषा',
    allLangHeader: 'सर्व २३ अनुसूचित भाषा आणि इंग्रजी',
    searchLangPlaceholder: 'भाषा शोधा (उदा. मराठी, हिंदी, தமிழ்)...',
    selectedText: 'निवडलेली भाषा',
    continueBtn: 'पुढे जा (Continue)',
    noLangFound: 'कोणतीही जुळणारी भाषा सापडली नाही',

    loginHeaderTitle: 'केअर फ्लो पोर्टल',
    loginHeaderDesc: 'आरोग्य सुविधा आणि काळजी समन्वय पोर्टल',
    facilityUserIdLabel: 'सुविधा आयडी / वापरकर्ता आयडी (Facility ID)',
    passwordLabel: 'पासवर्ड (Password)',
    signInBtn: 'पोर्टलवर साइन इन करा',
    authenticatingText: 'प्रमाणित करत आहे...',
    demoAccessTitle: 'डेमो प्रवेश (Demo Access)',
    demoDisclaimer: 'डेमो क्रेडेन्शियल्स — केवळ प्रात्यक्षिक वितरणासाठी.',
    invalidCredsError: 'अवैध वापरकर्ता आयडी किंवा पासवर्ड. कृपया तपासा आणि पुन्हा प्रयत्न करा.',
    connError: 'केअर फ्लो सेवांशी संपर्क साधू शकत नाही. कृपया पुन्हा प्रयत्न करा.',

    roleAdmin: 'सुविधा प्रशासक (Facility Admin)',
    roleDoctor: 'डॉक्टर (Doctor)',
    roleStaff: 'सुविधा कर्मचारी (Facility Staff)',
    roleSupervisor: 'जिल्हा पर्यवेक्षक (District Supervisor)',

    tabDashboard: 'डॅशबोर्ड (Dashboard)',
    tabFacility: 'सुविधा प्रोफाईल (Facility Profile)',
    tabServices: 'आरोग्य सेवा (Services)',
    tabDoctors: 'डॉक्टर व कर्मचारी (Doctors & Staff)',
    tabDiagnostics: 'निदान सेवा (Diagnostics)',
    tabEquipment: 'वैद्यकीय उपकरणे (Equipment)',
    tabAppointments: 'नियुक्त्या व वेळापत्रक (Appointments)',
    tabReferrals: 'रुग्ण रिफरल (Referrals)',
    tabCareGaps: 'काळजी कार्ये व त्रुटी (Care Gaps)',
    tabCareJourney: 'काळजी प्रवास (Care Journey)',
    tabAuditLog: 'लेखापरीक्षण लॉग (Audit Log)',
    tabAdmin: 'प्रशासन (Administration)',

    operationalStatus: 'सुविधा कार्य स्थिती',
    statusOperational: 'कार्यरत (Operational)',
    activeDoctors: 'सक्रिय डॉक्टर',
    equipmentAvailable: 'उपलब्ध उपकरणे',
    openReferrals: 'सक्रिय रिफरल्स',
    careGapsAlert: 'काळजी त्रुटी सूचना',
    refreshData: 'डेटा अपडेट करा',
    demoScenarioControls: 'डेमो सीनॅरिओ नियंत्रणे',
    runStep: 'टप्पा चालवा',
    patientName: 'रुग्णाचे नाव',
    uhid: 'युएचआयडी (UHID)',
    currentStage: 'सध्याचा टप्पा',
    journeyStatus: 'प्रवास स्थिती',
    facilityDetailsTitle: 'शासकीय आरोग्य केंद्र तपशील',
    facilityNameLabel: 'सुविधेचे नाव',
    facilityTypeLabel: 'सुविधा प्रकार',
    districtLabel: 'जिल्हा',
    stateLabel: 'राज्य',
    servicesTitle: 'आरोग्य सेवा यादी',
    doctorsTitle: 'वैद्यकीय अधिकारी व तज्ज्ञ',
    diagnosticsTitle: 'निदानात्मक चाचण्या व प्रयोगशाळा',
    equipmentTitle: 'वैद्यकीय उपकरणे व स्थिती',
    appointmentsTitle: 'अपॉइंटमेंट स्लॉट्स आणि बुकिंग',
    referralsTitle: 'सुविधा रिफरल व्यवस्थापन',
    careGapsTitle: 'स्वयंचलित काळजी त्रुटी व आशा कार्ये',
    careJourneyTitle: 'रुग्ण काळजी प्रवास (Closed-Loop)',
    auditLogTitle: 'सिस्टम लेखापरीक्षण नोंदी',
    adminTitle: 'प्रशासन आणि सुरक्षा कॉन्फिगरेशन',

    actionView: 'पहा',
    actionEdit: 'संपादित करा',
    actionDelete: 'हटवा',
    actionClose: 'बंद करा',
    actionSubmit: 'सादर करा',
    actionSave: 'जतन करा',
    actionSearch: 'शोधा',
    available: 'उपलब्ध',
    limited: 'मर्यादित',
    unavailable: 'अनुपलब्ध',
  },

  // HINDI (हिंदी)
  hi: {
    portalTitle: 'केयर फ्लो',
    portalSubtitle: 'स्वास्थ्य सुविधा और देखभाल समन्वय पोर्टल — महाराष्ट्र प्रारूप',
    govTag: 'सरकारी स्वास्थ्य सेवा समन्वय',
    guestMode: 'अतिथि संचालन मोड',
    ivrSimulator: 'IVR फोन सिम्युलेटर',
    signIn: 'साइन इन करें',
    signOut: 'साइन आउट करें',
    changeLanguage: 'भाषा बदलें',
    activeLanguage: 'सक्रिय भाषा',

    selectLanguageTitle: 'भाषा चुनें / Select Language',
    selectLanguageDesc: 'केयर फ्लो पोर्टल में साइन इन करने से पहले अपनी पसंदीदा भाषा चुनें।',
    primaryLangHeader: 'प्राथमिक क्षेत्रीय और परिचालन भाषाएं',
    allLangHeader: 'सभी 23 अनुसूचित भाषाएं और अंग्रेजी',
    searchLangPlaceholder: 'भाषा खोजें (जैसे हिंदी, मराठी, Tamil)...',
    selectedText: 'चयनित भाषा',
    continueBtn: 'आगे बढ़ें (Continue)',
    noLangFound: 'कोई मेल खाती भाषा नहीं मिली',

    loginHeaderTitle: 'केयर फ्लो पोर्टल',
    loginHeaderDesc: 'स्वास्थ्य सुविधा एवं देखभाल समन्वय पोर्टल',
    facilityUserIdLabel: 'सुविधा आईडी / उपयोगकर्ता आईडी (User ID)',
    passwordLabel: 'पासवर्ड (Password)',
    signInBtn: 'पोर्टल में साइन इन करें',
    authenticatingText: 'प्रमाणित किया जा रहा है...',
    demoAccessTitle: 'डेमो एक्सेस (Demo Access)',
    demoDisclaimer: 'डेमो क्रेडेंशियल — केवल प्रोटोटाइप प्रदर्शन के लिए।',
    invalidCredsError: 'अमान्य उपयोगकर्ता आईडी या पासवर्ड। कृपया जाँचें और पुनः प्रयास करें।',
    connError: 'केयर फ्लो सेवाओं से कनेक्ट करने में असमर्थ। कृपया पुनः प्रयास करें।',

    roleAdmin: 'सुविधा प्रशासक (Facility Admin)',
    roleDoctor: 'चिकित्सक (Doctor)',
    roleStaff: 'सुविधा कर्मी (Facility Staff)',
    roleSupervisor: 'जिला पर्यवेक्षक (District Supervisor)',

    tabDashboard: 'डैशबोर्ड (Dashboard)',
    tabFacility: 'सुविधा प्रोफ़ाइल (Facility Profile)',
    tabServices: 'स्वास्थ्य सेवाएं (Services)',
    tabDoctors: 'चिकित्सक एवं कर्मचारी (Doctors & Staff)',
    tabDiagnostics: 'निदान सेवाएं (Diagnostics)',
    tabEquipment: 'चिकित्सा उपकरण (Equipment)',
    tabAppointments: 'नियुक्तियां एवं समय सारणी (Appointments)',
    tabReferrals: 'रोगी रेफरल (Referrals)',
    tabCareGaps: 'देखभाल कार्य एवं अंतर (Care Gaps)',
    tabCareJourney: 'देखभाल यात्रा (Care Journey)',
    tabAuditLog: 'अंकेक्षण लॉग (Audit Log)',
    tabAdmin: 'प्रशासन (Administration)',

    operationalStatus: 'सुविधा संचालन स्थिति',
    statusOperational: 'परिचालन योग्य (Operational)',
    activeDoctors: 'सक्रिय डॉक्टर',
    equipmentAvailable: 'उपलब्ध उपकरण',
    openReferrals: 'सक्रिय रेफरल',
    careGapsAlert: 'देखभाल अंतर चेतावनी',
    refreshData: 'डेटा ताज़ा करें',
    demoScenarioControls: 'डेमो परिदृश्य नियंत्रण',
    runStep: 'चरण चलाएं',
    patientName: 'रोगी का नाम',
    uhid: 'यूएचआईडी (UHID)',
    currentStage: 'वर्तमान चरण',
    journeyStatus: 'यात्रा स्थिति',
    facilityDetailsTitle: 'सरकारी स्वास्थ्य केंद्र विवरण',
    facilityNameLabel: 'सुविधा का नाम',
    facilityTypeLabel: 'सुविधा प्रकार',
    districtLabel: 'जिला',
    stateLabel: 'राज्य',
    servicesTitle: 'स्वास्थ्य सेवाओं की सूची',
    doctorsTitle: 'चिकित्सा अधिकारी एवं विशेषज्ञ',
    diagnosticsTitle: 'निदान परीक्षण और प्रयोगशाला',
    equipmentTitle: 'चिकित्सा उपकरण और स्थिति',
    appointmentsTitle: 'अपॉइंटमेंट स्लॉट और बुकिंग',
    referralsTitle: 'सुविधा रेफरल प्रबंधन',
    careGapsTitle: 'स्वचालित देखभाल अंतर और आशा कार्य',
    careJourneyTitle: 'रोगी देखभाल यात्रा (Closed-Loop)',
    auditLogTitle: 'सिस्टम ऑडिट रिकॉर्ड',
    adminTitle: 'प्रशासन और सुरक्षा कॉन्फ़िगरेशन',

    actionView: 'देखें',
    actionEdit: 'संपादित करें',
    actionDelete: 'हटाएं',
    actionClose: 'बंद करें',
    actionSubmit: 'सबमिट करें',
    actionSave: 'सहेजें',
    actionSearch: 'खोजें',
    available: 'उपलब्ध',
    limited: 'सीमित',
    unavailable: 'अनुपलब्ध',
  },

  // ENGLISH (en - Fallback Default)
  en: {
    portalTitle: 'CARE FLOW',
    portalSubtitle: 'Healthcare Facility & Care Coordination Portal — Maharashtra Prototype',
    govTag: 'Government Healthcare Service Coordination',
    guestMode: 'Guest Operational Mode',
    ivrSimulator: 'IVR Phone Simulator',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    changeLanguage: 'Change Language',
    activeLanguage: 'Active Language',

    selectLanguageTitle: 'Select Language / भाषा चुनें / भाषा निवडा',
    selectLanguageDesc: 'Choose your preferred interface language before signing in to the CareFlow Facility Portal.',
    primaryLangHeader: 'Primary Regional & Operational Languages',
    allLangHeader: 'All 23 Scheduled Languages & English',
    searchLangPlaceholder: 'Search language (e.g. Gujarati, বাংলা, Tamil)...',
    selectedText: 'Selected Language',
    continueBtn: 'Continue to Portal',
    noLangFound: 'No matching language found',

    loginHeaderTitle: 'CareFlow',
    loginHeaderDesc: 'Healthcare Facility & Care Coordination Portal',
    facilityUserIdLabel: 'Facility ID / User ID',
    passwordLabel: 'Password',
    signInBtn: 'Sign In to Portal',
    authenticatingText: 'Authenticating Facility Credentials...',
    demoAccessTitle: 'Demo Access',
    demoDisclaimer: 'Demo credentials — for prototype demonstration only.',
    invalidCredsError: 'Invalid User ID or password. Please check your credentials and try again.',
    connError: 'Unable to connect to CareFlow services. Please try again.',

    roleAdmin: 'Facility Administrator',
    roleDoctor: 'Doctor',
    roleStaff: 'Facility Staff',
    roleSupervisor: 'District Supervisor',

    tabDashboard: 'Dashboard',
    tabFacility: 'Facility Profile',
    tabServices: 'Services',
    tabDoctors: 'Doctors / Staff',
    tabDiagnostics: 'Diagnostics',
    tabEquipment: 'Equipment',
    tabAppointments: 'Appointments',
    tabReferrals: 'Referrals',
    tabCareGaps: 'Care Tasks & Gaps',
    tabCareJourney: 'Care Journey',
    tabAuditLog: 'Audit Log',
    tabAdmin: 'Administration',

    operationalStatus: 'Facility Operational Status',
    statusOperational: 'OPERATIONAL',
    activeDoctors: 'Active Doctors',
    equipmentAvailable: 'Equipment Available',
    openReferrals: 'Open Referrals',
    careGapsAlert: 'Care Gaps Alert',
    refreshData: 'Refresh Data',
    demoScenarioControls: 'Demo Scenario Walkthrough Controls',
    runStep: 'Run Step',
    patientName: 'Patient Name',
    uhid: 'UHID',
    currentStage: 'Current Stage',
    journeyStatus: 'Journey Status',
    facilityDetailsTitle: 'Government Facility Operational Details',
    facilityNameLabel: 'Facility Name',
    facilityTypeLabel: 'Facility Type',
    districtLabel: 'District',
    stateLabel: 'State',
    servicesTitle: 'Active Clinical & Diagnostic Services',
    doctorsTitle: 'Healthcare Professionals Roster',
    diagnosticsTitle: 'Laboratory & Diagnostic Services',
    equipmentTitle: 'Medical Equipment Status Tracker',
    appointmentsTitle: 'Consultation Appointment Slots',
    referralsTitle: 'Inter-Facility Patient Referrals',
    careGapsTitle: 'Automated Care Gap & CHW Task Dispatch',
    careJourneyTitle: 'Closed-Loop Care Journey Tracker',
    auditLogTitle: 'System Security Audit Event Logs',
    adminTitle: 'Facility Administration & Security Role Settings',

    actionView: 'View',
    actionEdit: 'Edit',
    actionDelete: 'Delete',
    actionClose: 'Close',
    actionSubmit: 'Submit',
    actionSave: 'Save',
    actionSearch: 'Search',
    available: 'AVAILABLE',
    limited: 'LIMITED',
    unavailable: 'UNAVAILABLE',
  }
};

/**
 * Helper function to safely get translations for any language code,
 * defaulting to Marathi or English if specific key is unavailable.
 */
export function getTranslation(langCode: string): TranslationDictionary {
  if (translations[langCode]) {
    return translations[langCode];
  }
  // Fallback to Marathi or English
  return translations['mr'] || translations['en'];
}
