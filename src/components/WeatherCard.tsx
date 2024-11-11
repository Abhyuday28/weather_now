import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Eye, Compass } from 'lucide-react';
import { WeatherData } from '../types/weather';

//Defines an interface named WeatherCardProps that specifies the expected prop for this component:
interface WeatherCardProps {
  data: WeatherData;
}

//Defines a functional component named WeatherCard that takes a single prop named data of type WeatherData.
export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  //Uses the useEffect hook to update the currentTime state every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []); //The empty dependency array [] ensures the effect runs only once after the initial render.

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      // weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md backdrop-blur-lg bg-opacity-90">
      <div className="text-center mb-4">
        <p className="text-gray-600 font-small">{formatTime(currentTime)}</p>
      </div>
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {data.name}, {data.sys.country}
        </h2>
        <div className="flex items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} //icon by openweather api
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <span className="text-5xl font-bold text-gray-800">
            {data.main.temp}°C
          </span>
        </div>
        <p className="text-lg text-gray-600 capitalize">
          {data.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Wind className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
          <Droplets className="text-green-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
          <Eye className="text-purple-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Visibility</p>
            <p className="font-semibold">{data.visibility / 1000} km</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg">
          <Compass className="text-orange-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Wind Direction</p>
            <p className="font-semibold">{data.wind.deg}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};
