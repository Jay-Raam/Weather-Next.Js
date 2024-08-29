import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
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

interface WeatherPageProps {
  weather: WeatherData | null;
}

const WeatherPage: React.FC<WeatherPageProps> = ({ weather }) => {
  return (
    <div>
      <Card>
        <CardTitle className="mt-4 text-center px-5">
          Weather Information
        </CardTitle>
        {weather ? (
          <CardContent className="flex justify-center items-center flex-col text-center">
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
            <h2>Location: {weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
          </CardContent>
        ) : (
          <CardContent>
            <p>No weather data available</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WeatherPage;
