import React, { useState } from 'react';
import axios from 'axios';
import { CloudSun } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { DateSlider } from './components/DateSlider';
import { WeatherData, ForecastData } from './types/weather';
import { getWeatherBackground } from './utils/weatherBackgrounds';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);  
  const [forecasts, setForecasts] = useState<ForecastData[]>([]); 
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const API_KEY = '  const API_KEY = 'cfef6f649d07feec51265fe5d3b9483f';



  //Defines an asynchronous function named fetchWeather for fetching weather data. 
  //checks if the city input is empty after removing leading/trailing whitespace.
//If empty, sets the error state to indicate missing city input and returns.
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
//wraps the API calls in a try-catch block for error handling.
//The first call uses axios.get to retrieve current weather data from the OpenWeatherMap API with the specified API key and units (metric).
    try {
      const [currentWeather, forecast] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` //base api for current weather
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}` //base api for forcast
        ),
      ]);

      setWeather(currentWeather.data);
      setForecasts(forecast.data.list);
      setSelectedDate(currentWeather.data.dt);
//Handles potential errors during API calls.
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('City not found. Please check the spelling and try again.');
        } else if (err.response?.status === 401) {
          setError(
            'Invalid API key. Please check your OpenWeatherMap API key.'
          );
        } else {
          setError(
            'An error occurred while fetching weather data. Please try again.'
          );
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setWeather(null);
      setForecasts([]);
    } finally {
      setLoading(false);
    }
  };

  //Defines a function to handle date selection from the date slider.
  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
    const selectedForecast = forecasts.find((f) => f.dt === date);
    if (selectedForecast && weather) {
      setWeather({
        ...weather,
        main: selectedForecast.main,
        weather: selectedForecast.weather,
        wind: selectedForecast.wind,
        visibility: selectedForecast.visibility,
      });
    }
  };

  //Defines a style object for the background based on weather conditions.
  const backgroundStyle = weather
    ? getWeatherBackground(weather.weather[0].main)
    : {
        backgroundImage: `url('https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

  return (
    //The return statement renders the JSX structure of the App component, including:
//The main container with the specified background style.
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center py-12 px-4 transition-all duration-1000 ease-in-out"
      style={backgroundStyle}
    >
      <div className="flex items-center gap-3 mb-8">
        <CloudSun size={40} className="text-white" />
        <h1 className="text-4xl font-bold text-white">Weather Forecast</h1>
      </div>

      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      
      {loading && <div className="mt-8 text-white">Loading...</div>}

      {error && (
        <div className="mt-8 text-red-200 bg-red-500 bg-opacity-20 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {weather && forecasts.length > 0 && !loading && !error && (
        <>
          <DateSlider
            forecasts={forecasts}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          <WeatherCard data={weather} />
        </>
      )}

    {!weather && !loading && !error && (
        <div className="mt-8 text-white text-center">
          <p className="text-xl">Enter a city name to get started</p>
          <p className="text-sm mt-2 text-gray-200">
            Get instant weather updates for any location
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
