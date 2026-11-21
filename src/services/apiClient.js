import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let authTokenGetter = null;

export const setAuthTokenGetter = (fn) => {
  authTokenGetter = fn;
};

export const getAuthToken = () => {
  if (typeof authTokenGetter === 'function') {
    try {
      const token = authTokenGetter();
      if (token) return token;
    } catch {
      // Fall through to storage
    }
  }

  if (typeof window !== 'undefined') {
    const directToken = localStorage.getItem('lj_auth_token');
    if (directToken) return directToken;

    try {
      const persisted = localStorage.getItem('lj_auth_session_v3');
      if (persisted) {
        const parsed = JSON.parse(persisted);
        if (parsed?.state?.token) return parsed.state.token;
      }
    } catch {
      // Ignore corrupted json
    }
  }

  return null;
};

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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('lj_auth_token');
        localStorage.removeItem('lj_user_data');
        window.dispatchEvent(new CustomEvent('lj:unauthorized'));
      } catch {
        // Ignore
      }
    }
    return Promise.reject(error);
  }
);

export function normalizeData(res) {
  if (!res) return null;
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
  return res.data !== undefined ? res.data : res;
}

async function executeRequest(fn) {
  try {
    const response = await fn();
    const rawData = response.data;
    const normalizedData =
      rawData && typeof rawData === 'object' && 'data' in rawData && rawData.data !== undefined
        ? rawData.data
        : rawData;

    return {
      success: true,
      data: normalizedData !== undefined ? normalizedData : null,
      raw: rawData,
      pagination: rawData?.pagination || null,
      message: rawData?.message || 'Success',
      status: response.status,
    };
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred.';
    const code =
      error.response?.data?.code ||
      error.code ||
      (status === 401 ? 'UNAUTHORIZED' : status === 404 ? 'NOT_FOUND' : 'SERVER_ERROR');
    const details = error.response?.data?.details || error.response?.data?.errors || null;

    return {
      success: false,
      data: null,
      status,
      message,
      code,
      details,
      error: {
        status,
        code,
        message,
        details,
      },
    };
  }
}

export const apiClient = {
  instance: axiosInstance,

  async get(endpoint, paramsOrConfig = {}, config = {}) {
    const isConfigWithParams =
      paramsOrConfig &&
      typeof paramsOrConfig === 'object' &&
      'params' in paramsOrConfig;

    const requestConfig = isConfigWithParams
      ? { ...paramsOrConfig, ...config }
      : { ...config, params: paramsOrConfig };

    return executeRequest(() => axiosInstance.get(endpoint, requestConfig));
  },

  async post(endpoint, data = {}, config = {}) {
    return executeRequest(() => axiosInstance.post(endpoint, data, config));
  },

  async put(endpoint, data = {}, config = {}) {
    return executeRequest(() => axiosInstance.put(endpoint, data, config));
  },

  async patch(endpoint, data = {}, config = {}) {
    return executeRequest(() => axiosInstance.patch(endpoint, data, config));
  },

  async delete(endpoint, config = {}) {
    return executeRequest(() => axiosInstance.delete(endpoint, config));
  },
};

export default apiClient;
