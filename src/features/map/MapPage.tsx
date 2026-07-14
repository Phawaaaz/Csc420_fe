import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CampusMap from './components/CampusMap';

const MapPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    searchParams.get('building')
  );

  useEffect(() => {
    setSelectedBuildingId(searchParams.get('building'));
  }, [searchParams]);

  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
    setSearchParams({ building: buildingId }, { replace: true });
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm">
      <CampusMap
        selectedBuildingId={selectedBuildingId}
        onBuildingSelect={handleBuildingSelect}
      />
    </div>
  );
};

export default MapPage;
