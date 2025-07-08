import React, { useState, useEffect, useCallback } from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Archive,
  MoreVertical,
  Database,
  Link,
  Zap,
  Brain,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Calendar,
  ShoppingBag,
  FileText
} from 'lucide-react';
import { getInventory, updateInventoryItem } from '../../firebase/services';
import { useInventoryStore } from '../../store/inventoryStore';
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

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  location: string;
  batchNumber: string;
  expirationDate: string;
  receivedDate: string;
  source: 'alleaves' | 'manual';
  cost: number;
  retailPrice: number;
  margin: number;
  supplier: string;
  reorderPoint: number;
  reorderQuantity: number;
  lastSold: string;
  salesVelocity: number; // units sold per day
  daysOfSupply: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired' | 'discontinued';
}

interface InventoryAnalytics {
  totalValue: number;
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  expiringItems: number;
  topSellingItems: Array<{
    id: string;
    name: string;
    salesVelocity: number;
    revenue: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
    value: number;
    percentage: number;
  }>;
  inventoryTurnover: number;
  daysOfInventory: number;
  inventoryAccuracy: number;
  inventoryTrends: Array<{
    month: string;
    value: number;
    turnover: number;
  }>;
  aiRecommendations: Array<{
    type: 'reorder' | 'discontinue' | 'promotion' | 'adjustment';
    productId: string;
    productName: string;
    action: string;
    impact: string;
    reason: string;
  }>;
}

const COLORS = ['#396842', '#7e41ff', '#ed7d14', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

const InventoryManagerDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [analytics, setAnalytics] = useState<InventoryAnalytics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedSection, setExpandedSection] = useState<string | null>('analytics');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });
  
  const { lastSynced } = useInventoryStore();
  
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    []
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from Firebase
        // const inventoryData = await getInventory();
        
        // For demo purposes, use mock data
        const mockInventory: InventoryItem[] = [
          {
            id: 'inv-001',
            productId: 'prod-001',
            productName: 'Blue Dream 3.5g',
            category: 'flower',
            quantity: 150,
            location: 'Main Store',
            batchNumber: 'BD240315',
            expirationDate: '2025-06-15',
            receivedDate: '2024-12-15',
            source: 'alleaves',
            cost: 25.00,
            retailPrice: 45.00,
            margin: 44.44,
            supplier: 'Coastal Cannabis',
            reorderPoint: 50,
            reorderQuantity: 100,
            lastSold: '2024-12-20',
            salesVelocity: 8.5,
            daysOfSupply: 17.6,
            status: 'in_stock'
          },
          {
            id: 'inv-002',
            productId: 'prod-002',
            productName: 'Northern Lights Cart',
            category: 'vapes',
            quantity: 35,
            location: 'Main Store',
            batchNumber: 'NL240310',
            expirationDate: '2025-06-10',
            receivedDate: '2024-12-10',
            source: 'alleaves',
            cost: 30.00,
            retailPrice: 50.00,
            margin: 40.00,
            supplier: 'Vapor Labs',
            reorderPoint: 25,
            reorderQuantity: 50,
            lastSold: '2024-12-20',
            salesVelocity: 4.2,
            daysOfSupply: 8.3,
            status: 'low_stock'
          },
          {
            id: 'inv-003',
            productId: 'prod-003',
            productName: 'Cosmic Gummies',
            category: 'edibles',
            quantity: 120,
            location: 'Main Store',
            batchNumber: 'CG240305',
            expirationDate: '2025-12-05',
            receivedDate: '2024-12-05',
            source: 'alleaves',
            cost: 15.00,
            retailPrice: 25.00,
            margin: 40.00,
            supplier: 'Galaxy Edibles',
            reorderPoint: 40,
            reorderQuantity: 80,
            lastSold: '2024-12-20',
            salesVelocity: 6.8,
            daysOfSupply: 17.6,
            status: 'in_stock'
          },
          {
            id: 'inv-004',
            productId: 'prod-004',
            productName: 'OG Kush Ground',
            category: 'flower',
            quantity: 0,
            location: 'Main Store',
            batchNumber: 'OGK240301',
            expirationDate: '2025-06-01',
            receivedDate: '2024-12-01',
            source: 'alleaves',
            cost: 20.00,
            retailPrice: 35.00,
            margin: 42.86,
            supplier: 'Emerald Farms',
            reorderPoint: 30,
            reorderQuantity: 60,
            lastSold: '2024-12-18',
            salesVelocity: 5.2,
            daysOfSupply: 0,
            status: 'out_of_stock'
          },
          {
            id: 'inv-005',
            productId: 'prod-005',
            productName: 'CBD Recovery Balm',
            category: 'topicals',
            quantity: 25,
            location: 'Main Store',
            batchNumber: 'CRB240220',
            expirationDate: '2026-02-20',
            receivedDate: '2024-11-20',
            source: 'alleaves',
            cost: 25.00,
            retailPrice: 45.00,
            margin: 44.44,
            supplier: 'Green Wellness',
            reorderPoint: 15,
            reorderQuantity: 30,
            lastSold: '2024-12-19',
            salesVelocity: 1.8,
            daysOfSupply: 13.9,
            status: 'in_stock'
          },
          {
            id: 'inv-006',
            productId: 'prod-006',
            productName: 'Gelato Pre-Rolls 5-Pack',
            category: 'pre-rolls',
            quantity: 15,
            location: 'Main Store',
            batchNumber: 'GPR240225',
            expirationDate: '2025-02-25',
            receivedDate: '2024-11-25',
            source: 'alleaves',
            cost: 35.00,
            retailPrice: 65.00,
            margin: 46.15,
            supplier: 'Cloud Nine',
            reorderPoint: 20,
            reorderQuantity: 40,
            lastSold: '2024-12-20',
            salesVelocity: 3.5,
            daysOfSupply: 4.3,
            status: 'low_stock'
          }
        ];
        
        setInventory(mockInventory);
        setFilteredInventory(mockInventory);
        
        // Generate analytics
        const totalValue = mockInventory.reduce((sum, item) => sum + (item.quantity * item.retailPrice), 0);
        const totalItems = mockInventory.reduce((sum, item) => sum + item.quantity, 0);
        const lowStockItems = mockInventory.filter(item => item.status === 'low_stock').length;
        const outOfStockItems = mockInventory.filter(item => item.status === 'out_of_stock').length;
        const expiringItems = mockInventory.filter(item => {
          const expirationDate = new Date(item.expirationDate);
          const now = new Date();
          const diffTime = expirationDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30;
        }).length;
        
        // Category breakdown
        const categories = Array.from(new Set(mockInventory.map(item => item.category)));
        const categoryBreakdown = categories.map(category => {
          const categoryItems = mockInventory.filter(item => item.category === category);
          const count = categoryItems.length;
          const value = categoryItems.reduce((sum, item) => sum + (item.quantity * item.retailPrice), 0);
          const percentage = (value / totalValue) * 100;
          
          return {
            category,
            count,
            value,
            percentage
          };
        });
        
        // Top selling items
        const topSellingItems = [...mockInventory]
          .sort((a, b) => b.salesVelocity - a.salesVelocity)
          .slice(0, 5)
          .map(item => ({
            id: item.productId,
            name: item.productName,
            salesVelocity: item.salesVelocity,
            revenue: item.retailPrice * item.salesVelocity * 30 // Monthly revenue
          }));
        
        // Mock analytics
        const mockAnalytics: InventoryAnalytics = {
          totalValue,
          totalItems,
          lowStockItems,
          outOfStockItems,
          expiringItems,
          topSellingItems,
          categoryBreakdown,
          inventoryTurnover: 4.2,
          daysOfInventory: 86.5,
          inventoryAccuracy: 98.5,
          inventoryTrends: [
            { month: 'Jul', value: 280000, turnover: 3.8 },
            { month: 'Aug', value: 295000, turnover: 3.9 },
            { month: 'Sep', value: 310000, turnover: 4.0 },
            { month: 'Oct', value: 325000, turnover: 4.1 },
            { month: 'Nov', value: 340000, turnover: 4.2 },
            { month: 'Dec', value: 355000, turnover: 4.3 }
          ],
          aiRecommendations: [
            {
              type: 'reorder',
              productId: 'prod-004',
              productName: 'OG Kush Ground',
              action: 'Reorder 60 units immediately',
              impact: 'Prevent $10,500 in lost sales',
              reason: 'Out of stock with high sales velocity'
            },
            {
              type: 'reorder',
              productId: 'prod-006',
              productName: 'Gelato Pre-Rolls 5-Pack',
              action: 'Reorder 40 units',
              impact: 'Prevent $7,800 in lost sales',
              reason: 'Low stock with only 4.3 days of supply remaining'
            },
            {
              type: 'adjustment',
              productId: 'prod-002',
              productName: 'Northern Lights Cart',
              action: 'Increase reorder point to 40 units',
              impact: 'Improve availability by 15%',
              reason: 'Consistently running low on stock'
            },
            {
              type: 'promotion',
              productId: 'prod-005',
              productName: 'CBD Recovery Balm',
              action: 'Run 15% off promotion',
              impact: 'Increase sales velocity by 25%',
              reason: 'Slow-moving inventory with long shelf life'
            }
          ]
        };
        
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInventory();
  }, []);
  
  useEffect(() => {
    // Filter and sort inventory
    let filtered = [...inventory];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Apply location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(item => item.location === locationFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.productName.localeCompare(b.productName);
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
        case 'daysOfSupply':
          comparison = a.daysOfSupply - b.daysOfSupply;
          break;
        case 'salesVelocity':
          comparison = a.salesVelocity - b.salesVelocity;
          break;
        case 'margin':
          comparison = a.margin - b.margin;
          break;
        case 'expirationDate':
          comparison = new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
          break;
        default:
          comparison = a.productName.localeCompare(b.productName);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredInventory(filtered);
  }, [inventory, searchTerm, categoryFilter, statusFilter, locationFilter, sortBy, sortOrder]);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            In Stock
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low Stock
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Out of Stock
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <Clock className="h-3 w-3 mr-1" />
            Expired
          </span>
        );
      case 'discontinued':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Archive className="h-3 w-3 mr-1" />
            Discontinued
          </span>
        );
      default:
        return null;
    }
  };
  
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    // Update inventory item quantity
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === id 
          ? { 
              ...item, 
              quantity: newQuantity,
              status: newQuantity === 0 
                ? 'out_of_stock' 
                : newQuantity <= item.reorderPoint 
                  ? 'low_stock' 
                  : 'in_stock',
              daysOfSupply: newQuantity > 0 ? newQuantity / item.salesVelocity : 0
            } 
          : item
      )
    );
    
    // In a real implementation, this would update the database
    // updateInventoryItem(id, { quantity: newQuantity });
  };
  
  const handleSyncWithAlleaves = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would sync with Alleaves
      // await syncWithAlleaves();
      
      // For demo purposes, just wait a bit
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Refresh inventory
      // await fetchInventory();
    } catch (error) {
      console.error('Error syncing with Alleaves:', error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Inventory Manager Dashboard</h1>
        <p className="text-gray-600">Comprehensive inventory management and analytics</p>
      </div>
      
      {/* Alleaves Connection Info */}
      {lastSynced && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Database className="h-5 w-5 mr-3 text-blue-500" />
            <div>
              <p className="font-medium">Alleaves POS Connection Active</p>
              <p className="text-sm">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </span>
            <Link className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      )}
      
      {/* Summary Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600">Inventory Value</div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              ${analytics.totalValue.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +4.4% from last month
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600">Inventory Turnover</div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <RefreshCw className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {analytics.inventoryTurnover.toFixed(1)}x
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +0.3x from last month
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600">Days of Inventory</div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {analytics.daysOfInventory.toFixed(1)}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              -2.3 days from last month
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-600">Inventory Accuracy</div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {analytics.inventoryAccuracy}%
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +0.8% from last month
            </div>
          </div>
        </div>
      )}
      
      {/* Inventory Analytics */}
      {analytics && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div 
            className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('analytics')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold">Inventory Analytics</h3>
              </div>
              {expandedSection === 'analytics' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
          
          {expandedSection === 'analytics' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category Breakdown */}
                <div>
                  <h4 className="font-medium mb-4">Category Breakdown</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics.categoryBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="category"
                          label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                        >
                          {analytics.categoryBreakdown.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Top Selling Items */}
                <div>
                  <h4 className="font-medium mb-4">Top Selling Items</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analytics.topSellingItems}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={150} />
                        <Tooltip formatter={(value) => `${value} units/day`} />
                        <Legend />
                        <Bar dataKey="salesVelocity" fill="#396842" name="Sales Velocity (units/day)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Inventory Trends */}
                <div>
                  <h4 className="font-medium mb-4">Inventory Trends (6 Months)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={analytics.inventoryTrends}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value, name) => [
                          name === 'value' ? `$${value.toLocaleString()}` : `${value}x`,
                          name === 'value' ? 'Inventory Value' : 'Turnover Rate'
                        ]} />
                        <Legend />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#396842" 
                          activeDot={{ r: 8 }}
                          name="Inventory Value"
                        />
                        <Line 
                          yAxisId="right" 
                          type="monotone" 
                          dataKey="turnover" 
                          stroke="#7e41ff" 
                          name="Turnover Rate"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Inventory Health */}
                <div>
                  <h4 className="font-medium mb-4">Inventory Health</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Low Stock Items</h5>
                      <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-full mr-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{analytics.lowStockItems}</p>
                          <p className="text-xs text-gray-500">Items below reorder point</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Out of Stock Items</h5>
                      <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-full mr-3">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{analytics.outOfStockItems}</p>
                          <p className="text-xs text-gray-500">Items with zero quantity</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Expiring Soon</h5>
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-full mr-3">
                          <Clock className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{analytics.expiringItems}</p>
                          <p className="text-xs text-gray-500">Items expiring in 30 days</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Inventory Turnover</h5>
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full mr-3">
                          <RefreshCw className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{analytics.inventoryTurnover.toFixed(1)}x</p>
                          <p className="text-xs text-gray-500">Annual turnover rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* AI Recommendations */}
      {analytics && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div 
            className="p-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white cursor-pointer"
            onClick={() => toggleSection('recommendations')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-6 w-6 mr-3" />
                <h3 className="text-lg font-semibold">AI Inventory Recommendations</h3>
              </div>
              {expandedSection === 'recommendations' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
          
          {expandedSection === 'recommendations' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analytics.aiRecommendations.map((recommendation, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-4 ${
                      recommendation.type === 'reorder' 
                        ? 'border-red-200 bg-red-50' 
                        : recommendation.type === 'promotion'
                          ? 'border-green-200 bg-green-50'
                          : recommendation.type === 'adjustment'
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-full ${
                        recommendation.type === 'reorder' 
                          ? 'bg-red-100 text-red-600' 
                          : recommendation.type === 'promotion'
                            ? 'bg-green-100 text-green-600'
                            : recommendation.type === 'adjustment'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                      }`}>
                        {recommendation.type === 'reorder' ? (
                          <ShoppingBag className="h-5 w-5" />
                        ) : recommendation.type === 'promotion' ? (
                          <Tag className="h-5 w-5" />
                        ) : recommendation.type === 'adjustment' ? (
                          <Edit className="h-5 w-5" />
                        ) : (
                          <Archive className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{recommendation.productName}</h4>
                        <p className="text-sm text-gray-600">{recommendation.action}</p>
                      </div>
                    </div>
                    <div className="pl-11">
                      <div className="text-sm mb-1">
                        <span className="font-medium">Impact:</span> {recommendation.impact}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Reason:</span> {recommendation.reason}
                      </div>
                    </div>
                    <div className="mt-3 pl-11">
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        recommendation.type === 'reorder' 
                          ? 'bg-red-600 text-white' 
                          : recommendation.type === 'promotion'
                            ? 'bg-green-600 text-white'
                            : recommendation.type === 'adjustment'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-600 text-white'
                      }`}>
                        {recommendation.type === 'reorder' 
                          ? 'Create Purchase Order' 
                          : recommendation.type === 'promotion'
                            ? 'Create Promotion'
                            : recommendation.type === 'adjustment'
                              ? 'Adjust Settings'
                              : 'Take Action'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Zap className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="font-medium text-primary-700">Inventory Optimization Insights</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                    <h5 className="font-medium text-primary-700 mb-2">Excess Inventory Alert</h5>
                    <p className="text-sm text-gray-700 mb-2">
                      5 products have over 60 days of inventory. Consider running promotions to increase turnover.
                    </p>
                    <div className="text-xs text-gray-500">
                      Potential savings: $12,500 in carrying costs
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                    <h5 className="font-medium text-primary-700 mb-2">Seasonal Planning</h5>
                    <p className="text-sm text-gray-700 mb-2">
                      Increase inventory of vapes and pre-rolls by 25% for upcoming holiday season based on last year's data.
                    </p>
                    <div className="text-xs text-gray-500">
                      Potential impact: $35,000 in additional sales
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Inventory Management */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Inventory Management</h3>
            <div className="flex items-center space-x-3">
              <button 
                className="btn-outline flex items-center"
                onClick={handleSyncWithAlleaves}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync with Alleaves
              </button>
              <button className="btn-outline flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button 
                className="btn-primary flex items-center"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stock
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="flower">Flower</option>
              <option value="vapes">Vapes</option>
              <option value="edibles">Edibles</option>
              <option value="pre-rolls">Pre-Rolls</option>
              <option value="concentrates">Concentrates</option>
              <option value="topicals">Topicals</option>
            </select>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="expired">Expired</option>
              <option value="discontinued">Discontinued</option>
            </select>
            
            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="name">Name</option>
              <option value="quantity">Quantity</option>
              <option value="daysOfSupply">Days of Supply</option>
              <option value="salesVelocity">Sales Velocity</option>
              <option value="margin">Margin</option>
              <option value="expirationDate">Expiration Date</option>
            </select>
          </div>
        </div>
        
        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Velocity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days of Supply
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reorder Point
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                        <div className="text-xs text-gray-500">{item.productId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                        min="0"
                        className="w-16 p-1 text-center border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.salesVelocity.toFixed(1)} units/day</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      item.daysOfSupply <= 7 
                        ? 'text-red-600' 
                        : item.daysOfSupply <= 14
                          ? 'text-yellow-600'
                          : 'text-gray-900'
                    }`}>
                      {item.daysOfSupply.toFixed(1)} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.reorderPoint}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(item.expirationDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setStatusFilter('all');
                setLocationFilter('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
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
            <h3 className="font-medium">Inventory Reports</h3>
            <p className="text-sm text-gray-500">View detailed reports</p>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-green-100 rounded-lg mr-3">
            <ShoppingBag className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">Purchase Orders</h3>
            <p className="text-sm text-gray-500">Manage orders</p>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-100 rounded-lg mr-3">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium">Suppliers</h3>
            <p className="text-sm text-gray-500">Manage vendors</p>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-100 rounded-lg mr-3">
            <Settings className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium">Settings</h3>
            <p className="text-sm text-gray-500">Configure inventory</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default InventoryManagerDashboard;