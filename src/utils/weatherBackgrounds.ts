interface WeatherBackground {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
}

const backgrounds: Record<string, WeatherBackground> = {
  Clear: {
    backgroundImage: "url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Clouds: {
    backgroundImage: "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Rain: {
    backgroundImage: "url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Snow: {
    backgroundImage: "url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Thunderstorm: {
    backgroundImage: "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Drizzle: {
    backgroundImage: "url('https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Mist: {
    backgroundImage: "url('https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Smoke: {
    backgroundImage: "url('https://images.unsplash.com/photo-1624948465027-6f9b51067557?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Haze: {
    backgroundImage: "url('https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Dust: {
    backgroundImage: "url('https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Fog: {
    backgroundImage: "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};

export const getWeatherBackground = (weatherCondition: string): WeatherBackground => {
  return (
    backgrounds[weatherCondition] || {
      backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  );
};