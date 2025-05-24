import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { useMap } from '@/context/MapContext';

interface MapSearchFormProps {
  onSearch: (from: string, to: string) => void;
  className?: string;
}

/**
 * Form for searching directions between locations
 */
const MapSearchForm: React.FC<MapSearchFormProps> = ({
  onSearch,
  className = '',
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { buildings } = useMap();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      onSearch(from, to);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="From:"
          placeholder="Starting point"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          fullWidth
        />
        
        <Input
          label="To:"
          placeholder="Destination"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          fullWidth
        />
      </div>
      
      <div className="mt-4">
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default MapSearchForm;