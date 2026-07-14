import React from 'react';
import { Outlet } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';

/**
 * Layout for authentication pages
 */
const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Branding panel - full height side panel on large screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center p-10">
        <div className="mb-8">
          <Icon name="Map" size={64} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">SMART</h1>
        <h2 className="text-xl text-white/80 tracking-widest">UNILORIN CAMPUS NAVIGATION</h2>
      </div>

      {/* Branding panel - compact top banner on small screens */}
      <div className="flex lg:hidden items-center justify-center gap-3 bg-primary py-6 px-4">
        <Icon name="Map" size={32} className="text-white" />
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">SMART</h1>
          <h2 className="text-[10px] text-white/80 tracking-widest leading-tight">
            UNILORIN CAMPUS NAVIGATION
          </h2>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-4 py-8 lg:p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
