import React, { useState } from 'react';
import SettingsSection from '@/features/settings/components/SettingsSection';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

/**
 * Tutorial settings component
 */
const TutorialSettings: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  
  const tutorials = [
    {
      id: 'map',
      title: 'Campus Map Tutorial',
      description: 'Learn how to use the interactive campus map',
      completed: true,
    },
    {
      id: 'direction',
      title: 'Finding Directions',
      description: 'Learn how to get directions between buildings',
      completed: false,
    },
    {
      id: 'saved',
      title: 'Saving Locations',
      description: 'Learn how to bookmark your favorite places',
      completed: false,
    },
  ];
  
  return (
    <SettingsSection
      title="Tutorial Settings"
      description="Manage app tutorials and guides"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-gray-900">Show tutorial on startup</p>
          <p className="text-xs text-gray-600">New users will see tutorials when they first use the app</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={showTutorial} 
            onChange={() => setShowTutorial(!showTutorial)} 
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
      
      <div className="space-y-4">
        {tutorials.map((tutorial) => (
          <div 
            key={tutorial.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {tutorial.completed ? (
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-success" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon name="Play" size={14} className="text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{tutorial.title}</h4>
                <p className="mt-1 text-xs text-gray-600">{tutorial.description}</p>
              </div>
              <Button 
                variant="ghost" 
                className="text-primary text-sm"
              >
                {tutorial.completed ? 'Review' : 'Start'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button variant="primary">
          Reset All Tutorials
        </Button>
      </div>
    </SettingsSection>
  );
};

export default TutorialSettings;