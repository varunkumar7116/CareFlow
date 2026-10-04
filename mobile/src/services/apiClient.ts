// CareFlow Mobile Application - REST API Client & Backend Connection Service

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8085/api/v1';

export interface LoginResult {
  success: boolean;
  token?: string;
  username?: string;
  fullName?: string;
  role?: string;
  facilityId?: string;
  error?: string;
}

// Demo Accounts Mapping for offline and zero-friction field worker testing
const DEMO_ACCOUNTS: Record<string, { pass: string; role: string; name: string; fac: string }> = {
  'MH-PHC-ADMIN': { pass: 'CareFlow@123', role: 'FACILITY_ADMIN', name: 'MH Facility Administrator', fac: 'NIN-TN-CBE-001' },
  'chw1': { pass: 'password', role: 'CHW', name: 'CHW Meera Bai (ASHA)', fac: 'NIN-TN-CBE-001' },
  'MH-DOCTOR-001': { pass: 'CareFlow@123', role: 'DOCTOR', name: 'Dr. Anand Joshi', fac: 'NIN-TN-CBE-001' },
  'MH-STAFF-001': { pass: 'CareFlow@123', role: 'FACILITY_STAFF', name: 'Sowmya R (Facility Staff)', fac: 'NIN-TN-CBE-001' },
  'MH-DISTRICT-001': { pass: 'CareFlow@123', role: 'DISTRICT_SUPERVISOR', name: 'Dr. V. Sundaram (District Supervisor)', fac: 'NIN-TN-CBE-001' },
};

class ApiClientService {
  private token: string = localStorage.getItem('careflow_mobile_token') || '';

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('careflow_mobile_token', token);
  }

  public getToken(): string {
    return this.token || localStorage.getItem('careflow_mobile_token') || '';
  }

  public async login(user: string, pass: string): Promise<LoginResult> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        this.setToken(data.token);
        return {
          success: true,
          token: data.token,
          username: data.username,
          fullName: data.fullName || user,
          role: data.role || 'CHW',
          facilityId: data.facilityId || 'NIN-TN-CBE-001',
        };
      }
    } catch (e) {
      console.warn('Backend REST API connection attempt failed, evaluating local demo credentials...', e);
    }

    // Local Demo Fallback
    const demo = DEMO_ACCOUNTS[user];
    if (demo && demo.pass === pass) {
      const dummyToken = `demo_mobile_jwt_${user}_${Date.now()}`;
      this.setToken(dummyToken);
      return {
        success: true,
        token: dummyToken,
        username: user,
        fullName: demo.name,
        role: demo.role,
        facilityId: demo.fac,
      };
    }

    return {
      success: false,
      error: 'Invalid username or password. Please verify credentials.',
    };
  }

  public async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  }

  public logout() {
    this.token = '';
    localStorage.removeItem('careflow_mobile_token');
  }
}

export const apiClient = new ApiClientService();
