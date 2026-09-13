/**
 * ============================================================================
 * EXTENSIBLE API CLIENT - OUR LITTLE JOYS
 * ============================================================================
 * Production-ready HTTP client wrapper powered by Axios for REST API communication.
 * Handles JWT token injection, unified error parsing, timeout handling,
 * and standard response format { success, data, message }.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const DEFAULT_TIMEOUT = 10000;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

let authTokenGetter = null;

/**
 * Configure dynamic token resolver (e.g. from authStore)
 */
export const setAuthTokenGetter = (fn) => {
  authTokenGetter = fn;
};

/**
 * Resolve current active JWT / bearer token
 */
export const getAuthToken = () => {
  if (typeof authTokenGetter === 'function') {
    try {
      const t = authTokenGetter();
      if (t) return t;
    } catch {
      // ignore
    }
  }
  if (typeof window !== 'undefined') {
    const direct = localStorage.getItem('lj_auth_token');
    if (direct) return direct;
    try {
      const persisted = localStorage.getItem('lj_auth_session_v3');
      if (persisted) {
        const parsed = JSON.parse(persisted);
        if (parsed?.state?.token) return parsed.state.token;
      }
    } catch {
      // ignore
    }
  }
  return null;
};

// Request Interceptor: Inject JWT token into Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Uniform error handling & 401 session clearing
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      console.warn('[API Client] Unauthorized 401 received from server.');
      try {
        localStorage.removeItem('lj_auth_token');
        window.dispatchEvent(new CustomEvent('lj:unauthorized'));
      } catch {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Standardized request helper
 */
async function executeRequest(fn) {
  try {
    const response = await fn();
    return {
      success: true,
      data: response.data !== undefined ? response.data : null,
      message: 'Success',
      status: response.status,
    };
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred.';

    console.warn(`[API Client] Request failed [${status}]:`, message);
    return {
      success: false,
      data: null,
      message,
      status,
    };
  }
}

export const apiClient = {
  instance: axiosInstance,

  /**
   * HTTP GET Request
   */
  async get(endpoint, params = {}, config = {}) {
    return executeRequest(() =>
      axiosInstance.get(endpoint, { ...config, params })
    );
  },

  /**
   * HTTP POST Request
   */
  async post(endpoint, data = {}, config = {}) {
    return executeRequest(() => axiosInstance.post(endpoint, data, config));
  },

  /**
   * HTTP PUT Request
   */
  async put(endpoint, data = {}, config = {}) {
    return executeRequest(() => axiosInstance.put(endpoint, data, config));
  },

  /**
   * HTTP PATCH Request
   */
  async patch(endpoint, data = {}, config = {}) {
    return executeRequest(() => axiosInstance.patch(endpoint, data, config));
  },

  /**
   * HTTP DELETE Request
   */
  async delete(endpoint, config = {}) {
    return executeRequest(() => axiosInstance.delete(endpoint, config));
  },
};

export default apiClient;
