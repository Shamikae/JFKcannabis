import axios from 'axios';

// Base URL for Zapier API
const ZAPIER_API_URL = import.meta.env.VITE_ZAPIER_API_URL || 'https://hooks.zapier.com/hooks/catch';
const ZAPIER_WEBHOOK_KEY = import.meta.env.VITE_ZAPIER_WEBHOOK_KEY || '';

// Create axios instance with default config
const zapier = axios.create({
  baseURL: ZAPIER_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interface for Zapier integration
export interface ZapierIntegration {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  webhookUrl: string;
  lastRun?: string;
  status: 'active' | 'inactive' | 'error';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for Zapier webhook payload
export interface ZapierWebhookPayload {
  event: string;
  data: any;
  timestamp: string;
}

// Send data to Zapier webhook
export const sendToZapier = async (integration: ZapierIntegration, data: any): Promise<any> => {
  try {
    const payload: ZapierWebhookPayload = {
      event: integration.trigger,
      data,
      timestamp: new Date().toISOString()
    };
    
    const response = await zapier.post(`/${integration.webhookUrl}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error sending data to Zapier integration ${integration.id}:`, error);
    throw error;
  }
};

// Test Zapier webhook connection
export const testZapierConnection = async (webhookUrl: string): Promise<boolean> => {
  try {
    const testPayload = {
      event: 'test',
      data: { message: 'This is a test from JFK Cannabis Admin' },
      timestamp: new Date().toISOString()
    };
    
    await zapier.post(`/${webhookUrl}`, testPayload);
    return true;
  } catch (error) {
    console.error('Error testing Zapier connection:', error);
    return false;
  }
};

// Mock Zapier integrations for development
export const mockZapierIntegrations: ZapierIntegration[] = [
  {
    id: 'zap-001',
    name: 'New Order Notification',
    description: 'Send Slack notification when new order is placed',
    trigger: 'order.created',
    action: 'Send Slack message',
    enabled: true,
    webhookUrl: 'abc123/new-order-slack',
    lastRun: '2024-12-20T10:30:00Z',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  },
  {
    id: 'zap-002',
    name: 'Low Inventory Alert',
    description: 'Send email when product inventory is low',
    trigger: 'inventory.low',
    action: 'Send email',
    enabled: true,
    webhookUrl: 'abc123/low-inventory-email',
    lastRun: '2024-12-19T15:45:00Z',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  },
  {
    id: 'zap-003',
    name: 'New Customer to CRM',
    description: 'Add new customers to HubSpot CRM',
    trigger: 'customer.created',
    action: 'Create HubSpot contact',
    enabled: false,
    webhookUrl: 'abc123/new-customer-hubspot',
    status: 'inactive',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  }
];

// AI-suggested Zapier integrations
export const getAiSuggestedIntegrations = (): {name: string; description: string; benefit: string}[] => {
  return [
    {
      name: 'Inventory Sync with Alleaves',
      description: 'Automatically sync inventory changes between Alleaves POS and your website',
      benefit: 'Saves 5+ hours per week on manual inventory updates'
    },
    {
      name: 'Customer Birthday Promotions',
      description: 'Send special offers to customers on their birthday',
      benefit: 'Increases customer retention by 15% and drives repeat purchases'
    },
    {
      name: 'Abandoned Cart Recovery',
      description: 'Send automated emails to customers who abandon their carts',
      benefit: 'Recovers up to 10% of abandoned carts, increasing revenue'
    },
    {
      name: 'Google Sheets Order Log',
      description: 'Log all orders in a Google Sheet for easy reporting',
      benefit: 'Simplifies reporting and analysis without manual data entry'
    },
    {
      name: 'Review Request Automation',
      description: 'Send review requests to customers after delivery',
      benefit: 'Increases review collection by 300%, improving SEO and trust'
    },
    {
      name: 'Delivery Status Updates via SMS',
      description: 'Send SMS updates when delivery status changes',
      benefit: 'Improves customer experience and reduces support inquiries'
    },
    {
      name: 'New Product to Social Media',
      description: 'Automatically post new products to social media',
      benefit: 'Saves time on marketing and ensures consistent product promotion'
    }
  ];
};

export default zapier;