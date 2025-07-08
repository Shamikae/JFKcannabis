import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ZapierIntegration, mockZapierIntegrations, testZapierConnection } from '../services/zapier';

interface ZapierState {
  integrations: ZapierIntegration[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchIntegrations: () => Promise<void>;
  addIntegration: (integration: Omit<ZapierIntegration, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<void>;
  updateIntegration: (id: string, updates: Partial<ZapierIntegration>) => Promise<void>;
  removeIntegration: (id: string) => Promise<void>;
  testConnection: (webhookUrl: string) => Promise<boolean>;
  toggleIntegration: (id: string) => Promise<void>;
}

export const useZapierStore = create<ZapierState>()(
  persist(
    (set, get) => ({
      integrations: [],
      isLoading: false,
      error: null,
      
      fetchIntegrations: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would call an API
          // For now, use mock data
          set({
            integrations: mockZapierIntegrations,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch Zapier integrations',
            isLoading: false
          });
        }
      },
      
      addIntegration: async (integration) => {
        set({ isLoading: true, error: null });
        
        try {
          const newIntegration: ZapierIntegration = {
            id: `zap-${Date.now()}`,
            ...integration,
            status: 'inactive',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          // Test the connection
          const isConnected = await testZapierConnection(integration.webhookUrl);
          
          if (isConnected) {
            newIntegration.status = 'active';
          } else {
            newIntegration.status = 'error';
            newIntegration.errorMessage = 'Failed to connect to Zapier webhook';
          }
          
          set(state => ({
            integrations: [...state.integrations, newIntegration],
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add Zapier integration',
            isLoading: false
          });
        }
      },
      
      updateIntegration: async (id, updates) => {
        set({ isLoading: true, error: null });
        
        try {
          set(state => ({
            integrations: state.integrations.map(integration => 
              integration.id === id 
                ? { 
                    ...integration, 
                    ...updates, 
                    updatedAt: new Date().toISOString() 
                  } 
                : integration
            ),
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update Zapier integration',
            isLoading: false
          });
        }
      },
      
      removeIntegration: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          set(state => ({
            integrations: state.integrations.filter(integration => integration.id !== id),
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove Zapier integration',
            isLoading: false
          });
        }
      },
      
      testConnection: async (webhookUrl) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await testZapierConnection(webhookUrl);
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to test Zapier connection',
            isLoading: false
          });
          return false;
        }
      },
      
      toggleIntegration: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const integration = get().integrations.find(i => i.id === id);
          
          if (!integration) {
            throw new Error('Integration not found');
          }
          
          const enabled = !integration.enabled;
          
          set(state => ({
            integrations: state.integrations.map(i => 
              i.id === id 
                ? { 
                    ...i, 
                    enabled, 
                    status: enabled ? 'active' : 'inactive',
                    updatedAt: new Date().toISOString() 
                  } 
                : i
            ),
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to toggle Zapier integration',
            isLoading: false
          });
        }
      }
    }),
    {
      name: 'jfk-cannabis-zapier',
      partialize: (state) => ({ 
        integrations: state.integrations
      })
    }
  )
);