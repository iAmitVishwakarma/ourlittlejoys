import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        name: 'Pooja Sharma',
        phone: '9876543210',
        email: 'pooja.sharma@example.com',
        childName: 'Kabir',
        childAge: '4',
        nutritionGoal: 'Immunity & Daily Growth',
        walletBalance: 450
      },
      isAuthenticated: true,

      login: (userData) => {
        set({
          user: {
            name: userData.name || 'Pooja Sharma',
            phone: userData.phone || '9876543210',
            email: userData.email || 'pooja.sharma@example.com',
            childName: userData.childName || 'Kabir',
            childAge: userData.childAge || '4',
            nutritionGoal: userData.nutritionGoal || 'Immunity & Daily Growth',
            walletBalance: userData.walletBalance ?? 450
          },
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },

      updateProfile: (updatedFields) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : updatedFields
        }));
      },

      updateChildProfile: ({ childName, childAge, nutritionGoal }) => {
        set((state) => ({
          user: state.user ? { ...state.user, childName, childAge, nutritionGoal } : null
        }));
      }
    }),
    {
      name: 'lj_auth_store_v2'
    }
  )
);
