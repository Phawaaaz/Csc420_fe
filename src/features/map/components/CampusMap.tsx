import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon as LeafletIcon, LatLngExpression, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapContext } from '@/context/MapContext';
import Icon from '@/components/atoms/Icon';

// Fix for default marker icons in Leaflet with React
const defaultIcon = new LeafletIcon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom marker icon for selected buildings
const selectedIcon = new LeafletIcon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map view changes
const MapController: React.FC<{
  center: LatLngExpression;
  zoom: number;
  selectedBuildingId?: string | null;
}> = ({ center, zoom, selectedBuildingId }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  // If a building is selected, pan to it
  useEffect(() => {
    if (selectedBuildingId) {
      const marker = map.getPane('markerPane')?.querySelector(`[data-building-id="${selectedBuildingId}"]`);
      if (marker) {
        const markerElement = marker as HTMLElement;
        const markerPosition = markerElement.getBoundingClientRect();
        const mapContainer = map.getContainer();
        const containerRect = mapContainer.getBoundingClientRect();
        
        // Calculate the center position of the marker relative to the map container
        const markerCenterX = markerPosition.left + markerPosition.width / 2 - containerRect.left;
        const markerCenterY = markerPosition.top + markerPosition.height / 2 - containerRect.top;
        
        // Convert container point to latlng
        const markerLatLng = map.containerPointToLatLng([markerCenterX, markerCenterY]);
        if (markerLatLng) {
          map.panTo(markerLatLng);
        }
      }
    }
  }, [selectedBuildingId, map]);
  
  return null;
};

interface CampusMapProps {
  onBuildingSelect?: (buildingId: string) => void;
  selectedBuildingId?: string | null;
  showPath?: boolean;
  pathFrom?: string;
  pathTo?: string;
  className?: string;
}

const CampusMap: React.FC<CampusMapProps> = ({
  onBuildingSelect,
  selectedBuildingId,
  showPath = false,
  pathFrom,
  pathTo,
  className = '',
}) => {
  const { buildings, loading, error, findPath } = useMapContext();
  const mapRef = useRef<LeafletMap>(null);
  
  // Default center coordinates (you should replace these with your campus coordinates)
  const defaultCenter: LatLngExpression = [51.505, -0.09];
  const defaultZoom = 15;

  // Calculate path if needed
  const path = showPath && pathFrom && pathTo ? findPath(pathFrom, pathTo) : null;
  const pathCoordinates = path?.map(node => [node.latitude, node.longitude] as LatLngExpression);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-gray-500 flex items-center space-x-2">
          <Icon name="Loader" className="animate-spin" size={20} />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-red-500 flex items-center space-x-2">
          <Icon name="AlertCircle" size={20} />
          <span>Error loading map: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full ${className}`}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          center={defaultCenter} 
          zoom={defaultZoom}
          selectedBuildingId={selectedBuildingId}
        />
        
        {/* Draw path if available */}
        {pathCoordinates && pathCoordinates.length > 0 && (
          <Polyline
            positions={pathCoordinates}
            color="#0D3447"
            weight={4}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
        
        {/* Building markers */}
        {buildings?.map((building) => (
          <Marker
            key={building.id}
            position={[building.latitude, building.longitude]}
            icon={building.id === selectedBuildingId ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onBuildingSelect?.(building.id)
            }}
            data-building-id={building.id}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg text-primary">{building.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{building.description}</p>
                
                {building.rooms && building.rooms.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Available Rooms:</p>
                    <ul className="mt-1 space-y-1">
                      {building.rooms.map((room) => (
                        <li 
                          key={room.id}
                          className="text-sm text-gray-600 flex items-center justify-between"
                        >
                          <span>{room.name}</span>
                          {room.capacity && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {room.capacity} seats
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => onBuildingSelect?.(building.id)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CampusMap;