import { useState, useEffect } from 'react';

/**
 * Custom hook to get the current user location.
 * Invokes navigator.geolocation.getCurrentPosition on mount.
 * Falls back to a default location after 10 seconds or on permission denied.
 * @returns {{lat: number | null, lng: number | null, loading: boolean, error: boolean}}
 */
const useCurrentLocation = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timeoutId;

    const successHandler = (position) => {
      clearTimeout(timeoutId);
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setLoading(false);
      setError(false);
    };

    const errorHandler = (err) => {
      clearTimeout(timeoutId);
      console.error('Geolocation error:', err);
      // Fallback location for University of Ilorin
      setLat(8.47997);
      setLng(4.54179);
      setLoading(false);
      setError(true);
    };

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      // Fallback immediately if not supported
      setLat(8.47997);
      setLng(4.54179);
      setLoading(false);
      setError(true);
    } else {
      // Set a timeout for the fallback
      timeoutId = setTimeout(() => {
        console.warn('Geolocation timed out, using fallback location.');
        // Fallback location for University of Ilorin
        setLat(8.47997);
        setLng(4.54179);
        setLoading(false);
        setError(true);
      }, 10000); // 10 seconds timeout

      navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
        enableHighAccuracy: true,
        timeout: 5000, // Set a timeout for the geolocation request itself as well
        maximumAge: 0,
      });
    }

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return { lat, lng, loading, error };
};

export default useCurrentLocation; 