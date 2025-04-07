'use client'
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useRef } from 'react';

export interface MapJobLocation {
  id: string;
  job_distance: string;
  job_location: string;
  latitude: string;
  longitude: string;
}

interface CustomGoogleMapProps {
  lat: string | number;
  lng: string | number;
  jobLocations?: MapJobLocation[];
  onMarkerClick?: (jobId: string) => void;
  selectedJobId?: string;
}

const CustomGoogleMap: React.FC<CustomGoogleMapProps> = ({
  lat,
  lng,
  jobLocations = [],
  onMarkerClick,
  selectedJobId
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const currentLocation = useAppSelector((state) => state.user.current_location);
  const currentLocationMarker = useRef<google.maps.Marker | null>(null);
  const hasInitialFit = useRef(false);

  // Function to add class to marker element
  const addMarkerClass = (marker: google.maps.Marker, className: string) => {
    setTimeout(() => {
      const markerElement = marker.getIcon() instanceof Object 
        ? document.querySelector(`img[src="${(marker.getIcon() as google.maps.Icon).url}"]`)?.parentElement
        : document.querySelector(`img[src="${marker.getIcon()}"]`)?.parentElement;
      
      if (markerElement) {
        markerElement.classList.add(className);
      }
    }, 100);
  };

  useEffect(() => {
    if (!window.google || !window.google.maps || !mapRef.current) return;

    // Initialize the map only once
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: Number(lat), lng: Number(lng) },
        zoom: 8,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
    }

    // Clear existing job markers (keep current location marker)
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Add current location marker if available
    if (currentLocation?.city_latitude && currentLocation?.city_longitude) {
      const currentLat = Number(currentLocation.city_latitude);
      const currentLng = Number(currentLocation.city_longitude);
      
      if (!isNaN(currentLat) && !isNaN(currentLng)) {
        if (currentLocationMarker.current) {
          currentLocationMarker.current.setMap(null);
        }

        currentLocationMarker.current = new window.google.maps.Marker({
          position: { lat: currentLat, lng: currentLng },
          map: mapInstance.current,
          icon: {
            url: '/new-assets/icons/jobs-near-you/current-location-marker.svg',
            scaledSize: new window.google.maps.Size(40, 40)
          },
          title: 'Your current location',
          zIndex: 1000,
        });

        // Add CSS class to current location marker
        if (currentLocationMarker.current) {
          addMarkerClass(currentLocationMarker.current, 'current-location-marker');
        }
      }
    }

    // Add new markers for each job location
    jobLocations?.forEach(job => {
      const jobLat = Number(job.latitude);
      const jobLng = Number(job.longitude);
      
      if (isNaN(jobLat) || isNaN(jobLng)) return;

      const marker = new window.google.maps.Marker({
        position: { lat: jobLat, lng: jobLng },
        map: mapInstance.current,
        icon: {
          url: selectedJobId === job.id 
            ? '/new-assets/icons/jobs-near-you/job-location-marker.svg' 
            : '/new-assets/icons/jobs-near-you/job-location-marker.svg',
          scaledSize: new window.google.maps.Size(32, 32)
        },
        title: job.job_location
      });

      marker.addListener('click', () => {
        console.log(`job-${job.id}`)
        if (mapInstance.current) {
          mapInstance.current.panTo(marker.getPosition()!);
          mapInstance.current.setZoom(15);
          const jobElement = document.getElementById(`job-${job.id}`);
          if (jobElement) {
            jobElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      });

      markers.current.push(marker);
    });

    // Only fit bounds on initial load or when locations change significantly
    if ((!hasInitialFit.current || jobLocations.length > 0) && mapInstance.current) {
      const bounds = new window.google.maps.LatLngBounds();
      
      if (currentLocationMarker.current) {
        bounds.extend(currentLocationMarker.current.getPosition()!);
      }

      jobLocations.forEach(job => {
        const jobLat = Number(job.latitude);
        const jobLng = Number(job.longitude);
        if (!isNaN(jobLat) && !isNaN(jobLng)) {
          bounds.extend(new window.google.maps.LatLng(jobLat, jobLng));
        }
      });

      if (!bounds.isEmpty()) {
        mapInstance.current.fitBounds(bounds, {
          top: 50, right: 50, bottom: 50, left: 50
        });
        hasInitialFit.current = true;
      }
    }

  }, [lat, lng, jobLocations, selectedJobId, currentLocation, onMarkerClick]);

  // Handle selected job changes to pan/zoom to it
  useEffect(() => {
    if (!selectedJobId || !mapInstance.current) return;

    const selectedMarker = markers.current.find(m => {
      const title = m.getTitle();
      return title && title.includes(selectedJobId);
    });

    if (selectedMarker && mapInstance.current) {
      mapInstance.current.panTo(selectedMarker.getPosition()!);
      mapInstance.current.setZoom(15);
    }
  }, [selectedJobId]);

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {/* Add global styles for the current location marker */}
      <style jsx global>{`
        .current-location-marker {
          /* Add your custom styles here */
          transition: transform 0.2s ease;
        }
        .current-location-marker:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default CustomGoogleMap;