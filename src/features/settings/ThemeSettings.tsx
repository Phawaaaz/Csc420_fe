import React, { useState } from 'react';
import SettingsSection from '@/features/settings/components/SettingsSection';
import Button from '@/components/atoms/Button';

/**
 * Theme settings component
 */
const ThemeSettings: React.FC = () => {
  const [theme, setTheme] = useState('light');
  
  const themes = [
    { id: 'light', name: 'Light Theme', color: '#ffffff' },
    { id: 'dark', name: 'Dark Theme', color: '#0D3447' },
    { id: 'blue', name: 'Blue Theme', color: '#1A73E8' },
  ];
  
  return (
    <SettingsSection
      title="Theme Settings"
      description="Customize the look and feel of your application"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((t) => (
          <div 
            key={t.id}
            className={`
              border rounded-lg p-4 cursor-pointer
              ${theme === t.id ? 'border-primary ring-2 ring-primary-light/30' : 'border-gray-200'}
            `}
            onClick={() => setTheme(t.id)}
          >
            <div 
              className="w-full h-20 rounded mb-2" 
              style={{ backgroundColor: t.color }}
            ></div>
            <p className="text-sm font-medium text-center">{t.name}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex space-x-3">
        <Button variant="primary">
          Apply Theme
        </Button>
      </div>
    </SettingsSection>
  );
};

export default ThemeSettings;