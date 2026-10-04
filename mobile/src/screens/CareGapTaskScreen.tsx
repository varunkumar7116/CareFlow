import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { Patient, CareJourney } from '../types/careflow';

interface CareGapTaskProps {
  selectedLang: string;
  patient: Patient;
  journey: CareJourney;
  demoStep: number;
  onRunDemoStep: (stepNum: number) => void;
  onBack: () => void;
  onOpenFacilityMatcher: () => void;
}

export const CareGapTaskScreen: React.FC<CareGapTaskProps> = ({
  selectedLang,
  patient,
  journey,
  demoStep,
  onRunDemoStep,
  onBack,
  onOpenFacilityMatcher,
}) => {
  const t = getMobileTranslation(selectedLang);

  const hasCareGap = demoStep === 6 || demoStep === 7 || demoStep === 8;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← परत (Back)</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.actionTasks}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Patient Meta */}
        <View style={styles.patientMeta}>
          <Text style={styles.patientName}>{patient.firstName} {patient.lastName} (UHID: {patient.uhid})</Text>
          <Text style={styles.patientSub}>नियुक्त आशा: मीरा बाई • {patient.village}</Text>
        </View>

        {hasCareGap ? (
          <View style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertTitle}>⚠ CARE GAP DETECTED — SLA BREACH</Text>
              <Text style={styles.highBadge}>HIGH PRIORITY</Text>
            </View>

            <Text style={styles.alertText}>
              <Text style={styles.bold}>कारण (Issue):</Text> जिल्हा रुग्णालय A कडून रिफरल स्वीकारले गेले आहे, परंतु तज्ज्ञ नियुक्ती वेळ (Appointment) २४ तासांच्या SLA पेक्षा विलंबाने प्रलंबित राहिली आहे.
            </Text>

            <View style={styles.taskDetailBox}>
              <Text style={styles.taskTitle}>नियुक्त कार्य (Assigned Task TSK-CFJ-1001):</Text>
              <Text style={styles.taskDesc}>"मीना देवी यांच्या विलंबित तज्ज्ञ नियुक्तीचा पाठपुरावा करा."</Text>
              <Text style={styles.taskAssigned}>असाइन केलेले: CHW मीरा बाई (ASHA)</Text>
            </View>

            {/* Operational Action Buttons */}
            <Text style={styles.actionSectionTitle}>फील्ड कार्यकत्री कृती (Field Actions):</Text>
            <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => alert('रुग्ण संपर्क फोन: +919876543210')}>
              <Text style={styles.actionBtnSecondaryText}>📞 रुग्णांशी थेट संपर्क साधा (Contact Patient)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => alert('जिल्हा रुग्णालय A संपर्क साधला')}>
              <Text style={styles.actionBtnSecondaryText}>🏥 मूळ रुग्णालयाशी संपर्क साधा (Contact Facility A)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnPrimary} onPress={onOpenFacilityMatcher}>
              <Text style={styles.actionBtnPrimaryText}>↗ सुयोग्य रुग्णालयात पुनर्निर्देशित करा (Escalate & Match) →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>कोणतीही काळजी त्रुटी (Care Gap) प्रलंबित नाही</Text>
            <Text style={styles.emptyDesc}>सर्व नियुक्त रुग्णांचे काळजी प्रवास नियमितपणे प्रगतीपथावर आहेत.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backBtn: {
    marginRight: 12,
  },
  backText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    padding: 16,
  },
  patientMeta: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  patientName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  patientSub: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    color: '#fca5a5',
    fontSize: 13,
    fontWeight: '800',
    flex: 1,
  },
  highBadge: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 9,
    fontWeight: '800',
  },
  alertText: {
    color: '#fee2e2',
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },
  taskDetailBox: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 12,
    borderRadius: 6,
    marginBottom: 14,
  },
  taskTitle: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  taskDesc: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskAssigned: {
    color: '#94a3b8',
    fontSize: 11,
  },
  actionSectionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  actionBtnSecondary: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  actionBtnSecondaryText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '700',
  },
  actionBtnPrimary: {
    backgroundColor: '#b45309',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  actionBtnPrimaryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  emptyIcon: {
    color: '#22c55e',
    fontSize: 32,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  emptyDesc: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
});
