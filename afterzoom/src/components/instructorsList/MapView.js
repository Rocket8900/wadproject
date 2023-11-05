
import React, { useState, useRef, useEffect } from 'react';
import asyncScriptLoader from 'react-async-script-loader';


const MapView = ({ isScriptLoaded, isScriptLoadSucceed, markerCoordinates }) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const inputRef = useRef(null); 
  const [travelTime, setTravelTime] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  const initMap = () =>{
    const singapore = { lat: 1.3521, lng: 103.8198 };
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: singapore,
      zoom: 12,
    });
    setMap(mapInstance);
    const directionsService = new window.google.maps.DirectionsService();
    setDirectionsService(directionsService);
  };


  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap; // Make sure initMap is available globally
    document.body.appendChild(script);
  };


  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      loadGoogleMapsScript();
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
  
        const newMarker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: marker.name,
        });
  
        // Calculate travel time for the new marker
        if (markers.length > 0) {
          const latestMarker = markers[markers.length - 1];
          const origin = searchAddress; // Use the input address as the origin
          const destination = latestMarker.getPosition(); // Get position of the latest marker
          const directionsService = new window.google.maps.DirectionsService();
          calculateTravelTime(origin, destination,directionsService);
        }
  
        return newMarker;
      });
  
      setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
    }
  }, [map, markerCoordinates, markers, searchAddress]);
  

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

  const calculateTravelTime = (origin, destination, directionsService) => {
    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.TRANSIT, // Set travel mode to public transport
    };
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        const duration = response.routes[0].legs[0].duration.text;
        console.log('Travel Time by Public Transport:', duration);
        setTravelTime(duration);
        // Update UI with the travel time (you can set it to a state variable and display it on the UI)
      } else {
        console.error('Error calculating travel time:', status);
      }
    });
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
      {travelTime && <p>Travel Time by Public Transport: {travelTime}</p>}
    </div>
  )
};

  const AsyncScriptLoader = asyncScriptLoader(["https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places"])(MapView);

  export default AsyncScriptLoader;

