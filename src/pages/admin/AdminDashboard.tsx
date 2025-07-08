import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Package, 
  TrendingUp, 
  Settings, 
  Beaker,
  ShoppingCart,
  Truck,
  Star,
  AlertTriangle,
  DollarSign,
  Calendar,
  FileText,
  Database,
  Brain,
  Zap,
  Target,
  Globe,
  Shield,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  LogOut,
  Layout,
  PenTool,
  Palette,
  Image,
  LineChart,
  UserCheck
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// Import admin components
import AdminOverview from './AdminOverview';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';
import ScientificStudies from './ScientificStudies';
import InventoryManagement from './InventoryManagement';
import DeliveryManagement from './DeliveryManagement';
import BrandManagement from './BrandManagement';
import ContentManagement from './ContentManagement';
import SettingsPanel from './SettingsPanel';
import ZapierIntegrations from './ZapierIntegrations';
import MarketingAnalytics from './MarketingAnalytics';
import BusinessSuggestions from './BusinessSuggestions';
import SeoSuggestions from './SeoSuggestions';
import ProductSuggestions from './ProductSuggestions';
import CustomerInsights from './CustomerInsights';
import BudtenderDashboard from '../../components/admin/BudtenderDashboard';
import GeneralManagerDashboard from '../../components/admin/GeneralManagerDashboard';
import InventoryManagerDashboard from '../../components/admin/InventoryManagerDashboard';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuthStore();
  
  // Track expanded sections in sidebar
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    analytics: false,
    marketing: false,
    suggestions: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const adminSections = [
    {
      title: 'Overview',
      path: '/admin',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'General Manager',
      path: '/admin/general-manager',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      role: 'admin'
    },
    {
      title: 'Inventory Manager',
      path: '/admin/inventory-manager',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      role: 'admin'
    },
    {
      title: 'Budtender',
      path: '/admin/budtender',
      icon: UserCheck,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      title: 'Analytics',
      path: '/admin/analytics',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      subsections: [
        {
          title: 'Dashboard',
          path: '/admin/analytics',
          icon: BarChart3
        },
        {
          title: 'Marketing',
          path: '/admin/analytics/marketing',
          icon: LineChart
        },
        {
          title: 'Customer Insights',
          path: '/admin/analytics/customers',
          icon: Users
        }
      ]
    },
    {
      title: 'Products',
      path: '/admin/products',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Orders',
      path: '/admin/orders',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Users',
      path: '/admin/users',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Inventory',
      path: '/admin/inventory',
      icon: Database,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Delivery',
      path: '/admin/delivery',
      icon: Truck,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Brands',
      path: '/admin/brands',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Content',
      path: '/admin/content',
      icon: Layout,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'AI Suggestions',
      path: '/admin/suggestions',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subsections: [
        {
          title: 'Business',
          path: '/admin/suggestions/business',
          icon: DollarSign
        },
        {
          title: 'SEO',
          path: '/admin/suggestions/seo',
          icon: Globe
        },
        {
          title: 'Products',
          path: '/admin/suggestions/products',
          icon: Package
        }
      ]
    },
    {
      title: 'Scientific Studies',
      path: '/admin/studies',
      icon: Beaker,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Zapier',
      path: '/admin/zapier',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Check if user has permission to view section
  const hasPermission = (section: any) => {
    if (!section.role) return true;
    if (!user) return false;
    return user.role === section.role || user.role === 'admin';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">JFK Cannabis</h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {adminSections.map((section) => {
            if (!hasPermission(section)) return null;
            
            const Icon = section.icon;
            const active = isActive(section.path);
            const hasSubsections = section.subsections && section.subsections.length > 0;
            const isExpanded = expandedSections[section.title.toLowerCase()];
            
            return (
              <div key={section.path}>
                {hasSubsections ? (
                  <button
                    onClick={() => toggleSection(section.title.toLowerCase())}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? `${section.bgColor} ${section.color} font-medium`
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
                      {sidebarOpen && <span>{section.title}</span>}
                    </div>
                    {sidebarOpen && (
                      isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <Link
                    to={section.path}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? `${section.bgColor} ${section.color} font-medium`
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
                    {sidebarOpen && <span>{section.title}</span>}
                    {!sidebarOpen && active && (
                      <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                        {section.title}
                      </div>
                    )}
                  </Link>
                )}
                
                {/* Subsections */}
                {sidebarOpen && hasSubsections && isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {section.subsections?.map(subsection => {
                      const SubIcon = subsection.icon;
                      const subActive = location.pathname === subsection.path;
                      
                      return (
                        <Link
                          key={subsection.path}
                          to={subsection.path}
                          className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                            subActive
                              ? 'bg-gray-100 text-gray-900 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <SubIcon className="h-4 w-4 mr-3" />
                          <span>{subsection.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {adminSections.find(s => isActive(s.path))?.title || 'Dashboard'}
              </h2>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Upload className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications > 99 ? '99+' : notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
                </div>
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user?.name?.[0] || 'A'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/general-manager" element={<GeneralManagerDashboard />} />
            <Route path="/inventory-manager" element={<InventoryManagerDashboard />} />
            <Route path="/budtender" element={<BudtenderDashboard />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/analytics/marketing" element={<MarketingAnalytics />} />
            <Route path="/analytics/customers" element={<CustomerInsights />} />
            <Route path="/products/*" element={<ProductManagement />} />
            <Route path="/orders/*" element={<OrderManagement />} />
            <Route path="/users/*" element={<UserManagement />} />
            <Route path="/inventory/*" element={<InventoryManagement />} />
            <Route path="/delivery/*" element={<DeliveryManagement />} />
            <Route path="/brands/*" element={<BrandManagement />} />
            <Route path="/content/*" element={<ContentManagement />} />
            <Route path="/suggestions/business" element={<BusinessSuggestions />} />
            <Route path="/suggestions/seo" element={<SeoSuggestions />} />
            <Route path="/suggestions/products" element={<ProductSuggestions />} />
            <Route path="/studies/*" element={<ScientificStudies />} />
            <Route path="/zapier/*" element={<ZapierIntegrations />} />
            <Route path="/settings/*" element={<SettingsPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;