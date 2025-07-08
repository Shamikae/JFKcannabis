import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Calendar, 
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  MapPin,
  Brain,
  Zap,
  Star,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const MarketingAnalytics: React.FC = () => {
  const { 
    analyticsData, 
    marketingSuggestions,
    isLoading, 
    error, 
    fetchAnalyticsData,
    fetchMarketingSuggestions,
    saveSuggestionFeedback
  } = useAnalyticsStore();
  
  const [timeRange, setTimeRange] = useState('30d');
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'positive' | 'negative'>>({});
  
  useEffect(() => {
    fetchAnalyticsData();
    fetchMarketingSuggestions();
  }, [fetchAnalyticsData, fetchMarketingSuggestions]);
  
  const toggleSuggestion = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };
  
  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({ ...prev, [id]: type }));
    saveSuggestionFeedback(id, 'marketing', type);
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  if (isLoading || !analyticsData) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Analytics</h1>
          <p className="text-gray-600">Analyze marketing performance and get AI-powered suggestions</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.visitors.total.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500">New</p>
              <p className="font-medium">{analyticsData.visitors.newUsers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Returning</p>
              <p className="font-medium">{analyticsData.visitors.returningUsers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Bounce Rate</p>
              <p className="font-medium">{analyticsData.visitors.bounceRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsData.ecommerce.revenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Transactions</p>
              <p className="font-medium">{analyticsData.ecommerce.transactions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Avg Order</p>
              <p className="font-medium">${analyticsData.ecommerce.avgOrderValue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Conversion</p>
              <p className="font-medium">{analyticsData.ecommerce.conversionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Traffic Sources</p>
              <p className="text-2xl font-bold text-gray-900">5 Sources</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Direct</p>
              <p className="font-medium">{analyticsData.traffic.sources[0].percentage}%</p>
            </div>
            <div>
              <p className="text-gray-500">Organic</p>
              <p className="font-medium">{analyticsData.traffic.sources[1].percentage}%</p>
            </div>
            <div>
              <p className="text-gray-500">Social</p>
              <p className="font-medium">{analyticsData.traffic.sources[2].percentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Smartphone className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Device Usage</p>
              <p className="text-2xl font-bold text-gray-900">3 Types</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Mobile</p>
              <p className="font-medium">{analyticsData.traffic.devices[0].percentage}%</p>
            </div>
            <div>
              <p className="text-gray-500">Desktop</p>
              <p className="font-medium">{analyticsData.traffic.devices[1].percentage}%</p>
            </div>
            <div>
              <p className="text-gray-500">Tablet</p>
              <p className="font-medium">{analyticsData.traffic.devices[2].percentage}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.traffic.sources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sessions"
                  nameKey="source"
                  label={({ source, percentage }) => `${source}: ${percentage}%`}
                >
                  {analyticsData.traffic.sources.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products by Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.ecommerce.topProducts}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location & Device Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Locations Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.traffic.locations}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="location" />
                <Tooltip formatter={(value) => `${value.toLocaleString()} sessions`} />
                <Legend />
                <Bar dataKey="sessions" fill="#00C49F" name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Devices Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.traffic.devices}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sessions"
                  nameKey="device"
                  label={({ device, percentage }) => `${device}: ${percentage}%`}
                >
                  {analyticsData.traffic.devices.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Marketing Suggestions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Marketing Suggestions</h3>
              <p className="text-sm text-gray-500">
                Data-driven marketing recommendations based on your analytics
              </p>
            </div>
          </div>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Suggestions
          </button>
        </div>
        
        <div className="space-y-4">
          {marketingSuggestions.map(suggestion => (
            <div 
              key={suggestion.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div 
                className="p-4 bg-white cursor-pointer"
                onClick={() => toggleSuggestion(suggestion.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-1.5 rounded-full mr-3 ${
                      suggestion.impact === 'high' 
                        ? 'bg-green-100 text-green-600' 
                        : suggestion.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <p className="text-sm text-gray-500">{suggestion.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${
                      suggestion.impact === 'high' 
                        ? 'bg-green-100 text-green-800' 
                        : suggestion.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} Impact
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${
                      suggestion.effort === 'low' 
                        ? 'bg-green-100 text-green-800' 
                        : suggestion.effort === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {suggestion.effort.charAt(0).toUpperCase() + suggestion.effort.slice(1)} Effort
                    </span>
                    {expandedSuggestion === suggestion.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedSuggestion === suggestion.id && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Data Points:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {suggestion.dataPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Suggested Actions:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {suggestion.suggestedActions.map((action, index) => (
                        <li key={index} className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Generated on {new Date(suggestion.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 mr-2">Was this suggestion helpful?</span>
                      <button 
                        onClick={() => handleFeedback(suggestion.id, 'positive')}
                        className={`p-1 rounded ${
                          feedbackGiven[suggestion.id] === 'positive'
                            ? 'bg-green-100 text-green-600'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleFeedback(suggestion.id, 'negative')}
                        className={`p-1 rounded ${
                          feedbackGiven[suggestion.id] === 'negative'
                            ? 'bg-red-100 text-red-600'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <ThumbsDown className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingAnalytics;