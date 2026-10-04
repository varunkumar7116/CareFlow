import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { Patient } from '../types/careflow';

interface FacilityMatcherProps {
  selectedLang: string;
  patient: Patient;
  onBack: () => void;
  onConfirmReroute: () => void;
}

export const FacilityMatcherScreen: React.FC<FacilityMatcherProps> = ({
  selectedLang,
  patient,
  onBack,
  onConfirmReroute,
}) => {
  const t = getMobileTranslation(selectedLang);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← परत (Back)</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>रुग्णालय जुळवणी (Facility Matcher)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Patient Requirements Box */}
        <View style={styles.reqCard}>
          <Text style={styles.reqTitle}>रिफरल आवश्यक पात्रता (Referral Requirements):</Text>
          <Text style={styles.reqItem}>• आवश्यक विषय: <Text style={styles.bold}>स्त्रीरोग व प्रसूती (Obstetrics)</Text></Text>
          <Text style={styles.reqItem}>• आवश्यक उपकरण: <Text style={styles.bold}>अल्ट्रासाउंड स्कॅनर (Ultrasound)</Text></Text>
          <Text style={styles.reqItem}>• प्राधान्य: <Text style={styles.bold}>उच्च (HIGH PRIORITY)</Text></Text>
        </View>

        <Text style={styles.sectionTitle}>उपलब्ध सुयोग्य रुग्णालय (Available Matching Facilities):</Text>

        {/* Candidate Facility Card */}
        <View style={styles.facilityCard}>
          <View style={styles.facHeader}>
            <View>
              <Text style={styles.facName}>District Hospital B (Rampur)</Text>
              <Text style={styles.facDist}>जिल्हा रुग्णालय Rampur • २४x७ कार्यरत</Text>
            </View>
            <Text style={styles.matchBadge}>✓ MATCHED</Text>
          </View>

          <View style={styles.capabilityList}>
            <Text style={styles.capItem}>✓ स्त्रीरोग तज्ज्ञ उपलब्ध: Dr. Rajesh Kumar</Text>
            <Text style={styles.capItem}>✓ कार्यक्षम उपकरण: 2D/4D Ultrasound Scanner</Text>
            <Text style={styles.capItem}>✓ मोफत बेड क्षमता: उपलब्ध (Available Beds)</Text>
          </View>

          <View style={styles.verifierBox}>
            <Text style={styles.verifierText}>
              ✓ मूळ नोंदणी: National Hospital Directory (MoHFW OGD Dataset)<br />
              ✓ जुळवणी स्थिती: Matches Referral Criteria Exactly
            </Text>
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={onConfirmReroute} activeOpacity={0.85}>
            <Text style={styles.confirmBtnText}>✓ रिफरल पुनर्निर्देशित करा व नियुक्ती निश्चित करा →</Text>
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
  reqCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  reqTitle: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  reqItem: {
    color: '#cbd5e1',
    fontSize: 12,
    marginTop: 2,
  },
  bold: {
    color: '#ffffff',
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  facilityCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  facHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  facName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  facDist: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  matchBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    color: '#4ade80',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: '800',
  },
  capabilityList: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    gap: 4,
  },
  capItem: {
    color: '#86efac',
    fontSize: 12,
    fontWeight: '600',
  },
  verifierBox: {
    marginBottom: 14,
  },
  verifierText: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 16,
  },
  confirmBtn: {
    backgroundColor: '#166534',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
