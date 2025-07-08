import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Star,
  Package,
  Calendar
} from 'lucide-react';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    type: 'order' | 'signup' | 'review';
    description: string;
    timestamp: string;
  }>;
  conversionRate: number;
  cartAbandonmentRate: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch analytics data
    const fetchAnalytics = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would come from your analytics API
      const mockData: AnalyticsData = {
        totalRevenue: 45678.90,
        totalOrders: 234,
        totalCustomers: 156,
        averageOrderValue: 195.25,
        topProducts: [
          { id: 'f1', name: 'Blue Dream', sales: 45, revenue: 2475.00 },
          { id: 'e1', name: 'Cosmic Gummies', sales: 38, revenue: 950.00 },
          { id: 'v1', name: 'Northern Lights Cart', sales: 32, revenue: 1600.00 },
          { id: 'pr1', name: 'Gelato Pre-Roll 5-Pack', sales: 28, revenue: 1820.00 },
          { id: 't1', name: 'CBD Recovery Balm', sales: 25, revenue: 1125.00 }
        ],
        recentActivity: [
          { type: 'order', description: 'New order #1234 - $89.50', timestamp: '2 minutes ago' },
          { type: 'signup', description: 'New customer registration', timestamp: '15 minutes ago' },
          { type: 'review', description: '5-star review for Blue Dream', timestamp: '1 hour ago' },
          { type: 'order', description: 'New order #1233 - $156.75', timestamp: '2 hours ago' }
        ],
        conversionRate: 3.2,
        cartAbandonmentRate: 68.5
      };
      
      setTimeout(() => {
        setAnalyticsData(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                <div className="h-8 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
  }> = ({ title, value, icon, change, changeType = 'neutral' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-neutral-600">{title}</div>
        <div className="text-primary-600">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-neutral-900 mb-2">{value}</div>
      {change && (
        <div className={`text-sm flex items-center ${
          changeType === 'positive' ? 'text-green-600' : 
          changeType === 'negative' ? 'text-red-600' : 'text-neutral-600'
        }`}>
          <TrendingUp className="h-4 w-4 mr-1" />
          {change}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-4 py-2"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          change="+12.5% from last period"
          changeType="positive"
        />
        <StatCard
          title="Total Orders"
          value={analyticsData.totalOrders.toLocaleString()}
          icon={<ShoppingCart className="h-6 w-6" />}
          change="+8.3% from last period"
          changeType="positive"
        />
        <StatCard
          title="New Customers"
          value={analyticsData.totalCustomers.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
          change="+15.2% from last period"
          changeType="positive"
        />
        <StatCard
          title="Average Order Value"
          value={`$${analyticsData.averageOrderValue.toFixed(2)}`}
          icon={<TrendingUp className="h-6 w-6" />}
          change="+5.7% from last period"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-primary-600" />
            Top Products
          </h2>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-neutral-500">{product.sales} sales</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${product.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'signup' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm">{activity.description}</div>
                  <div className="text-xs text-neutral-500">{activity.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Conversion Rate"
          value={`${analyticsData.conversionRate}%`}
          icon={<Eye className="h-6 w-6" />}
          change="+0.8% from last period"
          changeType="positive"
        />
        <StatCard
          title="Cart Abandonment Rate"
          value={`${analyticsData.cartAbandonmentRate}%`}
          icon={<ShoppingCart className="h-6 w-6" />}
          change="-2.3% from last period"
          changeType="positive"
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;