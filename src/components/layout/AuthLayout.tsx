import React from 'react';
import { Outlet } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';

/**
 * Layout for authentication pages
 */
const AuthLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-primary flex flex-col items-center justify-center p-10">
        <div className="mb-8">
          <Icon name="Map" size={64} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">SMART</h1>
        <h2 className="text-xl text-white/80 tracking-widest">UNILORIN CAMPUS NAVIGATION</h2>
      </div>
      
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;