import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAnalyticsData } from '../services/googleAnalytics';
import { 
  generateMarketingSuggestions, 
  generateBusinessSuggestions,
  generateSeoSuggestions,
  generateProductSuggestions,
  generateCustomerInsights,
  MarketingSuggestion,
  BusinessSuggestion,
  SeoSuggestion,
  ProductSuggestion,
  CustomerInsight
} from '../services/aiSuggestions';

interface AnalyticsState {
  analyticsData: any;
  marketingSuggestions: MarketingSuggestion[];
  businessSuggestions: BusinessSuggestion[];
  seoSuggestions: SeoSuggestion[];
  productSuggestions: ProductSuggestion[];
  customerInsights: CustomerInsight[];
  isLoading: boolean;
  error: string | null;
  lastFetched: string | null;
  
  // Actions
  fetchAnalyticsData: () => Promise<void>;
  fetchAllSuggestions: () => Promise<void>;
  fetchMarketingSuggestions: () => Promise<void>;
  fetchBusinessSuggestions: () => Promise<void>;
  fetchSeoSuggestions: () => Promise<void>;
  fetchProductSuggestions: () => Promise<void>;
  fetchCustomerInsights: () => Promise<void>;
  saveSuggestionFeedback: (id: string, type: string, feedback: string) => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      analyticsData: null,
      marketingSuggestions: [],
      businessSuggestions: [],
      seoSuggestions: [],
      productSuggestions: [],
      customerInsights: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      
      fetchAnalyticsData: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await getAnalyticsData();
          
          set({
            analyticsData: data,
            isLoading: false,
            lastFetched: new Date().toISOString()
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch analytics data',
            isLoading: false
          });
        }
      },
      
      fetchAllSuggestions: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const [
            marketingSuggestions,
            businessSuggestions,
            seoSuggestions,
            productSuggestions,
            customerInsights
          ] = await Promise.all([
            generateMarketingSuggestions(),
            generateBusinessSuggestions(),
            generateSeoSuggestions(),
            generateProductSuggestions(),
            generateCustomerInsights()
          ]);
          
          set({
            marketingSuggestions,
            businessSuggestions,
            seoSuggestions,
            productSuggestions,
            customerInsights,
            isLoading: false,
            lastFetched: new Date().toISOString()
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch suggestions',
            isLoading: false
          });
        }
      },
      
      fetchMarketingSuggestions: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const suggestions = await generateMarketingSuggestions();
          
          set({
            marketingSuggestions: suggestions,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch marketing suggestions',
            isLoading: false
          });
        }
      },
      
      fetchBusinessSuggestions: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const suggestions = await generateBusinessSuggestions();
          
          set({
            businessSuggestions: suggestions,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch business suggestions',
            isLoading: false
          });
        }
      },
      
      fetchSeoSuggestions: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const suggestions = await generateSeoSuggestions();
          
          set({
            seoSuggestions: suggestions,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch SEO suggestions',
            isLoading: false
          });
        }
      },
      
      fetchProductSuggestions: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const suggestions = await generateProductSuggestions();
          
          set({
            productSuggestions: suggestions,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch product suggestions',
            isLoading: false
          });
        }
      },
      
      fetchCustomerInsights: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const insights = await generateCustomerInsights();
          
          set({
            customerInsights: insights,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch customer insights',
            isLoading: false
          });
        }
      },
      
      saveSuggestionFeedback: (id: string, type: string, feedback: string) => {
        // In a real app, this would send feedback to the server
        console.log(`Feedback for ${type} suggestion ${id}: ${feedback}`);
      }
    }),
    {
      name: 'jfk-cannabis-analytics',
      partialize: (state) => ({ 
        lastFetched: state.lastFetched
      })
    }
  )
);