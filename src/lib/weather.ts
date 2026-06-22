export interface WeatherData {
  avgTemp: number;
  totalPrecipitation: number;
  rainyDays: number;
  currentPrecip: number;
  locationName: string;
  dailyPrecip: number[];
  dailyTemp: number[];
  dayNames: string[];
}

export async function fetchWeather(
  lat: number,
  lon: number,
  locationName: string
): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_mean,precipitation_sum,precipitation_probability_max&current=precipitation&timezone=Europe%2FWarsaw&forecast_days=7`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();

    const temps: number[] = data.daily?.temperature_2m_mean ?? [];
    const precip: number[] = data.daily?.precipitation_sum ?? [];
    const dates: string[] = data.daily?.time ?? [];

    const dayNames = dates.map((d) => {
      const date = new Date(d);
      return date.toLocaleDateString("pl-PL", { weekday: "short", day: "numeric", month: "short" });
    });

    const avgTemp =
      temps.length > 0
        ? Math.round(temps.reduce((a, b) => a + b, 0) / temps.length)
        : 15;
    const totalPrecipitation = Math.round(
      precip.reduce((a, b) => a + b, 0) * 10
    ) / 10;
    const rainyDays = precip.filter((p) => p > 1).length;

    return {
      avgTemp,
      totalPrecipitation,
      rainyDays,
      currentPrecip: data.current?.precipitation ?? 0,
      locationName,
      dailyPrecip: precip,
      dailyTemp: temps,
      dayNames,
    };
  } catch {
    return null;
  }
}

export async function fetchAnnualPrecipitation(
  lat: number,
  lon: number
): Promise<number> {
  try {
    const res = await fetch(
      `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=2020-01-01&end_date=2020-12-31&daily=precipitation_sum&models=EC_Earth3P_HR`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return 600;
    const data = await res.json();
    const daily: number[] = data.daily?.precipitation_sum ?? [];
    if (daily.length === 0) return 600;
    return Math.round(daily.reduce((a, b) => a + b, 0));
  } catch {
    return 600;
  }
}
