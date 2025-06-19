import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface FaceScannerProps {
  isScanning: boolean;
  isComplete: boolean;
}

const FaceScanner: React.FC<FaceScannerProps> = ({ isScanning, isComplete }) => {
  return (
    <>
      {isScanning && (
        <>
          <div className="scanning-effect"></div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-lg"
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0.7 }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,20 L20,20 L20,50" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,150 L20,180 L50,180" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <path d="M150,180 L180,180 L180,150" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <path d="M180,50 L180,20 L150,20" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        </>
      )}

      {isComplete && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            <CheckCircle size={60} className="text-green-500" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FaceScanner;