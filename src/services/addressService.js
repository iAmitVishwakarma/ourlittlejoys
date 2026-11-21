import { apiClient } from './apiClient';
import { safeStorage } from '@/utils/storage';

const DEFAULT_MOCK_ADDRESSES = (userId) => [
  {
    id: 'addr_001',
    userId: userId || 'user_001',
    type: 'Home',
    name: 'Demo Parent',
    phone: '9876543210',
    addressLine: 'Flat 402, Sunshine Orchards, Arera Colony',
    locality: 'Near 10 Number Market',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462016',
    isDefault: true,
  },
];

function getLocalAddresses(userId) {
  const key = `lj_addresses_${userId}`;
  const stored = safeStorage.getJSON(key);
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  const defaults = DEFAULT_MOCK_ADDRESSES(userId);
  safeStorage.setJSON(key, defaults);
  return defaults;
}

function saveLocalAddresses(userId, addresses) {
  safeStorage.setJSON(`lj_addresses_${userId}`, addresses);
}

export const addressService = {
  async getUserAddresses(userId) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const activeUid =
      userId ||
      (typeof window !== 'undefined'
        ? safeStorage.getJSON('lj_user_data')?.id
        : null) ||
      'user_001';

    if (!isMock) {
      try {
        const res = await apiClient.get('/addresses/me');
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          saveLocalAddresses(activeUid, res.data);
          return res.data;
        }
      } catch (err) {
        console.warn('[addressService] getUserAddresses network error, fallback to local:', err);
      }
    }

    return getLocalAddresses(activeUid);
  },

  async addAddress(userId, addressData) {
    if (!userId) throw new Error('Authentication required to save address');
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    const newAddress = {
      ...addressData,
      id: `addr_${Date.now()}`,
      userId,
      isDefault: Boolean(addressData.isDefault),
    };

    const current = await this.getUserAddresses(userId);
    const updated = newAddress.isDefault
      ? [newAddress, ...current.map((a) => ({ ...a, isDefault: false }))]
      : [newAddress, ...current];

    if (!isMock) {
      try {
        await apiClient.post('/addresses', newAddress);
      } catch (err) {
        console.warn('[addressService] addAddress backend error:', err);
      }
    }

    saveLocalAddresses(userId, updated);
    return updated;
  },

  async updateAddress(userId, addressId, updatedFields) {
    if (!userId) return [];
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const current = await this.getUserAddresses(userId);
    const isDefault = updatedFields.isDefault;

    const updated = current.map((addr) => {
      if (addr.id === addressId) {
        return { ...addr, ...updatedFields };
      }
      if (isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    if (!isMock) {
      try {
        await apiClient.put(`/addresses/${addressId}`, updatedFields);
      } catch (err) {
        console.warn('[addressService] updateAddress backend error:', err);
      }
    }

    saveLocalAddresses(userId, updated);
    return updated;
  },

  async deleteAddress(userId, addressId) {
    if (!userId) return [];
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const current = await this.getUserAddresses(userId);
    const updated = current.filter((addr) => addr.id !== addressId);

    if (!isMock) {
      try {
        await apiClient.delete(`/addresses/${addressId}`);
      } catch (err) {
        console.warn('[addressService] deleteAddress backend error:', err);
      }
    }

    saveLocalAddresses(userId, updated);
    return updated;
  },
};

export default addressService;
