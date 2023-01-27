import React, { useState, useEffect } from 'react';

const users = [
  { id: 1, name: 'John Doe', location: { latitude: 40.730610, longitude: -73.935242 } },
  { id: 2, name: 'Jane Smith', location: { latitude: 34.052235, longitude: -118.243683 } },
  { id: 3, name: 'Bob Johnson', location: { latitude: 41.881832, longitude: -87.623177 } },
  { id: 4, name: 'Emily Davis', location: { latitude: 37.774929, longitude: -122.419416 } },
];

const UserList = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [userLocation, setUserLocation] = useState(null);
  const [proximityFilter, setProximityFilter] = useState('');

  const handleProximityFilterChange = (event) => {
    setProximityFilter(event.target.value);
  };

  const handleProximityFilterSubmit = () => {
    const filteredUsers = users.filter((user) => {
      const distance = getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        user.location.latitude,
        user.location.longitude
      );
      return distance <= proximityFilter;
    });
    setFilteredUsers(filteredUsers);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  console.log('user location: ', userLocation);

  return (
    <div>
      <label>
        Filter by proximity in kilometers:
        <input
          type="text"
          value={proximityFilter}
          onChange={handleProximityFilterChange}
        />
        <button onClick={handleProximityFilterSubmit}>Filter</button>
      </label>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
