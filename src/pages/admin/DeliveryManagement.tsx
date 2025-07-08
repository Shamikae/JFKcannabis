import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  User, 
  Phone,
  Navigation,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Eye,
  Edit,
  RefreshCw,
  Plus,
  Route,
  Package,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'available' | 'busy' | 'offline';
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  stats: {
    deliveriesToday: number;
    totalEarnings: number;
    rating: number;
    completionRate: number;
  };
}

interface Delivery {
  id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  driver?: Driver;
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledTime: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  distance: number;
  deliveryFee: number;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  notes?: string;
  location: {
    lat: number;
    lng: number;
  };
}

const DeliveryManagement: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('deliveries');

  useEffect(() => {
    // Mock data
    const mockDrivers: Driver[] = [
      {
        id: '1',
        name: 'Mike Rodriguez',
        phone: '(555) 123-4567',
        vehicle: 'Honda Civic - ABC123',
        status: 'busy',
        currentLocation: {
          lat: 40.6650,
          lng: -73.7834,
          address: 'Near JFK Airport'
        },
        stats: {
          deliveriesToday: 8,
          totalEarnings: 240.00,
          rating: 4.8,
          completionRate: 98
        }
      },
      {
        id: '2',
        name: 'Sarah Chen',
        phone: '(555) 987-6543',
        vehicle: 'Toyota Prius - XYZ789',
        status: 'available',
        currentLocation: {
          lat: 40.7128,
          lng: -73.7834,
          address: 'Queens, NY'
        },
        stats: {
          deliveriesToday: 6,
          totalEarnings: 180.00,
          rating: 4.9,
          completionRate: 99
        }
      }
    ];

    const mockDeliveries: Delivery[] = [
      {
        id: '1',
        orderId: 'JFK-2024-001234',
        customer: {
          name: 'John Smith',
          phone: '(555) 111-2222',
          address: '123 Main St, Queens, NY 11434'
        },
        driver: mockDrivers[0],
        status: 'in-transit',
        priority: 'high',
        scheduledTime: '2024-12-20T14:00:00Z',
        estimatedDelivery: '2024-12-20T14:30:00Z',
        distance: 5.2,
        deliveryFee: 5.00,
        items: [
          { name: 'Blue Dream 3.5g', quantity: 1 },
          { name: 'Cosmic Gummies', quantity: 2 }
        ],
        notes: 'Ring doorbell, apartment 4B',
        location: {
          lat: 40.6650,
          lng: -73.7834
        }
      },
      {
        id: '2',
        orderId: 'JFK-2024-001235',
        customer: {
          name: 'Sarah Johnson',
          phone: '(555) 333-4444',
          address: '456 Oak Ave, Nassau County, NY 11550'
        },
        status: 'pending',
        priority: 'medium',
        scheduledTime: '2024-12-20T15:00:00Z',
        estimatedDelivery: '2024-12-20T15:45:00Z',
        distance: 8.7,
        deliveryFee: 8.00,
        items: [
          { name: 'Northern Lights Cart', quantity: 1 }
        ],
        location: {
          lat: 40.7128,
          lng: -73.7834
        }
      }
    ];

    setDrivers(mockDrivers);
    setDeliveries(mockDeliveries);
  }, []);

  useEffect(() => {
    let filtered = [...deliveries];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(delivery =>
        delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customer.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(delivery => delivery.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(delivery => delivery.priority === priorityFilter);
    }

    // Apply driver filter
    if (driverFilter !== 'all') {
      filtered = filtered.filter(delivery => delivery.driver?.id === driverFilter);
    }

    setFilteredDeliveries(filtered);
  }, [deliveries, searchTerm, statusFilter, priorityFilter, driverFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'picked-up':
        return 'bg-purple-100 text-purple-800';
      case 'in-transit':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'assigned':
        return <User className="h-4 w-4" />;
      case 'picked-up':
        return <Package className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-orange-100 text-orange-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const assignDriver = (deliveryId: string, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, driver, status: 'assigned' as const }
        : delivery
    ));
  };

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: newStatus as any }
        : delivery
    ));
  };

  const DeliveryDetailsModal: React.FC<{ delivery: Delivery; onClose: () => void }> = ({ delivery, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{delivery.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)}
                      <span className="ml-1 capitalize">{delivery.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(delivery.priority)}`}></div>
                      <span className="font-medium capitalize">{delivery.priority}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{delivery.distance} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-medium">${delivery.deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{delivery.customer.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{delivery.customer.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span>{delivery.customer.address}</span>
                  </div>
                  {delivery.notes && (
                    <div className="mt-3">
                      <span className="text-gray-600">Notes:</span>
                      <p className="mt-1 text-gray-900">{delivery.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                <div className="space-y-2">
                  {delivery.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Driver & Tracking */}
            <div className="space-y-6">
              {delivery.driver ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Assigned Driver</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{delivery.driver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{delivery.driver.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{delivery.driver.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getDriverStatusColor(delivery.driver.status)}`}>
                        {delivery.driver.status}
                      </span>
                    </div>
                    {delivery.driver.currentLocation && (
                      <div className="mt-3">
                        <span className="text-gray-600">Current Location:</span>
                        <p className="mt-1 text-gray-900">{delivery.driver.currentLocation.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Assign Driver</h3>
                  <div className="space-y-3">
                    {drivers.map(driver => (
                      <button
                        key={driver.id}
                        onClick={() => assignDriver(delivery.id, driver.id)}
                        className={`w-full flex items-center justify-between p-3 border rounded-lg ${
                          driver.status === 'available'
                            ? 'border-green-300 bg-green-50 hover:bg-green-100'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                        disabled={driver.status !== 'available'}
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary-600">{driver.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-xs text-gray-500">{driver.vehicle}</p>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getDriverStatusColor(driver.status)}`}>
                          {driver.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Map</h3>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map View Placeholder</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['assigned', 'picked-up', 'in-transit', 'delivered', 'failed'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateDeliveryStatus(delivery.id, status)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        delivery.status === status
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Management</h1>
          <p className="text-gray-600">Track and manage cannabis deliveries</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Delivery
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('deliveries')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'deliveries'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Truck className="h-4 w-4 mr-2" />
            Active Deliveries
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'drivers'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Drivers
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </button>
        </nav>
      </div>

      {/* Deliveries Tab */}
      {activeTab === 'deliveries' && (
        <>
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search deliveries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="picked-up">Picked Up</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Deliveries Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scheduled
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">{delivery.orderId}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{delivery.customer.name}</p>
                          <p className="text-xs text-gray-500">{delivery.customer.address}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1 capitalize">{delivery.status.replace('-', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(delivery.priority)}`}></div>
                          <span className="text-sm capitalize">{delivery.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {delivery.driver ? (
                          <div className="flex items-center">
                            <div className="h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-primary-600">{delivery.driver.name.charAt(0)}</span>
                            </div>
                            <span className="text-sm">{delivery.driver.name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{new Date(delivery.scheduledTime).toLocaleTimeString()}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{delivery.distance} miles</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedDelivery(delivery);
                              setShowDeliveryDetails(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Navigation className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delivery Details Modal */}
          {showDeliveryDetails && selectedDelivery && (
            <DeliveryDetailsModal
              delivery={selectedDelivery}
              onClose={() => {
                setShowDeliveryDetails(false);
                setSelectedDelivery(null);
              }}
            />
          )}

          {/* Empty State */}
          {filteredDeliveries.length === 0 && (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deliveries found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map(driver => (
              <div key={driver.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg font-medium text-primary-600">{driver.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{driver.name}</h3>
                        <p className="text-sm text-gray-500">{driver.vehicle}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getDriverStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{driver.phone}</span>
                    </div>
                    {driver.currentLocation && (
                      <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <span>{driver.currentLocation.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Today's Deliveries</p>
                      <p className="text-lg font-bold text-gray-900">{driver.stats.deliveriesToday}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Earnings</p>
                      <p className="text-lg font-bold text-gray-900">${driver.stats.totalEarnings.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="text-lg font-bold text-gray-900">{driver.stats.rating.toFixed(1)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Completion</p>
                      <p className="text-lg font-bold text-gray-900">{driver.stats.completionRate}%</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Contact
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      View Map
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Driver Card */}
            <div className="bg-white rounded-lg shadow-sm border border-dashed border-gray-300 overflow-hidden">
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Add New Driver</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Add a new delivery driver to your team
                </p>
                <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                  Add Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94.7%</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+2.3% from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivery Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$12,450</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.7% from last month</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Volume by Time</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Time-based delivery chart placeholder</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Zones</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Delivery heat map placeholder</p>
              </div>
            </div>
          </div>

          {/* Delivery Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      This Week
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Week
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Average Delivery Time
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      32 minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      35 minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>-8.6%</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Customer Satisfaction
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      4.8/5
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      4.7/5
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+2.1%</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Failed Deliveries
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      1.2%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      1.8%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>-33.3%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryManagement;