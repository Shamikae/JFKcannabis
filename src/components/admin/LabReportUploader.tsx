import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Check, 
  AlertTriangle, 
  FileText, 
  Beaker, 
  Save,
  Plus,
  Trash2
} from 'lucide-react';

interface LabReportUploaderProps {
  productId: string;
  onSave: (labData: any) => void;
  onClose: () => void;
  existingLabReport?: any;
}

const LabReportUploader: React.FC<LabReportUploaderProps> = ({ 
  productId, 
  onSave, 
  onClose,
  existingLabReport
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(existingLabReport || {
    cannabinoids: {
      THC: 0,
      CBD: 0,
      CBG: 0,
      CBN: 0,
      CBC: 0,
      THCV: 0,
      CBDA: 0,
      THCA: 0
    },
    terpenes: {
      'Myrcene': 0,
      'Limonene': 0,
      'Pinene': 0,
      'Linalool': 0,
      'Caryophyllene': 0,
      'Humulene': 0,
      'Terpinolene': 0
    },
    contaminants: {
      pesticides: false,
      heavyMetals: false,
      residualSolvents: false,
      microbials: false,
      moisture: 0
    },
    testDate: new Date().toISOString().split('T')[0],
    labName: '',
    batchNumber: '',
    reportUrl: ''
  });
  const [isEditingData, setIsEditingData] = useState(!existingLabReport);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Check file type
    if (!selectedFile.type.includes('image/') && !selectedFile.type.includes('application/pdf')) {
      setError('Please upload an image or PDF file');
      return;
    }
    
    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    
    // Create preview URL for images
    if (selectedFile.type.includes('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For PDFs, just show a placeholder
      setPreviewUrl(null);
    }
    
    // Simulate OCR extraction
    simulateOcrExtraction(selectedFile);
  };
  
  const simulateOcrExtraction = (file: File) => {
    setIsUploading(true);
    
    // In a real implementation, this would send the file to an OCR service
    // to extract the lab report data
    
    // For demo purposes, simulate processing with random data
    setTimeout(() => {
      const mockExtractedData = {
        cannabinoids: {
          THC: parseFloat((Math.random() * 30).toFixed(1)),
          CBD: parseFloat((Math.random() * 5).toFixed(1)),
          CBG: parseFloat((Math.random() * 2).toFixed(1)),
          CBN: parseFloat((Math.random() * 1).toFixed(1)),
          CBC: parseFloat((Math.random() * 1).toFixed(1)),
          THCV: parseFloat((Math.random() * 0.5).toFixed(1)),
          CBDA: parseFloat((Math.random() * 1).toFixed(1)),
          THCA: parseFloat((Math.random() * 5).toFixed(1))
        },
        terpenes: {
          'Myrcene': parseFloat((Math.random() * 2).toFixed(2)),
          'Limonene': parseFloat((Math.random() * 1.5).toFixed(2)),
          'Pinene': parseFloat((Math.random() * 1).toFixed(2)),
          'Linalool': parseFloat((Math.random() * 0.8).toFixed(2)),
          'Caryophyllene': parseFloat((Math.random() * 1.2).toFixed(2)),
          'Humulene': parseFloat((Math.random() * 0.6).toFixed(2)),
          'Terpinolene': parseFloat((Math.random() * 0.4).toFixed(2))
        },
        contaminants: {
          pesticides: Math.random() > 0.9,
          heavyMetals: Math.random() > 0.9,
          residualSolvents: Math.random() > 0.9,
          microbials: Math.random() > 0.9,
          moisture: parseFloat((Math.random() * 15).toFixed(1))
        },
        testDate: new Date().toISOString().split('T')[0],
        labName: 'Cannabis Testing Labs',
        batchNumber: `BATCH-${Math.floor(Math.random() * 10000)}`,
        reportUrl: '/lab-reports/sample.pdf'
      };
      
      setExtractedData(mockExtractedData);
      setIsUploading(false);
      setUploadSuccess(true);
      setIsEditingData(true);
    }, 2000);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section?: string, field?: string) => {
    const { name, value, type } = e.target;
    
    if (section && field) {
      // Handle nested fields (cannabinoids, terpenes, contaminants)
      setExtractedData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : type === 'number' 
              ? parseFloat(value) 
              : value
        }
      }));
    } else {
      // Handle top-level fields
      setExtractedData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleAddTerpene = () => {
    const newTerpene = prompt('Enter terpene name:');
    if (newTerpene && !extractedData.terpenes[newTerpene]) {
      setExtractedData(prev => ({
        ...prev,
        terpenes: {
          ...prev.terpenes,
          [newTerpene]: 0
        }
      }));
    }
  };
  
  const handleRemoveTerpene = (terpene: string) => {
    setExtractedData(prev => {
      const updatedTerpenes = { ...prev.terpenes };
      delete updatedTerpenes[terpene];
      return {
        ...prev,
        terpenes: updatedTerpenes
      };
    });
  };
  
  const handleSave = () => {
    // Create the final lab report object
    const labReport = {
      id: `lab-${Date.now()}`,
      productId,
      ...extractedData
    };
    
    // In a real implementation, this would save the lab report to the database
    onSave(labReport);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Lab Report</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* File Upload Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Upload Lab Report</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* File Upload */}
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                  />
                  
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Lab report preview" 
                      className="max-h-48 mb-4"
                    />
                  ) : file?.type.includes('application/pdf') ? (
                    <FileText className="h-16 w-16 text-gray-400 mb-4" />
                  ) : (
                    <Upload className="h-16 w-16 text-gray-400 mb-4" />
                  )}
                  
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF or image file (max. 10MB)
                  </p>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>{error}</span>
                  </div>
                )}
                
                {/* Upload Status */}
                {isUploading && (
                  <div className="mt-4 text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Processing lab report...</p>
                  </div>
                )}
                
                {uploadSuccess && (
                  <div className="mt-4 text-center text-green-600">
                    <Check className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Lab report processed successfully</p>
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Beaker className="h-5 w-5 text-primary-600 mr-2" />
                    Lab Report Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Testing Laboratory
                      </label>
                      <input
                        type="text"
                        name="labName"
                        value={extractedData.labName}
                        onChange={handleInputChange}
                        disabled={!isEditingData}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Batch Number
                      </label>
                      <input
                        type="text"
                        name="batchNumber"
                        value={extractedData.batchNumber}
                        onChange={handleInputChange}
                        disabled={!isEditingData}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Date
                      </label>
                      <input
                        type="date"
                        name="testDate"
                        value={extractedData.testDate}
                        onChange={handleInputChange}
                        disabled={!isEditingData}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lab Data Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Lab Data</h3>
              <button
                onClick={() => setIsEditingData(!isEditingData)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {isEditingData ? 'View Mode' : 'Edit Mode'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cannabinoids */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Cannabinoids (%)</h4>
                <div className="space-y-2">
                  {Object.entries(extractedData.cannabinoids).map(([cannabinoid, value]) => (
                    <div key={cannabinoid} className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">{cannabinoid}</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleInputChange(e, 'cannabinoids', cannabinoid)}
                        disabled={!isEditingData}
                        step="0.1"
                        min="0"
                        max="100"
                        className="w-20 p-1 text-right border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Terpenes */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Terpenes (%)</h4>
                  {isEditingData && (
                    <button
                      onClick={handleAddTerpene}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {Object.entries(extractedData.terpenes).map(([terpene, value]) => (
                    <div key={terpene} className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">{terpene}</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => handleInputChange(e, 'terpenes', terpene)}
                          disabled={!isEditingData}
                          step="0.01"
                          min="0"
                          max="100"
                          className="w-20 p-1 text-right border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                        {isEditingData && (
                          <button
                            onClick={() => handleRemoveTerpene(terpene)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contaminants */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Contaminant Testing</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Pesticides</label>
                    <input
                      type="checkbox"
                      checked={extractedData.contaminants.pesticides}
                      onChange={(e) => handleInputChange(e, 'contaminants', 'pesticides')}
                      disabled={!isEditingData}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Heavy Metals</label>
                    <input
                      type="checkbox"
                      checked={extractedData.contaminants.heavyMetals}
                      onChange={(e) => handleInputChange(e, 'contaminants', 'heavyMetals')}
                      disabled={!isEditingData}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Residual Solvents</label>
                    <input
                      type="checkbox"
                      checked={extractedData.contaminants.residualSolvents}
                      onChange={(e) => handleInputChange(e, 'contaminants', 'residualSolvents')}
                      disabled={!isEditingData}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Microbials</label>
                    <input
                      type="checkbox"
                      checked={extractedData.contaminants.microbials}
                      onChange={(e) => handleInputChange(e, 'contaminants', 'microbials')}
                      disabled={!isEditingData}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Moisture (%)</label>
                    <input
                      type="number"
                      value={extractedData.contaminants.moisture}
                      onChange={(e) => handleInputChange(e, 'contaminants', 'moisture')}
                      disabled={!isEditingData}
                      step="0.1"
                      min="0"
                      max="100"
                      className="w-20 p-1 text-right border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Total THC</span>
                    <span className="font-medium">
                      {(extractedData.cannabinoids.THC + extractedData.cannabinoids.THCA * 0.877).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Total CBD</span>
                    <span className="font-medium">
                      {(extractedData.cannabinoids.CBD + extractedData.cannabinoids.CBDA * 0.877).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Total Terpenes</span>
                    <span className="font-medium">
                      {Object.values(extractedData.terpenes).reduce((sum: number, val: any) => sum + parseFloat(val), 0).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Dominant Terpene</span>
                    <span className="font-medium">
                      {Object.entries(extractedData.terpenes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Passes Testing</span>
                    <span className={`font-medium ${
                      extractedData.contaminants.pesticides || 
                      extractedData.contaminants.heavyMetals || 
                      extractedData.contaminants.residualSolvents || 
                      extractedData.contaminants.microbials
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}>
                      {extractedData.contaminants.pesticides || 
                       extractedData.contaminants.heavyMetals || 
                       extractedData.contaminants.residualSolvents || 
                       extractedData.contaminants.microbials
                        ? 'No'
                        : 'Yes'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Lab Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReportUploader;