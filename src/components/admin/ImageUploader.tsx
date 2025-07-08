import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (imageUrl: string) => void;
  aspectRatio?: string;
  maxSize?: number; // in MB
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageSelected,
  aspectRatio = '1:1',
  maxSize = 5
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }
    
    setError(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExternalUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setPreviewUrl(url);
      onImageSelected(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview Area */}
      {previewUrl ? (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-auto object-cover"
            style={{ aspectRatio }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
          >
            <X className="h-4 w-4" />
          </button>
          {success && (
            <div className="absolute bottom-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-sm flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Image selected
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm flex items-center">
          <X className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      {/* External URL Option */}
      <button
        type="button"
        onClick={handleExternalUrl}
        className="text-primary-600 text-sm hover:underline flex items-center"
      >
        <LinkIcon className="h-4 w-4 mr-1" />
        Use external image URL
      </button>
    </div>
  );
};

export default ImageUploader;