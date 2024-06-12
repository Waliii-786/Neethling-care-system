import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '650px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 32.57994756533556 ,
    lng: 73.48956254477405
  };

  const locations = [
    { name: "Animal health clinic MandiBahauddin", position: { lat: 32.56692071882347, lng: 73.48838747996363 } },
    { name: "Al Shifa Veterinary Clinic", position: { lat: 32.44110247215067 , lng: 73.63629312550648 } },
    { name: "Pets Town", position: { lat: 32.561712450962105 , lng: 73.5117334269823 } },
    { name: "Phalia Veterinary Hospital", position: { lat: 32.436180461646416 , lng:  73.57523051368648 } }
    // Add more locations as needed
  ];

  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleClick = (position) => {
    if (mapRef.current) {
      mapRef.current.panTo(position);
      mapRef.current.setZoom(15); // Adjust zoom level if needed
    }
  };

  return (
    <div>
      {locations.map((item, index) => (
        <button key={index} onClick={() => handleClick(item.position)}>
          {item.name}
        </button>
      ))}
      <LoadScript googleMapsApiKey="AIzaSyALS9kjolr8JsHEJEu-Z_qXEpbstTT0DIE">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={defaultCenter}
          onLoad={onLoad}
        >
          {locations.map((item, index) => (
            <Marker key={index} position={item.position} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;