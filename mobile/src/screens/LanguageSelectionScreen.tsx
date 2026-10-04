import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';

interface LanguageSelectionProps {
  selectedLang: string;
  onSelectLang: (lang: string) => void;
  onContinue: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionProps> = ({
  selectedLang,
  onSelectLang,
  onContinue,
}) => {
  const t = getMobileTranslation(selectedLang);

  const languages = [
    { code: 'mr', nameNative: 'मराठी', nameEnglish: 'Marathi' },
    { code: 'hi', nameNative: 'हिंदी', nameEnglish: 'Hindi' },
    { code: 'en', nameNative: 'English', nameEnglish: 'English' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>CF</Text>
        </View>
        <Text style={styles.brandTitle}>{t.appName}</Text>
        <Text style={styles.brandSubtitle}>{t.workerRole}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.selectLanguageTitle}</Text>
        <Text style={styles.cardDesc}>{t.selectLanguageDesc}</Text>

        <View style={styles.langList}>
          {languages.map((l) => {
            const isSelected = selectedLang === l.code;
            return (
              <TouchableOpacity
                key={l.code}
                style={[styles.langBtn, isSelected && styles.langBtnSelected]}
                onPress={() => onSelectLang(l.code)}
                activeOpacity={0.8}
              >
                <Text style={[styles.nativeText, isSelected && styles.nativeTextSelected]}>
                  {l.nameNative}
                </Text>
                <Text style={[styles.englishText, isSelected && styles.englishTextSelected]}>
                  {l.nameEnglish}
                </Text>
                {isSelected && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={onContinue} activeOpacity={0.85}>
          <Text style={styles.continueText}>पुढे जा / Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
    justifyContent: 'center',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 48,
    height: 48,
    backgroundColor: '#0284c7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: '#38bdf8',
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 16,
  },
  langList: {
    gap: 10,
    marginBottom: 20,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 14,
  },
  langBtnSelected: {
    borderColor: '#0284c7',
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
  },
  nativeText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  nativeTextSelected: {
    color: '#38bdf8',
  },
  englishText: {
    color: '#64748b',
    fontSize: 13,
    flex: 1,
  },
  englishTextSelected: {
    color: '#94a3b8',
  },
  checkMark: {
    color: '#0284c7',
    fontSize: 16,
    fontWeight: '800',
  },
  continueBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
