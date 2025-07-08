import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Target,
  ArrowUp,
  ArrowDown,
  Zap,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  Truck,
  Package,
  Star,
  FileText,
  Settings,
  Clipboard
} from 'lucide-react';
import { getSalesData, getForecasts, getAnalytics } from '../../firebase/services';
import debounce from 'lodash.debounce';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for development
const mockSalesData = [
  { month: 'Jan', revenue: 125000, orders: 1250, customers: 850 },
  { month: 'Feb', revenue: 145000, orders: 1450, customers: 920 },
  { month: 'Mar', revenue: 165000, orders: 1650, customers: 980 },
  { month: 'Apr', revenue: 185000, orders: 1850, customers: 1050 },
  { month: 'May', revenue: 205000, orders: 2050, customers: 1120 },
  { month: 'Jun', revenue: 225000, orders: 2250, customers: 1190 },
  { month: 'Jul', revenue: 245000, orders: 2450, customers: 1260 },
  { month: 'Aug', revenue: 265000, orders: 2650, customers: 1330 },
  { month: 'Sep', revenue: 285000, orders: 2850, customers: 1400 },
  { month: 'Oct', revenue: 305000, orders: 3050, customers: 1470 },
  { month: 'Nov', revenue: 325000, orders: 3250, customers: 1540 },
  { month: 'Dec', revenue: 345000, orders: 3450, customers: 1610 }
];

const mockForecasts = {
  nextQuarter: {
    revenue: 1200000,
    growth: 15.2,
    topCategories: [
      { name: 'Flower', percentage: 35 },
      { name: 'Vapes', percentage: 25 },
      { name: 'Edibles', percentage: 20 },
      { name: 'Pre-Rolls', percentage: 12 },
      { name: 'Concentrates', percentage: 8 }
    ],
    opportunities: [
      { name: 'Expand delivery to Long Island', impact: 'high', revenue: 250000 },
      { name: 'Launch subscription box service', impact: 'medium', revenue: 180000 },
      { name: 'Increase airport marketing', impact: 'high', revenue: 220000 }
    ],
    risks: [
      { name: 'New competitor opening nearby', impact: 'medium', probability: 'high' },
      { name: 'Supply chain disruption', impact: 'high', probability: 'low' },
      { name: 'Regulatory changes', impact: 'high', probability: 'medium' }
    ]
  },
  pathToTrillion: {
    currentValuation: 5000000,
    yearsToTrillion: 25,
    requiredCAGR: 58.2,
    keyMilestones: [
      { name: '$10M Annual Revenue', year: 2025, strategies: ['Expand to 3 locations', 'Launch e-commerce platform'] },
      { name: '$100M Annual Revenue', year: 2028, strategies: ['Regional expansion', 'Product line diversification'] },
      { name: '$1B Annual Revenue', year: 2032, strategies: ['National expansion', 'International partnerships'] },
      { name: '$10B Annual Revenue', year: 2037, strategies: ['Global market penetration', 'Vertical integration'] },
      { name: '$100B Annual Revenue', year: 2042, strategies: ['Industry consolidation', 'Technology innovation'] },
      { name: '$1T Valuation', year: 2050, strategies: ['Ecosystem dominance', 'Category creation'] }
    ],
    aiRecommendations: [
      'Invest heavily in proprietary cannabis technology',
      'Develop unique intellectual property around cultivation methods',
      'Create a global cannabis brand with consistent experience',
      'Establish strategic partnerships with pharmaceutical companies',
      'Invest in cannabis research and medical applications',
      'Develop a cannabis lifestyle ecosystem beyond products'
    ]
  }
};

const mockAnalytics = {
  kpis: {
    revenue: { value: 345000, change: 12.5, target: 350000 },
    orders: { value: 3450, change: 8.3, target: 3500 },
    customers: { value: 1610, change: 15.2, target: 1650 },
    aov: { value: 100, change: 5.2, target: 105 }
  },
  performance: {
    categories: [
      { name: 'Flower', sales: 120750, change: 15.2 },
      { name: 'Vapes', sales: 86250, change: 10.5 },
      { name: 'Edibles', sales: 69000, change: 18.7 },
      { name: 'Pre-Rolls', sales: 41400, change: 22.1 },
      { name: 'Concentrates', sales: 27600, change: 8.3 }
    ],
    locations: [
      { name: 'In-Store', sales: 172500, change: 5.2 },
      { name: 'Delivery', sales: 138000, change: 25.8 },
      { name: 'Drive-Thru', sales: 34500, change: 45.2 }
    ],
    timeOfDay: [
      { time: 'Morning (9am-12pm)', percentage: 15 },
      { time: 'Afternoon (12pm-5pm)', percentage: 35 },
      { time: 'Evening (5pm-10pm)', percentage: 50 }
    ]
  },
  staffing: {
    efficiency: [
      { name: 'Sarah Chen', sales: 45000, customers: 450 },
      { name: 'Mike Rodriguez', sales: 42000, customers: 420 },
      { name: 'Emily Davis', sales: 38000, customers: 380 },
      { name: 'David Wilson', sales: 35000, customers: 350 },
      { name: 'John Smith', sales: 32000, customers: 320 }
    ],
    schedule: {
      optimal: {
        'Monday': { morning: 2, afternoon: 3, evening: 4 },
        'Tuesday': { morning: 2, afternoon: 3, evening: 4 },
        'Wednesday': { morning: 2, afternoon: 3, evening: 4 },
        'Thursday': { morning: 2, afternoon: 4, evening: 5 },
        'Friday': { morning: 3, afternoon: 5, evening: 6 },
        'Saturday': { morning: 4, afternoon: 6, evening: 6 },
        'Sunday': { morning: 3, afternoon: 4, evening: 4 }
      },
      current: {
        'Monday': { morning: 2, afternoon: 3, evening: 3 },
        'Tuesday': { morning: 2, afternoon: 2, evening: 3 },
        'Wednesday': { morning: 2, afternoon: 3, evening: 3 },
        'Thursday': { morning: 2, afternoon: 3, evening: 4 },
        'Friday': { morning: 3, afternoon: 4, evening: 5 },
        'Saturday': { morning: 3, afternoon: 5, evening: 5 },
        'Sunday': { morning: 2, afternoon: 3, evening: 3 }
      }
    }
  }
};

const COLORS = ['#396842', '#7e41ff', '#ed7d14', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

const GeneralManagerDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [salesData, setSalesData] = useState<any[]>([]);
  const [forecasts, setForecasts] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('trillion');
  const [dateRange, setDateRange] = useState({
    start: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });
  
  // Debounced fetch function to prevent too many API calls
  const debouncedFetch = useCallback(
    debounce(async (timeRange, dateRange) => {
      setLoading(true);
      try {
        // In a real implementation, these would be API calls to Firebase
        // const salesData = await getSalesData(timeRange, dateRange);
        // const forecasts = await getForecasts();
        // const analytics = await getAnalytics();
        
        // For demo purposes, use mock data
        setSalesData(mockSalesData);
        setForecasts(mockForecasts);
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );
  
  useEffect(() => {
    debouncedFetch(timeRange, dateRange);
    return () => debouncedFetch.cancel();
  }, [timeRange, dateRange, debouncedFetch]);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">General Manager Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of business performance and growth strategies</p>
      </div>
      
      {/* Time Range Selector */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <span>Custom Range</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Total Revenue</div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            ${analytics.kpis.revenue.value.toLocaleString()}
          </div>
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              analytics.kpis.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.kpis.revenue.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(analytics.kpis.revenue.change)}% from last period
            </div>
            <div className="text-xs text-gray-500">
              Target: ${analytics.kpis.revenue.target.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Total Orders</div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {analytics.kpis.orders.value.toLocaleString()}
          </div>
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              analytics.kpis.orders.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.kpis.orders.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(analytics.kpis.orders.change)}% from last period
            </div>
            <div className="text-xs text-gray-500">
              Target: {analytics.kpis.orders.target.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Total Customers</div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {analytics.kpis.customers.value.toLocaleString()}
          </div>
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              analytics.kpis.customers.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.kpis.customers.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(analytics.kpis.customers.change)}% from last period
            </div>
            <div className="text-xs text-gray-500">
              Target: {analytics.kpis.customers.target.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Avg Order Value</div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            ${analytics.kpis.aov.value.toLocaleString()}
          </div>
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              analytics.kpis.aov.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.kpis.aov.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(analytics.kpis.aov.change)}% from last period
            </div>
            <div className="text-xs text-gray-500">
              Target: ${analytics.kpis.aov.target.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#396842" 
                  activeDot={{ r: 8 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.performance.categories}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="sales" fill="#396842" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Path to $1 Trillion */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div 
          className="p-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white cursor-pointer"
          onClick={() => toggleSection('trillion')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-6 w-6 mr-3" />
              <h3 className="text-lg font-semibold">Path to $1 Trillion Valuation</h3>
            </div>
            {expandedSection === 'trillion' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
        
        {expandedSection === 'trillion' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Current Valuation</h4>
                <p className="text-2xl font-bold text-primary-600">
                  ${(forecasts.pathToTrillion.currentValuation / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Years to $1 Trillion</h4>
                <p className="text-2xl font-bold text-primary-600">
                  {forecasts.pathToTrillion.yearsToTrillion}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Required CAGR</h4>
                <p className="text-2xl font-bold text-primary-600">
                  {forecasts.pathToTrillion.requiredCAGR}%
                </p>
              </div>
            </div>
            
            <h4 className="font-medium mb-4">Key Milestones</h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-6">
                {forecasts.pathToTrillion.keyMilestones.map((milestone: any, index: number) => (
                  <div key={index} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center border-2 border-primary-500">
                      <span className="text-xs font-medium">{milestone.year}</span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-primary-700">{milestone.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">Target Year: {milestone.year}</p>
                      <div className="space-y-1">
                        {milestone.strategies.map((strategy: string, i: number) => (
                          <div key={i} className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                              <span className="text-xs font-bold">{i+1}</span>
                            </div>
                            <span className="text-sm">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">AI Strategic Recommendations</h4>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Brain className="h-5 w-5 text-primary-600 mr-2" />
                  <h5 className="font-medium text-primary-700">Long-term Growth Strategies</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {forecasts.pathToTrillion.aiRecommendations.map((recommendation: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <Zap className="h-4 w-4 text-primary-600 mr-2 mt-0.5" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Staffing Optimization */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div 
          className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
          onClick={() => toggleSection('staffing')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Staffing Optimization</h3>
            </div>
            {expandedSection === 'staffing' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
        
        {expandedSection === 'staffing' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium mb-4">Top Performing Staff</h4>
                <div className="space-y-4">
                  {analytics.staffing.efficiency.map((staff: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{staff.name}</span>
                        <span className="text-sm font-medium">${staff.sales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{staff.customers} customers served</span>
                        <span>${(staff.sales / staff.customers).toFixed(2)} per customer</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Staffing Recommendations</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-800 mb-1">Staffing Gaps Detected</h5>
                      <p className="text-sm text-yellow-700">
                        Our AI analysis shows you're understaffed during peak hours, potentially missing $15,000 in monthly revenue.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Friday Evening</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Current: 5</span>
                      <span className="text-sm text-green-600 font-medium">Recommended: 6</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Saturday Afternoon</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Current: 5</span>
                      <span className="text-sm text-green-600 font-medium">Recommended: 6</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Saturday Evening</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Current: 5</span>
                      <span className="text-sm text-green-600 font-medium">Recommended: 6</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sunday Afternoon</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Current: 3</span>
                      <span className="text-sm text-green-600 font-medium">Recommended: 4</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    View Detailed Staffing Plan
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">Weekly Schedule Optimization</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Morning (9am-12pm)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Afternoon (12pm-5pm)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Evening (5pm-10pm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(analytics.staffing.schedule.current).map(([day, shifts]: [string, any]) => (
                      <tr key={day}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-gray-900">{shifts.morning}</span>
                            {shifts.morning < analytics.staffing.schedule.optimal[day].morning && (
                              <span className="ml-2 text-xs text-red-600">
                                Understaffed (-{analytics.staffing.schedule.optimal[day].morning - shifts.morning})
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-gray-900">{shifts.afternoon}</span>
                            {shifts.afternoon < analytics.staffing.schedule.optimal[day].afternoon && (
                              <span className="ml-2 text-xs text-red-600">
                                Understaffed (-{analytics.staffing.schedule.optimal[day].afternoon - shifts.afternoon})
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-gray-900">{shifts.evening}</span>
                            {shifts.evening < analytics.staffing.schedule.optimal[day].evening && (
                              <span className="ml-2 text-xs text-red-600">
                                Understaffed (-{analytics.staffing.schedule.optimal[day].evening - shifts.evening})
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Growth Opportunities */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div 
          className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
          onClick={() => toggleSection('opportunities')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Growth Opportunities</h3>
            </div>
            {expandedSection === 'opportunities' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
        
        {expandedSection === 'opportunities' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {forecasts.nextQuarter.opportunities.map((opportunity: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full ${
                      opportunity.impact === 'high' 
                        ? 'bg-green-100 text-green-600' 
                        : opportunity.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Zap className="h-5 w-5" />
                    </div>
                    <h4 className="ml-3 font-medium">{opportunity.name}</h4>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Potential Revenue</span>
                    <span className="font-medium">${opportunity.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Impact</span>
                    <span className={`font-medium capitalize ${
                      opportunity.impact === 'high' 
                        ? 'text-green-600' 
                        : opportunity.impact === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                    }`}>
                      {opportunity.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Brain className="h-5 w-5 text-primary-600 mr-2" />
                <h4 className="font-medium text-primary-700">AI-Generated Growth Strategies</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                  <h5 className="font-medium text-primary-700 mb-2">Airport Traveler Focus</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Develop specialized "Layover Packages" for JFK Airport travelers with 2-8 hour layovers.
                  </p>
                  <div className="text-xs text-gray-500">
                    Potential impact: $35,000/month in additional revenue
                  </div>
                </div>
                <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                  <h5 className="font-medium text-primary-700 mb-2">Subscription Box Expansion</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Launch tiered subscription boxes with curated products for different customer segments.
                  </p>
                  <div className="text-xs text-gray-500">
                    Potential impact: $28,000/month in recurring revenue
                  </div>
                </div>
                <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                  <h5 className="font-medium text-primary-700 mb-2">Cafe Experience Enhancement</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Expand cafe offerings with cannabis-infused cooking classes and tasting events.
                  </p>
                  <div className="text-xs text-gray-500">
                    Potential impact: $15,000/month in additional revenue
                  </div>
                </div>
                <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                  <h5 className="font-medium text-primary-700 mb-2">Nassau County Expansion</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Establish dedicated delivery hubs in Nassau County to reduce delivery times.
                  </p>
                  <div className="text-xs text-gray-500">
                    Potential impact: $42,000/month in additional revenue
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Risk Assessment */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div 
          className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
          onClick={() => toggleSection('risks')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-amber-600 mr-3" />
              <h3 className="text-lg font-semibold">Risk Assessment</h3>
            </div>
            {expandedSection === 'risks' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
        
        {expandedSection === 'risks' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {forecasts.nextQuarter.risks.map((risk: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full ${
                      risk.impact === 'high' 
                        ? 'bg-red-100 text-red-600' 
                        : risk.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <h4 className="ml-3 font-medium">{risk.name}</h4>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Impact</span>
                    <span className={`font-medium capitalize ${
                      risk.impact === 'high' 
                        ? 'text-red-600' 
                        : risk.impact === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                    }`}>
                      {risk.impact}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Probability</span>
                    <span className={`font-medium capitalize ${
                      risk.probability === 'high' 
                        ? 'text-red-600' 
                        : risk.probability === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                    }`}>
                      {risk.probability}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Critical Risk Alert</h4>
                  <p className="text-sm text-red-700 mb-3">
                    New competitor "Green Horizon" is planning to open 0.5 miles from our location within the next 60 days.
                  </p>
                  <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                    <h5 className="font-medium text-red-700 mb-2">Recommended Mitigation Strategy</h5>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Launch member loyalty program with exclusive benefits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Increase marketing in 3-mile radius around store</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Secure exclusive product arrangements with top brands</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Enhance delivery service with shorter windows</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Operations Insights */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div 
          className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
          onClick={() => toggleSection('operations')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-indigo-600 mr-3" />
              <h3 className="text-lg font-semibold">Operations Insights</h3>
            </div>
            {expandedSection === 'operations' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
        
        {expandedSection === 'operations' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Sales by Location</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.performance.locations}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analytics.performance.locations.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Sales by Time of Day</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.performance.timeOfDay}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        nameKey="time"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analytics.performance.timeOfDay.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Operational Efficiency</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Order Processing Time</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">24 min</span>
                      <span className="ml-2 text-xs text-green-600">-12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Delivery Time</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">45 min</span>
                      <span className="ml-2 text-xs text-red-600">+8%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Inventory Turnover</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">4.2x</span>
                      <span className="ml-2 text-xs text-green-600">+0.3x</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Wait Time</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">8 min</span>
                      <span className="ml-2 text-xs text-green-600">-15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">AI Operational Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h5 className="font-medium text-green-800">Delivery Optimization</h5>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    Implementing zone-based delivery routing could reduce delivery times by 22% and increase capacity by 15%.
                  </p>
                  <button className="text-sm text-green-700 font-medium hover:underline">
                    View Implementation Plan
                  </button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <h5 className="font-medium text-blue-800">Inventory Management</h5>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    Implementing predictive inventory management could reduce stockouts by 35% and carrying costs by 18%.
                  </p>
                  <button className="text-sm text-blue-700 font-medium hover:underline">
                    View Implementation Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-100 rounded-lg mr-3">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">Financial Reports</h3>
            <p className="text-sm text-gray-500">View detailed reports</p>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-green-100 rounded-lg mr-3">
            <Clipboard className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">Compliance</h3>
            <p className="text-sm text-gray-500">OCM regulations</p>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-100 rounded-lg mr-3">
            <Settings className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium">Business Settings</h3>
            <p className="text-sm text-gray-500">Configure store</p>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-100 rounded-lg mr-3">
            <Star className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium">Brand Partners</h3>
            <p className="text-sm text-gray-500">Manage relationships</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GeneralManagerDashboard;