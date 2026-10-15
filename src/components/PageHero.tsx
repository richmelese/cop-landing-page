import Image from "next/image";
import { ArrowUpRight, CalendarDays, ChevronRight, House, MapPin, ShieldCheck } from "lucide-react";
import addisNight from "../../public/images/addis-night.jpg";

const BOOKING_URL = "https://catering.cop32ethiopia.et/hotels";

const chips = [
  { icon: MapPin, label: "Host City", value: "Addis Ababa" },
  { icon: CalendarDays, label: "Conference", value: "COP32 · 2027" },
  { icon: ShieldCheck, label: "Hotels", value: "Verified & official" },
];

export default function PageHero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-cop-navy-dark pt-20 md:min-h-[760px] lg:min-h-[88vh]">
      <Image
        src={addisNight}
        alt="Addis Ababa skyline at night"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="animate-ken-burns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cop-navy-dark via-cop-navy-dark/40 to-cop-navy-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-cop-navy-dark/85 via-cop-navy-dark/30 to-transparent" />
      <div className="absolute top-1/4 -left-40 h-[420px] w-[420px] rounded-full bg-cop-mint/25 blur-[120px]" />
      <div className="absolute -right-20 bottom-10 h-[360px] w-[360px] rounded-full bg-cop-blue/30 blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-16 lg:px-8 lg:pb-24">
        <nav aria-label="Breadcrumb" className="animate-fade-up">
          <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px] text-white/80 backdrop-blur-md">
            <li>
              <a href="#" className="flex items-center gap-1.5 transition hover:text-white">
                <House className="h-3.5 w-3.5" /> Home
              </a>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <a href="#" className="transition hover:text-white">
                Visitor Information
              </a>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li aria-current="page" className="font-semibold text-cop-mint">
              Accommodation
            </li>
          </ol>
        </nav>

        <h1 className="mt-6 animate-fade-up font-display text-6xl leading-[0.95] font-bold tracking-tight text-white [animation-delay:150ms] md:text-8xl lg:text-[120px]">
          Accommodation
        </h1>
        <p className="mt-6 max-w-[560px] animate-fade-up text-[18px] leading-relaxed text-white/85 [animation-delay:300ms] md:text-[20px]">
          Find your stay in{" "}
          <span className="animate-shimmer bg-gradient-to-r from-cop-mint via-white to-cop-mint bg-[length:200%_auto] bg-clip-text font-semibold text-transparent">
            Addis Ababa
          </span>{" "}
          — official hotels for delegates and attendees of COP32.
        </p>

        <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-4 [animation-delay:450ms]">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cop-green px-8 py-4 font-display text-[17px] font-bold text-white shadow-[0_15px_40px_-10px_rgba(67,185,125,0.8)] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Book Accommodation
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#info"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-display text-[16px] font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
          >
            Explore options
          </a>
        </div>

        <div className="mt-12 hidden animate-fade-up gap-4 [animation-delay:600ms] md:flex">
          {chips.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              style={{ animationDelay: `${i * 0.8}s` }}
              className="flex animate-float items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 backdrop-blur-xl"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cop-mint to-cop-blue text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[12px] tracking-wide text-white/60 uppercase">{label}</span>
                <span className="block font-display text-[16px] font-semibold text-white">{value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#info"
        aria-label="Scroll down"
        className="absolute right-8 bottom-10 hidden h-12 w-7 justify-center rounded-full border-2 border-white/40 pt-2 lg:flex"
      >
        <span className="h-2 w-1 animate-scroll-dot rounded-full bg-white" />
      </a>
    </section>
  );
}
