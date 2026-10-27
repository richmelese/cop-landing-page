"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { assetUrl, getLeaders, type Leader, type LeaderColor } from "@/lib/api";
import watermark from "../../public/images/cop-watermark.png";

const gradients: Record<LeaderColor, { from: string; to: string }> = {
  navy: { from: "from-cop-navy", to: "to-cop-blue" },
  green: { from: "from-cop-green", to: "to-cop-mint" },
  blue: { from: "from-cop-blue", to: "to-cop-green" },
};

export default function LeadersCarousel() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getLeaders()
      .then(setLeaders)
      .catch(() => setLeaders([]));
  }, []);

  useEffect(() => {
    if (leaders.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % leaders.length);
    }, 5000);
    return () => clearInterval(id);
  }, [leaders.length]);

  if (leaders.length === 0) return null;

  const prev = () => setActive((i) => (i - 1 + leaders.length) % leaders.length);
  const next = () => setActive((i) => (i + 1) % leaders.length);
  const current = leaders[active];
  const { from, to } = gradients[current.color] ?? gradients.navy;

  return (
    <section className="relative overflow-hidden bg-cop-mist">
      <Image
        src={watermark}
        alt=""
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[640px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 py-20 lg:px-8 lg:py-28">
        <p className="text-center font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase lg:text-left">
          COP32 Leaders
        </p>

        <div className="relative mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:items-center lg:gap-16">
          <div className="relative mx-auto h-[220px] w-[220px] shrink-0 lg:mx-0">
            <div
              className={`grid h-full w-full place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br ${from} ${to} font-display text-5xl font-bold text-white shadow-xl shadow-cop-navy/20 ring-8 ring-white transition-colors duration-700`}
            >
              {current.image ? (
                <img src={assetUrl(current.image)} alt={current.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-20 w-20 text-white/90" strokeWidth={1.5} />
              )}
            </div>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white px-5 py-1.5 font-display text-[12px] font-semibold text-cop-navy shadow-md ring-1 ring-cop-blue-soft/60">
              {current.tag}
            </span>
          </div>

          <div>
            <Quote className="h-10 w-10 text-cop-mint" />
            <p className="mt-4 min-h-[4.5em] font-display text-2xl leading-snug font-medium text-cop-navy md:text-3xl">
              “{current.quote}”
            </p>
            <div className="mt-6">
              <p className="font-display text-[16px] font-semibold text-cop-navy">{current.name}</p>
              <p className="text-[14px] text-cop-ink/60">{current.role}</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous leader"
                  className="grid h-9 w-9 place-items-center rounded-full border border-cop-blue-soft/60 bg-white text-cop-navy transition hover:bg-cop-mist"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next leader"
                  className="grid h-9 w-9 place-items-center rounded-full border border-cop-blue-soft/60 bg-white text-cop-navy transition hover:bg-cop-mist"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex -space-x-2">
                {leaders.map((leader, i) => {
                  const g = gradients[leader.color] ?? gradients.navy;
                  return (
                    <button
                      key={leader.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show quote from ${leader.name}`}
                      className={`grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br ${g.from} ${g.to} text-white ring-2 transition-all ${
                        i === active ? "z-10 scale-110 ring-cop-green" : "ring-white"
                      }`}
                    >
                      {leader.image ? (
                        <img src={assetUrl(leader.image)} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-4 w-4" strokeWidth={1.5} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
