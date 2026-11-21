import { apiClient } from './apiClient';
import { safeStorage } from '@/utils/storage';

const FALLBACK_USERS = [
  {
    id: 'user_demo',
    name: 'Demo Parent',
    email: 'demo@example.com',
    phone: '9123456789',
    password: 'demo123',
    role: 'parent',
    walletBalance: 200,
    childName: 'Joy',
    childAge: '4',
    nutritionGoal: 'Growth & Immunity',
    createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'user_001',
    name: 'Amit Vishwakarma',
    email: 'iam.itvishwakarma03@gmail.com',
    phone: '7772929755',
    password: 'demo123',
    role: 'parent',
    walletBalance: 200,
    childName: 'Shubh',
    childAge: '7',
    nutritionGoal: 'Growth & Immunity',
    createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'usr_001',
    name: 'Amit Vishwakarma',
    email: 'iam.itvishwakarma03@gmail.com',
    phone: '7772929755',
    password: 'password123',
    role: 'parent',
    walletBalance: 200,
    childName: 'Shubh',
    childAge: '7',
    nutritionGoal: 'Growth & Immunity',
    createdAt: '2026-09-01T10:00:00Z',
  },
];

function getCustomUsers() {
  const stored = safeStorage.getJSON('lj_custom_users');
  return Array.isArray(stored) ? stored : [];
}

function saveCustomUser(user) {
  const existing = getCustomUsers();
  const filtered = existing.filter(
    (u) => u.id !== user.id && u.email !== user.email && u.phone !== user.phone
  );
  filtered.push(user);
  safeStorage.setJSON('lj_custom_users', filtered);
}

async function findUserByEmail(email) {
  const normalized = (email || '').trim().toLowerCase();
  const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

  if (!isMock) {
    try {
      const res = await apiClient.get('/users', { email: normalized });
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data[0];
      }
    } catch (err) {
      console.warn('[authService] apiClient.get error:', err);
    }
  }

  const custom = getCustomUsers().find((u) => u.email?.toLowerCase() === normalized);
  if (custom) return custom;

  const fallback = FALLBACK_USERS.find((u) => u.email?.toLowerCase() === normalized);
  if (fallback) return fallback;

  return null;
}

async function findUserByPhone(phone) {
  const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
  const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

  if (!isMock) {
    try {
      const res = await apiClient.get('/users', { phone: cleanPhone });
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data[0];
      }
    } catch (err) {
      console.warn('[authService] apiClient.get error:', err);
    }
  }

  const custom = getCustomUsers().find(
    (u) => u.phone?.replace(/\D/g, '').slice(-10) === cleanPhone
  );
  if (custom) return custom;

  const fallback = FALLBACK_USERS.find(
    (u) => u.phone?.replace(/\D/g, '').slice(-10) === cleanPhone
  );
  if (fallback) return fallback;

  return null;
}

export const authService = {
  async sendOtp(phone) {
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        await apiClient.post('/auth/send-otp', { phone: cleanPhone });
      } catch {
        // Fallback in case backend OTP route is simulated
      }
    }

    return { success: true, message: `OTP sent to +91 ${cleanPhone}` };
  },

  async loginUser({ email, password, phone, otp }) {
    try {
      // 1. Email + Password Flow
      if (email !== undefined) {
        const normalizedEmail = (email || '').trim().toLowerCase();
        if (!normalizedEmail) {
          return { success: false, message: 'Please enter your email address.' };
        }
        if (!password) {
          return { success: false, message: 'Please enter your password.' };
        }

        const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
        if (!isMock) {
          try {
            const apiRes = await apiClient.post('/auth/login', {
              email: normalizedEmail,
              password,
            });
            if (apiRes.success && apiRes.data?.token && apiRes.data?.user) {
              const { password: _, ...safeUser } = apiRes.data.user;
              const token = apiRes.data.token;
              this.setToken(token);
              this.setUserData(safeUser);
              return {
                success: true,
                user: safeUser,
                token,
                message: 'Login successful!',
              };
            }
          } catch (apiErr) {
            if (apiErr.response?.status === 401) {
              return {
                success: false,
                message: apiErr.response.data?.message || 'Incorrect email or password.',
              };
            }
          }
        }

        const user = await findUserByEmail(normalizedEmail);
        if (!user) {
          return {
            success: false,
            message: 'No account found with this email. Please check your spelling or sign up.',
          };
        }

        if (user.password !== password) {
          return {
            success: false,
            message: 'Incorrect password. Please verify and try again.',
          };
        }

        const { password: _, ...safeUser } = user;
        const token = `mock_jwt_${safeUser.id}_${Date.now()}`;
        this.setToken(token);
        this.setUserData(safeUser);

        return {
          success: true,
          user: safeUser,
          token,
          message: 'Login successful!',
        };
      }

      // 2. Phone + OTP Flow
      if (phone !== undefined) {
        const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
        if (cleanPhone.length < 10) {
          return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
        }

        const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
        if (!isMock) {
          try {
            const apiRes = await apiClient.post('/auth/login-otp', {
              phone: cleanPhone,
              otp,
            });
            if (apiRes.success && apiRes.data?.token && apiRes.data?.user) {
              const { password: _, ...safeUser } = apiRes.data.user;
              const token = apiRes.data.token;
              this.setToken(token);
              this.setUserData(safeUser);
              return {
                success: true,
                user: safeUser,
                token,
                message: 'Phone verified successfully!',
              };
            }
          } catch (apiErr) {
            if (apiErr.response?.status === 401) {
              return {
                success: false,
                message: apiErr.response.data?.message || 'Invalid OTP code.',
              };
            }
          }
        }

        const user = await findUserByPhone(cleanPhone);
        if (!user) {
          return {
            success: false,
            message: `No account registered with +91 ${cleanPhone}. Please switch to Sign Up to create your account.`,
          };
        }

        const cleanOtp = (otp || '').trim();
        if (!cleanOtp) {
          return { success: false, message: 'Please enter the 4-digit OTP code sent to your mobile.' };
        }

        if (cleanOtp !== '1234') {
          return {
            success: false,
            message: 'Invalid OTP code. Please enter the demo verification code: 1234',
          };
        }

        const { password: _, ...safeUser } = user;
        const token = `mock_jwt_${safeUser.id}_${Date.now()}`;
        this.setToken(token);
        this.setUserData(safeUser);

        return {
          success: true,
          user: safeUser,
          token,
          message: 'Phone verified successfully!',
        };
      }

      return {
        success: false,
        message: 'Please provide either email & password or mobile number.',
      };
    } catch (err) {
      console.warn('[authService] loginUser error:', err);
      return {
        success: false,
        message: 'Authentication failed due to an unexpected error. Please try again.',
      };
    }
  },

  async signupUser({ name, email, password, phone, childName, childAge, nutritionGoal }) {
    try {
      const trimmedName = (name || '').trim();
      if (!trimmedName || trimmedName.length < 2) {
        return { success: false, message: 'Please enter your full name (at least 2 characters).' };
      }

      const normalizedEmail = (email || '').trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
        return { success: false, message: 'Please enter a valid email address (e.g. parent@example.com).' };
      }

      const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
      if (!cleanPhone || cleanPhone.length < 10) {
        return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
      }

      const trimmedPassword = (password || '').trim();
      if (!trimmedPassword || trimmedPassword.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long.' };
      }

      const existingByEmail = await findUserByEmail(normalizedEmail);
      if (existingByEmail) {
        return {
          success: false,
          message: 'An account with this email address already exists. Please log in instead.',
        };
      }

      const existingByPhone = await findUserByPhone(cleanPhone);
      if (existingByPhone) {
        return {
          success: false,
          message: 'An account with this mobile number already exists. Please log in instead.',
        };
      }

      const newUser = {
        id: `usr_${Date.now()}`,
        name: trimmedName,
        email: normalizedEmail,
        phone: cleanPhone,
        password: trimmedPassword,
        role: 'parent',
        walletBalance: 200,
        childName: (childName || 'Little Joy').trim(),
        childAge: childAge || '4',
        nutritionGoal: nutritionGoal || 'Overall Growth & Immunity',
        createdAt: new Date().toISOString(),
      };

      const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
      if (!isMock) {
        try {
          await apiClient.post('/auth/signup', newUser);
        } catch (e) {
          console.warn('[authService] backend signup error:', e);
        }
      }

      saveCustomUser(newUser);

      const { password: _, ...safeUser } = newUser;
      const token = `mock_jwt_${safeUser.id}_${Date.now()}`;
      this.setToken(token);
      this.setUserData(safeUser);

      return {
        success: true,
        user: safeUser,
        token,
        message: 'Account created successfully! ₹200 welcome bonus added to your Nestor Wallet.',
      };
    } catch (err) {
      console.warn('[authService] signupUser error:', err.message);
      return {
        success: false,
        message: 'Unable to create account. Please try again.',
      };
    }
  },

  async checkSession(token) {
    if (!token) return null;
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    try {
      const localUser = this.getCurrentUser();
      if (localUser && localUser.id) {
        if (!isMock) {
          const res = await apiClient.get('/auth/me');
          if (res.success && res.data) {
            this.setUserData(res.data);
            return res.data;
          }
        }
        return localUser;
      }
      return null;
    } catch {
      return this.getCurrentUser();
    }
  },

  async updateProfile(userId, profileData) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const current = this.getCurrentUser() || {};

    if (!isMock) {
      try {
        const res = await apiClient.patch('/users/me', profileData);
        const updated = (res.success && res.data) ? res.data : { ...current, ...profileData };
        this.setUserData(updated);
        return { success: true, user: updated };
      } catch (err) {
        console.warn('[authService] updateProfile backend error:', err.message);
      }
    }

    const updated = { ...current, ...profileData };
    this.setUserData(updated);
    return { success: true, user: updated };
  },

  getCurrentUser() {
    return safeStorage.getJSON('lj_user_data');
  },

  setUserData(user) {
    safeStorage.setJSON('lj_user_data', user);
  },

  setToken(token) {
    safeStorage.setItem('lj_auth_token', token);
  },

  logoutUser() {
    safeStorage.removeItem('lj_auth_token');
    safeStorage.removeItem('lj_user_data');
  },

  logout() {
    return this.logoutUser();
  },
};

export default authService;
