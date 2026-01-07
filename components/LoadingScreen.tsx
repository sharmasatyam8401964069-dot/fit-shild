
import React, { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[250] bg-[#0c0c0c] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-medium text-white text-center tracking-tight">
        “Smart Menu Ready...”
      </h1>
      
      {/* Home Indicator */}
      <div className="absolute bottom-8 w-32 h-1.5 bg-white rounded-full opacity-20" />
    </div>
  );
};

export default LoadingScreen;
