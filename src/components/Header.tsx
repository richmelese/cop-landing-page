import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

const links = ["Rooms & Suites", "News", "Pages", "Blocks", "USD"];

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TripAdvisor() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="13" r="3.5" />
      <circle cx="17" cy="13" r="3.5" />
      <path d="M3 8.5c5-3 13-3 18 0" />
    </svg>
  );
}

function Foursquare() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M6 2h12l-2 9h-5l-1 4-4 7V2Zm3 3v4h6l.8-4H9Z" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="group flex items-center gap-3 text-white">
          <Logo className="h-9 w-9 text-lg transition-transform duration-700 group-hover:rotate-[360deg]" />
          <span className="font-serif text-[15px] tracking-wide">COP</span>
        </a>

        <div className="flex items-center">
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="group relative flex items-center gap-1 py-2 text-[11px] font-medium text-white/90 transition hover:text-white"
              >
                {link}
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <span className="mx-7 hidden h-8 w-px bg-white/25 md:block" />
          <div className="flex items-center gap-4 text-white/90">
            {[Instagram, TripAdvisor, Foursquare].map((Icon, i) => (
              <a key={i} href="#" className="transition hover:-translate-y-0.5 hover:text-gold">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
