import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useMap as useMapContext } from "@/context/MapContext";
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

const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface CampusMapProps {
  onSelectBuilding?: (buildingId: string) => void;
  className?: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  coordinates: [number, number];
}

interface Route {
  coordinates: [number, number][];
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
}

// Component to handle map updates
const MapUpdater: React.FC<{
  center: [number, number];
  route: Route | null;
}> = ({ center, route }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.coordinates.length > 0) {
      // Fit map to show the entire route
      const bounds = L.latLngBounds(route.coordinates);
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      map.setView(center, map.getZoom());
    }
  }, [map, center, route]);

  return null;
};

const CampusMap: React.FC<CampusMapProps> = ({
  onSelectBuilding,
  className = "",
}) => {
  const { buildings } = useMapContext();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

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

  // Get directions using OpenRouteService API (free alternative)
  const getDirections = async (destination: any) => {
    if (!userLocation) {
      alert("Your location is required to get directions");
      return;
    }

    setIsLoadingRoute(true);
    setSelectedDestination(destination);

    try {
      // Using OpenRouteService API (requires API key in production)
      // For demo purposes, we'll create a simple straight-line route with basic steps
      const straightLineRoute = createSimpleRoute(
        userLocation,
        destination.coordinates
      );
      setRoute(straightLineRoute);
      setShowDirections(true);
    } catch (error) {
      console.error("Error getting directions:", error);
      // Fallback to simple straight-line route
      const straightLineRoute = createSimpleRoute(
        userLocation,
        destination.coordinates
      );
      setRoute(straightLineRoute);
      setShowDirections(true);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  // Create a simple route (fallback when API is not available)
  const createSimpleRoute = (
    start: UserLocation,
    end: { lat: number; lng: number }
  ): Route => {
    const coordinates: [number, number][] = [
      [start.lat, start.lng],
      [end.lat, end.lng],
    ];

    const distance = calculateDistance(start.lat, start.lng, end.lat, end.lng);
    const duration = Math.round(distance / 1.4); // Approximate walking speed: 1.4 m/s

    const steps: RouteStep[] = [
      {
        instruction: "Head towards your destination",
        distance: distance,
        duration: duration,
        coordinates: [start.lat, start.lng],
      },
      {
        instruction: `Arrive at ${selectedDestination?.name || "destination"}`,
        distance: 0,
        duration: 0,
        coordinates: [end.lat, end.lng],
      },
    ];

    return {
      coordinates,
      steps,
      totalDistance: distance,
      totalDuration: duration,
    };
  };

  const clearDirections = () => {
    setRoute(null);
    setSelectedDestination(null);
    setShowDirections(false);
  };

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

      {/* Route loading indicator */}
      {isLoadingRoute && (
        <div className="absolute top-2 left-2 z-[1000] bg-blue-50 border border-blue-200 px-3 py-1 rounded-md shadow-sm">
          <span className="text-sm text-blue-700">
            🗺️ Getting directions...
          </span>
        </div>
      )}

      {/* Location error message */}
      {locationError && (
        <div className="absolute top-2 right-2 z-[1000] bg-amber-50 border border-amber-200 px-3 py-1 rounded-md shadow-sm">
          <span className="text-sm text-amber-700">⚠️ {locationError}</span>
        </div>
      )}

      {/* Directions panel */}
      {showDirections && route && (
        <div className="absolute top-2 left-2 z-[1000] bg-white rounded-md shadow-lg p-4 max-w-sm max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm">
              Directions to {selectedDestination?.name}
            </h3>
            <button
              onClick={clearDirections}
              className="text-gray-500 hover:text-gray-700 text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div className="mb-3 text-xs text-gray-600">
            <div>📏 Distance: {route.totalDistance}m</div>
            <div>
              ⏱️ Walking time: ~{Math.round(route.totalDuration / 60)} min
            </div>
          </div>

          <div className="space-y-2">
            {route.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <div>
                  <div className="text-gray-800">{step.instruction}</div>
                  {step.distance > 0 && (
                    <div className="text-xs text-gray-500">
                      {step.distance}m • {Math.round(step.duration / 60)} min
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        className="w-full h-full min-h-[400px]"
        key={`${mapCenter[0]}-${mapCenter[1]}`}
      >
        <MapUpdater center={mapCenter} route={route} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route polyline */}
        {route && (
          <Polyline
            positions={route.coordinates}
            color="blue"
            weight={4}
            opacity={0.7}
          />
        )}

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
        {buildings?.map((building) => {
          const isDestination = selectedDestination?.id === building.id;
          return (
            <Marker
              key={building.id}
              position={[building.coordinates.lat, building.coordinates.lng]}
              icon={isDestination ? destinationIcon : undefined}
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
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-blue-500">
                        🚶 Distance:{" "}
                        {calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          building.coordinates.lat,
                          building.coordinates.lng
                        )}{" "}
                        meters
                      </p>
                      <button
                        onClick={() => getDirections(building)}
                        disabled={isLoadingRoute}
                        className="w-full mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:bg-gray-400"
                      >
                        {isLoadingRoute ? "Loading..." : "🗺️ Get Directions"}
                      </button>
                      {isDestination && (
                        <button
                          onClick={clearDirections}
                          className="w-full mt-1 px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                        >
                          Clear Directions
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
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
