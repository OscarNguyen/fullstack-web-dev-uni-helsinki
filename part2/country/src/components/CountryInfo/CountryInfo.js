import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const temperature = weatherData ? weatherData.main.temp : 0;
  const windSpeed = weatherData ? weatherData.wind.speed : 0;
  const weatherIcon = weatherData ? weatherData.weather[0].icon : '';
  useEffect(() => {
    const fetchWeather = async () => {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
      );
      setWeatherData(result.data);
    };

    fetchWeather();
  }, [country.capital]);
  console.log(weatherData);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img alt="flag" width="400px" height="400px" src={country.flag} />
      <h3>Weather in {country.capital}</h3>
      <p>Temperature {temperature.toFixed(0)} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather-icon" />
      <p>Wind {windSpeed.toFixed(0)} m/s</p>
    </div>
  );
};

export default CountryInfo;
