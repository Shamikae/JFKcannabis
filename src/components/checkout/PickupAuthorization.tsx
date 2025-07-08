import React, { useState } from 'react';
import { User, Upload, Check, AlertTriangle, Info, X, Camera } from 'lucide-react';

interface PickupPerson {
  id: string;
  name: string;
  type: 'authorized' | 'budtender';
  image?: string;
  available?: boolean;
}

interface PickupAuthorizationProps {
  authorizedPersons: PickupPerson[];
  budtenders: PickupPerson[];
  onSelectPerson: (person: PickupPerson | null) => void;
  onAddNewPerson: (personData: any) => void;
}

const PickupAuthorization: React.FC<PickupAuthorizationProps> = ({
  authorizedPersons,
  budtenders,
  onSelectPerson,
  onAddNewPerson
}) => {
  const [pickupType, setPickupType] = useState<'self' | 'authorized' | 'budtender'>('self');
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [newPerson, setNewPerson] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPerson(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonSelect = (person: PickupPerson | null) => {
    if (person) {
      setSelectedPersonId(person.id);
      onSelectPerson(person);
    } else {
      setSelectedPersonId(null);
      onSelectPerson(null);
    }
  };

  const handleAddNewPerson = () => {
    if (!newPerson.firstName || !newPerson.lastName || !newPerson.email || !newPerson.phone) {
      return;
    }
    
    onAddNewPerson(newPerson);
    setShowAddNew(false);
    setNewPerson({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  const handleIdUpload = () => {
    // In a real app, this would handle the actual file upload
    setIdUploaded(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Pickup Authorization</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="self-pickup"
              name="pickupType"
              checked={pickupType === 'self'}
              onChange={() => {
                setPickupType('self');
                handlePersonSelect(null);
              }}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="self-pickup" className="ml-2 block text-sm font-medium text-neutral-700">
              I will pick up this order myself
            </label>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="authorized-pickup"
              name="pickupType"
              checked={pickupType === 'authorized'}
              onChange={() => {
                setPickupType('authorized');
                handlePersonSelect(null);
              }}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="authorized-pickup" className="ml-2 block text-sm font-medium text-neutral-700">
              Authorize someone else to pick up
            </label>
          </div>
          
          {pickupType === 'authorized' && (
            <div className="ml-6 mt-3 p-4 border border-neutral-200 rounded-lg">
              {authorizedPersons.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Your authorized persons:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {authorizedPersons.map(person => (
                      <div 
                        key={person.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 ${
                          selectedPersonId === person.id ? 'border-primary-600 bg-primary-50' : 'border-neutral-200'
                        }`}
                        onClick={() => handlePersonSelect(person)}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          {person.image ? (
                            <img 
                              src={person.image} 
                              alt={person.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary-600" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium">{person.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!showAddNew ? (
                <button
                  type="button"
                  onClick={() => setShowAddNew(true)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Add new authorized person
                </button>
              ) : (
                <div>
                  <h4 className="text-sm font-medium mb-2">Add new authorized person:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs text-neutral-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={newPerson.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 text-sm border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs text-neutral-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={newPerson.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 text-sm border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs text-neutral-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newPerson.email}
                        onChange={handleInputChange}
                        className="w-full p-2 text-sm border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs text-neutral-700 mb-1">
                        Phone*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={newPerson.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 text-sm border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  {/* ID Verification for Pickup Person */}
                  <div className="mt-3 mb-4">
                    <h4 className="text-sm font-medium mb-2">ID Verification:</h4>
                    {!idUploaded ? (
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-4 bg-neutral-50">
                        <Camera className="h-6 w-6 text-neutral-400 mb-2" />
                        <p className="text-xs text-neutral-600 mb-3 text-center">
                          Upload a clear photo of the authorized person's ID
                        </p>
                        <button
                          type="button"
                          onClick={handleIdUpload}
                          className="bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Upload ID
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-green-800 text-sm">ID successfully uploaded</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIdUploaded(false)}
                          className="text-neutral-600 hover:text-neutral-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddNew(false)}
                      className="flex-1 bg-neutral-100 text-neutral-700 px-3 py-2 text-sm rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddNewPerson}
                      disabled={!idUploaded || !newPerson.firstName || !newPerson.lastName || !newPerson.email || !newPerson.phone}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg ${
                        idUploaded && newPerson.firstName && newPerson.lastName && newPerson.email && newPerson.phone
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      Add Person
                    </button>
                  </div>
                </div>
              )}
              
              {selectedPersonId && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-primary-600 mr-2" />
                      <span className="text-primary-800 text-sm font-medium">
                        {authorizedPersons.find(p => p.id === selectedPersonId)?.name} is authorized to pick up this order
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePersonSelect(null)}
                      className="text-neutral-600 hover:text-neutral-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="budtender-pickup"
              name="pickupType"
              checked={pickupType === 'budtender'}
              onChange={() => {
                setPickupType('budtender');
                handlePersonSelect(null);
              }}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="budtender-pickup" className="ml-2 block text-sm font-medium text-neutral-700">
              Authorize a JFK Cannabis budtender to pick up
            </label>
          </div>
          
          {pickupType === 'budtender' && (
            <div className="ml-6 mt-3 p-4 border border-neutral-200 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Select a budtender:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budtenders.map(budtender => (
                  <div 
                    key={budtender.id}
                    className={`flex items-center p-3 border rounded-lg ${
                      !budtender.available 
                        ? 'opacity-50 cursor-not-allowed border-neutral-200' 
                        : selectedPersonId === budtender.id
                          ? 'border-primary-600 bg-primary-50 cursor-pointer'
                          : 'border-neutral-200 cursor-pointer hover:bg-neutral-50'
                    }`}
                    onClick={() => budtender.available && handlePersonSelect(budtender)}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      {budtender.image ? (
                        <img 
                          src={budtender.image} 
                          alt={budtender.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{budtender.name}</span>
                      {!budtender.available && (
                        <span className="block text-xs text-red-600">Not available</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPersonId && budtenders.find(b => b.id === selectedPersonId) && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-primary-600 mr-2" />
                      <span className="text-primary-800 text-sm font-medium">
                        {budtenders.find(b => b.id === selectedPersonId)?.name} is authorized to pick up this order
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePersonSelect(null)}
                      className="text-neutral-600 hover:text-neutral-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-4 text-xs text-neutral-500">
                <p>By selecting a budtender, you authorize them to pick up your order on your behalf. They will need to present their employee ID.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-xs text-neutral-500 flex items-start">
        <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
        <p>
          According to OCM regulations, anyone picking up cannabis must be 21+ with valid ID. Authorized pickup requires documentation and consent from the purchaser.
        </p>
      </div>
    </div>
  );
};

export default PickupAuthorization;