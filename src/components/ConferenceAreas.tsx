"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CircleCheck, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { assetUrl, getConferenceZones, getSiteAsset, type ZoneTone } from "@/lib/api";
import { iconMap } from "@/lib/iconMap";

export const CONFERENCE_AREAS_ILLUSTRATION_KEY = "conference-areas-illustration";

type RenderZone = {
  name: string;
  tone: ZoneTone;
  description: string;
  note: string;
  items: { icon: LucideIcon; text: string }[];
};

// Shown until the backend responds (or if it's unreachable) so the section never renders empty.
const FALLBACK_ZONES: RenderZone[] = [
  {
    name: "Blue Zone",
    tone: "navy",
    description: "The UN-managed official negotiation area, under the authority of the UNFCCC.",
    note: "The Blue Zone is where formal negotiations take place and global climate policy is shaped.",
    items: [
      { icon: iconMap.Landmark, text: "Heads of State and Ministers" },
      { icon: iconMap.Globe2, text: "National delegations" },
      { icon: iconMap.Users, text: "Accredited observers" },
      { icon: iconMap.Building2, text: "International organizations" },
    ],
  },
  {
    name: "Green Zone",
    tone: "green",
    description: "Coordinated by Ethiopia as host country, and open to the wider public.",
    note: "The Green Zone is the public heart of COP32, open to everyone building the climate movement.",
    items: [
      { icon: iconMap.Briefcase, text: "Private sector" },
      { icon: iconMap.GraduationCap, text: "Academia" },
      { icon: iconMap.Megaphone, text: "Civil society" },
      { icon: iconMap.Rocket, text: "Youth representatives and startups" },
    ],
  },
];

function ZoneMap() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      <rect x="1" y="1" width="318" height="218" rx="18" fill="none" stroke="#c3d1e2" strokeWidth="1" />
      <path d="M1 110 C 70 40, 130 40, 160 110 C 130 180, 70 180, 1 110 Z" fill="#1c75bc" fillOpacity="0.14" />
      <path d="M160 110 C 190 40, 250 40, 319 110 C 250 180, 190 180, 160 110 Z" fill="#43b97d" fillOpacity="0.16" />
      <circle cx="160" cy="110" r="3" fill="#00784c" />
      {[
        [40, 70], [55, 95], [40, 130], [60, 150],
        [250, 70], [270, 95], [255, 135], [235, 150],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="18"
          height="14"
          rx="2"
          fill="none"
          stroke={i < 4 ? "#1c75bc" : "#00784c"}
          strokeOpacity="0.5"
          strokeWidth="1.3"
        />
      ))}
      <path d="M0 110 H320" stroke="#c3d1e2" strokeDasharray="3 4" strokeWidth="1" />
    </svg>
  );
}

export default function ConferenceAreas() {
  const [open, setOpen] = useState<number | null>(null);
  const [illustration, setIllustration] = useState<string | null>(null);
  const [zones, setZones] = useState<RenderZone[]>(FALLBACK_ZONES);

  useEffect(() => {
    getSiteAsset(CONFERENCE_AREAS_ILLUSTRATION_KEY)
      .then((asset) => setIllustration(asset?.url ?? null))
      .catch(() => setIllustration(null));
  }, []);

  useEffect(() => {
    getConferenceZones()
      .then((data) => {
        if (data.length === 0) return;
        setZones(
          data.map((zone) => ({
            ...zone,
            items: zone.items.map((item) => ({ icon: iconMap[item.icon] ?? Building2, text: item.text })),
          })),
        );
      })
      .catch(() => {});
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-20 lg:px-8 lg:py-28">
      <p className="text-center font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase">
        Venues
      </p>
      <h2 className="mt-4 text-center font-display text-4xl leading-tight font-bold text-cop-navy md:text-5xl">
        COP32 Areas
      </h2>

      <Reveal variant="up" className="mt-12">
        <div className="flex min-h-[420px] gap-4">
          {zones.map((zone, i) => {
            const isOpen = open === i;
            const isLeft = i === 0;
            const tone = zone.tone === "navy" ? "bg-gradient-to-br from-cop-navy to-cop-navy-dark" : "bg-gradient-to-br from-cop-green to-cop-green-dark";
            const ArrowClosed = isLeft ? ArrowRight : ArrowLeft;
            const ArrowOpen = isLeft ? ArrowLeft : ArrowRight;

            return (
              <button
                key={zone.name}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`group relative overflow-hidden rounded-3xl text-left text-white transition-all duration-500 ease-out ${tone} ${
                  isOpen ? "flex-[5] p-8 md:p-10" : open !== null ? "flex-[0.6] p-5" : "flex-1 p-6"
                }`}
              >
                {isOpen ? (
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold md:text-3xl">{zone.name}</h3>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                        <ArrowOpen className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-white/85">{zone.description}</p>
                    <p className="mt-6 font-display text-[13px] font-bold tracking-[0.1em] text-white uppercase">
                      Within this zone
                    </p>
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                      {zone.items.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-2.5 text-[14.5px] font-medium">
                          <CircleCheck className="h-4 w-4 shrink-0 text-white" />
                          {text}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 max-w-[640px] text-[14px] leading-relaxed text-white/70 italic">{zone.note}</p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-between">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                      <ArrowClosed className="h-4 w-4" />
                    </span>
                    <span className="whitespace-nowrap font-display text-xl font-bold tracking-wide [writing-mode:vertical-rl]">
                      {zone.name}
                    </span>
                    {open === null ? (
                      <p className="max-w-[90px] text-center text-[12px] leading-snug text-white/75 [writing-mode:vertical-rl]">
                        {zone.description}
                      </p>
                    ) : (
                      <span className="h-4" />
                    )}
                  </div>
                )}
              </button>
            );
          })}

          <div
            className={`hidden items-center justify-center overflow-hidden rounded-3xl transition-all duration-500 ease-out md:flex ${
              illustration ? "" : "border border-cop-blue-soft/50 bg-cop-mist"
            } ${open !== null ? "flex-[0] p-0 opacity-0" : illustration ? "flex-[3] opacity-100" : "flex-[3] p-6 opacity-100"}`}
          >
            {illustration ? (
              <img src={assetUrl(illustration)} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full max-w-[420px]">
                <ZoneMap />
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
