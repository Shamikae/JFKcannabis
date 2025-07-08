import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Truck,
  Star,
  AlertTriangle,
  Eye,
  Calendar,
  Clock,
  Target,
  Zap,
  Brain,
  Globe
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'order' | 'user' | 'product' | 'delivery';
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const AdminOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, [timeRange]);

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$127,450',
      change: '+12.5%',
      changeType: 'positive',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-600'
    },
    {
      title: 'Orders',
      value: '1,247',
      change: '+8.3%',
      changeType: 'positive',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: '3,892',
      change: '+15.2%',
      changeType: 'positive',
      icon: <Users className="h-6 w-6" />,
      color: 'text-purple-600'
    },
    {
      title: 'Products Sold',
      value: '8,456',
      change: '+5.7%',
      changeType: 'positive',
      icon: <Package className="h-6 w-6" />,
      color: 'text-orange-600'
    },
    {
      title: 'Deliveries',
      value: '892',
      change: '+22.1%',
      changeType: 'positive',
      icon: <Truck className="h-6 w-6" />,
      color: 'text-indigo-600'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: <Star className="h-6 w-6" />,
      color: 'text-yellow-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: <Target className="h-6 w-6" />,
      color: 'text-cyan-600'
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '+18.9%',
      changeType: 'positive',
      icon: <Eye className="h-6 w-6" />,
      color: 'text-pink-600'
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'order',
      description: 'New order #1234 - $89.50 from Queens, NY',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'user',
      description: 'New VIP member registration - John Smith',
      timestamp: '15 minutes ago',
      status: 'info'
    },
    {
      id: '3',
      type: 'product',
      description: 'Low stock alert: Blue Dream (8 units left)',
      timestamp: '1 hour ago',
      status: 'warning'
    },
    {
      id: '4',
      type: 'delivery',
      description: 'Delivery completed to JFK Airport Terminal 4',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '5',
      type: 'order',
      description: 'Order #1233 cancelled - Payment failed',
      timestamp: '3 hours ago',
      status: 'error'
    }
  ];

  const topProducts = [
    { name: 'Blue Dream 3.5g', sales: 156, revenue: 8580, trend: 'up' },
    { name: 'Cosmic Gummies', sales: 134, revenue: 3350, trend: 'up' },
    { name: 'Northern Lights Cart', sales: 98, revenue: 4900, trend: 'down' },
    { name: 'Gelato Pre-Rolls', sales: 87, revenue: 5655, trend: 'up' },
    { name: 'CBD Recovery Balm', sales: 76, revenue: 3420, trend: 'up' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your dispensary.</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                {metric.icon}
              </div>
              <div className={`flex items-center text-sm ${
                metric.changeType === 'positive' ? 'text-green-600' : 
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : metric.changeType === 'negative' ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : null}
                {metric.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">Revenue</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Orders</button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <div className={`flex items-center text-sm ${
                    product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-red-900">Low Stock</p>
                  <p className="text-xs text-red-700">8 products need restocking</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Pending Orders</p>
                  <p className="text-xs text-yellow-700">12 orders awaiting processing</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Brain className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-900">AI Insights</p>
                  <p className="text-xs text-blue-700">New recommendations available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium">Add New Product</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium">Manage Users</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium">Track Deliveries</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium">View Analytics</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;