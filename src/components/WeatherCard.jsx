import React from "react";

const WeatherCard = ({ weather, addFavorite }) => {
  const getWeatherDescription = (code) => {
    const descriptions = {
      0: "Clear Sky ☀️",
      1: "Mainly Clear 🌤️",
      2: "Partly Cloudy 🌥️",
      3: "Overcast ☁️",
      45: "Fog 🌫️",
      48: "Rime Fog 🌫️",
      51: "Light Drizzle 🌦️",
      53: "Moderate Drizzle 🌦️",
      55: "Dense Drizzle 🌧️",
      61: "Slight Rain 🌧️",
      63: "Moderate Rain 🌧️",
      65: "Heavy Rain 🌧️",
    };
    return descriptions[code] || "Unknown ❓";
  };

  const getEmote = (temperature) => {
    if (temperature > 30) return "🥵"; // Hot weather
    if (temperature > 20) return "😊"; // Pleasant weather
    if (temperature > 10) return "😌"; // Chilly weather
    return "🥶"; // Cold weather
  };

  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <p>Temperature: {weather.temperature}°C {getEmote(weather.temperature)}</p>
      <p>Wind Speed: {weather.windSpeed} km/h</p>
      <p>Condition: {getWeatherDescription(weather.weatherCode)}</p>
      <button onClick={addFavorite}>Add to Favorites</button>
    </div>
  );
};

export default WeatherCard;
