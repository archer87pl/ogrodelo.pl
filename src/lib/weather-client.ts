import { geocodeCity } from "@/lib/geo";
import { fetchAnnualPrecipitation, fetchWeather } from "@/lib/weather";
import type { WeatherData } from "@/lib/weather";

export interface AnnualPrecipitationResult {
  locationName: string;
  lat: number;
  lon: number;
  annualPrecipitation: number;
}

export async function fetchWeatherForCity(city: string): Promise<WeatherData | null> {
  const geo = await geocodeCity(city);
  if (!geo) return null;
  return fetchWeather(geo.lat, geo.lon, geo.name);
}

export async function fetchAnnualPrecipForCity(
  city: string
): Promise<AnnualPrecipitationResult | null> {
  const geo = await geocodeCity(city);
  if (!geo) return null;

  const annualPrecipitation = await fetchAnnualPrecipitation(geo.lat, geo.lon);
  return {
    locationName: geo.name,
    lat: geo.lat,
    lon: geo.lon,
    annualPrecipitation,
  };
}
