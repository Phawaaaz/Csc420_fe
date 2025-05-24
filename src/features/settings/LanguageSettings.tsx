import React, { useState } from 'react';
import SettingsSection from '@/features/settings/components/SettingsSection';
import Button from '@/components/atoms/Button';

/**
 * Language settings component
 */
const LanguageSettings: React.FC = () => {
  const [language, setLanguage] = useState('en');
  
  const languages = [
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { id: 'zh', name: '中文', flag: '🇨🇳' },
    { id: 'ar', name: 'العربية', flag: '🇦🇪' },
  ];
  
  return (
    <SettingsSection
      title="Language Settings"
      description="Choose your preferred language"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <div 
            key={lang.id}
            className={`
              border rounded-lg p-4 cursor-pointer flex items-center
              ${language === lang.id ? 'border-primary ring-2 ring-primary-light/30' : 'border-gray-200'}
            `}
            onClick={() => setLanguage(lang.id)}
          >
            <span className="text-2xl mr-3">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex space-x-3">
        <Button variant="primary">
          Apply Language
        </Button>
      </div>
    </SettingsSection>
  );
};

export default LanguageSettings;