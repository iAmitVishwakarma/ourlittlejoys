import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { apiClient, axiosInstance, setAuthTokenGetter, getAuthToken, normalizeData } from '../apiClient';

describe('apiClient Service', () => {
  beforeEach(() => {
    localStorage.clear();
    setAuthTokenGetter(null);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('normalizeData helper', () => {
    it('returns null if input is falsy', () => {
      expect(normalizeData(null)).toBeNull();
      expect(normalizeData(undefined)).toBeNull();
    });

    it('returns flat array when response is array', () => {
      const arr = [{ id: 1 }, { id: 2 }];
      expect(normalizeData(arr)).toEqual(arr);
    });

    it('unwraps res.data when it is an array', () => {
      const res = { data: [{ id: 3 }] };
      expect(normalizeData(res)).toEqual([{ id: 3 }]);
    });

    it('unwraps nested envelope res.data.data', () => {
      const res = { data: { data: [{ id: 4 }] } };
      expect(normalizeData(res)).toEqual([{ id: 4 }]);
    });
  });

  describe('getAuthToken resolution', () => {
    it('returns token from custom getter if set', () => {
      setAuthTokenGetter(() => 'jwt_custom_token');
      expect(getAuthToken()).toBe('jwt_custom_token');
    });

    it('falls back to direct localStorage lj_auth_token', () => {
      localStorage.setItem('lj_auth_token', 'direct_token_123');
      expect(getAuthToken()).toBe('direct_token_123');
    });

    it('falls back to persisted zustand session lj_auth_session_v3', () => {
      localStorage.setItem('lj_auth_session_v3', JSON.stringify({ state: { token: 'zustand_token_456' } }));
      expect(getAuthToken()).toBe('zustand_token_456');
    });

    it('returns null when no token is present', () => {
      expect(getAuthToken()).toBeNull();
    });
  });

  describe('HTTP request methods and response envelope', () => {
    it('executes successful GET request and wraps response standardly', async () => {
      vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        status: 200,
        data: { data: [{ id: 'p1', title: 'Nutrimix' }], pagination: { page: 1, total: 1 } },
      });

      const res = await apiClient.get('/products');
      expect(res.success).toBe(true);
      expect(res.status).toBe(200);
      expect(res.data).toEqual([{ id: 'p1', title: 'Nutrimix' }]);
      expect(res.pagination).toEqual({ page: 1, total: 1 });
    });

    it('executes successful POST request', async () => {
      vi.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
        status: 201,
        data: { id: 'o101', status: 'created' },
      });

      const res = await apiClient.post('/orders', { items: [] });
      expect(res.success).toBe(true);
      expect(res.status).toBe(201);
      expect(res.data).toEqual({ id: 'o101', status: 'created' });
    });

    it('executes PUT, PATCH, and DELETE requests', async () => {
      vi.spyOn(axiosInstance, 'put').mockResolvedValueOnce({ status: 200, data: { updated: true } });
      vi.spyOn(axiosInstance, 'patch').mockResolvedValueOnce({ status: 200, data: { patched: true } });
      vi.spyOn(axiosInstance, 'delete').mockResolvedValueOnce({ status: 200, data: { deleted: true } });

      const putRes = await apiClient.put('/users/1', { name: 'New' });
      expect(putRes.success).toBe(true);

      const patchRes = await apiClient.patch('/users/1', { phone: '999' });
      expect(patchRes.success).toBe(true);

      const deleteRes = await apiClient.delete('/users/1');
      expect(deleteRes.success).toBe(true);
    });

    it('gracefully handles network failures and HTTP 500 without crashing', async () => {
      vi.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
        response: { status: 500, data: { message: 'Database connection failed' } },
      });

      const res = await apiClient.get('/products');
      expect(res.success).toBe(false);
      expect(res.status).toBe(500);
      expect(res.message).toBe('Database connection failed');
      expect(res.data).toBeNull();
    });

    it('handles offline or network unreachable errors', async () => {
      vi.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('Network Error'));

      const res = await apiClient.get('/products');
      expect(res.success).toBe(false);
      expect(res.status).toBe(500);
      expect(res.message).toBe('Network Error');
    });
  });
});
