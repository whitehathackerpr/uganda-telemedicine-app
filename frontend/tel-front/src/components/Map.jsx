import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const Map = ({ center, zoom = 15 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add marker
      markerRef.current = new window.google.maps.Marker({
        position: center,
        map: mapInstanceRef.current,
        title: 'Telemedicine Uganda',
        animation: window.google.maps.Animation.DROP,
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0;">Telemedicine Uganda</h3>
            <p style="margin: 0;">123 Healthcare Street</p>
            <p style="margin: 0;">Kampala, Uganda</p>
          </div>
        `,
      });

      markerRef.current.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, markerRef.current);
      });
    };

    return () => {
      // Cleanup
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      document.head.removeChild(script);
    };
  }, [center, zoom]);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: '100%',
        height: '400px',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    />
  );
};

export default Map; 