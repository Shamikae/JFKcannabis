import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Home, Store, Truck } from 'lucide-react';

interface DeliveryMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    type: 'store' | 'customer' | 'driver' | 'business';
  }>;
  deliveryZones?: Array<{
    id: string;
    center: { lat: number; lng: number };
    radius: number; // in miles
    color: string;
  }>;
  onMarkerClick?: (markerId: string) => void;
  height?: string;
}

// This is a placeholder component that mimics a map
// In a real implementation, this would use Google Maps or another mapping library
const DeliveryMap: React.FC<DeliveryMapProps> = ({
  center = { lat: 40.6650, lng: -73.7834 }, // JFK Cannabis location
  zoom = 12,
  markers = [],
  deliveryZones = [],
  onMarkerClick,
  height = '400px'
}) => {
  // In a real implementation, we would initialize the map here
  
  const Marker: React.FC<{
    lat: number;
    lng: number;
    title: string;
    type: 'store' | 'customer' | 'driver' | 'business';
    onClick?: () => void;
  }> = ({ title, type, onClick }) => {
    const getMarkerIcon = () => {
      switch (type) {
        case 'store':
          return <Store className="h-6 w-6 text-primary-600" />;
        case 'customer':
          return <Home className="h-6 w-6 text-blue-600" />;
        case 'driver':
          return <Truck className="h-6 w-6 text-green-600" />;
        case 'business':
          return <MapPin className="h-6 w-6 text-purple-600" />;
        default:
          return <MapPin className="h-6 w-6 text-red-600" />;
      }
    };

    return (
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
        onClick={onClick}
      >
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full shadow-md">
            {getMarkerIcon()}
          </div>
          <div className="mt-1 px-2 py-1 bg-white text-xs font-medium rounded shadow-sm whitespace-nowrap">
            {title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height, width: '100%', position: 'relative', backgroundColor: '#f0f0f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
      {/* This is a placeholder for the actual map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Map View</p>
        <p className="text-xs text-gray-400 absolute bottom-2">
          Google Maps integration will be displayed here
        </p>
      </div>
      
      {/* Render markers */}
      {markers.map(marker => (
        <div 
          key={marker.id}
          style={{ 
            position: 'absolute',
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
        >
          <Marker
            lat={marker.lat}
            lng={marker.lng}
            title={marker.title}
            type={marker.type}
            onClick={() => onMarkerClick && onMarkerClick(marker.id)}
          />
        </div>
      ))}
      
      {/* Render delivery zones */}
      {deliveryZones.map(zone => (
        <div 
          key={zone.id}
          style={{ 
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${zone.radius * 20}px`,
            height: `${zone.radius * 20}px`,
            borderRadius: '50%',
            border: `2px solid ${zone.color}`,
            backgroundColor: `${zone.color}20`,
            opacity: 0.7
          }}
        ></div>
      ))}
    </div>
  );
};

export default DeliveryMap;