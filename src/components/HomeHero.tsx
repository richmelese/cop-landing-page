"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import addisNight from "../../public/images/addis-night.jpg";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";
import qrCode from "../../public/images/superapp-qr.png";
import AdeyAbebaStrip from "./AdeyAbebaStrip";

const slides = [
  {
    src: addisSunset,
    alt: "Addis Ababa at sunset",
    headline: ["From the Cradle of Humankind", "to a Net-Zero Future"],
  },
  {
    src: addisNight,
    alt: "Addis Ababa skyline at night",
    headline: ["Where Diplomacy Meets", "Delivery"],
  },
  {
    src: addisView,
    alt: "View of Addis Ababa",
    headline: ["Africa's Moment for", "Climate Action"],
  },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative">
      <div className="relative h-[560px] w-full overflow-hidden bg-cop-navy-dark md:h-[640px]">
        {slides.map((slide, i) => (
          <Image
            key={slide.alt}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            placeholder="blur"
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              i === active ? "animate-ken-burns opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-cop-navy-dark/80 via-cop-navy-dark/30 to-cop-navy-dark/40" />

        <div className="relative mx-auto flex h-full max-w-[720px] flex-col items-center justify-center px-6 text-center">
          {slides.map((slide, i) => (
            <h1
              key={slide.alt}
              aria-hidden={i !== active}
              className={`font-display text-4xl leading-[1.1] font-bold text-white transition-all duration-700 ease-out md:text-6xl ${
                i === active ? "relative opacity-100" : "pointer-events-none absolute inset-x-0 opacity-0"
              }`}
            >
              {slide.headline[0]}
              <br />
              <span className="bg-gradient-to-r from-cop-mint via-white to-cop-mint bg-clip-text text-transparent">
                {slide.headline[1]}
              </span>
            </h1>
          ))}

          <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-white/80 md:text-[16px]">
            COP32, the 32nd UN Climate Change Conference, hosted by Ethiopia in Addis Ababa — 2027.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-2xl bg-cop-green py-2.5 pr-6 pl-2.5 shadow-[0_15px_40px_-10px_rgba(67,185,125,0.8)] transition-all duration-300 hover:-translate-y-1"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-white p-1.5">
                <Image src={qrCode} alt="Scan to register for COP32" className="h-full w-full object-contain" />
              </span>
              <span className="text-left leading-tight">
                <span className="block font-display text-[19px] font-bold text-white">Scan to Register</span>
                <span className="block text-[14px] text-white/85">& use every COP32 service</span>
              </span>
            </a>
            <Link
              href="/accommodation"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-display text-[15px] font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
            >
              Plan Your Stay
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.alt}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-2 rounded-full border border-white/50 transition-all ${
                i === active ? "w-6 bg-cop-mint" : "w-2 bg-transparent hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <AdeyAbebaStrip />
    </section>
  );
}
