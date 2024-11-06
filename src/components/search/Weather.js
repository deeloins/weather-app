import { useEffect, useRef, useState } from 'react';
import './Weather.css';

const search_icon = '/images/Assets/search.png';
const clear_icon = '/images/Assets/clear.png';
const cloud_icon = '/images/Assets/cloud.png';
const drizzle_icon = '/images/Assets/drizzle.png';
const humidity_icon = '/images/Assets/humidity.png';
const rain_icon = '/images/Assets/rain.png';
const snow_icon = '/images/Assets/snow.png';
const wind_icon = '/images/Assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0d9bed3fc58c2f439c9be4a09cf29e41`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data,);
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        location: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please check your API key and connection.');
    }
  };

  useEffect(() => {
    search("");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" onKeyDown={handleKeyDown} />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind icon" />
              <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;