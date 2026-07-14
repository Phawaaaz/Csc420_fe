import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapSearchForm from '@/features/map/components/MapSearchForm';
import DirectionSteps, { type DirectionStep } from '@/features/direction/components/DirectionSteps';
import CampusMap from '@/features/map/components/CampusMap';
import { useMap } from '@/context/MapContext';
import { haversineDistance, walkingDuration } from '@/utils/distance';

/**
 * Direction finding page component
 */
const DirectionPage: React.FC = () => {
  const { buildings, findPath } = useMap();
  const [searchParams] = useSearchParams();
  const presetTo = searchParams.get('to') || '';

  const [route, setRoute] = useState<{ from: string; to: string } | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (from: string, to: string) => {
    const path = findPath(from, to);
    if (!path || path.length === 0) {
      setRoute(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setRoute({ from, to });
  };

  const { directionSteps, totalDistance, totalDuration } = useMemo(() => {
    if (!route) {
      return { directionSteps: [], totalDistance: 0, totalDuration: 0 };
    }

    const path = findPath(route.from, route.to);
    if (!path || path.length === 0) {
      return { directionSteps: [], totalDistance: 0, totalDuration: 0 };
    }

    const buildingName = (id: string) =>
      buildings?.find((b) => b.id === id)?.name || id;

    let total = 0;
    const steps: DirectionStep[] = path.map((node, index) => {
      if (index === 0) {
        return {
          id: node.id,
          instruction: `Start at ${buildingName(node.id)}`,
          distance: '0 m',
          time: '0 min',
          icon: 'MapPin',
        };
      }

      const prev = path[index - 1];
      const segmentDistance = haversineDistance(
        prev.latitude,
        prev.longitude,
        node.latitude,
        node.longitude
      );
      total += segmentDistance;

      const isLast = index === path.length - 1;
      return {
        id: node.id,
        instruction: isLast
          ? `Arrive at ${buildingName(node.id)}`
          : `Continue towards ${buildingName(node.id)}`,
        distance: `${segmentDistance} m`,
        time: `${Math.max(1, Math.round(walkingDuration(segmentDistance) / 60))} min`,
        icon: isLast ? 'MapPin' : 'ArrowRight',
      };
    });

    return {
      directionSteps: steps,
      totalDistance: total,
      totalDuration: walkingDuration(total),
    };
  }, [route, buildings, findPath]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Direction</h1>
        <p className="text-sm text-gray-600 mt-1">
          Get step-by-step directions to navigate the campus
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <MapSearchForm onSearch={handleSearch} defaultTo={presetTo} />
      </div>

      {notFound && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          No walking route could be found between those two locations.
        </div>
      )}

      {route && directionSteps.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CampusMap
              className="h-[500px]"
              showPath
              pathFrom={route.from}
              pathTo={route.to}
            />
          </div>

          <div>
            <DirectionSteps steps={directionSteps} />

            <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Total Distance</h4>
                  <p className="text-lg font-semibold text-gray-900">{totalDistance} meters</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Estimated Time</h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {Math.max(1, Math.round(totalDuration / 60))} minutes
                  </p>
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
