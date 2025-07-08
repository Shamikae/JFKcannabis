import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Star,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Plus,
  Download,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  Car,
  FileText,
  Mail,
  Shield
} from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  rating: number;
  totalDeliveries: number;
  totalEarnings: number;
  joinDate: string;
  lastActive: string;
  vehicle: {
    make: string;
    model: string;
    year: string;
    color: string;
    plate: string;
  };
  documents: {
    license: {
      number: string;
      state: string;
      expiration: string;
      verified: boolean;
    };
    insurance: {
      provider: string;
      policyNumber: string;
      expiration: string;
      verified: boolean;
    };
    backgroundCheck: {
      status: 'pending' | 'passed' | 'failed';
      date?: string;
    };
  };
  availability: {
    monday: { morning: boolean; afternoon: boolean; evening: boolean };
    tuesday: { morning: boolean; afternoon: boolean; evening: boolean };
    wednesday: { morning: boolean; afternoon: boolean; evening: boolean };
    thursday: { morning: boolean; afternoon: boolean; evening: boolean };
    friday: { morning: boolean; afternoon: boolean; evening: boolean };
    saturday: { morning: boolean; afternoon: boolean; evening: boolean };
    sunday: { morning: boolean; afternoon: boolean; evening: boolean };
  };
  preferredZones: string[];
  currentLocation?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  currentDelivery?: {
    id: string;
    status: 'assigned' | 'picked-up' | 'in-transit' | 'delivered';
    estimatedDelivery: string;
  };
  profileImage?: string;
}

interface Delivery {
  id: string;
  orderId: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  driver?: {
    id: string;
    name: string;
  };
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  createdAt: string;
  assignedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  estimatedDelivery?: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  total: number;
  tip?: number;
  distance: number;
  notes?: string;
}

const DeliveryDriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'drivers' | 'applications' | 'analytics'>('drivers');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch drivers
    const fetchDrivers = async () => {
      setLoading(true);
      
      // Mock data
      const mockDrivers: Driver[] = [
        {
          id: 'driver-001',
          name: 'Michael Rodriguez',
          email: 'michael.r@example.com',
          phone: '(555) 123-4567',
          address: '123 Main St, Queens, NY 11434',
          status: 'active',
          rating: 4.8,
          totalDeliveries: 156,
          totalEarnings: 3120.00,
          joinDate: '2024-01-15',
          lastActive: '2024-12-20T14:30:00Z',
          vehicle: {
            make: 'Honda',
            model: 'Civic',
            year: '2020',
            color: 'Black',
            plate: 'ABC123'
          },
          documents: {
            license: {
              number: 'NY12345678',
              state: 'NY',
              expiration: '2026-05-15',
              verified: true
            },
            insurance: {
              provider: 'State Farm',
              policyNumber: 'SF123456789',
              expiration: '2025-03-10',
              verified: true
            },
            backgroundCheck: {
              status: 'passed',
              date: '2024-01-10'
            }
          },
          availability: {
            monday: { morning: true, afternoon: true, evening: false },
            tuesday: { morning: true, afternoon: true, evening: false },
            wednesday: { morning: false, afternoon: true, evening: true },
            thursday: { morning: false, afternoon: true, evening: true },
            friday: { morning: false, afternoon: false, evening: true },
            saturday: { morning: true, afternoon: true, evening: true },
            sunday: { morning: false, afternoon: false, evening: false }
          },
          preferredZones: ['queens', 'jfk', 'fivetowns'],
          currentLocation: {
            lat: 40.6650,
            lng: -73.7834,
            lastUpdated: '2024-12-20T14:25:00Z'
          },
          currentDelivery: {
            id: 'del-001',
            status: 'in-transit',
            estimatedDelivery: '2024-12-20T15:00:00Z'
          },
          profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: 'driver-002',
          name: 'Sarah Chen',
          email: 'sarah.c@example.com',
          phone: '(555) 987-6543',
          address: '456 Oak Ave, Queens, NY 11435',
          status: 'active',
          rating: 4.9,
          totalDeliveries: 203,
          totalEarnings: 4060.00,
          joinDate: '2023-11-05',
          lastActive: '2024-12-20T13:15:00Z',
          vehicle: {
            make: 'Toyota',
            model: 'Prius',
            year: '2021',
            color: 'Silver',
            plate: 'XYZ789'
          },
          documents: {
            license: {
              number: 'NY87654321',
              state: 'NY',
              expiration: '2025-08-22',
              verified: true
            },
            insurance: {
              provider: 'Geico',
              policyNumber: 'GC987654321',
              expiration: '2025-05-15',
              verified: true
            },
            backgroundCheck: {
              status: 'passed',
              date: '2023-11-01'
            }
          },
          availability: {
            monday: { morning: false, afternoon: true, evening: true },
            tuesday: { morning: false, afternoon: true, evening: true },
            wednesday: { morning: false, afternoon: true, evening: true },
            thursday: { morning: false, afternoon: true, evening: true },
            friday: { morning: true, afternoon: true, evening: true },
            saturday: { morning: true, afternoon: true, evening: false },
            sunday: { morning: true, afternoon: false, evening: false }
          },
          preferredZones: ['queens', 'nassau', 'longisland'],
          currentLocation: {
            lat: 40.7128,
            lng: -73.8370,
            lastUpdated: '2024-12-20T13:10:00Z'
          },
          profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: 'driver-003',
          name: 'David Wilson',
          email: 'david.w@example.com',
          phone: '(555) 456-7890',
          address: '789 Pine Rd, Nassau County, NY 11550',
          status: 'inactive',
          rating: 4.6,
          totalDeliveries: 87,
          totalEarnings: 1740.00,
          joinDate: '2024-03-10',
          lastActive: '2024-12-15T18:45:00Z',
          vehicle: {
            make: 'Ford',
            model: 'Focus',
            year: '2019',
            color: 'Blue',
            plate: 'DEF456'
          },
          documents: {
            license: {
              number: 'NY45678901',
              state: 'NY',
              expiration: '2026-02-28',
              verified: true
            },
            insurance: {
              provider: 'Progressive',
              policyNumber: 'PG456789012',
              expiration: '2025-01-20',
              verified: true
            },
            backgroundCheck: {
              status: 'passed',
              date: '2024-03-05'
            }
          },
          availability: {
            monday: { morning: true, afternoon: false, evening: false },
            tuesday: { morning: true, afternoon: false, evening: false },
            wednesday: { morning: true, afternoon: false, evening: false },
            thursday: { morning: true, afternoon: false, evening: false },
            friday: { morning: true, afternoon: false, evening: false },
            saturday: { morning: false, afternoon: false, evening: false },
            sunday: { morning: false, afternoon: false, evening: false }
          },
          preferredZones: ['nassau', 'fivetowns'],
          profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: 'driver-004',
          name: 'Emily Davis',
          email: 'emily.d@example.com',
          phone: '(555) 234-5678',
          address: '101 Maple St, Long Island, NY 11701',
          status: 'pending',
          rating: 0,
          totalDeliveries: 0,
          totalEarnings: 0,
          joinDate: '2024-12-18',
          lastActive: '2024-12-18T10:30:00Z',
          vehicle: {
            make: 'Hyundai',
            model: 'Elantra',
            year: '2022',
            color: 'White',
            plate: 'GHI789'
          },
          documents: {
            license: {
              number: 'NY56789012',
              state: 'NY',
              expiration: '2027-04-12',
              verified: false
            },
            insurance: {
              provider: 'Allstate',
              policyNumber: 'AS567890123',
              expiration: '2025-06-30',
              verified: false
            },
            backgroundCheck: {
              status: 'pending'
            }
          },
          availability: {
            monday: { morning: false, afternoon: true, evening: true },
            tuesday: { morning: false, afternoon: true, evening: true },
            wednesday: { morning: false, afternoon: true, evening: true },
            thursday: { morning: false, afternoon: true, evening: true },
            friday: { morning: false, afternoon: true, evening: true },
            saturday: { morning: true, afternoon: true, evening: true },
            sunday: { morning: true, afternoon: true, evening: false }
          },
          preferredZones: ['longisland', 'nassau'],
          profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        {
          id: 'driver-005',
          name: 'James Johnson',
          email: 'james.j@example.com',
          phone: '(555) 345-6789',
          address: '202 Elm St, Brooklyn, NY 11201',
          status: 'rejected',
          rating: 0,
          totalDeliveries: 0,
          totalEarnings: 0,
          joinDate: '2024-12-15',
          lastActive: '2024-12-15T14:20:00Z',
          vehicle: {
            make: 'Nissan',
            model: 'Altima',
            year: '2018',
            color: 'Red',
            plate: 'JKL012'
          },
          documents: {
            license: {
              number: 'NY67890123',
              state: 'NY',
              expiration: '2025-09-18',
              verified: false
            },
            insurance: {
              provider: 'Liberty Mutual',
              policyNumber: 'LM678901234',
              expiration: '2025-02-28',
              verified: false
            },
            backgroundCheck: {
              status: 'failed',
              date: '2024-12-17'
            }
          },
          availability: {
            monday: { morning: true, afternoon: true, evening: true },
            tuesday: { morning: true, afternoon: true, evening: true },
            wednesday: { morning: true, afternoon: true, evening: true },
            thursday: { morning: true, afternoon: true, evening: true },
            friday: { morning: true, afternoon: true, evening: true },
            saturday: { morning: true, afternoon: true, evening: true },
            sunday: { morning: true, afternoon: true, evening: true }
          },
          preferredZones: ['brooklyn', 'queens'],
          profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
        }
      ];
      
      // Mock deliveries
      const mockDeliveries: Delivery[] = [
        {
          id: 'del-001',
          orderId: 'ORD-001234',
          customer: {
            name: 'John Smith',
            address: '123 Main St, Queens, NY 11434',
            phone: '(555) 111-2222'
          },
          driver: {
            id: 'driver-001',
            name: 'Michael Rodriguez'
          },
          status: 'in-transit',
          createdAt: '2024-12-20T14:00:00Z',
          assignedAt: '2024-12-20T14:10:00Z',
          pickedUpAt: '2024-12-20T14:20:00Z',
          estimatedDelivery: '2024-12-20T15:00:00Z',
          items: [
            { name: 'Blue Dream 3.5g', quantity: 1 },
            { name: 'Cosmic Gummies', quantity: 2 }
          ],
          total: 95.00,
          tip: 15.00,
          distance: 5.2,
          notes: 'Ring doorbell, apartment 4B'
        },
        {
          id: 'del-002',
          orderId: 'ORD-001235',
          customer: {
            name: 'Sarah Johnson',
            address: '456 Oak Ave, Nassau County, NY 11550',
            phone: '(555) 333-4444'
          },
          driver: {
            id: 'driver-002',
            name: 'Sarah Chen'
          },
          status: 'picked-up',
          createdAt: '2024-12-20T13:30:00Z',
          assignedAt: '2024-12-20T13:40:00Z',
          pickedUpAt: '2024-12-20T13:55:00Z',
          estimatedDelivery: '2024-12-20T14:30:00Z',
          items: [
            { name: 'Northern Lights Cart', quantity: 1 },
            { name: 'CBD Recovery Balm', quantity: 1 }
          ],
          total: 95.00,
          distance: 8.7
        },
        {
          id: 'del-003',
          orderId: 'ORD-001236',
          customer: {
            name: 'Michael Brown',
            address: '789 Pine Rd, Long Island, NY 11701',
            phone: '(555) 555-6666'
          },
          status: 'pending',
          createdAt: '2024-12-20T14:15:00Z',
          items: [
            { name: 'Gelato Pre-Rolls 5-Pack', quantity: 1 }
          ],
          total: 65.00,
          distance: 15.3
        }
      ];
      
      setDrivers(mockDrivers);
      setDeliveries(mockDeliveries);
      setLoading(false);
    };
    
    fetchDrivers();
  }, []);

  useEffect(() => {
    let filtered = [...drivers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(driver => driver.status === statusFilter);
    }
    
    // Apply zone filter
    if (zoneFilter !== 'all') {
      filtered = filtered.filter(driver => driver.preferredZones.includes(zoneFilter));
    }
    
    setFilteredDrivers(filtered);
  }, [drivers, searchTerm, statusFilter, zoneFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            Inactive
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getDeliveryStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <User className="h-3 w-3 mr-1" />
            Assigned
          </span>
        );
      case 'picked-up':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Package className="h-3 w-3 mr-1" />
            Picked Up
          </span>
        );
      case 'in-transit':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <Truck className="h-3 w-3 mr-1" />
            In Transit
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const handleViewDriverDetails = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDriverDetails(true);
  };

  const handleApproveDriver = (driverId: string) => {
    setDrivers(prev => 
      prev.map(driver => 
        driver.id === driverId 
          ? { ...driver, status: 'active' as const } 
          : driver
      )
    );
  };

  const handleRejectDriver = (driverId: string) => {
    setDrivers(prev => 
      prev.map(driver => 
        driver.id === driverId 
          ? { ...driver, status: 'rejected' as const } 
          : driver
      )
    );
  };

  const handleAssignDelivery = (deliveryId: string, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    
    if (driver) {
      setDeliveries(prev => 
        prev.map(delivery => 
          delivery.id === deliveryId 
            ? { 
                ...delivery, 
                status: 'assigned' as const,
                driver: {
                  id: driver.id,
                  name: driver.name
                },
                assignedAt: new Date().toISOString()
              } 
            : delivery
        )
      );
    }
  };

  const DriverDetailsModal: React.FC<{ driver: Driver; onClose: () => void }> = ({ driver, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Driver Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Driver Information */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                    {driver.profileImage ? (
                      <img 
                        src={driver.profileImage} 
                        alt={driver.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{driver.name}</h3>
                    <div className="flex items-center">
                      {getStatusBadge(driver.status)}
                      {driver.rating > 0 && (
                        <div className="ml-2 flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{driver.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{driver.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{driver.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{driver.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium">{new Date(driver.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Make & Model</p>
                    <p className="font-medium">{driver.vehicle.make} {driver.vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium">{driver.vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-medium">{driver.vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Plate</p>
                    <p className="font-medium">{driver.vehicle.plate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Document Verification</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Driver's License</p>
                      <p className="text-sm text-gray-500">
                        {driver.documents.license.number} • Expires: {new Date(driver.documents.license.expiration).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      {driver.documents.license.verified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <button className="text-primary-600 text-sm hover:underline">
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Insurance</p>
                      <p className="text-sm text-gray-500">
                        {driver.documents.insurance.provider} • Policy: {driver.documents.insurance.policyNumber}
                      </p>
                    </div>
                    <div>
                      {driver.documents.insurance.verified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <button className="text-primary-600 text-sm hover:underline">
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Background Check</p>
                      <p className="text-sm text-gray-500">
                        {driver.documents.backgroundCheck.status === 'passed' && driver.documents.backgroundCheck.date
                          ? `Passed on ${new Date(driver.documents.backgroundCheck.date).toLocaleDateString()}`
                          : driver.documents.backgroundCheck.status === 'failed' && driver.documents.backgroundCheck.date
                          ? `Failed on ${new Date(driver.documents.backgroundCheck.date).toLocaleDateString()}`
                          : 'Pending'}
                      </p>
                    </div>
                    <div>
                      {driver.documents.backgroundCheck.status === 'passed' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Passed
                        </span>
                      ) : driver.documents.backgroundCheck.status === 'failed' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Failed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Morning
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Afternoon
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Evening
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(driver.availability).map(([day, times]) => (
                        <tr key={day}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {times.morning ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {times.afternoon ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {times.evening ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Driver Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Deliveries</span>
                    <span className="font-bold">{driver.totalDeliveries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="font-bold">${driver.totalEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-bold">{driver.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Active</span>
                    <span className="font-medium">{new Date(driver.lastActive).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Preferred Zones</h3>
                <div className="flex flex-wrap gap-2">
                  {driver.preferredZones.map(zone => (
                    <span 
                      key={zone} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {zone === 'queens' ? 'Queens' :
                       zone === 'nassau' ? 'Nassau County' :
                       zone === 'jfk' ? 'JFK Airport' :
                       zone === 'fivetowns' ? 'Five Towns' :
                       zone === 'longisland' ? 'Long Island' :
                       zone === 'brooklyn' ? 'Brooklyn' : zone}
                    </span>
                  ))}
                </div>
              </div>

              {driver.currentDelivery && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Current Delivery</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Status</span>
                      <span className="font-medium capitalize">{driver.currentDelivery.status.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Estimated Delivery</span>
                      <span className="font-medium">{new Date(driver.currentDelivery.estimatedDelivery).toLocaleTimeString()}</span>
                    </div>
                    <div className="mt-3">
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Delivery Details
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {driver.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApproveDriver(driver.id)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Driver
                    </button>
                    <button 
                      onClick={() => handleRejectDriver(driver.id)}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Application
                    </button>
                  </>
                )}
                
                {driver.status === 'active' && (
                  <>
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Message Driver
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      View Delivery History
                    </button>
                  </>
                )}
                
                {driver.status === 'inactive' && (
                  <button 
                    onClick={() => handleApproveDriver(driver.id)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Reactivate Driver
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
        <h1 className="text-2xl font-bold text-gray-900">Delivery Driver Management</h1>
        <p className="text-gray-600">Manage your delivery drivers and track deliveries</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'drivers'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Truck className="h-4 w-4 mr-2" />
            Active Drivers
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'applications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Driver Applications
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Driver Analytics
          </button>
        </nav>
      </div>

      {/* Active Drivers Tab */}
      {activeTab === 'drivers' && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Deliveries Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {deliveries.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                  <p className="text-2xl font-bold text-gray-900">
                    45 min
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Driver Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(drivers
                      .filter(d => d.rating > 0)
                      .reduce((sum, d) => sum + d.rating, 0) / 
                      drivers.filter(d => d.rating > 0).length
                    ).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search drivers..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              
              {/* Zone Filter */}
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Zones</option>
                <option value="queens">Queens</option>
                <option value="nassau">Nassau County</option>
                <option value="jfk">JFK Airport</option>
                <option value="fivetowns">Five Towns</option>
                <option value="longisland">Long Island</option>
                <option value="brooklyn">Brooklyn</option>
              </select>
            </div>
          </div>

          {/* Drivers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deliveries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
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
                  {filteredDrivers
                    .filter(driver => driver.status === 'active' || driver.status === 'inactive')
                    .map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            {driver.profileImage ? (
                              <img 
                                src={driver.profileImage} 
                                alt={driver.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-primary-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                            <p className="text-xs text-gray-500">{driver.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(driver.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{driver.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium">{driver.totalDeliveries}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium">${driver.totalEarnings.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{driver.vehicle.make} {driver.vehicle.model}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{new Date(driver.lastActive).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDriverDetails(driver)}
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

          {/* Pending Deliveries */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Pending Deliveries</h2>
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
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Distance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assign Driver
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deliveries
                      .filter(delivery => delivery.status === 'pending')
                      .map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{delivery.orderId}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium">{delivery.customer.name}</p>
                            <p className="text-xs text-gray-500">{delivery.customer.address}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{delivery.items.length} items</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium">${delivery.total.toFixed(2)}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{delivery.distance.toFixed(1)} miles</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{new Date(delivery.createdAt).toLocaleTimeString()}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            onChange={(e) => handleAssignDelivery(delivery.id, e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-primary-500 focus:border-primary-500"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign driver</option>
                            {drivers
                              .filter(driver => driver.status === 'active' && !driver.currentDelivery)
                              .map(driver => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.name}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {deliveries.filter(delivery => delivery.status === 'pending').length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Pending Deliveries</h3>
                  <p className="text-gray-500">All deliveries have been assigned to drivers</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Deliveries */}
          <div>
            <h2 className="text-xl font-bold mb-4">Active Deliveries</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ETA
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
                    {deliveries
                      .filter(delivery => ['assigned', 'picked-up', 'in-transit'].includes(delivery.status))
                      .map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{delivery.orderId}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {delivery.driver ? (
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                                <span className="text-xs font-medium text-primary-600">
                                  {delivery.driver.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm">{delivery.driver.name}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Unassigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium">{delivery.customer.name}</p>
                            <p className="text-xs text-gray-500">{delivery.customer.address}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getDeliveryStatusBadge(delivery.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">
                            {delivery.estimatedDelivery 
                              ? new Date(delivery.estimatedDelivery).toLocaleTimeString() 
                              : 'N/A'}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{delivery.distance.toFixed(1)} miles</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
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
              
              {deliveries.filter(delivery => ['assigned', 'picked-up', 'in-transit'].includes(delivery.status)).length === 0 && (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Deliveries</h3>
                  <p className="text-gray-500">There are no deliveries in progress at the moment</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Background Check
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDrivers
                    .filter(driver => driver.status === 'pending' || driver.status === 'rejected')
                    .map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            {driver.profileImage ? (
                              <img 
                                src={driver.profileImage} 
                                alt={driver.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-primary-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                            <p className="text-xs text-gray-500">{driver.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(driver.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{driver.vehicle.make} {driver.vehicle.model}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {driver.documents.backgroundCheck.status === 'passed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Passed
                          </span>
                        ) : driver.documents.backgroundCheck.status === 'failed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="h-3 w-3 mr-1" />
                            Failed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{new Date(driver.joinDate).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDriverDetails(driver)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {driver.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveDriver(driver.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRejectDriver(driver.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredDrivers.filter(driver => driver.status === 'pending' || driver.status === 'rejected').length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Applications</h3>
                <p className="text-gray-500">There are no pending driver applications</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Performance</h3>
              <div className="space-y-4">
                {drivers
                  .filter(driver => driver.status === 'active')
                  .sort((a, b) => b.totalDeliveries - a.totalDeliveries)
                  .slice(0, 5)
                  .map(driver => (
                  <div key={driver.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                        {driver.profileImage ? (
                          <img 
                            src={driver.profileImage} 
                            alt={driver.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-primary-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span>{driver.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{driver.totalDeliveries} deliveries</p>
                      <p className="text-sm text-gray-500">${driver.totalEarnings.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Zones</h3>
              <div className="space-y-3">
                {[
                  { zone: 'Queens', deliveries: 156, percentage: 45 },
                  { zone: 'Nassau County', deliveries: 89, percentage: 25 },
                  { zone: 'JFK Airport', deliveries: 67, percentage: 20 },
                  { zone: 'Five Towns', deliveries: 23, percentage: 7 },
                  { zone: 'Long Island', deliveries: 12, percentage: 3 }
                ].map(zone => (
                  <div key={zone.zone}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{zone.zone}</span>
                      <span>{zone.deliveries} deliveries ({zone.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${zone.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Times</h3>
              <div className="space-y-3">
                {[
                  { time: 'Morning (9AM-12PM)', deliveries: 45, percentage: 15 },
                  { time: 'Afternoon (12PM-5PM)', deliveries: 105, percentage: 35 },
                  { time: 'Evening (5PM-10PM)', deliveries: 150, percentage: 50 }
                ].map(time => (
                  <div key={time.time}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{time.time}</span>
                      <span>{time.deliveries} deliveries ({time.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${time.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Delivery Time</span>
                  <span className="font-bold">45 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">On-Time Delivery Rate</span>
                  <span className="font-bold">94.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Distance</span>
                  <span className="font-bold">6.8 miles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Tip</span>
                  <span className="font-bold">$8.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-bold">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Driver Details Modal */}
      {showDriverDetails && selectedDriver && (
        <DriverDetailsModal
          driver={selectedDriver}
          onClose={() => {
            setShowDriverDetails(false);
            setSelectedDriver(null);
          }}
        />
      )}
    </div>
  );
};

export default DeliveryDriverManagement;