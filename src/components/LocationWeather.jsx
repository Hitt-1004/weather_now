import React, { useEffect } from 'react';

const LocationWeather = ({ fetchWeather }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      (error) => {
        console.log(
          'Could not fetch location. Ensure permissions are granted.'
        );
      }
    );
  }, [fetchWeather]);

  return null;
};

export default LocationWeather;
