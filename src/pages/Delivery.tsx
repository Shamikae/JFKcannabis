import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Truck, Store, ArrowRight, Search, Building, Info } from 'lucide-react';
import DeliveryZoneMap from '../components/delivery/DeliveryZoneMap';
import BusinessLocationMap from '../components/delivery/BusinessLocationMap';
import { mockGoogleMapsApi } from '../services/googleMaps';

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

interface DeliveryZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  deliveryFee: number;
  minOrder: number;
  estimatedTime: string;
  color: string;
}

const Delivery: React.FC = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup' | 'business' | 'drive-thru'>('delivery');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null);
  const [showBusinessMap, setShowBusinessMap] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessLocation | null>(null);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !zipCode) {
      setAddressError('Please enter both address and ZIP code');
      return;
    }
    
    setIsValidatingAddress(true);
    setAddressError(null);
    
    try {
      // In a real app, this would call the Google Maps Geocoding API
      const fullAddress = `${address}, ${zipCode}`;
      const location = await mockGoogleMapsApi.geocodeAddress(fullAddress);
      
      setUserLocation(location);
      
      // Check if the address is within delivery zones
      const zones = mockGoogleMapsApi.getDeliveryZones();
      const userZone = zones.find(zone => {
        // Calculate distance between user and zone center
        const lat1 = location.lat;
        const lon1 = location.lng;
        const lat2 = zone.center.lat;
        const lon2 = zone.center.lng;
        
        const R = 3958.8; // Radius of the Earth in miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        return distance <= zone.radius;
      });
      
      if (userZone) {
        setSelectedZone(userZone);
      } else {
        setAddressError('Sorry, we do not deliver to this address yet.');
      }
    } catch (error) {
      console.error('Error validating address:', error);
      setAddressError('Could not validate address. Please try again.');
    } finally {
      setIsValidatingAddress(false);
    }
  };

  const handleBusinessSelect = (business: BusinessLocation) => {
    setSelectedBusiness(business);
    setShowBusinessMap(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Choose Your Order Method
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Delivery Option */}
          <button
            onClick={() => setDeliveryMethod('delivery')}
            className={`p-6 rounded-lg text-left transition-all ${
              deliveryMethod === 'delivery'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white text-neutral-900 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center mb-4">
              <Truck className="h-8 w-8 mr-3" />
              <h2 className="text-xl font-bold">Home Delivery</h2>
            </div>
            <p className="mb-4">
              Get your order delivered right to your door. Available within our delivery radius.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                60-90 minute delivery window
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                $60 minimum order for free delivery
              </li>
            </ul>
          </button>

          {/* Pickup Option */}
          <button
            onClick={() => setDeliveryMethod('pickup')}
            className={`p-6 rounded-lg text-left transition-all ${
              deliveryMethod === 'pickup'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white text-neutral-900 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center mb-4">
              <Store className="h-8 w-8 mr-3" />
              <h2 className="text-xl font-bold">Store Pickup</h2>
            </div>
            <p className="mb-4">
              Pick up your order at our store. Ready in about 30 minutes.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                30-minute preparation time
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Located across from JFK Airport
              </li>
            </ul>
          </button>
          
          {/* Drive-Thru Option */}
          <button
            onClick={() => setDeliveryMethod('drive-thru')}
            className={`p-6 rounded-lg text-left transition-all ${
              deliveryMethod === 'drive-thru'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white text-neutral-900 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center mb-4">
              <Truck className="h-8 w-8 mr-3" />
              <h2 className="text-xl font-bold">Drive-Thru</h2>
            </div>
            <p className="mb-4">
              Stay in your car and pick up your order at our convenient drive-thru window.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                15-minute preparation time
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Card payments only
              </li>
            </ul>
          </button>
          
          {/* Business Delivery Option */}
          <button
            onClick={() => setDeliveryMethod('business')}
            className={`p-6 rounded-lg text-left transition-all ${
              deliveryMethod === 'business'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white text-neutral-900 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 mr-3" />
              <h2 className="text-xl font-bold">Business Delivery</h2>
            </div>
            <p className="mb-4">
              Have your order delivered to a partner business location like a hotel, lounge, or cafe.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                45-60 minute delivery window
              </li>
              <li className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Multiple partner locations available
              </li>
            </ul>
          </button>
        </div>

        {/* Delivery Form */}
        {deliveryMethod === 'delivery' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                  placeholder="Enter ZIP code"
                  required
                />
              </div>
              
              {addressError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md">
                  <p className="flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    {addressError}
                  </p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isValidatingAddress}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                {isValidatingAddress ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validating Address...
                  </>
                ) : (
                  'Check Delivery Availability'
                )}
              </button>
            </form>
            
            {userLocation && selectedZone && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">Delivery Zone Map</h4>
                <DeliveryZoneMap 
                  userAddress={`${address}, ${zipCode}`}
                  onZoneSelect={setSelectedZone}
                />
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-medium text-green-800">Good news! We deliver to your address</h4>
                  </div>
                  <p className="text-green-700 mb-4">
                    Your address is in our {selectedZone.name} delivery zone.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-green-600 mr-2" />
                      <span>Delivery Fee: ${selectedZone.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <span>Free over ${selectedZone.minOrder.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      <span>ETA: {selectedZone.estimatedTime}</span>
                    </div>
                  </div>
                  <Link
                    to="/shop"
                    className="btn-primary w-full py-3 flex items-center justify-center"
                  >
                    Continue to Shop <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pickup Information */}
        {deliveryMethod === 'pickup' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Pickup Location</h3>
            <div className="mb-6">
              <p className="font-medium">JFK Cannabis Dispensary</p>
              <p>175-01 Rockaway Blvd</p>
              <p>Queens, NY 11434</p>
              <p className="mt-2">
                Located directly across from JFK Airport and the JFK DMV
              </p>
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Store Hours:</h4>
              <p>Monday - Saturday: 9:00 AM - 10:00 PM</p>
              <p>Sunday: 10:00 AM - 8:00 PM</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Store Map:</h4>
              <DeliveryMap 
                center={{ lat: 40.6650, lng: -73.7834 }}
                zoom={15}
                markers={[
                  {
                    id: 'store',
                    lat: 40.6650,
                    lng: -73.7834,
                    title: 'JFK Cannabis',
                    type: 'store'
                  }
                ]}
                height="300px"
              />
            </div>
            
            <Link
              to="/shop"
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              Continue to Shop <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
        
        {/* Drive-Thru Information */}
        {deliveryMethod === 'drive-thru' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Drive-Thru Pickup</h3>
            <div className="mb-6">
              <p className="font-medium">JFK Cannabis Drive-Thru</p>
              <p>175-01 Rockaway Blvd</p>
              <p>Queens, NY 11434</p>
              <p className="mt-2">
                Our drive-thru window is located on the west side of the building
              </p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-800 mb-2">Drive-Thru Information</h4>
              <ul className="space-y-2 text-amber-700">
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>Drive-thru orders require online payment (card only)</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>You'll receive a QR code to scan at the window</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>Valid ID (21+) required at pickup</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>Preparation time: approximately 15 minutes</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Drive-Thru Hours:</h4>
              <p>Monday - Saturday: 9:00 AM - 10:00 PM</p>
              <p>Sunday: 10:00 AM - 8:00 PM</p>
            </div>
            
            <Link
              to="/shop"
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              Continue to Shop <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
        
        {/* Business Delivery */}
        {deliveryMethod === 'business' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Business Delivery</h3>
            <p className="mb-6">
              Have your cannabis delivered to a partner business location like a hotel, lounge, or cafe.
              Perfect for travelers, those without a permanent address, or anyone who prefers to receive
              their order at a business location.
            </p>
            
            {selectedBusiness ? (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                    <img 
                      src={selectedBusiness.image} 
                      alt={selectedBusiness.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedBusiness.name}</h4>
                    <p className="text-sm text-gray-600">{selectedBusiness.address}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs text-gray-500">{selectedBusiness.distance} miles away</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-4">
                  <button 
                    onClick={() => setSelectedBusiness(null)}
                    className="text-primary-600 text-sm hover:underline"
                  >
                    Change location
                  </button>
                </div>
                
                <Link
                  to="/shop"
                  className="btn-primary w-full py-3 flex items-center justify-center"
                >
                  Continue to Shop <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setShowBusinessMap(true)}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                Find a Business Location <Search className="ml-2 h-5 w-5" />
              </button>
            )}
            
            <div className="mt-4 text-sm text-gray-600">
              <h4 className="font-medium mb-2">How Business Delivery Works:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Select a partner business location from our map</li>
                <li>Place your order and select "Business Delivery" at checkout</li>
                <li>We'll deliver your order to the business location</li>
                <li>Show your ID at the business to receive your order</li>
              </ol>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md flex items-start">
              <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Business delivery is perfect for travelers staying at hotels, visitors to JFK Airport with layovers,
                and anyone who prefers to receive their cannabis at a partner business location.
              </p>
            </div>
          </div>
        )}

        {showBusinessMap && (
          <BusinessLocationMap 
            onSelect={handleBusinessSelect}
            onClose={() => setShowBusinessMap(false)}
            userLocation={userLocation || undefined}
          />
        )}

        <div className="text-center text-sm text-neutral-600">
          <p>Must be 21+ with valid ID for pickup or delivery.</p>
          <p>Delivery radius and minimum order amounts may vary.</p>
        </div>
      </div>
    </div>
  );
};

// Helper components for icons
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Delivery;