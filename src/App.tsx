import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';
import Favorites from './components/Favorites';
import LocationWeather from './components/LocationWeather';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchWeather = async (cityName) => {
    setError('');
    setWeather(null);
    setHourlyForecast(null);
    setLoading(true); // Start loading

    try {
      const geocodeResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      if (geocodeResponse.data.results && geocodeResponse.data.results.length) {
        const { latitude, longitude, name } = geocodeResponse.data.results[0];

        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation`
        );

        const weatherData = {
          city: name,
          temperature: weatherResponse.data.current_weather.temperature,
          windSpeed: weatherResponse.data.current_weather.windspeed,
          weatherCode: weatherResponse.data.current_weather.weathercode,
        };

        setWeather(weatherData);
        setHourlyForecast(weatherResponse.data.hourly);
      } else {
        setError('City not found. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }

    setLoading(false); // Stop loading
  };

  const addFavorite = () => {
    if (weather && !favorites.includes(weather.city)) {
      setFavorites([...favorites, weather.city]);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Weather Now</h1>
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => fetchWeather(city)}>Check Weather</button>
        </div>
        <LocationWeather fetchWeather={fetchWeather} />
        {loading && <p>Loading weather data...</p>} {/* Show loading message */}
        {error && <p className="error">{error}</p>}
        {weather && !loading && (
          <>
            <WeatherCard weather={weather} addFavorite={addFavorite} />
            <HourlyForecast hourlyForecast={hourlyForecast} />
          </>
        )}
        <Favorites favorites={favorites} fetchWeather={fetchWeather} />
      </main>
      <footer>
        <p>Powered by Open-Meteo</p>
      </footer>
    </div>
  );
};

export default App;
