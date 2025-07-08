import React, { useState, useRef } from 'react';
import { Upload, X, Check, AlertTriangle, Image as ImageIcon, Loader } from 'lucide-react';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface FirebaseImageUploaderProps {
  currentImage?: string;
  onImageSelected: (imageUrl: string) => void;
  folder: string;
  aspectRatio?: string;
  maxSize?: number; // in MB
}

const FirebaseImageUploader: React.FC<FirebaseImageUploaderProps> = ({
  currentImage,
  onImageSelected,
  folder,
  aspectRatio = '1:1',
  maxSize = 5
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = async (file?: File) => {
    if (!file) return;
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    // Check file type
    if (!file.type.includes('image/')) {
      setError('Only image files are allowed');
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    try {
      // Create a unique filename
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `${folder}/${filename}`);
      
      // Upload to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      // Update preview and notify parent
      setPreviewUrl(downloadUrl);
      onImageSelected(downloadUrl);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
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

  const handleRemoveImage = async () => {
    if (previewUrl && previewUrl.includes('firebasestorage.googleapis.com')) {
      try {
        // Extract the path from the URL
        const url = new URL(previewUrl);
        const pathMatch = url.pathname.match(/\/o\/(.+?)(?:\?|$)/);
        
        if (pathMatch && pathMatch[1]) {
          const path = decodeURIComponent(pathMatch[1]);
          const imageRef = ref(storage, path);
          await deleteObject(imageRef);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelected('');
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
          <LazyLoadImage 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-auto object-cover"
            style={{ aspectRatio }}
            effect="blur"
            threshold={200}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
            aria-label="Remove image"
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
            {isUploading ? (
              <Loader className="h-12 w-12 text-primary-600 animate-spin mb-3" />
            ) : (
              <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
            )}
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
          <AlertTriangle className="h-4 w-4 mr-1" />
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

export default FirebaseImageUploader;