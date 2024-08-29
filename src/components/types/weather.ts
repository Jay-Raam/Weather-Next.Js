// src/types/weather.d.ts
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

export interface WeatherDataTypes {
    location: WeatherLocation;
    current: WeatherCurrent;
    forecast: {
        forecastday: WeatherDay[];
    };
}
