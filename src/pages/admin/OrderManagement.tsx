import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Download,
  RefreshCw,
  MoreVertical,
  User,
  CreditCard,
  Navigation
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryMethod: 'delivery' | 'pickup';
  address?: string;
  orderDate: string;
  estimatedDelivery?: string;
  driver?: string;
  notes?: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    // Mock order data
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'JFK-2024-001234',
        customer: {
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '(555) 123-4567'
        },
        items: [
          { name: 'Blue Dream 3.5g', quantity: 1, price: 45.00 },
          { name: 'Cosmic Gummies', quantity: 2, price: 25.00 }
        ],
        total: 95.00,
        status: 'out-for-delivery',
        paymentStatus: 'paid',
        deliveryMethod: 'delivery',
        address: '123 Main St, Queens, NY 11434',
        orderDate: '2024-12-20T10:30:00Z',
        estimatedDelivery: '2024-12-20T14:30:00Z',
        driver: 'Mike Rodriguez',
        notes: 'Ring doorbell, apartment 4B'
      },
      {
        id: '2',
        orderNumber: 'JFK-2024-001235',
        customer: {
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '(555) 987-6543'
        },
        items: [
          { name: 'Northern Lights Cart', quantity: 1, price: 50.00 },
          { name: 'CBD Recovery Balm', quantity: 1, price: 45.00 }
        ],
        total: 95.00,
        status: 'preparing',
        paymentStatus: 'paid',
        deliveryMethod: 'pickup',
        orderDate: '2024-12-20T11:15:00Z',
        notes: 'Customer prefers pickup after 3 PM'
      },
      {
        id: '3',
        orderNumber: 'JFK-2024-001236',
        customer: {
          name: 'Michael Brown',
          email: 'mbrown@email.com',
          phone: '(555) 456-7890'
        },
        items: [
          { name: 'Gelato Pre-Rolls 5-Pack', quantity: 1, price: 65.00 }
        ],
        total: 65.00,
        status: 'pending',
        paymentStatus: 'pending',
        deliveryMethod: 'delivery',
        address: '456 Oak Ave, Nassau County, NY 11550',
        orderDate: '2024-12-20T12:00:00Z',
        estimatedDelivery: '2024-12-20T16:00:00Z'
      }
    ];

    setOrders(mockOrders);
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(order => order.paymentStatus === paymentFilter);
    }

    // Apply delivery filter
    if (deliveryFilter !== 'all') {
      filtered = filtered.filter(order => order.deliveryMethod === deliveryFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, paymentFilter, deliveryFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'out-for-delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'preparing':
        return <Package className="h-4 w-4" />;
      case 'out-for-delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
  };

  const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{order.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(order.orderDate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      getStatusColor(order.status)
                    }`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{order.customer.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{order.customer.phone}</span>
                  </div>
                  {order.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span>{order.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Information */}
              {order.deliveryMethod === 'delivery' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium capitalize">{order.deliveryMethod}</span>
                    </div>
                    {order.estimatedDelivery && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated:</span>
                        <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleString()}</span>
                      </div>
                    )}
                    {order.driver && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver:</span>
                        <span className="font-medium">{order.driver}</span>
                      </div>
                    )}
                    {order.notes && (
                      <div>
                        <span className="text-gray-600">Notes:</span>
                        <p className="mt-1 text-gray-900">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['confirmed', 'preparing', 'out-for-delivery', 'delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(order.id, status)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        order.status === status
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                <button className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Track Delivery
                </button>
                <button className="w-full flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Customer
                </button>
                <button className="w-full flex items-center justify-center p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Print Receipt
                </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
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
                placeholder="Search orders..."
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
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Delivery Filter */}
          <select
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Methods</option>
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                      <p className="text-xs text-gray-500">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {order.deliveryMethod === 'delivery' ? (
                        <Truck className="h-4 w-4 text-blue-600 mr-1" />
                      ) : (
                        <Package className="h-4 w-4 text-green-600 mr-1" />
                      )}
                      <span className="text-sm capitalize">{order.deliveryMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
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

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;