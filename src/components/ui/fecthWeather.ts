export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  forecast: {
    forecastday: WeatherDay[];
  };
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherCurrent {
  temp_c: number;
  condition: WeatherCondition;
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: WeatherCondition;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
  };
  hour: Array<{
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
  }>;
}


export const fetchWeatherData = async (location: string): Promise<WeatherData | null> => {
  const apiKey = "14c84b5056284c03b3e41509242908";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data: WeatherData = await response.json();      
      return data;
  } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
  }
};



