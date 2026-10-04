import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { Patient, CareJourney } from '../types/careflow';
import { SyncEngineStatus } from '../services/syncEngine';

interface FieldDashboardProps {
  selectedLang: string;
  workerName: string;
  syncStatus: SyncEngineStatus;
  onToggleNetwork: () => void;
  patient: Patient;
  journey: CareJourney;
  demoStep: number;
  onRunDemoStep: (stepNum: number) => void;
  onOpenJourney: () => void;
  onOpenScreening: () => void;
  onOpenCareGap: () => void;
  onSignOut: () => void;
}

export const FieldDashboardScreen: React.FC<FieldDashboardProps> = ({
  selectedLang,
  workerName,
  syncStatus,
  onToggleNetwork,
  patient,
  journey,
  demoStep,
  onRunDemoStep,
  onOpenJourney,
  onOpenScreening,
  onOpenCareGap,
  onSignOut,
}) => {
  const t = getMobileTranslation(selectedLang);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>CF</Text>
          </View>
          <View>
            <Text style={styles.appName}>{t.appName}</Text>
            <Text style={styles.workerRole}>{workerName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.syncBadge, syncStatus.isOnline ? styles.syncOnline : styles.syncOffline]}
          onPress={onToggleNetwork}
          activeOpacity={0.8}
        >
          <Text style={[styles.syncText, syncStatus.isOnline ? styles.syncTextOnline : styles.syncTextOffline]}>
            {syncStatus.isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sync Banner Indicator */}
      <View style={[styles.syncBanner, syncStatus.isOnline ? styles.bannerOnline : styles.bannerOffline]}>
        <Text style={styles.syncBannerText}>
          {syncStatus.isOnline
            ? `✓ ${t.syncStatusOnline}`
            : `⚠ ${t.syncStatusOffline} (${syncStatus.pendingCount} Local Outbox)`}
        </Text>
        <TouchableOpacity onPress={onSignOut}>
          <Text style={styles.signOutText}>बाहेर पडा</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Today's Action Summary Badges */}
        <Text style={styles.sectionTitle}>{t.todaySummaryTitle}</Text>
        <View style={styles.kpiRow}>
          <View style={[styles.kpiBox, { borderColor: '#ef4444' }]}>
            <Text style={[styles.kpiValue, { color: '#ef4444' }]}>
              {demoStep === 6 || demoStep === 7 ? '1' : '0'}
            </Text>
            <Text style={styles.kpiLabel}>{t.careGapsLabel}</Text>
          </View>

          <View style={[styles.kpiBox, { borderColor: '#f59e0b' }]}>
            <Text style={[styles.kpiValue, { color: '#f59e0b' }]}>
              {demoStep === 12 ? '0' : '1'}
            </Text>
            <Text style={styles.kpiLabel}>{t.followUpDueLabel}</Text>
          </View>

          <View style={[styles.kpiBox, { borderColor: '#3b82f6' }]}>
            <Text style={[styles.kpiValue, { color: '#3b82f6' }]}>1</Text>
            <Text style={styles.kpiLabel}>{t.tasksDueLabel}</Text>
          </View>
        </View>

        {/* Quick Field Actions */}
        <Text style={styles.sectionTitle}>{t.quickActionsTitle}</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => onRunDemoStep(1)}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>{t.actionRegister}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={onOpenScreening}>
            <Text style={styles.actionIcon}>🩸</Text>
            <Text style={styles.actionText}>{t.actionScreening}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={onOpenCareGap}>
            <Text style={styles.actionIcon}>⚠</Text>
            <Text style={styles.actionText}>{t.actionTasks}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={onOpenJourney}>
            <Text style={styles.actionIcon}>🏥</Text>
            <Text style={styles.actionText}>{t.actionFollowUp}</Text>
          </TouchableOpacity>
        </View>

        {/* Active Care Journey Card */}
        <Text style={styles.sectionTitle}>{t.patientSectionTitle}</Text>
        <View style={[styles.patientCard, demoStep === 6 || demoStep === 7 ? styles.cardAlert : styles.cardNormal]}>
          <View style={styles.patientHeader}>
            <View>
              <Text style={styles.patientName}>{patient.firstName} {patient.lastName}</Text>
              <Text style={styles.patientId}>UHID: {patient.uhid} • {patient.village}</Text>
            </View>
            <Text style={[styles.badge, demoStep === 6 || demoStep === 7 ? styles.badgeAlert : styles.badgeNormal]}>
              {demoStep === 6 || demoStep === 7 ? 'SLA BREACH' : journey.status}
            </Text>
          </View>

          <View style={styles.journeyInfoBox}>
            <Text style={styles.journeyInfoText}>
              <Text style={styles.bold}>{t.currentJourneyLabel}:</Text> {journey.currentStage}
            </Text>
            <Text style={styles.journeyInfoText}>
              <Text style={styles.bold}>{t.nextActionLabel}:</Text>{' '}
              {demoStep === 6 || demoStep === 7
                ? '⚠ Follow up on delayed appointment'
                : demoStep === 12
                ? '✅ Care Closed'
                : 'Proceed to Next Stage'}
            </Text>
          </View>

          <View style={styles.cardActionsRow}>
            <TouchableOpacity style={styles.btnPrimary} onPress={onOpenJourney}>
              <Text style={styles.btnPrimaryText}>काळजी प्रवास पहा (View Journey) →</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    backgroundColor: '#0284c7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  appName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  workerRole: {
    color: '#38bdf8',
    fontSize: 11,
  },
  syncBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  syncOnline: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: '#22c55e',
  },
  syncOffline: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
  },
  syncText: {
    fontSize: 11,
    fontWeight: '700',
  },
  syncTextOnline: {
    color: '#4ade80',
  },
  syncTextOffline: {
    color: '#fca5a5',
  },
  syncBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  bannerOnline: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  bannerOffline: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  syncBannerText: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '600',
  },
  signOutText: {
    color: '#fda4af',
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    padding: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  kpiBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  kpiLabel: {
    color: '#94a3b8',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  actionText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },
  patientCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardNormal: {
    borderColor: '#334155',
  },
  cardAlert: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  patientName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  patientId: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: '700',
    overflow: 'hidden',
  },
  badgeNormal: {
    backgroundColor: 'rgba(2, 132, 199, 0.2)',
    color: '#38bdf8',
  },
  badgeAlert: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#fca5a5',
  },
  journeyInfoBox: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  journeyInfoText: {
    color: '#cbd5e1',
    fontSize: 12,
    marginTop: 2,
  },
  bold: {
    fontWeight: '700',
    color: '#ffffff',
  },
  cardActionsRow: {
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: '#0284c7',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
