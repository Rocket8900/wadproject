
import React, { useState, useRef, useEffect } from 'react';
import asyncScriptLoader from 'react-async-script-loader';

const MapView = ({ isScriptLoaded, isScriptLoadSucceed, markerCoordinates }) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const inputRef = useRef(null); 



  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2Qnl98e6FirAZSVRYEyzYfs_0jPaTsSk&libraries=places&callback=initMap`;
      document.head.appendChild(googleMapsScript);
      googleMapsScript.onload = initMap;
  
      return () => {
        document.head.removeChild(googleMapsScript);
      };
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  useEffect(() => {
    // Add markers to the map
    if (map && markerCoordinates && markerCoordinates.length > 0) {
      const newMarkers = markerCoordinates.map(marker => {
        let location;
        if (typeof marker.location === 'string') {
          location = JSON.parse(marker.location);
        } else {
          location = marker.location;
        }
        return new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: marker.name,
        });
      });
      
      setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
    }
  }, [map, markerCoordinates]);

  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }
        
        const selectedLocation = place.geometry.location;
        map.setCenter(selectedLocation);
        
        const selectedMarker = new window.google.maps.Marker({
          position: selectedLocation,
          map,
          title: place.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'green', 
            fillOpacity: 1, 
            scale: 13, 
          },
        });
  
        // Add the selected marker to the markers state
        setMarkers(prevMarkers => [...prevMarkers, selectedMarker]);
      });
    }
  }, [isScriptLoaded, isScriptLoadSucceed, map]);

  const initMap = () => {
    const singapore = { lat: 1.3521, lng: 103.8198 };
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: singapore,
      zoom: 12,
    });
    setMap(mapInstance);
  };

  const handleSearchChange = (event) => {
    setSearchAddress(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter address"
        value={searchAddress}
        onChange={handleSearchChange}
        ref={inputRef}
      />
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default asyncScriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyC2Qnl98e6FirAZSVRYEyzYfs_0jPaTsSk&libraries=places'])(MapView);
