/**
 * ============================================================================
 * USER-SCOPED ADDRESS SERVICE - OUR LITTLE JOYS
 * ============================================================================
 */

import { apiClient } from './apiClient';

function getLocalAddresses(userId) {
  try {
    const raw = localStorage.getItem(`lj_addresses_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }

  // Default seed address for user_001
  return [
    {
      id: 'addr_001',
      userId: userId || 'user_001',
      type: 'Home',
      name: 'Demo User',
      phone: '9876543210',
      addressLine: 'Flat 402, Sunshine Orchards, Arera Colony',
      locality: 'Near 10 Number Market',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016',
      isDefault: true
    }
  ];
}

function saveLocalAddresses(userId, addresses) {
  try {
    localStorage.setItem(`lj_addresses_${userId}`, JSON.stringify(addresses));
  } catch (e) {
    console.error(e);
  }
}

export const addressService = {
  async getUserAddresses(userId) {
    if (!userId) return [];
    try {
      const res = await apiClient.get('/addresses', { userId });
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        saveLocalAddresses(userId, res.data);
        return res.data;
      }
    } catch (err) {
      console.warn('[addressService] getUserAddresses fallback:', err.message);
    }
    return getLocalAddresses(userId);
  },

  async addAddress(userId, addressData) {
    if (!userId) throw new Error('Authentication required');
    const newAddress = {
      ...addressData,
      id: `addr_${Date.now()}`,
      userId,
      isDefault: Boolean(addressData.isDefault)
    };

    const current = await this.getUserAddresses(userId);
    const updated = newAddress.isDefault
      ? [newAddress, ...current.map((a) => ({ ...a, isDefault: false }))]
      : [newAddress, ...current];

    await apiClient.post('/addresses', newAddress).catch(() => {});
    saveLocalAddresses(userId, updated);
    return updated;
  },

  async updateAddress(userId, addressId, updatedFields) {
    if (!userId) return [];
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

    await apiClient.patch(`/addresses/${addressId}`, updatedFields).catch(() => {});
    saveLocalAddresses(userId, updated);
    return updated;
  },

  async deleteAddress(userId, addressId) {
    if (!userId) return [];
    const current = await this.getUserAddresses(userId);
    const updated = current.filter((addr) => addr.id !== addressId);
    await apiClient.delete(`/addresses/${addressId}`).catch(() => {});
    saveLocalAddresses(userId, updated);
    return updated;
  }
};

export default addressService;
