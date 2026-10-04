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

  // Sidebar Tabs (Strictly pure native script with NO trailing English)
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

  // Breadcrumbs & Banner
  breadcrumbPortal: string;
  breadcrumbDashboard: string;
  infoSourceLabel: string;
  govRegistryName: string;
  govVerifiedBadge: string;
  verifiedByText: string;

  // Dashboard KPI Cards
  operationalStatus: string;
  statusOperational: string;
  bedsAvailableLabel: string;
  activeDoctors: string;
  activeSuffix: string;
  docRegistrySub: string;
  diagnosticsTitle: string;
  diagAvailableSuffix: string;
  diagSub: string;
  equipmentAvailable: string;
  eqOperationalSuffix: string;
  eqSub: string;
  appointmentSlotsTitle: string;
  appointmentSlotsSub: string;

  // Dashboard Section Cards
  pendingReferralsTitle: string;
  noPendingReferralsMsg: string;
  safetyNetGapsTitle: string;
  noActiveGapsMsg: string;

  // Demo Controls
  demoScenarioControls: string;
  runStep: string;
  patientName: string;
  uhid: string;
  currentStage: string;
  journeyStatus: string;

  // Facility Views & Tab Titles
  facilityDetailsTitle: string;
  facilityNameLabel: string;
  facilityTypeLabel: string;
  districtLabel: string;
  stateLabel: string;
  servicesTitle: string;
  doctorsTitle: string;
  equipmentTitle: string;
  appointmentsTitle: string;
  referralsTitle: string;
  careGapsTitle: string;
  careJourneyTitle: string;
  auditLogTitle: string;
  adminTitle: string;

  // Table Headers
  colName: string;
  colCategory: string;
  colSpecialization: string;
  colSchedule: string;
  colStatus: string;
  colActions: string;
  colQuantity: string;
  colHours: string;
  colTurnaround: string;
  colDate: string;
  colTime: string;

  // Buttons & Badges
  actionView: string;
  actionEdit: string;
  actionDelete: string;
  actionClose: string;
  actionSubmit: string;
  actionSave: string;
  actionSearch: string;
  actionAddDoctor: string;
  actionAddEquipment: string;
  actionAddService: string;
  actionAddDiagnostic: string;
  actionAddSlot: string;
  available: string;
  limited: string;
  unavailable: string;
  active: string;
  completed: string;
}

export const translations: Record<string, TranslationDictionary> = {
  // MARATHI (मराठी) — Pure Marathi with NO English parenthetical text
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

    selectLanguageTitle: 'भाषा निवडा',
    selectLanguageDesc: 'केअर फ्लो सुविधा पोर्टलवर साइन इन करण्यापूर्वी तुमची पसंतीची भाषा निवडा.',
    primaryLangHeader: 'प्राथमिक प्रादेशिक व कार्य भाषा',
    allLangHeader: 'सर्व २३ अनुसूचित भाषा आणि इंग्रजी',
    searchLangPlaceholder: 'भाषा शोधा (उदा. मराठी, हिंदी, தமிழ்)...',
    selectedText: 'निवडलेली भाषा',
    continueBtn: 'पुढे जा',
    noLangFound: 'कोणतीही जुळणारी भाषा सापडली नाही',

    loginHeaderTitle: 'केअर फ्लो',
    loginHeaderDesc: 'आरोग्य सुविधा आणि काळजी समन्वय पोर्टल',
    facilityUserIdLabel: 'सुविधा आयडी / वापरकर्ता आयडी',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'साइन इन करा',
    authenticatingText: 'प्रमाणित करत आहे...',
    demoAccessTitle: 'डेमो प्रवेश',
    demoDisclaimer: 'डेमो क्रेडेन्शियल्स — केवळ प्रात्यक्षिक वितरणासाठी.',
    invalidCredsError: 'अवैध वापरकर्ता आयडी किंवा पासवर्ड. कृपया तपासा आणि पुन्हा प्रयत्न करा.',
    connError: 'केअर फ्लो सेवांशी संपर्क साधू शकत नाही. कृपया पुन्हा प्रयत्न करा.',

    roleAdmin: 'सुविधा प्रशासक',
    roleDoctor: 'डॉक्टर',
    roleStaff: 'सुविधा कर्मचारी',
    roleSupervisor: 'जिल्हा पर्यवेक्षक',

    tabDashboard: 'डॅशबोर्ड',
    tabFacility: 'सुविधा प्रोफाईल',
    tabServices: 'आरोग्य सेवा',
    tabDoctors: 'डॉक्टर व कर्मचारी',
    tabDiagnostics: 'निदान सेवा',
    tabEquipment: 'वैद्यकीय उपकरणे',
    tabAppointments: 'नियुक्त्या व वेळापत्रक',
    tabReferrals: 'रुग्ण रिफरल',
    tabCareGaps: 'काळजी कार्ये व त्रुटी',
    tabCareJourney: 'काळजी प्रवास',
    tabAuditLog: 'लेखापरीक्षण लॉग',
    tabAdmin: 'प्रशासन',

    breadcrumbPortal: 'पोर्टल',
    breadcrumbDashboard: 'ऑपरेशनल डॅशबोर्ड',
    infoSourceLabel: 'माहिती स्रोत: राष्ट्रीय रुग्णालय डिरेक्टरी (MoHFW) + केअर फ्लो नोंदणी',
    govRegistryName: 'शासकीय नोंदणी व सुविधा व्यवस्थापन',
    govVerifiedBadge: 'शासकीय सुसंगतता स्तर सत्यापित',
    verifiedByText: 'सुविधा कार्य स्थिती डॉ. राजेश कुमार यांनी सत्यापित केली',

    operationalStatus: 'सुविधा कार्य स्थिती',
    statusOperational: 'कार्यरत',
    bedsAvailableLabel: 'उपलब्ध खाटा',
    activeDoctors: 'सक्रिय डॉक्टर',
    activeSuffix: 'सक्रिय',
    docRegistrySub: 'सुविधा व्यवस्थापित ऑपरेशनल नोंदणी',
    diagnosticsTitle: 'निदानात्मक चाचण्या व प्रयोगशाळा',
    diagAvailableSuffix: 'उपलब्ध',
    diagSub: 'पॅथॉलॉजी आणि रेडिओलॉजी सक्रिय',
    equipmentAvailable: 'उपलब्ध उपकरणे',
    eqOperationalSuffix: 'कार्यक्षम',
    eqSub: 'वैद्यकीय उपकरणे यादी',
    appointmentSlotsTitle: 'अपॉइंटमेंट स्लॉट्स',
    appointmentSlotsSub: 'केअर फ्लो व्यवहार स्लॉट्स',

    pendingReferralsTitle: 'लंबित रिफरल कृती',
    noPendingReferralsMsg: 'कोणतेही प्रलंबित आंतर-सुविधा रिफरल्स नाहीत.',
    safetyNetGapsTitle: 'सक्रिय सुरक्षा जाळे त्रुटी व कार्ये',
    noActiveGapsMsg: 'कोणत्याही सक्रिय काळजी त्रुटी किंवा SLA उल्लंघन आढळले नाही.',

    demoScenarioControls: 'डेमो सीनॅरिओ नियंत्रणे',
    runStep: 'टप्पा चालवा',
    patientName: 'रुग्णाचे नाव',
    uhid: 'युएचआयडी',
    currentStage: 'सध्याचा टप्पा',
    journeyStatus: 'प्रवास स्थिती',

    facilityDetailsTitle: 'शासकीय आरोग्य केंद्र तपशील',
    facilityNameLabel: 'सुविधेचे नाव',
    facilityTypeLabel: 'सुविधा प्रकार',
    districtLabel: 'जिल्हा',
    stateLabel: 'राज्य',
    servicesTitle: 'सक्रिय क्लिनिकल व निदान सेवा',
    doctorsTitle: 'वैद्यकीय अधिकारी व तज्ज्ञ यादी',
    equipmentTitle: 'वैद्यकीय उपकरणे व स्थिती ट्रॅकर',
    appointmentsTitle: 'सल्लामसलत अपॉइंटमेंट स्लॉट्स',
    referralsTitle: 'आंतर-सुविधा रुग्ण रिफरल्स',
    careGapsTitle: 'स्वयंचलित काळजी त्रुटी व आशा कार्ये',
    careJourneyTitle: 'रुग्ण काळजी प्रवास (Closed-Loop)',
    auditLogTitle: 'सिस्टम सुरक्षा लेखापरीक्षण नोंदी',
    adminTitle: 'सुविधा प्रशासन आणि सुरक्षा भूमिका सेटिंग्ज',

    colName: 'नाव',
    colCategory: 'वर्ग',
    colSpecialization: 'विशेषज्ञता',
    colSchedule: 'वेळापत्रक',
    colStatus: 'स्थिती',
    colActions: 'कृती',
    colQuantity: 'प्रमाण',
    colHours: 'कामकाजाची वेळ',
    colTurnaround: 'अहवाल वेळ',
    colDate: 'दिनांक',
    colTime: 'वेळ',

    actionView: 'पहा',
    actionEdit: 'संपादित करा',
    actionDelete: 'हटवा',
    actionClose: 'बंद करा',
    actionSubmit: 'सादर करा',
    actionSave: 'जतन करा',
    actionSearch: 'शोधा',
    actionAddDoctor: 'नवीन डॉक्टर जोडा',
    actionAddEquipment: 'नवीन उपकरण जोडा',
    actionAddService: 'नवीन सेवा जोडा',
    actionAddDiagnostic: 'नवीन चाचणी जोडा',
    actionAddSlot: 'नवीन स्लॉट जोडा',
    available: 'उपलब्ध',
    limited: 'मर्यादित',
    unavailable: 'अनुपलब्ध',
    active: 'सक्रिय',
    completed: 'पूर्ण',
  },

  // HINDI (हिंदी) — Pure Hindi with NO English parenthetical text
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

    selectLanguageTitle: 'भाषा चुनें',
    selectLanguageDesc: 'केयर फ्लो पोर्टल में साइन इन करने से पहले अपनी पसंदीदा भाषा चुनें।',
    primaryLangHeader: 'प्राथमिक क्षेत्रीय और परिचालन भाषाएं',
    allLangHeader: 'सभी 23 अनुसूचित भाषाएं और अंग्रेजी',
    searchLangPlaceholder: 'भाषा खोजें (जैसे हिंदी, मराठी, Tamil)...',
    selectedText: 'चयनित भाषा',
    continueBtn: 'आगे बढ़ें',
    noLangFound: 'कोई मेल खाती भाषा नहीं मिली',

    loginHeaderTitle: 'केयर फ्लो',
    loginHeaderDesc: 'स्वास्थ्य सुविधा एवं देखभाल समन्वय पोर्टल',
    facilityUserIdLabel: 'सुविधा आईडी / उपयोगकर्ता आईडी',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'साइन इन करें',
    authenticatingText: 'प्रमाणित किया जा रहा है...',
    demoAccessTitle: 'डेमो एक्सेस',
    demoDisclaimer: 'डेमो क्रेडेंशियल — केवल प्रोटोटाइप प्रदर्शन के लिए।',
    invalidCredsError: 'अमान्य उपयोगकर्ता आईडी या पासवर्ड। कृपया जाँचें और पुनः प्रयास करें।',
    connError: 'केयर फ्लो सेवाओं से कनेक्ट करने में असमर्थ। कृपया पुनः प्रयास करें।',

    roleAdmin: 'सुविधा प्रशासक',
    roleDoctor: 'चिकित्सक',
    roleStaff: 'सुविधा कर्मी',
    roleSupervisor: 'जिला पर्यवेक्षक',

    tabDashboard: 'डैशबोर्ड',
    tabFacility: 'सुविधा प्रोफ़ाइल',
    tabServices: 'स्वास्थ्य सेवाएं',
    tabDoctors: 'चिकित्सक एवं कर्मचारी',
    tabDiagnostics: 'निदान सेवाएं',
    tabEquipment: 'चिकित्सा उपकरण',
    tabAppointments: 'नियुक्तियां एवं समय सारणी',
    tabReferrals: 'रोगी रेफरल',
    tabCareGaps: 'देखभाल कार्य एवं अंतर',
    tabCareJourney: 'देखभाल यात्रा',
    tabAuditLog: 'अंकेक्षण लॉग',
    tabAdmin: 'प्रशासन',

    breadcrumbPortal: 'पोर्टल',
    breadcrumbDashboard: 'परिचालन डैशबोर्ड',
    infoSourceLabel: 'सूचना स्रोत: राष्ट्रीय अस्पताल निर्देशिका (MoHFW) + केयर फ्लो रजिस्ट्री',
    govRegistryName: 'सरकारी रजिस्ट्री एवं सुविधा प्रबंधन',
    govVerifiedBadge: 'सरकारी संगतता स्तर सत्यापित',
    verifiedByText: 'सुविधा संचालन स्थिति डॉ. राजेश कुमार द्वारा सत्यापित',

    operationalStatus: 'सुविधा संचालन स्थिति',
    statusOperational: 'परिचालन योग्य',
    bedsAvailableLabel: 'उपलब्ध बिस्तर',
    activeDoctors: 'सक्रिय डॉक्टर',
    activeSuffix: 'सक्रिय',
    docRegistrySub: 'सुविधा-प्रबंधित परिचालन रजिस्ट्री',
    diagnosticsTitle: 'निदान परीक्षण और प्रयोगशाला',
    diagAvailableSuffix: 'उपलब्ध',
    diagSub: 'पैथोलॉजी एवं रेडियोलॉजी सक्रिय',
    equipmentAvailable: 'उपलब्ध उपकरण',
    eqOperationalSuffix: 'परिचालन योग्य',
    eqSub: 'चिकित्सा उपकरण सूची',
    appointmentSlotsTitle: 'अपॉइंटमेंट स्लॉट',
    appointmentSlotsSub: 'केयर फ्लो ट्रांजैक्शन स्लॉट',

    pendingReferralsTitle: 'लंबित रेफरल कार्रवाई',
    noPendingReferralsMsg: 'कोई लंबित अंतर-सुविधा रेफरल नहीं है।',
    safetyNetGapsTitle: 'सक्रिय सुरक्षा जाल अंतर एवं कार्य',
    noActiveGapsMsg: 'कोई सक्रिय देखभाल अंतर या SLA उल्लंघन नहीं मिला।',

    demoScenarioControls: 'डेमो परिदृश्य नियंत्रण',
    runStep: 'चरण चलाएं',
    patientName: 'रोगी का नाम',
    uhid: 'यूएचआईडी',
    currentStage: 'वर्तमान चरण',
    journeyStatus: 'यात्रा स्थिति',

    facilityDetailsTitle: 'सरकारी स्वास्थ्य केंद्र विवरण',
    facilityNameLabel: 'सुविधा का नाम',
    facilityTypeLabel: 'सुविधा प्रकार',
    districtLabel: 'जिला',
    stateLabel: 'राज्य',
    servicesTitle: 'सक्रिय नैदानिक एवं प्रयोगशाला सेवाएं',
    doctorsTitle: 'चिकित्सा अधिकारी एवं विशेषज्ञ सूची',
    equipmentTitle: 'चिकित्सा उपकरण स्थिति ट्रैकर',
    appointmentsTitle: 'परामर्श अपॉइंटमेंट स्लॉट',
    referralsTitle: 'अंतर-सुविधा रोगी रेफरल',
    careGapsTitle: 'स्वचालित देखभाल अंतर एवं आशा कार्य',
    careJourneyTitle: 'रोगी देखभाल यात्रा (Closed-Loop)',
    auditLogTitle: 'सिस्टम सुरक्षा ऑडिट रिकॉर्ड',
    adminTitle: 'सुविधा प्रशासन एवं सुरक्षा भूमिका सेटिंग्स',

    colName: 'नाम',
    colCategory: 'श्रेणी',
    colSpecialization: 'विशेषज्ञता',
    colSchedule: 'समय सारणी',
    colStatus: 'स्थिति',
    colActions: 'कार्रवाई',
    colQuantity: 'मात्रा',
    colHours: 'संचालन का समय',
    colTurnaround: 'रिपोर्ट समय',
    colDate: 'दिनांक',
    colTime: 'समय',

    actionView: 'देखें',
    actionEdit: 'संपादित करें',
    actionDelete: 'हटाएं',
    actionClose: 'बंद करें',
    actionSubmit: 'सबमिट करें',
    actionSave: 'सहेजें',
    actionSearch: 'खोजें',
    actionAddDoctor: 'नया डॉक्टर जोड़ें',
    actionAddEquipment: 'नया उपकरण जोड़ें',
    actionAddService: 'नई सेवा जोड़ें',
    actionAddDiagnostic: 'नया परीक्षण जोड़ें',
    actionAddSlot: 'नया स्लॉट जोड़ें',
    available: 'उपलब्ध',
    limited: 'सीमित',
    unavailable: 'अनुपलब्ध',
    active: 'सक्रिय',
    completed: 'पूर्ण',
  },

  // ENGLISH (en)
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

    selectLanguageTitle: 'Select Language',
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

    breadcrumbPortal: 'Portal',
    breadcrumbDashboard: 'Operational Dashboard',
    infoSourceLabel: 'Information Source: National Hospital Directory (MoHFW) + CareFlow Registry',
    govRegistryName: 'Government Registry & Facility Management',
    govVerifiedBadge: 'Government Compatibility Layer Verified',
    verifiedByText: 'Facility Operational State verified by Dr. Rajesh Kumar',

    operationalStatus: 'Facility Operational Status',
    statusOperational: 'OPERATIONAL',
    bedsAvailableLabel: 'Beds Available',
    activeDoctors: 'Active Doctors',
    activeSuffix: 'Active',
    docRegistrySub: 'Facility-Managed Operational Registry',
    diagnosticsTitle: 'Diagnostics & Laboratory Services',
    diagAvailableSuffix: 'Available',
    diagSub: 'Pathology & Radiology Active',
    equipmentAvailable: 'Equipment & Resources',
    eqOperationalSuffix: 'Operational',
    eqSub: 'Medical Equipment Inventory',
    appointmentSlotsTitle: 'Appointment Slots',
    appointmentSlotsSub: 'CareFlow Transaction Slots',

    pendingReferralsTitle: 'Pending Referral Actions',
    noPendingReferralsMsg: 'No pending inter-facility referrals requiring action.',
    safetyNetGapsTitle: 'Active Safety Net Gaps & Tasks',
    noActiveGapsMsg: 'No active care gaps or SLA breaches detected.',

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
    equipmentTitle: 'Medical Equipment Status Tracker',
    appointmentsTitle: 'Consultation Appointment Slots',
    referralsTitle: 'Inter-Facility Patient Referrals',
    careGapsTitle: 'Automated Care Gap & CHW Task Dispatch',
    careJourneyTitle: 'Closed-Loop Care Journey Tracker',
    auditLogTitle: 'System Security Audit Event Logs',
    adminTitle: 'Facility Administration & Security Role Settings',

    colName: 'Name',
    colCategory: 'Category',
    colSpecialization: 'Specialization',
    colSchedule: 'Schedule',
    colStatus: 'Status',
    colActions: 'Actions',
    colQuantity: 'Quantity',
    colHours: 'Operating Hours',
    colTurnaround: 'Turnaround Time',
    colDate: 'Date',
    colTime: 'Time',

    actionView: 'View',
    actionEdit: 'Edit',
    actionDelete: 'Delete',
    actionClose: 'Close',
    actionSubmit: 'Submit',
    actionSave: 'Save',
    actionSearch: 'Search',
    actionAddDoctor: 'Add Doctor',
    actionAddEquipment: 'Add Equipment',
    actionAddService: 'Add Service',
    actionAddDiagnostic: 'Add Diagnostic',
    actionAddSlot: 'Add Slot',
    available: 'AVAILABLE',
    limited: 'LIMITED',
    unavailable: 'UNAVAILABLE',
    active: 'ACTIVE',
    completed: 'COMPLETED',
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
  // Default to Marathi if mr exists, otherwise English
  return translations['mr'] || translations['en'];
}
