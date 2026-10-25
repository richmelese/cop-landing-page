"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Factory,
  GraduationCap,
  HeartPulse,
  Recycle,
  Scale,
  Sprout,
  UtensilsCrossed,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import addisNight from "../../public/images/addis-night.jpg";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";

const images = [addisSunset, addisNight, addisView];

const themes = [
  { icon: Zap, title: "Clean Energy Transition", body: "Affordable, reliable renewable energy for all." },
  { icon: Recycle, title: "Zero Waste & Circular Economy", body: "Scalable, city-level circular economy solutions." },
  { icon: Wind, title: "Climate-Resilient Cities", body: "Liveable, resilient urban places for everyone." },
  { icon: Factory, title: "Green Industrialisation", body: "Low-carbon industry and a just transition." },
  { icon: UtensilsCrossed, title: "Food Security", body: "Sustainable, resilient food systems for Africa and beyond." },
  { icon: Sprout, title: "Forests & Green Legacy", body: "Reforestation and land restoration at national scale." },
  { icon: GraduationCap, title: "Youth & Education", body: "Young people as builders of climate solutions." },
  { icon: Scale, title: "Climate Implementation Bridge", body: "Moving from commitments to delivery and finance." },
  { icon: Waves, title: "Rio Conventions Synergy", body: "Aligning climate, biodiversity, and desertification goals." },
  { icon: HeartPulse, title: "Resilient Health Systems", body: "Climate-resilient, low-carbon health care." },
];

const VISIBLE = 3; // cards shown on each side of center

function wrap(i: number, length: number) {
  return ((i % length) + length) % length;
}

export default function ActionAgenda() {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const dragState = useRef<{ startX: number; dragging: boolean; moved: boolean } | null>(null);
  const n = themes.length;

  const slots = [];
  for (let offset = -VISIBLE; offset <= VISIBLE; offset++) {
    slots.push({ offset, index: wrap(active + offset, n) });
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, dragging: true, moved: false };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current?.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    setDragX(delta);
  };

  const endDrag = () => {
    if (!dragState.current) return;
    const threshold = 60;
    if (dragX > threshold) setActive((i) => wrap(i - 1, n));
    else if (dragX < -threshold) setActive((i) => wrap(i + 1, n));
    dragState.current = null;
    setDragX(0);
  };

  return (
    <section className="bg-cop-mist py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase">
              COP32 Action Agenda
            </p>
            <h2 className="mt-4 max-w-[640px] font-display text-4xl leading-tight font-bold text-cop-navy md:text-5xl">
              Global Implementation Targets
            </h2>
          </div>
          <Link
            href="/vision/action-agenda"
            className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-cop-green transition hover:gap-3"
          >
            View the full agenda <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="relative mt-10 h-[370px] touch-pan-y overflow-hidden select-none md:h-[390px]"
          style={{ perspective: "1600px", cursor: dragState.current?.dragging ? "grabbing" : "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {slots.map(({ offset, index }) => {
            const { icon: Icon, title, body } = themes[index];
            const abs = Math.abs(offset);
            const dragInfluence = dragX / 190;
            const scale = 1 - abs * 0.14;
            const translateX = offset * 190 + dragX * 0.4;
            const rotateY = (offset - dragInfluence * 0.3) * -18;
            const opacity = abs > VISIBLE ? 0 : 1 - abs * 0.22;
            const z = VISIBLE - abs;

            return (
              <Link
                key={`${index}-${offset}`}
                href="/vision/action-agenda"
                draggable={false}
                onClick={(e) => {
                  if (offset !== 0 || dragState.current?.moved) {
                    e.preventDefault();
                    if (offset !== 0) setActive(index);
                  }
                }}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex: z,
                  transition: dragState.current?.dragging ? "none" : undefined,
                }}
                className="group absolute top-1/2 left-1/2 flex aspect-[3/4] w-[260px] flex-col justify-end overflow-hidden rounded-3xl shadow-2xl shadow-cop-navy-dark/30 ring-4 ring-white transition-all duration-500 ease-out"
              >
                <Image
                  src={images[index % images.length]}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cop-navy-dark via-cop-navy-dark/55 to-cop-navy-dark/10" />

                <span className="absolute top-5 left-5 grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <Icon className="h-5 w-5" />
                </span>

                <div className="relative p-6">
                  <h3 className="font-display text-[17px] font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-[13.5px] leading-snug text-white/75">{body}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setActive((i) => wrap(i - 1, n))}
            aria-label="Previous theme"
            className="grid h-11 w-11 place-items-center rounded-full border border-cop-blue-soft/60 bg-white text-cop-navy shadow-sm transition hover:bg-cop-mist"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActive((i) => wrap(i + 1, n))}
            aria-label="Next theme"
            className="grid h-11 w-11 place-items-center rounded-full border border-cop-blue-soft/60 bg-white text-cop-navy shadow-sm transition hover:bg-cop-mist"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
