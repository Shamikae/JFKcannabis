import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Download,
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreVertical,
  Crown,
  Gift
} from 'lucide-react';
import UserProfileView from '../../components/admin/UserProfileView';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  lastActive: string;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    rewardsPoints: number;
    lastOrderDate?: string;
  };
  preferences: {
    strainTypes: string[];
    effects: string[];
    categories: string[];
  };
  verificationStatus: {
    email: boolean;
    phone: boolean;
    identity: boolean;
  };
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [spendFilter, setSpendFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  useEffect(() => {
    // Mock user data
    const mockUsers: UserData[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        dateOfBirth: '1985-03-15',
        joinDate: '2024-01-15',
        lastActive: '2024-12-20T10:30:00Z',
        membershipTier: 'gold',
        status: 'active',
        address: {
          street: '123 Main St',
          city: 'Queens',
          state: 'NY',
          zipCode: '11434'
        },
        stats: {
          totalOrders: 24,
          totalSpent: 1250.00,
          averageOrderValue: 52.08,
          rewardsPoints: 2450,
          lastOrderDate: '2024-12-18'
        },
        preferences: {
          strainTypes: ['hybrid', 'indica'],
          effects: ['relaxed', 'happy', 'sleepy'],
          categories: ['flower', 'edibles', 'vapes']
        },
        verificationStatus: {
          email: true,
          phone: true,
          identity: true
        }
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '(555) 987-6543',
        dateOfBirth: '1992-07-22',
        joinDate: '2024-02-01',
        lastActive: '2024-12-19T15:45:00Z',
        membershipTier: 'silver',
        status: 'active',
        address: {
          street: '456 Oak Ave',
          city: 'Nassau County',
          state: 'NY',
          zipCode: '11550'
        },
        stats: {
          totalOrders: 12,
          totalSpent: 680.00,
          averageOrderValue: 56.67,
          rewardsPoints: 1340,
          lastOrderDate: '2024-12-15'
        },
        preferences: {
          strainTypes: ['sativa', 'hybrid'],
          effects: ['uplifted', 'creative', 'focused'],
          categories: ['vapes', 'concentrates', 'topicals']
        },
        verificationStatus: {
          email: true,
          phone: true,
          identity: false
        }
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'mbrown@email.com',
        phone: '(555) 456-7890',
        dateOfBirth: '1988-11-08',
        joinDate: '2024-03-10',
        lastActive: '2024-12-20T08:15:00Z',
        membershipTier: 'bronze',
        status: 'pending',
        address: {
          street: '789 Pine Rd',
          city: 'Long Island',
          state: 'NY',
          zipCode: '11701'
        },
        stats: {
          totalOrders: 3,
          totalSpent: 145.00,
          averageOrderValue: 48.33,
          rewardsPoints: 290,
          lastOrderDate: '2024-12-10'
        },
        preferences: {
          strainTypes: ['indica'],
          effects: ['relaxed', 'sleepy'],
          categories: ['flower', 'edibles']
        },
        verificationStatus: {
          email: true,
          phone: false,
          identity: false
        }
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '(555) 234-5678',
        dateOfBirth: '1990-05-12',
        joinDate: '2024-01-05',
        lastActive: '2024-12-18T14:20:00Z',
        membershipTier: 'platinum',
        status: 'active',
        address: {
          street: '101 Park Ave',
          city: 'Manhattan',
          state: 'NY',
          zipCode: '10022'
        },
        stats: {
          totalOrders: 32,
          totalSpent: 2450.00,
          averageOrderValue: 76.56,
          rewardsPoints: 4890,
          lastOrderDate: '2024-12-17'
        },
        preferences: {
          strainTypes: ['hybrid', 'sativa'],
          effects: ['creative', 'focused', 'uplifted'],
          categories: ['flower', 'vapes', 'concentrates']
        },
        verificationStatus: {
          email: true,
          phone: true,
          identity: true
        }
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.w@email.com',
        phone: '(555) 345-6789',
        dateOfBirth: '1983-09-28',
        joinDate: '2024-02-15',
        lastActive: '2024-12-15T11:30:00Z',
        membershipTier: 'gold',
        status: 'active',
        address: {
          street: '222 Beach Rd',
          city: 'Long Beach',
          state: 'NY',
          zipCode: '11561'
        },
        stats: {
          totalOrders: 18,
          totalSpent: 1120.00,
          averageOrderValue: 62.22,
          rewardsPoints: 2240,
          lastOrderDate: '2024-12-14'
        },
        preferences: {
          strainTypes: ['indica', 'hybrid'],
          effects: ['relaxed', 'sleepy', 'pain-relief'],
          categories: ['flower', 'edibles', 'topicals']
        },
        verificationStatus: {
          email: true,
          phone: true,
          identity: true
        }
      }
    ];

    setUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    // Apply membership filter
    if (membershipFilter !== 'all') {
      filtered = filtered.filter(user => user.membershipTier === membershipFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    // Apply spend filter
    if (spendFilter !== 'all') {
      switch (spendFilter) {
        case 'under100':
          filtered = filtered.filter(user => user.stats.totalSpent < 100);
          break;
        case '100to500':
          filtered = filtered.filter(user => user.stats.totalSpent >= 100 && user.stats.totalSpent < 500);
          break;
        case '500to1000':
          filtered = filtered.filter(user => user.stats.totalSpent >= 500 && user.stats.totalSpent < 1000);
          break;
        case 'over1000':
          filtered = filtered.filter(user => user.stats.totalSpent >= 1000);
          break;
      }
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let startDate: Date;
      
      switch (dateFilter) {
        case 'last30days':
          startDate = new Date(now.setDate(now.getDate() - 30));
          filtered = filtered.filter(user => new Date(user.joinDate) >= startDate);
          break;
        case 'last90days':
          startDate = new Date(now.setDate(now.getDate() - 90));
          filtered = filtered.filter(user => new Date(user.joinDate) >= startDate);
          break;
        case 'thisyear':
          startDate = new Date(now.getFullYear(), 0, 1);
          filtered = filtered.filter(user => new Date(user.joinDate) >= startDate);
          break;
        case 'custom':
          if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);
            filtered = filtered.filter(user => {
              const joinDate = new Date(user.joinDate);
              return joinDate >= start && joinDate <= end;
            });
          }
          break;
      }
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, membershipFilter, statusFilter, spendFilter, dateFilter, dateRange]);

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return 'bg-amber-100 text-amber-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'platinum':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipIcon = (tier: string) => {
    switch (tier) {
      case 'gold':
      case 'platinum':
        return <Crown className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <Clock className="h-4 w-4" />;
      case 'suspended':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleViewUserDetails = (user: UserData) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage customer accounts and memberships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Membership Filter */}
          <select
            value={membershipFilter}
            onChange={(e) => setMembershipFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Memberships</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          
          {/* Spend Filter */}
          <select
            value={spendFilter}
            onChange={(e) => setSpendFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Spending Levels</option>
            <option value="under100">Under $100</option>
            <option value="100to500">$100 - $500</option>
            <option value="500to1000">$500 - $1,000</option>
            <option value="over1000">Over $1,000</option>
          </select>
          
          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              if (e.target.value === 'custom') {
                setShowDateRangePicker(true);
              } else {
                setShowDateRangePicker(false);
              }
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Dates</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="thisyear">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        {/* Custom Date Range */}
        {showDateRangePicker && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMembershipColor(user.membershipTier)}`}>
                      {getMembershipIcon(user.membershipTier)}
                      <span className="ml-1 capitalize">{user.membershipTier}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="ml-1 capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{user.stats.totalOrders}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">${user.stats.totalSpent.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{new Date(user.lastActive).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewUserDetails(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
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
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <UserProfileView
          userId={selectedUser.id}
          onClose={() => {
            setShowUserDetails(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;