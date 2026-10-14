import Image from "next/image";
import { ArrowUpRight, BedDouble, CalendarDays, Mail, Phone, ShieldCheck, Tag } from "lucide-react";
import Logo from "./Logo";

const BOOKING_URL = "https://catering.cop32ethiopia.et/hotels";

// TODO: replace with the real event details and booking contacts.
const EVENT_DETAILS = "Addis Ababa · 2027";
const PHONE = "+251 000 000 000";
const EMAIL = "booking@cop32ethiopia.et";

const features = [
  { icon: ShieldCheck, label: "Verified Hotels" },
  { icon: BedDouble, label: "One Platform" },
  { icon: Tag, label: "Preferential Rates" },
];

export default function BookAccommodation() {
  return (
    <section id="amenities" className="w-full py-10">
      <div className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#13294b]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#13294b]/40 via-transparent to-[#0d1f3c]/70" />

        <div className="relative mx-auto flex max-w-[960px] flex-col items-center px-6 py-20 text-center font-[family-name:var(--font-outfit)] text-white sm:py-28">
          <p className="flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.18em] text-emerald-400 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Official Accommodation Partner
          </p>

          <h2 className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-[60px]">
            Book Your Stay Through the Official COP32 Platform
          </h2>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-2 text-[14px] font-medium backdrop-blur-sm">
            <CalendarDays className="h-3.5 w-3.5" />
            {EVENT_DETAILS}
          </span>

          <p className="mt-6 max-w-[680px] text-[17px] leading-relaxed text-white/85">
            All accommodation and reservation services for COP32 delegates and attendees are
            managed through our official booking platform.
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {features.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-950/30 px-5 py-2.5 text-[14px] font-semibold backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                <Icon className="h-4 w-4 text-emerald-400" />
                {label}
              </li>
            ))}
          </ul>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-emerald-600 px-9 py-4 text-[17px] font-bold shadow-[0_15px_35px_-10px_rgba(16,185,129,0.7)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.9)]"
          >
            Book Accommodation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-[14px] text-white/70 transition hover:text-emerald-400"
          >
            catering.cop32ethiopia.et/hotels
          </a>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[14px] font-medium">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 transition hover:text-emerald-400">
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition hover:text-emerald-400">
              <Mail className="h-3.5 w-3.5 text-emerald-400" />
              {EMAIL}
            </a>
          </div>

          <div className="mt-10 h-px w-full max-w-[520px] bg-white/15" />

          <div className="mt-8 flex items-center gap-5">
            <div className="flex items-center gap-2 text-left">
              <Logo className="h-9 w-9 text-lg" />
              <span className="leading-none">
                <span className="block text-[18px] font-light">COP32</span>
                <span className="block text-[10px] font-bold tracking-[0.15em]">ETHIOPIA</span>
              </span>
            </div>
            <span className="h-9 w-px bg-white/30" />
            <span className="text-[22px]">
              <span className="font-bold">COP</span> <span className="font-light">Hotels</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
