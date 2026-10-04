import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { Patient } from '../types/careflow';
import { syncEngine } from '../services/syncEngine';

interface ScreeningFormProps {
  selectedLang: string;
  patient: Patient;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export const ScreeningFormScreen: React.FC<ScreeningFormProps> = ({
  selectedLang,
  patient,
  onBack,
  onSubmitSuccess,
}) => {
  const t = getMobileTranslation(selectedLang);

  const [systolic, setSystolic] = useState('160');
  const [diastolic, setDiastolic] = useState('100');
  const [hasHeadache, setHasHeadache] = useState(true);
  const [hasDizziness, setHasDizziness] = useState(true);
  const [priority, setPriority] = useState<'NORMAL' | 'HIGH'>('HIGH');
  const [savedStatus, setSavedStatus] = useState('');

  const handleSubmit = () => {
    // Save locally to SQLite and enqueue action in Sync Engine
    syncEngine.enqueueAction('RECORD_SCREENING', 'Patient', patient.id, {
      systolic,
      diastolic,
      symptoms: { headache: hasHeadache, dizziness: hasDizziness },
      priority,
    });

    setSavedStatus('✓ तपासणी नोंद जतन झाली (Saved to device & enqueued for sync)');
    setTimeout(() => {
      onSubmitSuccess();
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← परत (Back)</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.actionScreening}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Patient Meta */}
        <View style={styles.patientMeta}>
          <Text style={styles.patientName}>{patient.firstName} {patient.lastName} (UHID: {patient.uhid})</Text>
          <Text style={styles.patientSub}>२८ वर्षे, महिला • {patient.village}</Text>
        </View>

        {savedStatus ? (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>{savedStatus}</Text>
          </View>
        ) : null}

        {/* BP Input Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>रक्तदाब नोंदणी (Blood Pressure)</Text>
          <View style={styles.bpRow}>
            <View style={styles.bpField}>
              <Text style={styles.inputLabel}>Systolic (सिस्टोलिक)</Text>
              <TextInput
                style={styles.input}
                value={systolic}
                onChangeText={setSystolic}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.bpField}>
              <Text style={styles.inputLabel}>Diastolic (डायस्टोलिक)</Text>
              <TextInput
                style={styles.input}
                value={diastolic}
                onChangeText={setDiastolic}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Symptoms Checkboxes */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>लक्षणे (Symptoms Checklist)</Text>

          <TouchableOpacity
            style={[styles.checkboxRow, hasHeadache && styles.checkboxSelected]}
            onPress={() => setHasHeadache(!hasHeadache)}
          >
            <Text style={styles.checkboxLabel}>डोकेदुखी (Severe Headache)</Text>
            <Text style={styles.checkboxSymbol}>{hasHeadache ? '✓' : '○'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.checkboxRow, hasDizziness && styles.checkboxSelected]}
            onPress={() => setHasDizziness(!hasDizziness)}
          >
            <Text style={styles.checkboxLabel}>चक्कर येणे (Dizziness / Blurry Vision)</Text>
            <Text style={styles.checkboxSymbol}>{hasDizziness ? '✓' : '○'}</Text>
          </TouchableOpacity>
        </View>

        {/* Priority Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>जोखीम पातळी (Triage Risk Priority)</Text>
          <View style={styles.priorityRow}>
            <TouchableOpacity
              style={[styles.priorityBtn, priority === 'NORMAL' && styles.priorityNormal]}
              onPress={() => setPriority('NORMAL')}
            >
              <Text style={[styles.priorityText, priority === 'NORMAL' && styles.priorityTextSelected]}>साधारण (NORMAL)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.priorityBtn, priority === 'HIGH' && styles.priorityHigh]}
              onPress={() => setPriority('HIGH')}
            >
              <Text style={[styles.priorityText, priority === 'HIGH' && styles.priorityTextSelected]}>उच्च जोखीम (HIGH RISK)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>जतन करा व पुढे जा (Save & Progress) →</Text>
        </TouchableOpacity>
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
  successBanner: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: '#22c55e',
    padding: 10,
    borderRadius: 6,
    marginBottom: 14,
  },
  successText: {
    color: '#86efac',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  bpRow: {
    flexDirection: 'row',
    gap: 12,
  },
  bpField: {
    flex: 1,
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 11,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 6,
    padding: 10,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  checkboxSelected: {
    borderColor: '#0284c7',
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
  },
  checkboxLabel: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  checkboxSymbol: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: '800',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityBtn: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  priorityNormal: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  priorityHigh: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  priorityText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  priorityTextSelected: {
    color: '#ffffff',
  },
  submitBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
