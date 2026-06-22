import { NextRequest, NextResponse } from "next/server";
import { geocodeCity } from "@/lib/geo";
import { fetchWeather, fetchAnnualPrecipitation } from "@/lib/weather";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");
  const annual = request.nextUrl.searchParams.get("annual");

  if (!city) {
    return NextResponse.json({ error: "Brak miasta" }, { status: 400 });
  }

  const geo = await geocodeCity(city);
  if (!geo) {
    return NextResponse.json(
      { error: "Nie znaleziono lokalizacji" },
      { status: 404 }
    );
  }

  if (annual === "true") {
    const annualPrecipitation = await fetchAnnualPrecipitation(
      geo.lat,
      geo.lon
    );
    return NextResponse.json({
      locationName: geo.name,
      lat: geo.lat,
      lon: geo.lon,
      annualPrecipitation,
    });
  }

  const weather = await fetchWeather(geo.lat, geo.lon, geo.name);
  if (!weather) {
    return NextResponse.json(
      { error: "Nie udało się pobrać pogody" },
      { status: 502 }
    );
  }

  return NextResponse.json(weather);
}
