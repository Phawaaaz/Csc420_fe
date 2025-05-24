import React from 'react';
import BuildingInfo from '@/components/organisms/BuildingInfo';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import { useMap } from '@/context/MapContext';

/**
 * Saved locations page component
 */
const SavedLocationPage: React.FC = () => {
  const { buildings, savedLocations, removeLocation } = useMap();
  
  const savedBuildings = buildings?.filter(
    (building) => savedLocations?.includes(building.id)
  ) || [];
  
  const handleNavigate = (buildingId: string) => {
    console.log(`Navigating to ${buildingId}`);
    // Implement navigation logic
  };
  
  const handleRemove = (buildingId: string) => {
    if (removeLocation) {
      removeLocation(buildingId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Locations</h1>
          <p className="text-sm text-gray-600 mt-1">
            Access your bookmarked places quickly
          </p>
        </div>
        
        {savedBuildings.length > 0 && (
          <Button variant="outline" className="text-sm">
            <Icon name="RefreshCcw" size={16} className="mr-2" />
            Refresh
          </Button>
        )}
      </div>
      
      {savedBuildings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBuildings.map((building) => (
            <BuildingInfo
              key={building.id}
              building={building}
              onNavigate={handleNavigate}
              onSave={() => handleRemove(building.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon name="Bookmark" size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved locations yet</h3>
          <p className="text-sm text-gray-600 mb-4">
            Browse the campus map and bookmark your favorite locations for quick access
          </p>
          <Button variant="primary">
            <Icon name="Map" size={16} className="mr-2" />
            Explore Campus Map
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedLocationPage;