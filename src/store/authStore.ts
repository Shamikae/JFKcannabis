import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock admin users for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'admin@jfkcannabis.com',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Admin User',
    role: 'admin' as const,
    permissions: ['all']
  },
  {
    id: '2',
    email: 'manager@jfkcannabis.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager' as const,
    permissions: ['products', 'orders', 'inventory', 'content']
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Find user with matching credentials
          const user = mockUsers.find(u => u.email === email && u.password === password);
          
          if (!user) {
            throw new Error('Invalid email or password');
          }
          
          // Create a mock JWT token
          const token = `mock-jwt-token-${Date.now()}`;
          
          // Remove password before storing user
          const { password: _, ...userWithoutPassword } = user;
          
          set({
            user: userWithoutPassword,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            isLoading: false
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      checkAuth: () => {
        const { token, user } = get();
        return !!(token && user);
      }
    }),
    {
      name: 'jfk-cannabis-auth',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);