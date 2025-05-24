import React from 'react';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

interface Building {
  id: string;
  name: string;
  shortName: string;
  description: string;
  facilities: string[];
  openingHours: string;
  image?: string;
}

interface BuildingInfoProps {
  building: Building;
  onNavigate?: (buildingId: string) => void;
  onSave?: (buildingId: string) => void;
  className?: string;
}

/**
 * Building information component with details and actions
 * 
 * Example usage:
 * ```jsx
 * <BuildingInfo 
 *   building={buildingData} 
 *   onNavigate={handleNavigate} 
 *   onSave={handleSave} 
 * />
 * ```
 */
const BuildingInfo: React.FC<BuildingInfoProps> = ({
  building,
  onNavigate,
  onSave,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="h-40 bg-gray-200 relative">
        {building.image ? (
          <img 
            src={building.image} 
            alt={building.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-light/20">
            <Icon name="Building" size={48} className="text-primary-light" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 rounded-md py-1 px-2">
          <span className="text-sm font-medium text-primary">{building.shortName}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{building.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{building.description}</p>
        
        <div className="mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <Icon name="Clock" size={16} className="mr-2" />
            <span>{building.openingHours}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900 mb-1">Facilities</h4>
          <div className="flex flex-wrap gap-1">
            {building.facilities.map((facility, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          {onNavigate && (
            <Button 
              variant="primary" 
              onClick={() => onNavigate(building.id)}
              className="flex-1"
            >
              <Icon name="Navigation" size={16} className="mr-2" />
              Navigate
            </Button>
          )}
          
          {onSave && (
            <Button 
              variant="outline" 
              onClick={() => onSave(building.id)}
            >
              <Icon name="Bookmark" size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingInfo;