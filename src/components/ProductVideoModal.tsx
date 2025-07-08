import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';

interface ProductVideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

const ProductVideoModal: React.FC<ProductVideoModalProps> = ({ videoUrl, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    }
    
    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-bold">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-700 rounded-full"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="relative aspect-video">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
              <div className="animate-pulse flex flex-col items-center">
                <Play className="h-16 w-16 text-neutral-400" />
                <p className="mt-2 text-neutral-500">Loading video...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
        
        <div className="p-4 border-t">
          <p className="text-sm text-neutral-500">
            This video demonstrates how to use this product and provides additional information about its features and benefits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductVideoModal;