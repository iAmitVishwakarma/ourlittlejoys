/**
 * ============================================================================
 * EXTENSIBLE API CLIENT - OUR LITTLE JOYS
 * ============================================================================
 * Production-ready HTTP client wrapper for REST API communication.
 * Handles JWT token injection, unified error parsing, timeout handling,
 * and standard response format { success, data, message }.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const DEFAULT_TIMEOUT = 10000;

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Standard request dispatcher
 */
async function sendRequest(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('lj_auth_token') : null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 204 No Content
    if (response.status === 204) {
      return { success: true, data: null, message: 'Success' };
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = payload?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new ApiError(errorMsg, response.status, payload);
    }

    return {
      success: true,
      data: payload?.data !== undefined ? payload.data : payload,
      message: payload?.message || 'Success'
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.warn(`[API Client] Request to "${endpoint}" timed out.`);
      return {
        success: false,
        data: null,
        message: 'Request timed out. Please check your connection and try again.'
      };
    }

    console.warn(`[API Client] Request to "${endpoint}" failed:`, error.message);
    return {
      success: false,
      data: null,
      message: error.message || 'An unexpected network error occurred.'
    };
  }
}

export const apiClient = {
  /**
   * HTTP GET Request
   * @param {string} endpoint - API path or absolute URL
   * @param {Record<string, any>} [params] - Query parameters
   * @param {RequestInit} [options] - Additional fetch options
   */
  async get(endpoint, params = {}, options = {}) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ).toString();
    const finalEndpoint = query ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}${query}` : endpoint;
    return sendRequest(finalEndpoint, { ...options, method: 'GET' });
  },

  /**
   * HTTP POST Request
   * @param {string} endpoint - API path or absolute URL
   * @param {any} body - Request payload object
   * @param {RequestInit} [options] - Additional fetch options
   */
  async post(endpoint, body = {}, options = {}) {
    return sendRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  /**
   * HTTP PUT Request
   */
  async put(endpoint, body = {}, options = {}) {
    return sendRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  /**
   * HTTP DELETE Request
   */
  async delete(endpoint, options = {}) {
    return sendRequest(endpoint, { ...options, method: 'DELETE' });
  }
};

export default apiClient;
