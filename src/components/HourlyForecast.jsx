import React from "react";

const HourlyForecast = ({ hourlyForecast }) => {
  if (!hourlyForecast) return null;

  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-grid">
        {hourlyForecast.temperature_2m.slice(0, 12).map((temp, index) => (
          <div key={index} className="forecast-item">
            <p>{index}:00</p>
            <p>{temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
