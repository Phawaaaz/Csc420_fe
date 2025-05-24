import React, { useState } from 'react';
import MapSearchForm from '@/features/map/components/MapSearchForm';
import DirectionSteps from '@/features/direction/components/DirectionSteps';
import CampusMap from '@/features/map/components/CampusMap';
import { useMap } from '@/context/MapContext';

/**
 * Direction finding page component
 */
const DirectionPage: React.FC = () => {
  const [showDirections, setShowDirections] = useState(false);
  
  // Sample direction steps - would come from routing algorithm in real app
  const directionSteps = [
    {
      id: '1',
      instruction: 'Exit the main entrance of the Library',
      distance: '0 m',
      time: '0 min',
      icon: 'LogOut',
    },
    {
      id: '2',
      instruction: 'Turn right and walk towards the Administration building',
      distance: '100 m',
      time: '2 min',
      icon: 'CornerRightDown',
    },
    {
      id: '3',
      instruction: 'At the junction, turn left',
      distance: '50 m',
      time: '1 min',
      icon: 'CornerLeftUp',
    },
    {
      id: '4',
      instruction: 'Continue straight until you reach the Faculty of Computer Science',
      distance: '150 m',
      time: '3 min',
      icon: 'ArrowRight',
    },
    {
      id: '5',
      instruction: 'The Computer Science building will be on your right',
      distance: '0 m',
      time: '0 min',
      icon: 'MapPin',
    },
  ];
  
  const handleSearch = (from: string, to: string) => {
    console.log(`Finding route from ${from} to ${to}`);
    setShowDirections(true);
    // In a real app, this would calculate the route
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Direction</h1>
        <p className="text-sm text-gray-600 mt-1">
          Get step-by-step directions to navigate the campus
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <MapSearchForm onSearch={handleSearch} />
      </div>
      
      {showDirections && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CampusMap className="h-[500px]" />
          </div>
          
          <div>
            <DirectionSteps steps={directionSteps} />
            
            <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Total Distance</h4>
                  <p className="text-lg font-semibold text-gray-900">300 meters</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Estimated Time</h4>
                  <p className="text-lg font-semibold text-gray-900">6 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectionPage;