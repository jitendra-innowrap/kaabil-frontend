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
  radius: number;
}
interface ControlRefs {
  container?: HTMLDivElement;
  zoomIn?: HTMLButtonElement;
  zoomOut?: HTMLButtonElement;
  recenter?: HTMLButtonElement;
}
const CustomGoogleMap: React.FC<CustomGoogleMapProps> = ({
  lat,
  lng,
  jobLocations = [],
  onMarkerClick,
  selectedJobId,
  radius // in km's
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const currentLocationMarker = useRef<google.maps.Marker | null>(null);
  const hasInitialFit = useRef(false);
  // Declare as mutable from beginning
  const controlsRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Function to create custom control button
  const createControlButton = (icon: string, title: string, onClick: () => void) => {
    const button = document.createElement('div');
    button.innerHTML = icon;
    button.title = title;
    button.style.cssText = `
      width: 30px;
      height: 30px;
    `;
    button.addEventListener('click', onClick);
    return button;
  };


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
      const center = { lat: Number(lat), lng: Number(lng) };
      
      // Calculate zoom level based on radius (1km ≈ zoom level 15)
      const initialZoom = 15 - Math.log2(radius || 1);
      
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: initialZoom,
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
  
      // Center and zoom to current location immediately
      mapInstance.current.panTo(center);
    }
  
    
    // Create control container
    const controlContainer = document.createElement('div');
    controlContainer.style.cssText = `
      position: absolute;
      right: 10px;
      bottom: 30px;
      margin: 5px 0;
      padding: 0;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      gap: 6px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    `;

    // Add zoom in button 
    const zoomInButton = createControlButton(
      `<image src="/new-assets/icons/map/zoom-in.svg" class="zoom-in-map">`,
      'Zoom in',
      () => mapInstance.current?.setZoom(mapInstance.current.getZoom()! + 1)
    );

    // Add zoom out button
    const zoomOutButton = createControlButton(
      `<image src="/new-assets/icons/map/zoom-out.svg" class="zoom-out-map">`,
      'Zoom out',
      () => mapInstance.current?.setZoom(mapInstance.current.getZoom()! - 1)
    );

    // Add recenter button
    const recenterButton = createControlButton(
      `<image src="/new-assets/icons/map/recenter.svg" class="recenter-map">`,
      'Recenter',
      () => {
        if (currentLocationMarker.current) {
          mapInstance.current?.panTo(currentLocationMarker.current.getPosition()!);
          mapInstance.current?.setZoom(18);
        }
      }
    );

    controlContainer.appendChild(zoomInButton);
    controlContainer.appendChild(zoomOutButton);
    controlContainer.appendChild(recenterButton);

    // Add controls to the map
    mapRef.current.appendChild(controlContainer);
    
    // Now you can assign directly
    controlsRef.current = controlContainer; 
  
    // Clear existing job markers (keep current location marker)
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];
  
    // Add current location marker if available
    if (lat && lng) {
      const currentLat = Number(lat);
      const currentLng = Number(lng);
      
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
          zIndex: 1,
        });
  
        // Center map on current location
        mapInstance.current?.panTo({ lat: currentLat, lng: currentLng });
  
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
  
    // Calculate bounds only if we have markers
    if (jobLocations.length > 0 && mapInstance.current) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Always include current location in bounds
      if (currentLocationMarker.current) {
        bounds.extend(currentLocationMarker.current.getPosition()!);
      }
  
      // Add all job locations to bounds
      jobLocations.forEach(job => {
        const jobLat = Number(job.latitude);
        const jobLng = Number(job.longitude);
        if (!isNaN(jobLat) && !isNaN(jobLng)) {
          bounds.extend(new window.google.maps.LatLng(jobLat, jobLng));
        }
      });
  
      if (!bounds.isEmpty()) {
        // Adjust zoom based on radius if provided
        if (radius && radius > 0) {
          const circle = new window.google.maps.Circle({
            center: { lat: Number(lat), lng: Number(lng) },
            radius: radius * 1000, // Convert km to meters
          });
          mapInstance.current.fitBounds(circle.getBounds() as google.maps.LatLngBounds, {
            top: 50, right: 50, bottom: 50, left: 50
          });
        } else {
          mapInstance.current.fitBounds(bounds, {
            top: 50, right: 50, bottom: 50, left: 50
          });
        }
      }
    }
  
  }, [lat, lng, jobLocations, selectedJobId, radius]);
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
      <div ref={mapRef} className='custom-google-map' style={{ width: '100%', height: '100%' }} />
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