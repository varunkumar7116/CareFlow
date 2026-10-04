import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { getMobileTranslation } from '../i18n/translations';
import { apiClient } from '../services/apiClient';

interface LoginScreenProps {
  selectedLang: string;
  onChangeLang: () => void;
  onLoginSuccess: (user: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  selectedLang,
  onChangeLang,
  onLoginSuccess,
}) => {
  const t = getMobileTranslation(selectedLang);
  const [username, setUsername] = useState('chw1');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await apiClient.login(username, password);
    setLoading(false);
    if (res.success) {
      onLoginSuccess(res);
    } else {
      setErrorMsg(res.error || 'Login failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.langBadgeBtn} onPress={onChangeLang}>
          <Text style={styles.langBadgeText}>🌐 {selectedLang.toUpperCase()} (भाषा बदला)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerBox}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>CF</Text>
        </View>
        <Text style={styles.brandTitle}>{t.loginTitle}</Text>
        <Text style={styles.brandSubtitle}>{t.loginDesc}</Text>
      </View>

      <View style={styles.card}>
        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠ {errorMsg}</Text>
          </View>
        ) : null}

        <Text style={styles.inputLabel}>{t.userIdLabel}</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="chw1 or MH-PHC-ADMIN"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>{t.passwordLabel}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password or CareFlow@123"
          placeholderTextColor="#64748b"
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
          <Text style={styles.loginBtnText}>{loading ? 'प्रमाणित करत आहे...' : t.signInBtn}</Text>
        </TouchableOpacity>

        {/* Demo Accounts Helper */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>प्रत्यक्ष प्रात्यक्षिक खाते (Demo Credentials):</Text>
          <Text style={styles.demoItem}>• आशा कार्यकत्री: <Text style={styles.bold}>chw1</Text> / password</Text>
          <Text style={styles.demoItem}>• PHC प्रशासक: <Text style={styles.bold}>MH-PHC-ADMIN</Text> / CareFlow@123</Text>
        </View>
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
  topBar: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  langBadgeBtn: {
    backgroundColor: '#1e293b',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  langBadgeText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    width: 44,
    height: 44,
    backgroundColor: '#0284c7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 12,
    fontWeight: '600',
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 14,
  },
  loginBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  demoBox: {
    marginTop: 18,
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  demoTitle: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  demoItem: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  bold: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
