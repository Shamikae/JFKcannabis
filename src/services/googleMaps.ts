// Google Maps API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Geocode an address to get coordinates
export const geocodeAddress = async (address: string) => {
  try {
    // In a real implementation, this would call the Google Maps Geocoding API
    console.log(`Geocoding address: ${address}`);
    
    // For now, return mock coordinates
    return { lat: 40.6650, lng: -73.7834 };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

// Get places near a location
export const getNearbyPlaces = async (
  location: { lat: number; lng: number },
  radius: number = 5000,
  type: string = 'business'
) => {
  try {
    // In a real implementation, this would call the Google Places API
    console.log(`Getting places near ${location.lat},${location.lng} with radius ${radius}m and type ${type}`);
    
    // For now, return mock places
    return [
      {
        id: 'place1',
        name: 'JFK Airport Terminal 4',
        vicinity: 'JFK Airport, Queens, NY',
        geometry: {
          location: { lat: 40.6413, lng: -73.7781 }
        }
      },
      {
        id: 'place2',
        name: 'Skyline Hotel',
        vicinity: '123 Airport Rd, Queens, NY',
        geometry: {
          location: { lat: 40.6700, lng: -73.7950 }
        }
      }
    ];
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
};

// Get directions between two points
export const getDirections = async (
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number },
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
) => {
  try {
    // In a real implementation, this would call the Google Directions API
    console.log(`Getting directions from ${JSON.stringify(origin)} to ${JSON.stringify(destination)} via ${mode}`);
    
    // For now, return mock directions
    return {
      routes: [{
        legs: [{
          distance: { text: '5.2 mi', value: 8368 },
          duration: { text: '15 mins', value: 900 },
          steps: []
        }]
      }]
    };
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error;
  }
};

// Calculate distance and duration between two points
export const getDistanceMatrix = async (
  origins: string[] | { lat: number; lng: number }[],
  destinations: string[] | { lat: number; lng: number }[],
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
) => {
  try {
    // In a real implementation, this would call the Google Distance Matrix API
    console.log(`Getting distance matrix for ${origins.length} origins and ${destinations.length} destinations via ${mode}`);
    
    // For now, return mock distance matrix
    return {
      rows: [{
        elements: [{
          distance: { text: '5.2 mi', value: 8368 },
          duration: { text: '15 mins', value: 900 },
          status: 'OK'
        }]
      }]
    };
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    throw error;
  }
};

// Mock functions for development
export const mockGoogleMapsApi = {
  geocodeAddress: async (address: string) => {
    // Mock geocoding response
    const mockLocations: Record<string, { lat: number; lng: number }> = {
      'JFK Airport': { lat: 40.6413, lng: -73.7781 },
      'Queens NY': { lat: 40.7282, lng: -73.7949 },
      '175-01 Rockaway Blvd': { lat: 40.6650, lng: -73.7834 },
      'Nassau County': { lat: 40.7229, lng: -73.5871 }
    };
    
    // Find a matching location or return a default
    for (const [key, location] of Object.entries(mockLocations)) {
      if (address.toLowerCase().includes(key.toLowerCase())) {
        return location;
      }
    }
    
    // Default to JFK Cannabis location
    return { lat: 40.6650, lng: -73.7834 };
  },
  
  getNearbyBusinesses: async (location: { lat: number; lng: number }, radius: number = 5000) => {
    // Mock nearby businesses
    return [
      {
        id: 'biz1',
        name: 'JFK Airport Lounge',
        address: 'Terminal 4, JFK Airport, Queens, NY',
        type: 'lounge',
        distance: 0.5,
        acceptsDelivery: true,
        location: { lat: 40.6413, lng: -73.7781 },
        image: 'https://images.pexels.com/photos/2610756/pexels-photo-2610756.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 'biz2',
        name: 'Cloud 9 Smoke Shop',
        address: '123 Rockaway Blvd, Queens, NY',
        type: 'smoke-shop',
        distance: 1.2,
        acceptsDelivery: true,
        location: { lat: 40.6680, lng: -73.7900 },
        image: 'https://images.pexels.com/photos/3856027/pexels-photo-3856027.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 'biz3',
        name: 'Skyline Hotel',
        address: '456 Airport Rd, Queens, NY',
        type: 'hotel',
        distance: 1.8,
        acceptsDelivery: true,
        location: { lat: 40.6700, lng: -73.7950 },
        image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 'biz4',
        name: 'The Grind Coffee Shop',
        address: '789 Main St, Queens, NY',
        type: 'cafe',
        distance: 2.3,
        acceptsDelivery: true,
        location: { lat: 40.6750, lng: -73.8000 },
        image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 'biz5',
        name: 'Fitness First Gym',
        address: '101 Health Blvd, Queens, NY',
        type: 'gym',
        distance: 3.1,
        acceptsDelivery: true,
        location: { lat: 40.6800, lng: -73.8050 },
        image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ];
  },
  
  calculateDeliveryDistance: async (origin: string, destination: string) => {
    // Mock distance calculation
    return {
      distance: { text: '5.2 mi', value: 8368 }, // value in meters
      duration: { text: '15 mins', value: 900 }, // value in seconds
      status: 'OK'
    };
  },
  
  getDeliveryZones: () => {
    // Mock delivery zones
    return [
      {
        id: 'zone1',
        name: 'Zone 1: JFK Airport Area',
        center: { lat: 40.6413, lng: -73.7781 },
        radius: 5, // miles
        deliveryFee: 5.00,
        minOrder: 60.00,
        estimatedTime: '30-45 min',
        color: '#4CAF50'
      },
      {
        id: 'zone2',
        name: 'Zone 2: Queens',
        center: { lat: 40.7282, lng: -73.7949 },
        radius: 10, // miles
        deliveryFee: 8.00,
        minOrder: 60.00,
        estimatedTime: '45-60 min',
        color: '#2196F3'
      },
      {
        id: 'zone3',
        name: 'Zone 3: Nassau County',
        center: { lat: 40.7229, lng: -73.5871 },
        radius: 15, // miles
        deliveryFee: 12.00,
        minOrder: 100.00,
        estimatedTime: '60-90 min',
        color: '#FFC107'
      }
    ];
  }
};

export default {
  geocodeAddress,
  getNearbyPlaces,
  getDirections,
  getDistanceMatrix,
  mockGoogleMapsApi
};