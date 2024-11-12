import { create } from 'zustand';
import { User, LoginResponse } from '../services/type';

interface AuthState {
  user: User | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (userData: LoginResponse) => {
    set({ user: userData.user });
    localStorage.setItem('user', JSON.stringify(userData));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },
}));

// Initialize user from localStorage
const storedUser = localStorage.getItem('user');
if (storedUser) {
  try {
    const parsedUser = JSON.parse(storedUser) as LoginResponse;
    useAuthStore.getState().login(parsedUser);
  } catch (error) {
    console.error('Failed to parse stored user data:', error);
    localStorage.removeItem('user');
  }
}
