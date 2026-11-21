import { apiClient } from './apiClient';
import { safeStorage } from '@/utils/storage';

function getLocalOrders(userId) {
  if (!userId) return [];
  const stored = safeStorage.getJSON(`lj_orders_${userId}`);
  return Array.isArray(stored) ? stored : [];
}

function saveLocalOrder(userId, order) {
  if (!userId) return;
  const existing = getLocalOrders(userId);
  const updated = [order, ...existing.filter((o) => (o.orderId || o.id) !== (order.orderId || order.id))];
  safeStorage.setJSON(`lj_orders_${userId}`, updated);
}

export const orderService = {
  async createOrder(orderPayload) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const generatedOrderId = `LJ${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date();
    const estStart = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
    const estEnd = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
    const options = { month: 'short', day: 'numeric' };
    const estimatedDelivery = `${estStart.toLocaleDateString('en-IN', options)} – ${estEnd.toLocaleDateString('en-IN', options)}`;

    const mockPayload = {
      id: `ord_${Date.now()}`,
      ...orderPayload,
      orderId: generatedOrderId,
      status: 'PENDING',
      paymentStatus: orderPayload.paymentMethod === 'COD' ? 'PENDING_COD' : 'INITIALIZED',
      estimatedDelivery,
      createdAt: date.toISOString(),
    };

    if (isMock) {
      if (orderPayload.userId) {
        saveLocalOrder(orderPayload.userId, mockPayload);
      }
      return mockPayload;
    }

    try {
      const res = await apiClient.post('/orders', mockPayload);
      if (res.success && res.data) {
        return res.data;
      }
      return mockPayload;
    } catch (error) {
      console.warn('[orderService] createOrder using fallback:', error);
      return mockPayload;
    }
  },

  async verifyPayment({ orderId, paymentMethod, paymentDetails = {} }) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const patchData = {
      orderId,
      status: 'Confirmed',
      paymentStatus: paymentMethod === 'COD' ? 'PENDING_COD' : 'PAID',
      paymentDetails,
      verifiedAt: new Date().toISOString(),
    };

    if (isMock) {
      return patchData;
    }

    try {
      const res = await apiClient.patch(`/orders/${orderId}`, patchData);
      if (res.success && res.data) {
        return res.data;
      }
      return patchData;
    } catch (error) {
      console.warn('[orderService] verifyPayment simulated in development:', error);
      return patchData;
    }
  },

  async getOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`);
  },

  async getUserOrders(userId) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const activeUid =
      userId ||
      (typeof window !== 'undefined'
        ? safeStorage.getJSON('lj_user_data')?.id
        : null);

    if (!isMock) {
      try {
        const res = await apiClient.get('/orders/me');
        if (res.success && Array.isArray(res.data)) {
          return res;
        }
      } catch (err) {
        console.warn('[orderService] getUserOrders backend error:', err);
      }

      if (activeUid) {
        return apiClient.get('/orders', { params: { userId: activeUid } });
      }
    }

    const localOrders = getLocalOrders(activeUid);
    return { success: true, data: localOrders };
  },
};

export default orderService;
