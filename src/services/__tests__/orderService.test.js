import { describe, it, expect, vi, beforeEach } from 'vitest';
import { orderService } from '../orderService';
import { apiClient } from '../apiClient';

describe('orderService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates an order with items, pricing breakdown, and generated orderId', async () => {
    const payload = {
      items: [{ id: 'p1', title: 'Nutrimix', price: 549, quantity: 2 }],
      totalAmount: 1098,
      paymentMethod: 'COD',
      address: { name: 'Amit', city: 'Bhopal' },
    };

    const order = await orderService.createOrder(payload);

    expect(order).toBeDefined();
    expect(order.orderId).toMatch(/^LJ\d{6}$/);
    expect(order.status).toBe('PENDING');
    expect(order.paymentStatus).toBe('PENDING_COD');
    expect(order.items).toHaveLength(1);
    expect(order.estimatedDelivery).toBeDefined();
  });

  it('verifies and updates payment status on order', async () => {
    const res = await orderService.verifyPayment({
      orderId: 'LJ123456',
      paymentMethod: 'UPI',
      paymentDetails: { txnId: 'TXN_123' },
    });

    expect(res.orderId).toBe('LJ123456');
    expect(res.status).toBe('Confirmed');
    expect(res.paymentStatus).toBe('PAID');
    expect(res.verifiedAt).toBeDefined();
  });

  it('retrieves order details by ID', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValueOnce({
      success: true,
      data: { orderId: 'LJ999888', totalAmount: 799 },
    });

    const res = await orderService.getOrderById('LJ999888');
    expect(res.success).toBe(true);
    expect(res.data.orderId).toBe('LJ999888');
  });
});
