export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
}

export async function geocodeCity(city: string): Promise<GeoLocation | null> {
  const query = encodeURIComponent(city.trim());
  if (!query) return null;

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=pl&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const result = data.results?.[0];
    if (!result) return null;
    return {
      name: result.name,
      lat: result.latitude,
      lon: result.longitude,
    };
  } catch {
    return null;
  }
}
