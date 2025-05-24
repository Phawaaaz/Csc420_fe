import React from 'react';
import { Outlet } from 'react-router-dom';
import SettingsNav from '@/features/settings/components/SettingsNav';

/**
 * Settings page with navigation and content area
 */
const SettingsPage: React.FC = () => {
  const settingsNavItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/settings/profile',
    },
    {
      id: 'theme',
      label: 'Theme',
      icon: 'Palette',
      path: '/settings/theme',
    },
    {
      id: 'tutorial',
      label: 'Tutorial',
      icon: 'BookOpen',
      path: '/settings/tutorial',
    },
    {
      id: 'language',
      label: 'Language',
      icon: 'Globe',
      path: '/settings/language',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your preferences and account settings
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <SettingsNav items={settingsNavItems} />
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;