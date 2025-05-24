import React, { useEffect, useState } from 'react';
import Icon from '@/components/atoms/Icon';

/**
 * Application loading screen
 */
const LoadingScreen: React.FC = () => {
  const [loadingText, setLoadingText] = useState('Loading');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === 'Loading...') return 'Loading';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative network effect */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/5 rounded-full -translate-y-1/4 translate-x-1/3" />
      
      <div className="z-10 text-center">
        <div className="mb-8">
          <Icon name="Map" size={64} className="text-white mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">SMART CAMPUS NAVIGATION</h1>
        
        <div className="mt-12 text-white/80 text-xl">
          {loadingText}
          <span className="animate-pulse">...</span>
        </div>
      </div>
      
      {/* Network grid lines effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={`h-${i}`}
              className="absolute border-t border-secondary/30" 
              style={{ top: `${i * 10}%`, left: 0, right: 0 }}
            />
          ))}
          
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={`v-${i}`}
              className="absolute border-l border-secondary/30" 
              style={{ left: `${i * 10}%`, top: 0, bottom: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;