import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Amit Sharma',
    mobile: '9876543210',
    pincode: '462016',
    addressLine: 'Flat 402, Sunshine Orchards, Arera Colony',
    locality: 'Near 10 Number Market',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    type: 'HOME',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Amit Sharma',
    mobile: '9876543210',
    pincode: '452010',
    addressLine: '4th Floor, Tech Park, Scheme 54',
    locality: 'Near Meghdoot Garden, Vijay Nagar',
    city: 'Indore',
    state: 'Madhya Pradesh',
    type: 'WORK',
    isDefault: false
  }
];

export const useCheckoutStore = create(
  persist(
    (set, get) => ({
      savedAddresses: INITIAL_ADDRESSES,
      selectedAddressId: 'addr-1',
      paymentMethod: 'UPI', // 'UPI' | 'CARD' | 'WALLET' | 'COD'
      upiApp: 'GPAY', // 'GPAY' | 'PHONEPE' | 'PAYTM' | 'CRED' | 'CUSTOM'
      customUpiId: '',
      useWalletBalance: false,
      walletBalance: 350,
      orders: [],
      lastOrder: null,

      // Address Actions
      selectAddress: (id) => set({ selectedAddressId: id }),

      addAddress: (addressData) => {
        const newId = `addr-${Date.now()}`;
        const isFirstOrSetDefault = addressData.isDefault || get().savedAddresses.length === 0;

        const updatedAddresses = isFirstOrSetDefault
          ? get().savedAddresses.map((a) => ({ ...a, isDefault: false }))
          : [...get().savedAddresses];

        const newAddress = {
          ...addressData,
          id: newId,
          isDefault: isFirstOrSetDefault
        };

        set({
          savedAddresses: [newAddress, ...updatedAddresses],
          selectedAddressId: newId
        });

        return newId;
      },

      updateAddress: (id, updatedData) => {
        const isDefault = updatedData.isDefault;
        set((state) => ({
          savedAddresses: state.savedAddresses.map((a) => {
            if (a.id === id) {
              return { ...a, ...updatedData };
            }
            if (isDefault) {
              return { ...a, isDefault: false };
            }
            return a;
          })
        }));
      },

      removeAddress: (id) => {
        const remaining = get().savedAddresses.filter((a) => a.id !== id);
        let nextSelectedId = get().selectedAddressId;
        if (get().selectedAddressId === id) {
          nextSelectedId = remaining[0]?.id || null;
        }
        set({
          savedAddresses: remaining,
          selectedAddressId: nextSelectedId
        });
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          savedAddresses: state.savedAddresses.map((a) => ({
            ...a,
            isDefault: a.id === id
          })),
          selectedAddressId: id
        }));
      },

      // Payment Actions
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setUpiApp: (app) => set({ upiApp: app }),
      setCustomUpiId: (id) => set({ customUpiId: id }),
      toggleUseWallet: () => set((state) => ({ useWalletBalance: !state.useWalletBalance })),

      // Order Placement
      createOrder: (orderPayload) => {
        const orderId = `LJ${Math.floor(100000 + Math.random() * 900000)}`;
        const date = new Date();
        const estStart = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
        const estEnd = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);

        const options = { month: 'short', day: 'numeric' };
        const estimatedDelivery = `${estStart.toLocaleDateString('en-IN', options)} – ${estEnd.toLocaleDateString('en-IN', options)}`;

        const newOrder = {
          orderId,
          createdAt: date.toISOString(),
          estimatedDelivery,
          status: 'Confirmed',
          ...orderPayload
        };

        set((state) => ({
          lastOrder: newOrder,
          orders: [newOrder, ...state.orders]
        }));

        return newOrder;
      }
    }),
    {
      name: 'littlejoys-checkout-storage'
    }
  )
);
