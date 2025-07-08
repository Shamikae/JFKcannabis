import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface AgeVerificationProps {
  onVerify: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    // Simulate verification process
    setTimeout(() => {
      onVerify();
      setIsLoading(false);
    }, 800);
  };

  const handleDeny = () => {
    setError("You must be 21 or older to enter this website.");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-lg max-w-md w-full p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-primary-600 mx-auto mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Leaf className="h-16 w-16 mx-auto" />
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-2">JFK Cannabis</h2>
        <p className="text-neutral-600 mb-6">
          You must be 21 years or older to enter this website.
          By entering, you confirm that you are of legal age.
        </p>

        {error && (
          <motion.div 
            className="mb-4 p-3 bg-red-50 text-red-700 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={handleVerify}
            disabled={isLoading}
            className="btn-primary px-6 py-3 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            Yes, I'm 21 or older
          </button>
          <button 
            onClick={handleDeny}
            className="btn-outline px-6 py-3"
          >
            No, I'm under 21
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AgeVerification;