



import React, { useEffect, useRef } from "react";

const MapView = ({markerCoordinates}) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Initialize the map when the component mounts
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2Qnl98e6FirAZSVRYEyzYfs_0jPaTsSk&libraries=places&callback=initMap&v=weekly`;
    script.defer = true;
    script.async = true;

    document.body.appendChild(script);

    // Clean up the script tag after component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Define the initMap function here
  window.initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: { lat: -33.9, lng: 151.2 },
    });

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        return;
      }

      // Center the map on the selected place
      map.setCenter(place.geometry.location);
      map.setZoom(14); // You can adjust the zoom level as per your preference

      // Add a marker for the selected place
      new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });
    });

    markerCoordinates.forEach(({ name, latitude, longitude }) => {
        addCustomMarker(latitude, longitude, name);
      });

      const addCustomMarker = (latitude, longitude, title) => {
        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: mapRef.current,
          title: title,
        });
      };
  };


  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Enter an address"
          style={{ width: "300px", padding: "10px" }}
        />
      </div>
      <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default MapView;
