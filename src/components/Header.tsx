"use client";

import { ChevronDown, Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const nav = [
  {
    label: "COP32 Presidency",
    items: ["What is COP?", "Leadership", "Advisory Boards", "Presidency Priorities", "Keynote Speeches"],
  },
  {
    label: "COP32 Vision",
    items: ["Vision for Success", "Action Agenda", "Ethiopia's Climate Story", "Climate Cooperation", "Sustainability"],
  },
  {
    label: "Conference & Programme",
    items: ["Conference Overview", "COP32 Venue", "Programme", "Visitor Information"],
  },
  { label: "Partners", items: ["Sponsorship", "Climate Supporters", "Partnerships", "Startups"] },
  { label: "News" },
  {
    label: "Media Hub",
    items: ["Media Accreditation", "Media Services", "Press Releases", "Media Library", "Brand Assets"],
  },
  { label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-cop-navy-dark/95 shadow-lg shadow-cop-navy-dark/20 backdrop-blur-md"
          : "bg-gradient-to-b from-cop-navy-dark/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-6 px-5 lg:px-8">
        <a href="#" className="shrink-0 text-white">
          <Logo />
        </a>

        <nav className="hidden items-center xl:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href="#"
                className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 font-display text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
                {item.items && (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </a>
              {item.items && (
                <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-[230px] translate-y-2 rounded-2xl bg-white p-2 shadow-2xl shadow-cop-navy-dark/20 transition-transform duration-300 group-hover:translate-y-0">
                    {item.items.map((sub) => (
                      <li key={sub}>
                        <a
                          href="#"
                          className="block rounded-xl px-4 py-2.5 text-[14px] text-cop-ink transition hover:bg-cop-mist hover:text-cop-green"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-cop-green px-5 py-2.5 font-display text-[14px] font-semibold text-white transition hover:bg-cop-mint sm:flex"
          >
            <UserRound className="h-4 w-4" />
            Register / Sign In
          </a>
          <button className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/30 font-display text-[13px] font-semibold text-white transition hover:bg-white/10">
            AM
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 px-5 pb-6 xl:hidden">
          {nav.map((item) => (
            <details key={item.label} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-[16px] text-white">
                {item.label}
                {item.items && <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />}
              </summary>
              {item.items && (
                <ul className="space-y-3 pb-4 pl-3">
                  {item.items.map((sub) => (
                    <li key={sub}>
                      <a href="#" className="text-[14px] text-white/75 hover:text-cop-mint">
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </nav>
      )}
    </header>
  );
}
