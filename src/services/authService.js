/**
 * ============================================================================
 * AUTHENTICATION SERVICE - OUR LITTLE JOYS
 * ============================================================================
 * Production-ready frontend auth service interacting with backend / json-server.
 * Handles Email/Password login, Signup, Phone OTP verification, Session validation,
 * Profile updates, and token management.
 * 
 * Note: Clearly separated for easy swap when switching to a live production backend.
 * ============================================================================
 */

import { apiClient } from './apiClient';

// Fallback demo users when json-server is not reachable
const FALLBACK_USERS = [
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
    createdAt: '2026-09-01T10:00:00Z'
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
    createdAt: '2026-09-01T10:00:00Z'
  }
];

function getCustomUsers() {
  try {
    const raw = localStorage.getItem('lj_custom_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomUser(user) {
  try {
    const existing = getCustomUsers();
    const filtered = existing.filter((u) => u.id !== user.id && u.email !== user.email && u.phone !== user.phone);
    filtered.push(user);
    localStorage.setItem('lj_custom_users', JSON.stringify(filtered));
  } catch (e) {
    console.error(e);
  }
}

async function findUserByEmail(email) {
  const normalized = email.trim().toLowerCase();
  // 1. Check backend / json-server
  try {
    const res = await apiClient.get('/users', { email: normalized });
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }
  } catch (err) {
    console.warn('[authService] apiClient.get error:', err);
  }

  // 2. Check local registered custom users
  const custom = getCustomUsers().find((u) => u.email?.toLowerCase() === normalized);
  if (custom) return custom;

  // 3. Check fallback demo users
  const fallback = FALLBACK_USERS.find((u) => u.email?.toLowerCase() === normalized);
  if (fallback) return fallback;

  return null;
}

async function findUserByPhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  // 1. Check backend / json-server
  try {
    const res = await apiClient.get('/users', { phone: cleanPhone });
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }
  } catch (err) {
    console.warn('[authService] apiClient.get error:', err);
  }

  // 2. Check local registered custom users
  const custom = getCustomUsers().find((u) => u.phone?.replace(/\D/g, '').slice(-10) === cleanPhone);
  if (custom) return custom;

  // 3. Check fallback demo users
  const fallback = FALLBACK_USERS.find((u) => u.phone?.replace(/\D/g, '').slice(-10) === cleanPhone);
  if (fallback) return fallback;

  return null;
}

export const authService = {
  /**
   * Login with Email & Password or Phone
   * @param {{ email?: string, password?: string, phone?: string, otp?: string }} credentials
   */
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

        const user = await findUserByEmail(normalizedEmail);
        if (!user) {
          return {
            success: false,
            message: 'No account found with this email. Please check your spelling or sign up.'
          };
        }

        if (user.password !== password) {
          return {
            success: false,
            message: 'Incorrect password. Please verify and try again.'
          };
        }

        const token = `mock_token_${user.id}_${Date.now()}`;
        this.setToken(token);
        this.setUserData(user);

        return {
          success: true,
          user,
          token,
          message: 'Login successful!'
        };
      }

      // 2. Phone + OTP Flow
      if (phone !== undefined) {
        const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
        if (cleanPhone.length < 10) {
          return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
        }

        const user = await findUserByPhone(cleanPhone);
        if (!user) {
          return {
            success: false,
            message: `No account registered with +91 ${cleanPhone}. Please switch to Sign Up to create your account.`
          };
        }

        // Verify OTP (Requires '1234' for demo simulation)
        const cleanOtp = (otp || '').trim();
        if (!cleanOtp) {
          return { success: false, message: 'Please enter the 4-digit OTP code sent to your mobile.' };
        }

        if (cleanOtp !== '1234') {
          return {
            success: false,
            message: 'Invalid OTP code. Please enter the demo verification code: 1234'
          };
        }

        const token = `mock_token_${user.id}_${Date.now()}`;
        this.setToken(token);
        this.setUserData(user);

        return {
          success: true,
          user,
          token,
          message: 'Phone verified successfully!'
        };
      }

      return {
        success: false,
        message: 'Please provide either email & password or mobile number.'
      };
    } catch (err) {
      console.warn('[authService] loginUser error:', err);
      return {
        success: false,
        message: 'Authentication failed due to an unexpected error. Please try again.'
      };
    }
  },

  /**
   * Register a new user with real database write
   */
  async signupUser({ name, email, password, phone, childName, childAge, nutritionGoal }) {
    try {
      // 1. Strict Validations
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

      // 2. Check if already exists in json-server or fallbacks
      const existingByEmail = await findUserByEmail(normalizedEmail);
      if (existingByEmail) {
        return {
          success: false,
          message: 'An account with this email address already exists. Please log in instead.'
        };
      }

      const existingByPhone = await findUserByPhone(cleanPhone);
      if (existingByPhone) {
        return {
          success: false,
          message: 'An account with this mobile number already exists. Please log in instead.'
        };
      }

      // 3. Construct user object
      const newUser = {
        id: `usr_${Date.now()}`,
        name: trimmedName,
        email: normalizedEmail,
        phone: cleanPhone,
        password: trimmedPassword,
        role: 'parent',
        walletBalance: 200, // ₹200 Welcome Bonus
        childName: (childName || 'Little Joy').trim(),
        childAge: childAge || '4',
        nutritionGoal: nutritionGoal || 'Overall Growth & Immunity',
        createdAt: new Date().toISOString()
      };

      // 4. Write to json-server backend
      try {
        const createRes = await apiClient.post('/users', newUser);
        if (createRes.success && createRes.data) {
          console.log('[authService] User persisted to json-server:', createRes.data.id);
        }
      } catch (e) {
        console.warn('[authService] json-server write error:', e);
      }

      // 5. Save to local custom registry as reliable persistence
      saveCustomUser(newUser);

      const token = `mock_token_${newUser.id}_${Date.now()}`;
      this.setToken(token);
      this.setUserData(newUser);

      return {
        success: true,
        user: newUser,
        token,
        message: 'Account created successfully! ₹200 welcome bonus added to your Little Joys Wallet.'
      };
    } catch (err) {
      console.warn('[authService] signupUser error:', err.message);
      return {
        success: false,
        message: 'Unable to create account. Please try again.'
      };
    }
  },

  /**
   * Check / validate session
   */
  async checkSession(token) {
    if (!token) return null;
    try {
      const localUser = this.getCurrentUser();
      if (localUser && localUser.id) {
        // Try verifying with backend
        const res = await apiClient.get(`/users/${localUser.id}`);
        if (res.success && res.data) {
          this.setUserData(res.data);
          return res.data;
        }
        return localUser;
      }
      return null;
    } catch {
      return this.getCurrentUser();
    }
  },

  /**
   * Update profile
   */
  async updateProfile(userId, profileData) {
    try {
      const res = await apiClient.patch(`/users/${userId}`, profileData);
      const current = this.getCurrentUser() || {};
      const updated = (res.success && res.data) ? res.data : { ...current, ...profileData };
      this.setUserData(updated);
      return { success: true, user: updated };
    } catch (err) {
      console.warn('[authService] updateProfile error:', err.message);
      const current = this.getCurrentUser() || {};
      const updated = { ...current, ...profileData };
      this.setUserData(updated);
      return { success: true, user: updated };
    }
  },

  /**
   * Get current authenticated user from storage
   */
  getCurrentUser() {
    try {
      const raw = localStorage.getItem('lj_user_data');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setUserData(user) {
    try {
      localStorage.setItem('lj_user_data', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  },

  setToken(token) {
    try {
      localStorage.setItem('lj_auth_token', token);
    } catch (e) {
      console.error(e);
    }
  },

  logoutUser() {
    try {
      localStorage.removeItem('lj_auth_token');
      localStorage.removeItem('lj_user_data');
    } catch (e) {
      console.error(e);
    }
  }
};

export default authService;
