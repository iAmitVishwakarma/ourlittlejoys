import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from '../authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loginUser with Email', () => {
    it('authenticates demo user with correct credentials and returns user and token', async () => {
      const result = await authService.loginUser({
        email: 'iam.itvishwakarma03@gmail.com',
        password: 'demo123',
      });

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe('iam.itvishwakarma03@gmail.com');
      expect(result.token).toBeDefined();
    });

    it('returns unsuccessful result when password does not match', async () => {
      const result = await authService.loginUser({
        email: 'iam.itvishwakarma03@gmail.com',
        password: 'wrongpassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/incorrect password/i);
    });

    it('returns unsuccessful result when email is not registered', async () => {
      const result = await authService.loginUser({
        email: 'nonexistent.parent@test.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/no account found/i);
    });
  });

  describe('signupUser', () => {
    it('successfully registers new user with bonus wallet credit', async () => {
      const newUser = {
        name: 'Pooja Sharma',
        email: 'pooja.sharma.test@example.com',
        phone: '9876543211',
        password: 'securePass123',
        childName: 'Aarav',
        childAge: '4',
      };

      const result = await authService.signupUser(newUser);
      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.name).toBe('Pooja Sharma');
      expect(result.user.walletBalance).toBe(200); // 200 welcome bonus
      expect(result.token).toBeDefined();

      // Verify that newly registered user can log in
      const loginRes = await authService.loginUser({
        email: 'pooja.sharma.test@example.com',
        password: 'securePass123',
      });
      expect(loginRes.success).toBe(true);
      expect(loginRes.user.name).toBe('Pooja Sharma');
    });

    it('rejects duplicate email registration', async () => {
      const res = await authService.signupUser({
        name: 'Amit',
        email: 'iam.itvishwakarma03@gmail.com',
        phone: '9999999999',
        password: 'password123',
      });

      expect(res.success).toBe(false);
      expect(res.message).toMatch(/already exists/i);
    });
  });

  describe('OTP flow', () => {
    it('sends OTP for valid 10-digit phone number', async () => {
      const res = await authService.sendOtp('9876543210');
      expect(res.success).toBe(true);
    });

    it('verifies valid demo OTP code and returns authenticated session', async () => {
      const res = await authService.loginUser({
        phone: '7772929755',
        otp: '1234',
      });
      expect(res.success).toBe(true);
      expect(res.user).toBeDefined();
      expect(res.token).toBeDefined();
    });
  });

  describe('Session and Logout', () => {
    it('cleans up local storage on logout', () => {
      localStorage.setItem('lj_auth_token', 'test_token');
      authService.logout();
      expect(localStorage.getItem('lj_auth_token')).toBeNull();
    });
  });
});
