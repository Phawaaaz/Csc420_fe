import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import { useMap } from '@/context/MapContext';

interface MapSearchFormProps {
  onSearch: (from: string, to: string) => void;
  defaultFrom?: string;
  defaultTo?: string;
  className?: string;
}

/**
 * Form for searching directions between locations
 */
const MapSearchForm: React.FC<MapSearchFormProps> = ({
  onSearch,
  defaultFrom = '',
  defaultTo = '',
  className = '',
}) => {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const { buildings } = useMap();

  // Keep selects in sync if a preselected destination arrives after mount (e.g. from Saved Locations)
  useEffect(() => {
    if (defaultFrom) setFrom(defaultFrom);
  }, [defaultFrom]);

  useEffect(() => {
    if (defaultTo) setTo(defaultTo);
  }, [defaultTo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      onSearch(from, to);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">From:</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select starting point</option>
            {buildings?.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">To:</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select destination</option>
            {buildings?.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!from || !to}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default MapSearchForm;
