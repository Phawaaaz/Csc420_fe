import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from '@/context/MapContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CampusMapProps {
  onSelectBuilding?: (buildingId: string) => void;
  className?: string;
}

const CampusMap: React.FC<CampusMapProps> = ({
  onSelectBuilding,
  className = '',
}) => {
  const { buildings } = useMap();
  
  // Center of University of Ilorin campus
  const center: [number, number] = [8.4841, 4.5339];

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-sm ${className}`}>
      <MapContainer 
        center={center} 
        zoom={16} 
        className="w-full h-full min-h-[400px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {buildings?.map((building) => (
          <Marker 
            key={building.id}
            position={[building.coordinates.lat, building.coordinates.lng]}
            eventHandlers={{
              click: () => onSelectBuilding && onSelectBuilding(building.id),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium text-sm">{building.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{building.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CampusMap;