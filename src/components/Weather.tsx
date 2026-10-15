"use client";

import { CloudSun, Droplets, MapPin, Wind } from "lucide-react";
import { useEffect, useState } from "react";

type Current = { temperature: number; humidity: number; wind: number };

const API =
  "https://api.open-meteo.com/v1/forecast?latitude=9.03&longitude=38.74&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Africa%2FAddis_Ababa";

export default function Weather() {
  const [now, setNow] = useState<Current | null>(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) =>
        setNow({
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          wind: Math.round(data.current.wind_speed_10m),
        }),
      )
      .catch(() => setNow(null));
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cop-blue to-cop-navy p-7 text-white shadow-xl shadow-cop-navy/25">
      <CloudSun className="absolute -top-4 -right-4 h-36 w-36 text-white/10" />
      <p className="flex items-center gap-2 font-display text-[14px] font-medium text-white/80">
        <MapPin className="h-4 w-4 text-cop-mint" /> Addis Ababa, Ethiopia
      </p>
      <p className="mt-4 font-display text-6xl font-bold">
        {now ? `${now.temperature}°` : "——"}
        <span className="ml-1 align-top text-2xl font-medium text-white/70">C</span>
      </p>
      <div className="mt-5 flex gap-6 text-[14px] text-white/85">
        <span className="flex items-center gap-1.5">
          <Droplets className="h-4 w-4 text-cop-mint" /> {now ? `${now.humidity}%` : "——"}
        </span>
        <span className="flex items-center gap-1.5">
          <Wind className="h-4 w-4 text-cop-mint" /> {now ? `${now.wind} km/h` : "——"}
        </span>
      </div>
      <a
        href="https://open-meteo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 block text-[12px] text-white/60 transition hover:text-white"
      >
        Weather data by Open-Meteo
      </a>
    </div>
  );
}
