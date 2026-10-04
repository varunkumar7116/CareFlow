import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { Patient, CareJourney } from '../types/careflow';

interface FollowUpProps {
  selectedLang: string;
  patient: Patient;
  journey: CareJourney;
  onBack: () => void;
  onCompleteCare: () => void;
}

export const FollowUpScreen: React.FC<FollowUpProps> = ({
  selectedLang,
  patient,
  journey,
  onBack,
  onCompleteCare,
}) => {
  const t = getMobileTranslation(selectedLang);
  const [notes, setNotes] = useState('२४ तासांनंतर आशा कार्यकत्री गृह भेट यशस्वी. रुग्ण स्थिती स्थिर. रक्तदाब १३०/८० mmHg.');
  const [patientStatus, setPatientStatus] = useState('RECOVERED');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← परत (Back)</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.actionFollowUp}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Patient Meta */}
        <View style={styles.patientMeta}>
          <Text style={styles.patientName}>{patient.firstName} {patient.lastName} (UHID: {patient.uhid})</Text>
          <Text style={styles.patientSub}>काळजी प्रवास आयडी: CFJ-1001 • आशा: मीरा बाई</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>गृह भेट पाठपुरावा नोंद (Home Visit Follow-up Log)</Text>

          <Text style={styles.inputLabel}>रुग्ण आरोग्य स्थिती (Patient Condition):</Text>
          <View style={styles.statusRow}>
            <TouchableOpacity
              style={[styles.statusBtn, patientStatus === 'RECOVERED' && styles.statusBtnActive]}
              onPress={() => setPatientStatus('RECOVERED')}
            >
              <Text style={styles.statusBtnText}>✓ उत्तम / स्थिर (Stable)</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>आशा कार्यकत्री नोंद / टिप्पणी (Visit Notes):</Text>
          <TextInput
            style={styles.textArea}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.completeBtn} onPress={onCompleteCare} activeOpacity={0.85}>
            <Text style={styles.completeBtnText}>{t.actionCloseCare}</Text>
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
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 12,
    marginBottom: 6,
    marginTop: 4,
  },
  statusRow: {
    marginBottom: 12,
  },
  statusBtn: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusBtnActive: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  statusBtnText: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 6,
    padding: 10,
    color: '#ffffff',
    fontSize: 13,
    height: 90,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  completeBtn: {
    backgroundColor: '#166534',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
