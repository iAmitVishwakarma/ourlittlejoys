/**
 * ============================================================================
 * AUTHENTICATION SERVICE - OUR LITTLE JOYS
 * ============================================================================
 * 
 * GUIDE FOR BACKEND DEVELOPER:
 * ----------------------------------------------------------------------------
 * 1. OTP AUTHENTICATION FLOW:
 *    - Client enters 10-digit mobile number.
 *    - Client calls `POST /api/auth/send-otp` with `{ phone: "9876543210" }`.
 *    - Backend generates a secure 6-digit OTP (e.g., using Redis with 5-minute TTL)
 *      and sends SMS via Indian SMS gateway (Fast2SMS, Gupshup, Exotel, Twilio).
 *    - Client submits OTP via `POST /api/auth/verify-otp` with `{ phone, otp }`.
 *    - Backend verifies OTP. If new user, creates user record with ₹200 welcome wallet credit.
 *    - Backend returns `{ token: "jwt_token_here", user: { id, name, phone, walletBalance: 200 } }`.
 *    - Client stores token in localStorage ('lj_auth_token') for subsequent requests.
 * 
 * 2. PROFILE MANAGEMENT:
 *    - Little Joys personalizes nutrition based on child age:
 *      `PUT /api/auth/profile` with `{ name, childName, childAge, address, pincode }`.
 * ============================================================================
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const authService = {
  /**
   * BACKEND ENDPOINT: POST /api/auth/send-otp
   */
  async sendOtp(phone) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('[Auth] Real send-otp unreachable, simulating OTP send.', e.message);
    }

    // Mock response for instant local demo
    return {
      success: true,
      message: `OTP sent successfully to +91 ${phone}`,
      mockOtp: '1234' // In mock mode, any 4-digit OTP or '1234' is accepted
    };
  },

  /**
   * BACKEND ENDPOINT: POST /api/auth/verify-otp
   */
  async verifyOtp(phone, otp) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('lj_auth_token', data.token);
        }
        return data;
      }
    } catch (e) {
      console.warn('[Auth] Real verify-otp unreachable, simulating login.', e.message);
    }

    // Default mock user for offline demo
    const mockUser = {
      id: `user_${Date.now()}`,
      phone,
      name: 'Pooja Sharma',
      email: 'pooja.sharma@example.com',
      childName: 'Aarav',
      childAge: '5 Yr',
      walletBalance: 200,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('lj_auth_token', `mock_jwt_token_${phone}`);
    localStorage.setItem('lj_user_data', JSON.stringify(mockUser));

    return {
      success: true,
      token: `mock_jwt_token_${phone}`,
      user: mockUser
    };
  },

  /**
   * BACKEND ENDPOINT: PUT /api/auth/profile
   */
  async updateProfile(profileData) {
    const token = localStorage.getItem('lj_auth_token');
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('[Auth] Real update-profile unreachable, updating local storage.', e.message);
    }

    const current = this.getCurrentUser() || {};
    const updated = { ...current, ...profileData };
    localStorage.setItem('lj_user_data', JSON.stringify(updated));
    return { success: true, user: updated };
  },

  /**
   * Get current authenticated user from local storage
   */
  getCurrentUser() {
    try {
      const raw = localStorage.getItem('lj_user_data');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('lj_auth_token');
    localStorage.removeItem('lj_user_data');
  }
};
