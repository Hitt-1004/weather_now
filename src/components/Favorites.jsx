import React from "react";

const Favorites = ({ favorites, fetchWeather }) => {
  return (
    <div className="favorites">
      <h3>Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorite cities yet.</p>
      ) : (
        <ul>
          {favorites.map((city, index) => (
            <li key={index} onClick={() => fetchWeather(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
