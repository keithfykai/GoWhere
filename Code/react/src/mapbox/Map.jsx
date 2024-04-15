import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './mapbox.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2VpdGhmeWthaSIsImEiOiJjbHMxZzdvcXEwOWQ1MmtvM2k1em5iNGUwIn0.dx6kqRegmyg7BwxWTga0wQ';

/* Singapore Coordinates:
    Longitude: 103.7975 | Latitude: 1.3116 | Zoom: 11.05

    Using the coordinates, we plug it into Google Maps to get the exact location in Singapore to retreive Google Places API data.
  */
const defaultCoordinates = [103.7975, 1.3116];

function addMarker(longitude, latitude, map) {
  const marker = new mapboxgl.Marker({
    color: '#FF0000',
  })
  .setLngLat([longitude, latitude])
  .addTo(map);
}

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(defaultCoordinates[0]);
  const [lat, setLat] = useState(defaultCoordinates[1]);
  const [zoom, setZoom] = useState(11.7);
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // **Add the NavigationControl here:**
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    }));

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container mx-auto text-center" />
    </div>
  );
}

export {defaultCoordinates, Map, addMarker};