"use client";

import { useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface WeatherCondition {
  text: string;
  icon: string;
}

interface WeatherDay {
  avgtemp_c: number;
  avgtemp_f: number;
  avghumidity: number;
  avgvis_km: number;
  avgvis_miles: number;
  condition: WeatherCondition;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  totalprecip_mm: number;
  totalsnow_cm: number;
  uv: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
}

interface WeatherForecastDay {
  date: string;
  day: WeatherDay;
  hour: Array<{
    time: string;
    temp_c: number;
    temp_f: number;
    condition: WeatherCondition;
    is_day: number;
  }>;
}

interface WeatherLocation {
  name: string;
  region: string;
  localtime: string;
  lat: number;
  lon: number;
  tz_id: string;
}

interface WeatherResponse {
  location: WeatherLocation;
  forecast: {
    forecastday: WeatherForecastDay[];
  };
}

export default function HistoryData() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data based on the location
  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = "14c84b5056284c03b3e41509242908";
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherResponse = await response.json();
      setWeather(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchWeather(location);
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center items-center gap-4 mb-6"
      >
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="p-2 rounded-sm w-[300px] md:w-[500px]"
          autoFocus={true}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-[200px] rounded-full"
        >
          {loading ? "Loading..." : "Get Weather"}
        </Button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {weather && !loading && (
        <div className="weather-forecast">
          <div className="title flex justify-center items-center gap-4 flex-wrap mb-6">
            <h2 className="text-xl font-semibold">{weather.location.name}</h2>
            {weather.location.region && <h3>{weather.location.region}</h3>}
            {weather.location.localtime && (
              <h3>{weather.location.localtime}</h3>
            )}
            {weather.location.lat && <h3>{weather.location.lat}</h3>}
            {weather.location.lon && <h3>{weather.location.lon}</h3>}
            {weather.location.tz_id && <h3>{weather.location.tz_id}</h3>}
          </div>
          <div className="flex justify-evenly items-center max-w-[1550px] mx-auto my-0 flex-col lg:flex-row">
            <div className="daily-summary flex flex-col items-center gap-4 mb-6 w-full">
              <h3 className="text-center text-2xl font-bold mb-4">
                Daily Summary
              </h3>
              {weather.forecast.forecastday[0].day.condition.icon && (
                <Image
                  width={64}
                  height={64}
                  quality={100}
                  src={`http:${weather.forecast.forecastday[0].day.condition.icon}`}
                  alt={weather.forecast.forecastday[0].day.condition.text}
                  className="w-16 h-16"
                />
              )}
              {weather.forecast.forecastday[0].day.avgtemp_c && (
                <p>
                  Temperature: {weather.forecast.forecastday[0].day.avgtemp_c}
                  °C
                </p>
              )}
              {weather.forecast.forecastday[0].day.condition.text && (
                <p>
                  Condition:
                  {weather.forecast.forecastday[0].day.condition.text}
                </p>
              )}
              {weather.forecast.forecastday[0].day.maxtemp_c && (
                <p>
                  Max Temperature:
                  {weather.forecast.forecastday[0].day.maxtemp_c}
                  °C
                </p>
              )}
              {weather.forecast.forecastday[0].day.mintemp_c && (
                <p>
                  Min Temperature:
                  {weather.forecast.forecastday[0].day.mintemp_c}
                  °C
                </p>
              )}
              {weather.forecast.forecastday[0].day.maxwind_kph && (
                <p>
                  Max Wind Speed:
                  {weather.forecast.forecastday[0].day.maxwind_kph} kph
                </p>
              )}
              {weather.forecast.forecastday[0].day.avghumidity && (
                <p>
                  Humidity: {weather.forecast.forecastday[0].day.avghumidity}%
                </p>
              )}
              {weather.forecast.forecastday[0].day.uv && (
                <p>UV Index: {weather.forecast.forecastday[0].day.uv}</p>
              )}
              {weather.forecast.forecastday[0].day.daily_chance_of_rain && (
                <p>
                  Chance of Rain:
                  {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
                </p>
              )}
              {/* {weather.forecast.forecastday[0].day.daily_chance_of_snow && (
                <p>
                  Chance of Snow:
                  {weather.forecast.forecastday[0].day.daily_chance_of_snow}%
                </p>
              )} */}
              {weather.forecast.forecastday[0].day.totalprecip_mm && (
                <p>
                  Total Precipitation:
                  {weather.forecast.forecastday[0].day.totalprecip_mm} mm
                </p>
              )}
            </div>
            <div className="hour-data w-full">
              <h3 className="text-center text-2xl font-bold mb-4">
                Hourly Forecast
              </h3>
              <Carousel className="w-[280px] md:w-[450px] max-w-[1550px] mx-auto cursor-pointer">
                <CarouselContent>
                  {weather.forecast.forecastday[0].hour.map((hour, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div className="text-center flex gap-3 flex-col items-center justify-center">
                              <Image
                                src={`http:${hour.condition.icon}`}
                                alt={hour.condition.text}
                                width={64}
                                height={64}
                                quality={100}
                                className="mb-2 w-16 h-16"
                              />
                              <p>Time: {hour.time}</p>
                              <p>
                                Temperature: {hour.temp_c} °C / {hour.temp_f} °F
                              </p>
                              <p>Condition: {hour.condition.text}</p>
                              <p>Daytime: {hour.is_day === 1 ? "Yes" : "No"}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
