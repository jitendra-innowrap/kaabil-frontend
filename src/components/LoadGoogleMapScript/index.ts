'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAutocompleteService, setScriptLoaded } from '@/redux/searchSlice';

export default function LoadGoogleMapsScript() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCp-H598wbMhBWMz9I_zbvdcknH-fiBVCo&libraries=places`;
    script.async = true;
    script.onload = () => {
      // Initialize the autocomplete service
      const autocompleteService = new window.google.maps.places.AutocompleteService();
      dispatch(setAutocompleteService(autocompleteService)); // Store in Redux
      dispatch(setScriptLoaded(true)); // Mark script as loaded
    };
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);

  return null; // This component doesn't render anything
}