import WeatherService, { type WeatherData } from "../services/weather";
import { useEffect, useState } from "react";
import type { Country } from '../types'

const CountryWeather = ({ country }: { country: Country }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
  
    useEffect(() => {
      const [lat, lon] = country.latlng;
      WeatherService.getWeather(lat, lon)
        .then(data => setWeather(data))
        .catch(err => console.error(err));
    }, [country]);
  
    if (!weather) return <p>Loading weather...</p>;
  
    return (
      <div>
        <p>Temperature: {weather.temperature}°C</p>
        <p>Precipitation: {weather.precipitation} mm</p>
        <p>Clouds: {weather.clouds}%</p>
      </div>
    );
};

export default CountryWeather;