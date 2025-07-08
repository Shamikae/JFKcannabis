import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, X, Info } from 'lucide-react';
import DeliveryMap from './DeliveryMap';
import { mockGoogleMapsApi } from '../../services/googleMaps';

interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  type: string;
  distance: number;
  acceptsDelivery: boolean;
  image: string;
  location: { lat: number; lng: number };
}

interface BusinessLocationMapProps {
  onSelect: (location: BusinessLocation) => void;
  onClose: () => void;
  userLocation?: { lat: number; lng: number };
}

const BusinessLocationMap: React.FC<BusinessLocationMapProps> = ({ 
  onSelect, 
  onClose,
  userLocation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(userLocation || { lat: 40.6650, lng: -73.7834 });

  useEffect(() => {
    // Simulate API call to fetch business locations
    const fetchLocations = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would call the Google Places API
        const nearbyBusinesses = await mockGoogleMapsApi.getNearbyBusinesses(
          userLocation || { lat: 40.6650, lng: -73.7834 }
        );
        
        setLocations(nearbyBusinesses);
        setFilteredLocations(nearbyBusinesses);
      } catch (error) {
        console.error('Error fetching business locations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocations();
  }, [userLocation]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [searchTerm, locations]);

  const handleMarkerClick = (markerId: string) => {
    setSelectedLocation(markerId);
    const location = locations.find(loc => loc.id === markerId);
    if (location) {
      setMapCenter(location.location);
    }
  };

  const handleSelectLocation = (location: BusinessLocation) => {
    onSelect(location);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Find a Business Location</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name, address, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="py-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading business locations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Map */}
              <div className="md:col-span-1">
                <DeliveryMap 
                  center={mapCenter}
                  zoom={13}
                  markers={[
                    {
                      id: 'store',
                      lat: 40.6650,
                      lng: -73.7834,
                      title: 'JFK Cannabis',
                      type: 'store'
                    },
                    ...filteredLocations.map(location => ({
                      id: location.id,
                      lat: location.location.lat,
                      lng: location.location.lng,
                      title: location.name,
                      type: 'business' as const
                    }))
                  ]}
                  deliveryZones={[
                    {
                      id: 'zone1',
                      center: { lat: 40.6650, lng: -73.7834 },
                      radius: 5, // 5 miles
                      color: '#4CAF50'
                    },
                    {
                      id: 'zone2',
                      center: { lat: 40.6650, lng: -73.7834 },
                      radius: 10, // 10 miles
                      color: '#2196F3'
                    },
                    {
                      id: 'zone3',
                      center: { lat: 40.6650, lng: -73.7834 },
                      radius: 15, // 15 miles
                      color: '#FFC107'
                    }
                  ]}
                  onMarkerClick={handleMarkerClick}
                  height="400px"
                />
              </div>
              
              {/* Location List */}
              <div className="md:col-span-1 max-h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map(location => (
                      <div 
                        key={location.id}
                        className={`flex items-start p-3 border rounded-lg hover:bg-neutral-50 cursor-pointer ${
                          selectedLocation === location.id ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'
                        }`}
                        onClick={() => handleMarkerClick(location.id)}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={location.image} 
                            alt={location.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{location.name}</h4>
                          <p className="text-sm text-neutral-600">{location.address}</p>
                          <div className="flex items-center mt-1">
                            <span className="flex items-center text-xs text-neutral-500 mr-3">
                              <Building className="h-4 w-4 mr-1" />
                              <span className="capitalize">{location.type.replace('-', ' ')}</span>
                            </span>
                            <span className="flex items-center text-xs text-neutral-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{location.distance} miles away</span>
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleSelectLocation(location)}
                            className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Select this location
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                      <h4 className="font-medium mb-1">No locations found</h4>
                      <p className="text-sm text-neutral-500">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-xs text-neutral-500 flex items-start">
            <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              These businesses have partnered with JFK Cannabis to allow cannabis deliveries to their location. 
              You must be present with valid ID to receive your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLocationMap;