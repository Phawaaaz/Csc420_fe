import React from 'react';
import CampusMap from './components/CampusMap';

const MapPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm">
      <CampusMap />
    </div>
  );
};

export default MapPage;