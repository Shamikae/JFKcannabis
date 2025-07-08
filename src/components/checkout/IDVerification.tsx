import React, { useState } from 'react';
import { Camera, Upload, Check, AlertTriangle, Info, X } from 'lucide-react';

interface IDVerificationProps {
  onVerified: () => void;
  personType: 'customer' | 'authorized';
  personName?: string;
}

const IDVerification: React.FC<IDVerificationProps> = ({ onVerified, personType, personName }) => {
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [currentStep, setCurrentStep] = useState<'front' | 'back' | 'selfie' | 'processing' | 'complete'>('front');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (type: 'front' | 'back' | 'selfie') => {
    // In a real app, this would handle the actual file upload
    setError(null);
    
    // Simulate upload process
    setTimeout(() => {
      if (type === 'front') {
        setFrontUploaded(true);
        setCurrentStep('back');
      } else if (type === 'back') {
        setBackUploaded(true);
        setCurrentStep('selfie');
      } else if (type === 'selfie') {
        setSelfieUploaded(true);
        setCurrentStep('processing');
        
        // Simulate verification process
        setTimeout(() => {
          setCurrentStep('complete');
          onVerified();
        }, 2000);
      }
    }, 1000);
  };

  const resetVerification = () => {
    setFrontUploaded(false);
    setBackUploaded(false);
    setSelfieUploaded(false);
    setCurrentStep('front');
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">
          ID Verification {personName ? `for ${personName}` : ''}
        </h3>
        {currentStep === 'complete' && (
          <button
            type="button"
            onClick={resetVerification}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 text-red-800 p-3 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      {currentStep === 'processing' ? (
        <div className="text-center py-8">
          <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h4 className="font-medium mb-2">Verifying ID</h4>
          <p className="text-sm text-neutral-600">This will only take a moment...</p>
        </div>
      ) : currentStep === 'complete' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="font-medium mb-2">ID Verification Complete</h4>
          <p className="text-sm text-neutral-600">Your identity has been successfully verified.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 'front' 
                    ? 'bg-primary-600 text-white' 
                    : frontUploaded 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {frontUploaded ? <Check className="h-5 w-5" /> : '1'}
                </div>
                <span className={`font-medium ${
                  currentStep === 'front' 
                    ? 'text-primary-600' 
                    : frontUploaded 
                      ? 'text-green-600' 
                      : 'text-neutral-500'
                }`}>
                  Front of ID
                </span>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 'back' 
                    ? 'bg-primary-600 text-white' 
                    : backUploaded 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {backUploaded ? <Check className="h-5 w-5" /> : '2'}
                </div>
                <span className={`font-medium ${
                  currentStep === 'back' 
                    ? 'text-primary-600' 
                    : backUploaded 
                      ? 'text-green-600' 
                      : 'text-neutral-500'
                }`}>
                  Back of ID
                </span>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 'selfie' 
                    ? 'bg-primary-600 text-white' 
                    : selfieUploaded 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {selfieUploaded ? <Check className="h-5 w-5" /> : '3'}
                </div>
                <span className={`font-medium ${
                  currentStep === 'selfie' 
                    ? 'text-primary-600' 
                    : selfieUploaded 
                      ? 'text-green-600' 
                      : 'text-neutral-500'
                }`}>
                  Selfie
                </span>
              </div>
            </div>
          </div>
          
          {currentStep === 'front' && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-8 bg-neutral-50">
              <Camera className="h-12 w-12 text-neutral-400 mb-4" />
              <h4 className="font-medium mb-2">Front of ID</h4>
              <p className="text-sm text-neutral-600 mb-6 text-center">
                Take a clear photo of the front of your government-issued ID (driver's license, passport, or state ID)
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleFileUpload('front')}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </button>
                <button
                  type="button"
                  onClick={() => handleFileUpload('front')}
                  className="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-300 transition-colors flex items-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 'back' && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-8 bg-neutral-50">
              <Camera className="h-12 w-12 text-neutral-400 mb-4" />
              <h4 className="font-medium mb-2">Back of ID</h4>
              <p className="text-sm text-neutral-600 mb-6 text-center">
                Now take a clear photo of the back of your ID
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleFileUpload('back')}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </button>
                <button
                  type="button"
                  onClick={() => handleFileUpload('back')}
                  className="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-300 transition-colors flex items-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 'selfie' && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-8 bg-neutral-50">
              <Camera className="h-12 w-12 text-neutral-400 mb-4" />
              <h4 className="font-medium mb-2">Take a Selfie</h4>
              <p className="text-sm text-neutral-600 mb-6 text-center">
                Finally, take a clear selfie to verify your identity
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleFileUpload('selfie')}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Selfie
                </button>
                <button
                  type="button"
                  onClick={() => handleFileUpload('selfie')}
                  className="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-300 transition-colors flex items-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-4 text-xs text-neutral-500 flex items-start">
        <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
        <p>
          Your ID information is securely stored and used only for age verification purposes in compliance with New York State OCM regulations. We do not share this information with third parties.
        </p>
      </div>
    </div>
  );
};

export default IDVerification;