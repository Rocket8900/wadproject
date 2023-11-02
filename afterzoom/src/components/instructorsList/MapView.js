import React, { useEffect } from "react";

const MapView = (instructors) => {
  useEffect(() => {
    // Initialize the map when the component mounts
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2Qnl98e6FirAZSVRYEyzYfs_0jPaTsSk&callback=initMap&v=weekly`;
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
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: { lat: -33.9, lng: 151.2 },
    });

    // Data for the markers
    const beaches = [
      ["Bondi Beach", -33.890542, 151.274856, 4],
      ["Coogee Beach", -33.923036, 151.259052, 5],
      ["Cronulla Beach", -34.028249, 151.157507, 3],
      ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
      ["Maroubra Beach", -33.950198, 151.259302, 1],
    ];

    // Add markers to the map
    for (let i = 0; i < beaches.length; i++) {
      const beach = beaches[i];

      new window.google.maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map: map,
        title: beach[0],
        zIndex: beach[3],
      });
    }
  };

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default MapView;
