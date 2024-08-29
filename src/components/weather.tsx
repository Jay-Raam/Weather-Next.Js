"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Darkmode from "@/components/ui/darkmode";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp_max: number;
    temp_min: number;
  };

  weather: { description: string; icon: string }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export default function Weather(): JSX.Element {
  const [city, setCity] = useState<string>(""); // Default empty string
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDefaultWeatherData = async () => {
      try {
        setLoading(true);
        const defaultCity = "London";
        const apiKey = "96c44501fb5bcea738c9382742220173";
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching weather data. Please try again.");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultWeatherData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const apiKey = "96c44501fb5bcea738c9382742220173";
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather max-w-[1200px] mx-auto my-0">
      <div className="flex justify-between max-w-[1000px] items-center mx-auto my-0">
        <h1 className="font-bold text-center mb-12 mt-12 text-lg">
          Weather App
        </h1>
        <Darkmode />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-[800px] justify-center items-center mx-auto my-0 gap-6 flex-wrap mb-12"
      >
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          className="w-[320px]"
          onChange={handleChange}
        />
        <Button type="submit">Get Weather</Button>
      </form>

      {loading && (
        <div role="status" className="mx-auto my-0">
          <svg
            aria-hidden="true"
            className="mx-auto my-0 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {error && (
        <Alert>
          <AlertTitle>No place where to find...</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weatherData && !loading && (
        <div className="card max-w-[455px] mx-auto my-0">
          <Card>
            <div className="flex justify-center items-center gap-4 mt-12">
              <CardTitle>{weatherData.name}</CardTitle>
              <Avatar>
                <AvatarFallback>{weatherData.sys.country}</AvatarFallback>
              </Avatar>
            </div>
            <CardContent>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="weather icon"
                className="mx-auto my-0 w-24 mt-5 mb-5"
              />
              <div className="flex flex-wrap gap-4 justify-center items-center mt-3">
                {weatherData &&
                  weatherData.weather &&
                  weatherData.weather[0] && (
                    <p>Description: {weatherData.weather[0].description}</p>
                  )}
                {weatherData && weatherData.main && (
                  <p>Feels Like: {weatherData.main.feels_like}°C</p>
                )}
                {weatherData && weatherData.main && (
                  <p>Ground Level: {weatherData.main.grnd_level}</p>
                )}
                {weatherData && weatherData.main && (
                  <p>Humidity: {weatherData.main.humidity}</p>
                )}
                {weatherData && weatherData.main && (
                  <p>Pressure: {weatherData.main.pressure}</p>
                )}
                {weatherData && weatherData.main && (
                  <p>Sea Level: {weatherData.main.sea_level}</p>
                )}
                {weatherData && weatherData.main && (
                  <p>Max Temperature: {weatherData.main.temp_max}°C</p>
                )}
                {weatherData && weatherData.main && (
                  <p>Min Temperature: {weatherData.main.temp_min}°C</p>
                )}
                {weatherData && weatherData.wind && (
                  <p>Wind Degree: {weatherData.wind.deg}</p>
                )}
                {weatherData && weatherData.wind && (
                  <p>Wind Gust: {weatherData.wind.gust}</p>
                )}
                {weatherData && weatherData.wind && (
                  <p>Wind Speed: {weatherData.wind.speed}</p>
                )}
                {weatherData && weatherData.sys && (
                  <div className="flex gap-4 justify-center items-center">
                    <p>
                      Sunrise:
                      {new Date(
                        weatherData.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                    <p>
                      Sunset:
                      {new Date(
                        weatherData.sys.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
