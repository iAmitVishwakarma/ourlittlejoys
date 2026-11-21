import { describe, it, expect, beforeEach } from 'vitest';
import { addressService } from '../addressService';

describe('addressService', () => {
  const userId = 'test_addr_user_01';

  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default seed address for user', async () => {
    const addresses = await addressService.getUserAddresses(userId);
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBeGreaterThan(0);
    expect(addresses[0].isDefault).toBe(true);
  });

  it('adds a new address to user profile', async () => {
    const newAddr = {
      type: 'Work',
      name: 'Pooja',
      phone: '9876543210',
      addressLine: 'Tech Park, Floor 3',
      locality: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      isDefault: false,
    };

    const updated = await addressService.addAddress(userId, newAddr);
    expect(updated.length).toBeGreaterThan(1);
    const found = updated.find((a) => a.addressLine === newAddr.addressLine);
    expect(found).toBeDefined();
    expect(found.city).toBe('Bengaluru');
  });

  it('updates an existing address', async () => {
    const addresses = await addressService.getUserAddresses(userId);
    const target = addresses[0];

    const updated = await addressService.updateAddress(userId, target.id, {
      city: 'Indore',
      pincode: '452001',
    });

    const modified = updated.find((a) => a.id === target.id);
    expect(modified.city).toBe('Indore');
    expect(modified.pincode).toBe('452001');
  });

  it('deletes an address from user profile', async () => {
    const addresses = await addressService.getUserAddresses(userId);
    const target = addresses[0];

    const updated = await addressService.deleteAddress(userId, target.id);
    const found = updated.find((a) => a.id === target.id);
    expect(found).toBeUndefined();
  });
});
