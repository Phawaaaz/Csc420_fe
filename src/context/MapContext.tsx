import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { findShortestPath, type Graph, type GraphNode } from '@/utils/pathfinding';

interface Room {
  id: string;
  name: string;
  floor: number;
  capacity?: number;
}

interface Building {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  rooms?: Room[];
}

interface MapContextType {
  buildings: Building[] | null;
  graph: Graph | null;
  loading: boolean;
  error: string | null;
  savedLocations: string[];
  saveLocation: (buildingId: string) => void;
  removeLocation: (buildingId: string) => void;
  findPath: (fromId: string, toId: string) => GraphNode[] | null;
}

/**
 * Map context for campus data and navigation
 */
const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [buildings, setBuildings] = useState<Building[] | null>(null);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  
  // Load campus data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        // Load buildings data
        const buildingsResponse = await fetch('/data/buildings.json');
        if (!buildingsResponse.ok) {
          throw new Error('Failed to load buildings data');
        }
        const buildingsData = await buildingsResponse.json();
        setBuildings(buildingsData.buildings);
        
        // Load graph data
        const graphResponse = await fetch('/data/graph.json');
        if (!graphResponse.ok) {
          throw new Error('Failed to load graph data');
        }
        const graphData = await graphResponse.json();
        setGraph(graphData);
        
        // Load saved locations from localStorage
        const saved = localStorage.getItem('savedLocations');
        if (saved) {
          setSavedLocations(JSON.parse(saved));
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load map data');
        setLoading(false);
      }
    };
    
    loadMapData();
  }, []);
  
  // Save location to favorites
  const saveLocation = (buildingId: string) => {
    setSavedLocations((prev) => {
      if (prev.includes(buildingId)) return prev;
      
      const updated = [...prev, buildingId];
      localStorage.setItem('savedLocations', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Remove location from favorites
  const removeLocation = (buildingId: string) => {
    setSavedLocations((prev) => {
      const updated = prev.filter((id) => id !== buildingId);
      localStorage.setItem('savedLocations', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Find path between two locations using Dijkstra's algorithm
  const findPath = (fromId: string, toId: string): GraphNode[] | null => {
    if (!graph) return null;
    return findShortestPath(graph, fromId, toId);
  };
  
  const value = {
    buildings,
    graph,
    loading,
    error,
    savedLocations,
    saveLocation,
    removeLocation,
    findPath,
  };
  
  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};