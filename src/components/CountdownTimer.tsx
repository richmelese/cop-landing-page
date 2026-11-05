"use client";

import { useEffect, useState } from "react";

// Official UNFCCC dates for COP32 have not been confirmed yet (site-wide this is
// noted as "November 2027 (to be confirmed)" — see detailPages.ts). This target is
// a placeholder for that window; update it once the Presidency confirms exact dates.
const TARGET_DATE = new Date("2027-11-01T00:00:00Z");

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; isPast: boolean };

function getTimeLeft(): TimeLeft {
  const rawDiff = TARGET_DATE.getTime() - Date.now();
  const seconds = Math.floor(Math.max(0, rawDiff) / 1000);
  return {
    isPast: rawDiff <= 0,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <span className="font-display text-[20px] leading-none font-bold tabular-nums text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)] md:text-[22px]">
        {String(value).padStart(2, "0")}
      </span>
      <p className="mt-1 text-[9.5px] font-semibold tracking-[0.1em] text-white/55 uppercase">{label}</p>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only; avoids an SSR/client clock hydration mismatch
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const { isPast } = timeLeft;

  return (
    <div className="px-7 py-4">
      <p className="text-center text-[10.5px] font-semibold tracking-[0.25em] text-white/65 uppercase">
        {isPast ? "COP32 Is Underway" : "Countdown to Opening"}
      </p>

      {!isPast && (
        <>
          <p className="mt-1.5 text-center font-display text-[42px] leading-none font-bold tabular-nums text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] md:text-[48px]">
            {String(timeLeft.days).padStart(2, "0")}
            <span className="ml-2 align-middle text-[13px] font-semibold tracking-[0.1em] text-white/60 uppercase">
              Days
            </span>
          </p>

          <div className="mt-3 flex items-start justify-center gap-5 border-t border-white/15 pt-3">
            <Unit value={timeLeft.hours} label="Hrs" />
            <Unit value={timeLeft.minutes} label="Min" />
            <Unit value={timeLeft.seconds} label="Sec" />
          </div>
        </>
      )}
    </div>
  );
}
