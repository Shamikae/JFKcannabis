import React, { useState, useRef } from 'react';
import { Camera, Upload, Check, AlertTriangle, X, Search } from 'lucide-react';

interface IDScannerProps {
  onScanComplete: (idData: any) => void;
  onClose: () => void;
}

const IDScanner: React.FC<IDScannerProps> = ({ onScanComplete, onClose }) => {
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | 'manual'>('camera');
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualSearchTerm, setManualSearchTerm] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mock ID data for demonstration
  const mockIdData = {
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1985-06-15',
    idNumber: 'NY12345678',
    expirationDate: '2026-06-15',
    address: {
      street: '123 Main St, Apt 4B',
      city: 'Queens',
      state: 'NY',
      zipCode: '11434'
    }
  };
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions or try uploading an image instead.');
      setScanMode('upload');
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // In a real implementation, this would send the image to an OCR service
        // or ID verification API to extract the data
        
        // For demo purposes, simulate processing
        setScanning(true);
        setTimeout(() => {
          setScanning(false);
          setScanComplete(true);
          
          // Stop the camera after successful scan
          stopCamera();
          
          // Pass the mock data to the parent component
          onScanComplete(mockIdData);
        }, 2000);
      }
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real implementation, this would upload the file to an OCR service
    // or ID verification API to extract the data
    
    // For demo purposes, simulate processing
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      
      // Pass the mock data to the parent component
      onScanComplete(mockIdData);
    }, 2000);
  };
  
  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would search the database for the customer
    
    // For demo purposes, simulate processing
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      
      // Pass the mock data to the parent component
      onScanComplete(mockIdData);
    }, 1000);
  };
  
  // Start camera when component mounts and scan mode is camera
  React.useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [scanMode]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">ID Scanner</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Scan Mode Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setScanMode('camera')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                scanMode === 'camera'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Camera className="h-4 w-4 inline mr-1" />
              Scan
            </button>
            <button
              onClick={() => setScanMode('upload')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                scanMode === 'upload'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Upload className="h-4 w-4 inline mr-1" />
              Upload
            </button>
            <button
              onClick={() => setScanMode('manual')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                scanMode === 'manual'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Search className="h-4 w-4 inline mr-1" />
              Manual
            </button>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Camera Scan */}
          {scanMode === 'camera' && (
            <div>
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover"
                ></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
                
                {/* Scanning overlay */}
                {scanning && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p>Scanning ID...</p>
                    </div>
                  </div>
                )}
                
                {/* Success overlay */}
                {scanComplete && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="bg-green-500 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                        <Check className="h-6 w-6" />
                      </div>
                      <p>ID Scanned Successfully</p>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={captureImage}
                disabled={scanning || scanComplete}
                className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {scanning ? 'Scanning...' : scanComplete ? 'Scan Complete' : 'Scan ID'}
              </button>
              
              <p className="text-sm text-gray-500 mt-2 text-center">
                Position the ID card within the frame and ensure good lighting
              </p>
            </div>
          )}
          
          {/* Upload */}
          {scanMode === 'upload' && (
            <div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md mb-4">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload ID image</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={scanning || scanComplete}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              
              {/* Scanning indicator */}
              {scanning && (
                <div className="text-center py-4">
                  <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p>Processing ID image...</p>
                </div>
              )}
              
              {/* Success indicator */}
              {scanComplete && (
                <div className="text-center py-4 text-green-600">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <p>ID processed successfully</p>
                </div>
              )}
            </div>
          )}
          
          {/* Manual Search */}
          {scanMode === 'manual' && (
            <div>
              <form onSubmit={handleManualSearch}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Name, ID Number, or DOB
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={manualSearchTerm}
                      onChange={(e) => setManualSearchTerm(e.target.value)}
                      placeholder="John Smith, NY12345678, or 06/15/1985"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={scanning || scanComplete || !manualSearchTerm}
                  className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {scanning ? 'Searching...' : scanComplete ? 'Customer Found' : 'Search'}
                </button>
              </form>
              
              {/* Success indicator */}
              {scanComplete && (
                <div className="text-center py-4 text-green-600">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <p>Customer found</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 text-xs text-gray-500">
            <p>
              ID information is securely stored and used only for age verification purposes in compliance with New York State OCM regulations. We do not share this information with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDScanner;