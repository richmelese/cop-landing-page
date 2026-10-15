"use client";

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  MapPin,
  Moon,
  RefreshCw,
  Sun,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const REFRESH_MS = 5 * 60 * 1000;
const TIME_ZONE = "Africa/Addis_Ababa";
const API =
  "https://api.open-meteo.com/v1/forecast?latitude=9.03&longitude=38.74" +
  "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day" +
  "&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=Africa%2FAddis_Ababa";

type Current = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  code: number;
  isDay: boolean;
  high: number;
  low: number;
};

// WMO weather codes used by Open-Meteo.
function describe(code: number, isDay: boolean): { label: string; icon: LucideIcon } {
  if (code === 0) return { label: "Clear sky", icon: isDay ? Sun : Moon };
  if (code <= 2) return { label: "Partly cloudy", icon: isDay ? CloudSun : CloudMoon };
  if (code === 3) return { label: "Overcast", icon: Cloud };
  if (code <= 48) return { label: "Foggy", icon: CloudFog };
  if (code <= 57) return { label: "Drizzle", icon: CloudDrizzle };
  if (code <= 67 || (code >= 80 && code <= 82)) return { label: "Rain", icon: CloudRain };
  if (code <= 77 || code === 85 || code === 86) return { label: "Snow", icon: CloudSnow };
  return { label: "Thunderstorm", icon: CloudLightning };
}

function formatTime(date: Date, withSeconds = false) {
  return date.toLocaleTimeString("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds && { second: "2-digit" }),
  });
}

export default function Weather() {
  const [weather, setWeather] = useState<Current | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetch(API, { cache: "no-store" }).then((res) => res.json());
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        wind: Math.round(data.current.wind_speed_10m),
        code: data.current.weather_code,
        isDay: data.current.is_day === 1,
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
      });
      setUpdatedAt(new Date());
    } catch {
      // Keep showing the last reading if a refresh fails.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const refresh = setInterval(load, REFRESH_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(refresh);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const condition = weather ? describe(weather.code, weather.isDay) : null;
  const ConditionIcon = condition?.icon ?? CloudSun;
  const dash = "——";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-7 text-white shadow-xl shadow-cop-navy/25 transition-colors duration-700 ${
        weather && !weather.isDay
          ? "bg-gradient-to-br from-cop-navy-light to-cop-navy-dark"
          : "bg-gradient-to-br from-cop-blue to-cop-navy"
      }`}
    >
      <ConditionIcon className="absolute -top-5 -right-5 h-40 w-40 text-white/10" />

      <div className="relative flex items-center justify-between">
        <p className="flex items-center gap-2 font-display text-[14px] font-medium text-white/85">
          <MapPin className="h-4 w-4 text-cop-mint" /> Addis Ababa
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cop-mint opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cop-mint" />
          </span>
          Live
        </span>
      </div>

      <p className="relative mt-1 font-display text-[13px] text-white/60 tabular-nums">
        Local time {now ? formatTime(now, true) : dash}
      </p>

      <div className="relative mt-4 flex items-end justify-between gap-3">
        <p className="font-display text-6xl leading-none font-bold tabular-nums">
          {weather ? weather.temperature : dash}
          <span className="ml-1 align-top text-2xl font-medium text-white/70">°C</span>
        </p>
        <div className="text-right">
          <ConditionIcon className="ml-auto h-9 w-9 text-cop-mint" />
          <p className="mt-1 font-display text-[14px] font-semibold">{condition?.label ?? dash}</p>
        </div>
      </div>

      <p className="relative mt-3 text-[13px] text-white/70">
        {weather ? `H ${weather.high}° · L ${weather.low}°` : dash}
      </p>

      <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-white/15 pt-5 text-[13px]">
        {[
          { icon: Thermometer, label: "Feels", value: weather ? `${weather.feelsLike}°` : dash },
          { icon: Droplets, label: "Humidity", value: weather ? `${weather.humidity}%` : dash },
          { icon: Wind, label: "Wind", value: weather ? `${weather.wind} km/h` : dash },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <Icon className="h-4 w-4 text-cop-mint" />
            <p className="mt-1.5 text-white/60">{label}</p>
            <p className="font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between text-[12px] text-white/55">
        <span>{updatedAt ? `Updated ${formatTime(updatedAt)}` : "Loading…"}</span>
        <button
          onClick={load}
          disabled={loading}
          aria-label="Refresh weather"
          className="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white disabled:cursor-wait"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
      <a
        href="https://open-meteo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-1 block text-[11px] text-white/40 transition hover:text-white"
      >
        Weather data by Open-Meteo
      </a>
    </div>
  );
}
