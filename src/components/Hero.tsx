"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=2000&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2000&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000&q=80",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=2000&q=80",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="relative h-[520px] overflow-hidden bg-navy-dark md:h-[560px]">
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-transform duration-[7000ms] ease-out ${
              i === active ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/70 via-navy/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/50 via-transparent to-navy-dark/30" />

      <div className="relative mx-auto flex h-full max-w-[1200px] items-center px-6 lg:px-[100px]">
        <div key={active} className="max-w-[420px] animate-fade-up">
          <h1 className="font-serif text-5xl leading-tight text-white md:text-[56px]">
            Hello.Salut.Hola
          </h1>
          <p className="mt-5 text-[13px] leading-7 text-white/90 md:pl-8">
            Our Hotels &amp; Resorts remain stylish, modern, forward thinking global leader of
            hospitality and we help make traveling easier with our smart design, innovative
            restaurant concepts, unique activities, nature and authentic hospitality.
          </p>
          <a
            href="https://catering.cop32ethiopia.et/hotels"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border border-white/80 px-8 py-3 text-[10px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-300 hover:border-white hover:bg-white hover:text-navy hover:shadow-xl md:ml-8"
          >
            Book Accommodation
          </a>
        </div>

        <div className="absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col gap-4 lg:right-[100px] lg:flex">
          {slides.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`relative h-[54px] w-[86px] cursor-pointer overflow-hidden transition-all duration-300 ${
                i === active ? "scale-105 ring-2 ring-white" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src.replace("w=2000", "w=200")}
                alt=""
                fill
                sizes="86px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-6 flex gap-3 md:bottom-12 lg:left-[90px]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
              i === active ? "scale-125 bg-transparent ring-2 ring-white" : "bg-white/90 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
