import React, { useState } from 'react';

function Locate() {
  const [location, setLocation] = useState({});

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
}

export default Locate;
