import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, X } from 'lucide-react';

interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  type: string;
  distance: number;
  acceptsDelivery: boolean;
  image: string;
}

interface BusinessLocationSearchProps {
  onSelect: (location: BusinessLocation) => void;
  onClose: () => void;
}

const BusinessLocationSearch: React.FC<BusinessLocationSearchProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch business locations
    const fetchLocations = async () => {
      setLoading(true);
      
      // Mock data
      const mockLocations: BusinessLocation[] = [
        { 
          id: 'biz1', 
          name: 'JFK Airport Lounge', 
          address: 'Terminal 4, JFK Airport, Queens, NY', 
          type: 'lounge', 
          distance: 0.5, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/2610756/pexels-photo-2610756.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz2', 
          name: 'Cloud 9 Smoke Shop', 
          address: '123 Rockaway Blvd, Queens, NY', 
          type: 'smoke-shop', 
          distance: 1.2, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/3856027/pexels-photo-3856027.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz3', 
          name: 'Skyline Hotel', 
          address: '456 Airport Rd, Queens, NY', 
          type: 'hotel', 
          distance: 1.8, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz4', 
          name: 'The Grind Coffee Shop', 
          address: '789 Main St, Queens, NY', 
          type: 'cafe', 
          distance: 2.3, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz5', 
          name: 'Fitness First Gym', 
          address: '101 Health Blvd, Queens, NY', 
          type: 'gym', 
          distance: 3.1, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz6', 
          name: 'Airport Plaza Hotel', 
          address: '202 Airport Plaza, Queens, NY', 
          type: 'hotel', 
          distance: 1.5, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz7', 
          name: 'Five Towns Lounge', 
          address: '303 Central Ave, Cedarhurst, NY', 
          type: 'lounge', 
          distance: 4.2, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/2610756/pexels-photo-2610756.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          id: 'biz8', 
          name: 'Nassau Vape & Smoke', 
          address: '404 Hempstead Tpke, Elmont, NY', 
          type: 'smoke-shop', 
          distance: 5.3, 
          acceptsDelivery: true,
          image: 'https://images.pexels.com/photos/3856027/pexels-photo-3856027.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
      ];
      
      setTimeout(() => {
        setLocations(mockLocations);
        setFilteredLocations(mockLocations);
        setLoading(false);
      }, 500);
    };
    
    fetchLocations();
  }, []);

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

  const getBusinessTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Building className="h-4 w-4" />;
      case 'restaurant':
      case 'cafe':
      case 'smoke-shop':
        return <Building className="h-4 w-4" />;
      case 'lounge':
      case 'gym':
        return <Building className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
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
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="py-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading business locations...</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map(location => (
                  <div 
                    key={location.id}
                    className="flex items-start p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer"
                    onClick={() => onSelect(location)}
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
                          {getBusinessTypeIcon(location.type)}
                          <span className="ml-1 capitalize">{location.type.replace('-', ' ')}</span>
                        </span>
                        <span className="flex items-center text-xs text-neutral-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{location.distance} miles away</span>
                        </span>
                      </div>
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
            
            <div className="mt-4 text-xs text-neutral-500">
              <p>These businesses have partnered with JFK Cannabis to allow cannabis deliveries to their location. You must be present with valid ID to receive your order.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessLocationSearch;