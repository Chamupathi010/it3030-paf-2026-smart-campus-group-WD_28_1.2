import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
      }),

      updateUser: (user) => set({ user }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),

      hasRole: (role) => {
        const { user } = get();
        return user?.roles?.includes(role) ?? false;
      },

      isAdmin: () => get().hasRole('ADMIN'),
      isTechnician: () => get().hasRole('TECHNICIAN'),
    }),
    {
      name: 'facility-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
