import React, { useState, useEffect } from 'react';
import { MapPin, Info, DollarSign, Clock, Truck } from 'lucide-react';
import DeliveryMap from './DeliveryMap';
import { mockGoogleMapsApi } from '../../services/googleMaps';

interface DeliveryZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number; // miles
  deliveryFee: number;
  minOrder: number;
  estimatedTime: string;
  color: string;
}

interface DeliveryZoneMapProps {
  userAddress?: string;
  onZoneSelect?: (zone: DeliveryZone) => void;
  height?: string;
}

const DeliveryZoneMap: React.FC<DeliveryZoneMapProps> = ({ 
  userAddress,
  onZoneSelect,
  height = '400px'
}) => {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get delivery zones
    const deliveryZones = mockGoogleMapsApi.getDeliveryZones();
    setZones(deliveryZones);
    
    // If user address is provided, geocode it
    if (userAddress) {
      setLoading(true);
      mockGoogleMapsApi.geocodeAddress(userAddress)
        .then(location => {
          setUserLocation(location);
          
          // Find which zone the user is in
          const userZone = deliveryZones.find(zone => {
            // Calculate distance between user and zone center
            const distance = calculateDistance(
              location.lat, 
              location.lng, 
              zone.center.lat, 
              zone.center.lng
            );
            return distance <= zone.radius;
          });
          
          if (userZone) {
            setSelectedZone(userZone.id);
            onZoneSelect && onZoneSelect(userZone);
          }
        })
        .catch(err => {
          console.error('Error geocoding address:', err);
          setError('Could not find your location. Please try a different address.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userAddress, onZoneSelect]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const handleMarkerClick = (markerId: string) => {
    if (markerId === 'user') return;
    
    const zone = zones.find(z => z.id === markerId);
    if (zone) {
      setSelectedZone(zone.id);
      onZoneSelect && onZoneSelect(zone);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 border-b border-red-100">
          <p className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            {error}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <DeliveryMap 
            center={{ lat: 40.6650, lng: -73.7834 }} // JFK Cannabis location
            zoom={11}
            markers={[
              {
                id: 'store',
                lat: 40.6650,
                lng: -73.7834,
                title: 'JFK Cannabis',
                type: 'store'
              },
              ...(userLocation ? [{
                id: 'user',
                lat: userLocation.lat,
                lng: userLocation.lng,
                title: 'Your Location',
                type: 'customer'
              }] : [])
            ]}
            deliveryZones={zones.map(zone => ({
              id: zone.id,
              center: zone.center,
              radius: zone.radius,
              color: zone.color
            }))}
            onMarkerClick={handleMarkerClick}
            height={height}
          />
        </div>
        
        <div className="p-4 border-t md:border-t-0 md:border-l border-gray-200">
          <h3 className="font-bold text-lg mb-4">Delivery Zones</h3>
          
          <div className="space-y-4">
            {zones.map(zone => (
              <div 
                key={zone.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedZone === zone.id 
                    ? 'ring-2 ring-primary-500 bg-primary-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedZone(zone.id);
                  onZoneSelect && onZoneSelect(zone);
                }}
              >
                <div className="flex items-center mb-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: zone.color }}
                  ></div>
                  <h4 className="font-medium">{zone.name}</h4>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Up to {zone.radius} miles</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span>
                      ${zone.deliveryFee.toFixed(2)} fee
                      {zone.minOrder > 0 && ` (Free over $${zone.minOrder.toFixed(2)})`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{zone.estimatedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-gray-500 flex items-start">
            <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              Delivery times may vary based on order volume, traffic conditions, and weather.
              Minimum order amounts apply for free delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryZoneMap;