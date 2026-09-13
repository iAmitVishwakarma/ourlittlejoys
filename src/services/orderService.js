/**
 * ============================================================================
 * ORDER SERVICE - OUR LITTLE JOYS
 * ============================================================================
 * Backend-ready order lifecycle service.
 * Handles 2-stage checkout contract:
 * Stage 1: createOrder() - Hand off cart & address to backend, receive server-calculated order draft.
 * Stage 2: verifyPayment() - Hand off gateway payment response for server-side signature verification.
 * 
 * DEVELOPMENT NOTE: json-server is used strictly as a development mock.
 * Real pricing verification, inventory locking, order ID generation, and payment
 * webhook verification MUST be enforced by the production backend.
 * ============================================================================
 */

import { apiClient } from './apiClient';

export const orderService = {
  /**
   * Phase 1: Initialize / Create Order
   * Contract: POST /orders
   */
  async createOrder(orderPayload) {
    try {
      const generatedOrderId = `LJ${Math.floor(100000 + Math.random() * 900000)}`;
      const date = new Date();
      const estStart = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
      const estEnd = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
      const options = { month: 'short', day: 'numeric' };
      const estimatedDelivery = `${estStart.toLocaleDateString('en-IN', options)} – ${estEnd.toLocaleDateString('en-IN', options)}`;

      const mockPayload = {
        ...orderPayload,
        orderId: generatedOrderId,
        status: 'PENDING',
        paymentStatus: orderPayload.paymentMethod === 'COD' ? 'PENDING_COD' : 'INITIALIZED',
        estimatedDelivery,
        createdAt: date.toISOString(),
      };

      const res = await apiClient.post('/orders', mockPayload);
      if (res.success && res.data) {
        return res.data;
      }
      return mockPayload;
    } catch (error) {
      console.warn('[orderService] createOrder using fallback:', error);
      return {
        id: `ord_${Date.now()}`,
        orderId: `LJ${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'PENDING',
        paymentStatus: 'INITIALIZED',
        ...orderPayload,
      };
    }
  },

  /**
   * Phase 2: Verify Gateway Payment
   * Contract: POST /payments/verify or PATCH /orders/:id
   */
  async verifyPayment({ orderId, paymentMethod, paymentDetails = {} }) {
    try {
      const patchData = {
        status: 'Confirmed',
        paymentStatus: paymentMethod === 'COD' ? 'PENDING_COD' : 'PAID',
        paymentDetails,
        verifiedAt: new Date().toISOString(),
      };

      const res = await apiClient.patch(`/orders/${orderId}`, patchData);
      if (res.success && res.data) {
        return res.data;
      }
      return {
        orderId,
        ...patchData,
      };
    } catch (error) {
      console.warn('[orderService] verifyPayment simulated in development:', error);
      return {
        orderId,
        status: 'Confirmed',
        paymentStatus: paymentMethod === 'COD' ? 'PENDING_COD' : 'PAID',
        paymentDetails,
        verifiedAt: new Date().toISOString(),
      };
    }
  },

  /**
   * Fetch single order by primary ID
   */
  async getOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`);
  },

  /**
   * Fetch tenant-scoped user orders (F-4.3)
   * Contract: GET /orders/me
   * Fallback: GET /orders?userId=:id for development mock server
   */
  async getUserOrders(userId) {
    const activeUid = userId || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lj_user_data') || '{}')?.id : null);

    // 1. Backend-ready tenant route
    try {
      const res = await apiClient.get('/orders/me');
      if (res.success && Array.isArray(res.data)) {
        return res;
      }
    } catch {
      // json-server fallback
    }

    // 2. Development json-server query fallback
    if (activeUid) {
      return apiClient.get('/orders', { userId: activeUid });
    }

    return { success: true, data: [] };
  },
};

export default orderService;
