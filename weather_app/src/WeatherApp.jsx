import { useState } from "react";
import { CONSTANTS } from "./constants";

export const WeatherApp = () => {
  const { api_key, dif_kelvin, url_base, icon_url } = CONSTANTS;
  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim().length === 0) {
      setError("Please enter a city");
      return;
    }
    fetchWeather();
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${url_base}?q=${city}&appid=${api_key}`);
      const data = await response.json();
      setDataWeather(data);
    } catch (error) {
      setError(error.message);
      setDataWeather(null);
    }
  };

  const conversor_temp = (temp) => {
    return Math.round(temp - dif_kelvin);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {dataWeather && (
        <div>
          <h2>{dataWeather.name}</h2>
          <p>Temperature: {conversor_temp(dataWeather.main.temp)}°C </p>
          <p>Feels like: {conversor_temp(dataWeather.main.feels_like)}°C</p>
          <p>Meteorological conditions: {dataWeather.weather[0].description}</p>
          <img src={`${icon_url}${dataWeather.weather[0].icon}@2x.png`} />
        </div>
      )}
      {error && (
        <div>
          <p>An error has occrred: {error}</p>
        </div>
      )}
    </div>
  );
};
