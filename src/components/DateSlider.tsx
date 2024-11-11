import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ForecastData } from '../types/weather';

interface DateSliderProps {
  forecasts: ForecastData[];
  selectedDate: number;
  onDateSelect: (date: number) => void;
}

export const DateSlider: React.FC<DateSliderProps> = ({
  forecasts,
  selectedDate,
  onDateSelect,
}) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);
//Defines a function named scroll to scroll the forecast list based on the provided direction ('left' or 'right').
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
  };

  const buttonClass = "absolute top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/30 rounded-full p-2 shadow-lg hover:bg-white/50 transition-all duration-300 border border-white/20 hover:scale-110";

  return (
    <div className="relative w-full max-w-md m-4">
      <button
        onClick={() => scroll('left')}
        className={`${buttonClass} left-0`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} className="text-gray-800" />
      </button>
      
      <div
        ref={scrollContainer}
        className="flex overflow-x-auto gap-2 px-8 pb-2 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {forecasts.map((forecast) => {
          const { day, date, time } = formatDate(forecast.dt);
          const isSelected = selectedDate === forecast.dt;
          
          return (
            <button
              key={forecast.dt}
              onClick={() => onDateSelect(forecast.dt)}
              className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                isSelected
                  ? 'bg-white shadow-lg transform scale-105 backdrop-blur-md'
                  : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm hover:scale-102'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold text-gray-800">{day}</div>
                <div className="text-sm text-gray-600">{date}</div>
                <div className="text-sm text-gray-500">{time}</div>
                <div className="mt-1 flex items-center justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">
                    {Math.round(forecast.main.temp)}°C
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <button
        onClick={() => scroll('right')}
        className={`${buttonClass} right-0`}
        aria-label="Scroll right"
      >
        <ChevronRight size={20} className="text-gray-800" />
      </button>
    </div>
  );
};