import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { paymentService } from '../paymentService';

describe('paymentService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('processes Cash on Delivery (COD) immediately without gateway delay', async () => {
    const onSuccess = vi.fn();
    const onFailure = vi.fn();

    await paymentService.processPayment({
      orderTotal: 1008,
      paymentMethod: 'COD',
      customerDetails: { name: 'Parent', phone: '9876543210' },
      onSuccess,
      onFailure,
    });

    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        paymentMethod: 'Cash on Delivery',
        status: 'CONFIRMED',
      })
    );
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('processes simulated online payment with simulated gateway transaction', async () => {
    const onSuccess = vi.fn();
    const onFailure = vi.fn();

    // Mock loadRazorpayScript to return false so simulated gateway is exercised
    vi.spyOn(paymentService, 'loadRazorpayScript').mockResolvedValue(false);

    await paymentService.processPayment({
      orderTotal: 549,
      paymentMethod: 'UPI',
      customerDetails: { name: 'Parent', phone: '9876543210' },
      onSuccess,
      onFailure,
    });

    expect(onSuccess).not.toHaveBeenCalled();

    // Fast forward simulated gateway timeout (1200ms)
    vi.advanceTimersByTime(1300);

    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        paymentMethod: 'UPI',
        status: 'PAID',
      })
    );
  });

  it('creates payment order with amount properly converted to paise', async () => {
    const order = await paymentService.createPaymentOrder({
      amount: 499,
      customer: { name: 'Test' },
    });

    expect(order.success).toBe(true);
    expect(order.amount).toBe(49900); // 499 * 100
    expect(order.currency).toBe('INR');
    expect(order.order_id).toBeDefined();
  });

  it('verifies simulated payment signatures', async () => {
    const result = await paymentService.verifyPaymentSignature({
      razorpay_order_id: 'order_123',
      razorpay_payment_id: 'pay_123',
      razorpay_signature: 'sig_123',
    });

    expect(result.success).toBe(true);
    expect(result.verified).toBe(true);
  });
});
