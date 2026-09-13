import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addressService } from '@/services/addressService';
import { orderService } from '@/services/orderService';
import { apiClient } from '@/services/apiClient';

export const useCheckoutStore = create(
  persist(
    (set, get) => ({
      savedAddresses: [],
      selectedAddressId: null,
      activeUserId: null,
      paymentMethod: 'UPI', // 'UPI' | 'CARD' | 'WALLET' | 'COD'
      upiApp: 'GPAY', // 'GPAY' | 'PHONEPE' | 'PAYTM' | 'CRED' | 'CUSTOM'
      customUpiId: '',
      useWalletBalance: false,
      walletBalance: 450,
      orders: [],
      lastOrder: null,

      /**
       * Load addresses for active user
       */
      loadUserAddresses: async (userId) => {
        if (!userId) return;
        set({ activeUserId: userId });
        const addresses = await addressService.getUserAddresses(userId);
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        set({
          savedAddresses: addresses || [],
          selectedAddressId: defaultAddr?.id || null
        });

        // Also fetch user-scoped orders
        try {
          const res = await apiClient.get('/orders', { params: { userId } });
          if (res.success && Array.isArray(res.data)) {
            set({ orders: res.data });
          }
        } catch (e) {
          console.warn('[checkoutStore] loadUserOrders error:', e);
        }
      },

      // Address Selection
      selectAddress: (id) => set({ selectedAddressId: id ? String(id) : null }),

      // Add Address
      addAddress: async (addressData) => {
        const userId = get().activeUserId || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lj_user_data') || '{}')?.id : 'user_001');
        const updated = await addressService.addAddress(userId, addressData);
        const newlyAdded = updated.find((a) => a.name === addressData.name && a.pincode === addressData.pincode) || updated[0];
        
        set({
          savedAddresses: updated,
          selectedAddressId: newlyAdded?.id ? String(newlyAdded.id) : (updated[0]?.id ? String(updated[0].id) : null)
        });

        return newlyAdded?.id || updated[0]?.id;
      },

      // Update Address
      updateAddress: async (id, updatedData) => {
        const userId = get().activeUserId;
        const targetId = String(id);
        if (userId) {
          const updated = await addressService.updateAddress(userId, targetId, updatedData);
          set({ savedAddresses: updated });
        } else {
          set((state) => ({
            savedAddresses: state.savedAddresses.map((a) => (String(a.id) === targetId ? { ...a, ...updatedData } : a))
          }));
        }
      },

      // Remove Address
      removeAddress: async (id) => {
        const userId = get().activeUserId;
        const targetId = String(id);
        const remaining = get().savedAddresses.filter((a) => String(a.id) !== targetId);
        let nextSelectedId = get().selectedAddressId;
        if (String(get().selectedAddressId) === targetId) {
          nextSelectedId = remaining[0]?.id ? String(remaining[0].id) : null;
        }

        set({
          savedAddresses: remaining,
          selectedAddressId: nextSelectedId
        });

        if (userId) {
          await addressService.deleteAddress(userId, targetId);
        }
      },

      // Set Default Address
      setDefaultAddress: async (id) => {
        const userId = get().activeUserId;
        const targetId = String(id);
        const updated = get().savedAddresses.map((a) => ({
          ...a,
          isDefault: String(a.id) === targetId
        }));
        set({
          savedAddresses: updated,
          selectedAddressId: targetId
        });
        if (userId) {
          await addressService.updateAddress(userId, targetId, { isDefault: true });
        }
      },

      // Payment Actions
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setUpiApp: (app) => set({ upiApp: app }),
      setCustomUpiId: (id) => set({ customUpiId: id }),
      toggleUseWallet: () => set((state) => ({ useWalletBalance: !state.useWalletBalance })),

      // Order Placement (Delegated to backend-ready orderService)
      createOrder: async (orderPayload) => {
        const userId = get().activeUserId || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lj_user_data') || '{}')?.id : 'user_001');

        const createdOrder = await orderService.createOrder({
          userId,
          ...orderPayload
        });

        const newOrder = {
          ...createdOrder,
          orderId: createdOrder.orderId || createdOrder.id || `LJ${Math.floor(100000 + Math.random() * 900000)}`,
        };

        set((state) => ({
          lastOrder: newOrder,
          orders: [newOrder, ...state.orders]
        }));

        return newOrder;
      },

      /**
       * Reset draft payment & checkout step state after successful order (F-3.2)
       */
      clearActiveCheckoutDraft: () => {
        set({
          paymentMethod: 'UPI',
          upiApp: 'GPAY',
          customUpiId: '',
          useWalletBalance: false
        });
      },

      /**
       * Reset checkout session on logout (F-4.4)
       */
      resetCheckout: () => {
        set({
          savedAddresses: [],
          selectedAddressId: null,
          activeUserId: null,
          paymentMethod: 'UPI',
          upiApp: 'GPAY',
          customUpiId: '',
          useWalletBalance: false,
          orders: [],
          lastOrder: null
        });
      }
    }),
    {
      name: 'littlejoys-checkout-storage-v3',
      partialize: (state) => ({
        paymentMethod: state.paymentMethod,
        upiApp: state.upiApp,
        lastOrder: state.lastOrder
      })
    }
  )
);

export default useCheckoutStore;
