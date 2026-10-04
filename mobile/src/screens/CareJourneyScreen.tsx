import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { Patient, CareJourney } from '../types/careflow';

interface CareJourneyScreenProps {
  selectedLang: string;
  patient: Patient;
  journey: CareJourney;
  demoStep: number;
  onRunDemoStep: (stepNum: number) => void;
  onBack: () => void;
  onOpenCareGap: () => void;
}

export const CareJourneyScreen: React.FC<CareJourneyScreenProps> = ({
  selectedLang,
  patient,
  journey,
  demoStep,
  onRunDemoStep,
  onBack,
  onOpenCareGap,
}) => {
  const t = getMobileTranslation(selectedLang);

  const STAGE_CONFIG: { stage: string; label: string; humanTerm: string }[] = [
    { stage: 'REGISTRATION', label: '1. Registration', humanTerm: 'Patient Enters' },
    { stage: 'SCREENING', label: '2. Screening', humanTerm: 'Field Screening' },
    { stage: 'TRIAGE', label: '3. Triage', humanTerm: 'Clinical Triage' },
    { stage: 'CONSULTATION', label: '4. Consultation', humanTerm: 'Primary Consult' },
    { stage: 'DIAGNOSTICS', label: '5. Diagnostics', humanTerm: 'Lab & Scan' },
    { stage: 'REFERRAL', label: '6. Referral', humanTerm: 'Inter-Facility Referral' },
    { stage: 'APPOINTMENT', label: '7. Appointment', humanTerm: 'Specialist Slot' },
    { stage: 'TRANSPORT', label: '8. Transport', humanTerm: 'Ambulance / Escort' },
    { stage: 'HOSPITAL', label: '9. Arrival', humanTerm: 'Hospital Arrival' },
    { stage: 'TREATMENT', label: '10. Treatment', humanTerm: 'Specialist Care' },
    { stage: 'MEDICINE', label: '11. Medicine', humanTerm: 'Pharmacy Dispensed' },
    { stage: 'FOLLOW_UP', label: '12. Follow-Up', humanTerm: 'CHW Home Visit' },
    { stage: 'COMPLETED', label: '13. Care Closed', humanTerm: 'Journey Closed' },
  ];

  const currentStageName = journey.currentStage;
  const currentStageIndex = STAGE_CONFIG.findIndex((s) => s.stage === currentStageName);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← परत (Back)</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>काळजी प्रवास (Care Journey)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Patient Meta Banner */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaName}>{patient.firstName} {patient.lastName}</Text>
            <Text style={styles.metaBadge}>CFJ-1001</Text>
          </View>
          <Text style={styles.metaSub}>UHID: {patient.uhid} • आशा: मीना बाई (CHW-001)</Text>
          <Text style={styles.metaChannel}>Entry Channel: {patient.channel || 'ASHA / CHW Assisted Entry'}</Text>
        </View>

        {/* Failure SLA Breach Warning Banner */}
        {(demoStep === 6 || demoStep === 7 || demoStep === 8) && (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>{t.careGapAlertTitle}</Text>
            <Text style={styles.alertDesc}>{t.careGapAlertDesc}</Text>
            <TouchableOpacity style={styles.alertActionBtn} onPress={onOpenCareGap}>
              <Text style={styles.alertActionText}>⚠ कार्य व पुनर्निर्देशन पहा (View Task) →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Closed Care Success Banner */}
        {demoStep === 12 && (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>{t.careClosedBanner}</Text>
            <Text style={styles.successDesc}>रुग्ण मीना देवी (CF-P1001) यांची काळजी प्रक्रिया यशस्वीपणे पूर्ण झाली.</Text>
          </View>
        )}

        {/* 13 Stage Visual Timeline List */}
        <Text style={styles.sectionTitle}>१३ टप्पे काळजी प्रवास (13-Stage Journey Timeline)</Text>
        <View style={styles.timelineList}>
          {STAGE_CONFIG.map((item, idx) => {
            const isCompleted = idx < currentStageIndex || journey.status === 'COMPLETED';
            const isCurrent = idx === currentStageIndex && journey.status !== 'COMPLETED';
            const isException = (demoStep === 6 || demoStep === 7) && item.stage === 'APPOINTMENT';

            let bgColor = '#1e293b';
            let borderColor = '#334155';
            let symbol = '○ Pending';
            let textColor = '#94a3b8';

            if (isException) {
              bgColor = 'rgba(239, 68, 68, 0.15)';
              borderColor = '#ef4444';
              symbol = '⚠ SLA BREACH EXCEPTION';
              textColor = '#fca5a5';
            } else if (isCompleted) {
              bgColor = 'rgba(34, 197, 94, 0.15)';
              borderColor = '#22c55e';
              symbol = '✓ Completed';
              textColor = '#4ade80';
            } else if (isCurrent) {
              bgColor = 'rgba(2, 132, 199, 0.2)';
              borderColor = '#0284c7';
              symbol = '● Current Active Stage';
              textColor = '#38bdf8';
            }

            return (
              <View key={item.stage} style={[styles.timelineItem, { backgroundColor: bgColor, borderColor }]}>
                <View style={styles.timelineLeft}>
                  <Text style={[styles.stageLabel, { color: textColor }]}>{item.label}</Text>
                  <Text style={styles.stageTerm}>{item.humanTerm}</Text>
                </View>
                <Text style={[styles.stageSymbol, { color: textColor }]}>{symbol}</Text>
              </View>
            );
          })}
        </View>

        {/* Action Controls for Demo Runner */}
        <Text style={styles.sectionTitle}>टप्पा प्रगती कृती (Advance Journey Step)</Text>
        <View style={styles.actionRunnerGrid}>
          <TouchableOpacity style={styles.stepBtn} onPress={() => onRunDemoStep(2)}>
            <Text style={styles.stepBtnText}>१. २. स्क्रीनिंग व ट्रियाज (Triage)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stepBtn} onPress={() => onRunDemoStep(4)}>
            <Text style={styles.stepBtnText}>३. ४. निदान व रिफरल (Referral A)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stepBtn, { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)' }]} onPress={() => onRunDemoStep(6)}>
            <Text style={[styles.stepBtnText, { color: '#fca5a5' }]}>६. 🚨 ट्रिगर विलंब (SLA Breach)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stepBtn, { borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)' }]} onPress={() => onRunDemoStep(8)}>
            <Text style={[styles.stepBtnText, { color: '#fcd34d' }]}>८. ↗ पुनर्निर्देशन (Reroute Hospital B)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stepBtn, { borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)' }]} onPress={() => onRunDemoStep(9)}>
            <Text style={[styles.stepBtnText, { color: '#86efac' }]}>९. नियुक्ती निश्चित (Confirm B)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stepBtn, { borderColor: '#22c55e', backgroundColor: '#14532d' }]} onPress={() => onRunDemoStep(12)}>
            <Text style={[styles.stepBtnText, { color: '#ffffff' }]}>१२. ✅ काळजी बंद (Close Care)</Text>
          </TouchableOpacity>
        </View>
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
  metaCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  metaBadge: {
    backgroundColor: 'rgba(2, 132, 199, 0.2)',
    color: '#38bdf8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: '700',
  },
  metaSub: {
    color: '#cbd5e1',
    fontSize: 12,
    marginTop: 4,
  },
  metaChannel: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  alertTitle: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  alertDesc: {
    color: '#fee2e2',
    fontSize: 12,
    marginBottom: 10,
  },
  alertActionBtn: {
    backgroundColor: '#b45309',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  alertActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  successCard: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  successTitle: {
    color: '#86efac',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  successDesc: {
    color: '#dcfce7',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 4,
  },
  timelineList: {
    gap: 8,
    marginBottom: 18,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  timelineLeft: {
    flex: 1,
  },
  stageLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  stageTerm: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 1,
  },
  stageSymbol: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionRunnerGrid: {
    gap: 8,
    marginBottom: 20,
  },
  stepBtn: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  stepBtnText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '700',
  },
});
