import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "@/context/MapContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create custom icons for different markers
const userLocationIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: "user-location-marker",
});

interface CampusMapProps {
  onSelectBuilding?: (buildingId: string) => void;
  className?: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

const CampusMap: React.FC<CampusMapProps> = ({
  onSelectBuilding,
  className = "",
}) => {
  const { buildings } = useMap();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Default center (University of Ilorin campus) as fallback
  const defaultCenter: [number, number] = [8.4841, 4.5339];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            "Unable to get your location. Using default campus view."
          );
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  }, []);

  // Determine map center based on user location or default
  const mapCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : defaultCenter;

  // Determine zoom level - closer if we have user location
  const zoomLevel = userLocation ? 17 : 16;

  return (
    <div
      className={`relative rounded-lg overflow-hidden shadow-sm ${className}`}
    >
      {/* Loading indicator */}
      {isLoadingLocation && (
        <div className="absolute top-2 right-2 z-[1000] bg-white px-3 py-1 rounded-md shadow-sm">
          <span className="text-sm text-gray-600">
            📍 Getting your location...
          </span>
        </div>
      )}

      {/* Location error message */}
      {locationError && (
        <div className="absolute top-2 right-2 z-[1000] bg-amber-50 border border-amber-200 px-3 py-1 rounded-md shadow-sm">
          <span className="text-sm text-amber-700">⚠️ {locationError}</span>
        </div>
      )}

      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        className="w-full h-full min-h-[400px]"
        key={`${mapCenter[0]}-${mapCenter[1]}`} // Force re-render when center changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userLocationIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium text-sm text-blue-600">
                  📍 Your Location
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  You are here at University of Ilorin
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {userLocation.lat.toFixed(6)}, Lng:{" "}
                  {userLocation.lng.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Building markers */}
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
                <p className="text-xs text-gray-600 mt-1">
                  {building.description}
                </p>
                {userLocation && (
                  <p className="text-xs text-blue-500 mt-1">
                    🚶 Distance:{" "}
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      building.coordinates.lat,
                      building.coordinates.lng
                    )}{" "}
                    meters
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Helper function to calculate distance between two points
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
}

export default CampusMap;
