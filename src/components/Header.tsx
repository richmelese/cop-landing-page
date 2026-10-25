"use client";

import { ChevronDown, Menu, QrCode, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import qrCode from "../../public/images/superapp-qr.png";

type NavSub = { label: string; href: string };
type NavGroup = { label: string; items: NavSub[]; href?: undefined };
type NavLink = { label: string; href: string; items?: undefined };
type NavEntry = NavGroup | NavLink;

const nav: NavEntry[] = [
  {
    label: "COP32 Presidency",
    items: [
      { label: "What is COP?", href: "/presidency/what-is-cop" },
      { label: "Leadership", href: "/presidency/leadership" },
      { label: "Advisory Boards", href: "/presidency/advisory-boards" },
      { label: "Presidency Priorities", href: "/presidency/priorities" },
      { label: "Keynote Speeches", href: "/presidency/keynote-speeches" },
    ],
  },
  {
    label: "COP32 Vision",
    items: [
      { label: "Vision for Success", href: "/vision/success" },
      { label: "Action Agenda", href: "/vision/action-agenda" },
      { label: "Ethiopia's Climate Story", href: "/vision/climate-story" },
      { label: "Climate Cooperation", href: "/vision/climate-cooperation" },
      { label: "Sustainability", href: "/vision/sustainability" },
    ],
  },
  {
    label: "Conference & Programme",
    items: [
      { label: "Conference Overview", href: "/conference/overview" },
      { label: "COP32 Venue", href: "/conference/venue" },
      { label: "Programme", href: "/conference/programme" },
      { label: "Visitor Information", href: "/visitor" },
    ],
  },
  {
    label: "Partners",
    items: [
      { label: "Sponsorship", href: "/partners/sponsorship" },
      { label: "Climate Supporters", href: "/partners/climate-supporters" },
      { label: "Partnerships", href: "/partners/partnerships" },
      { label: "Startups", href: "/partners/startups" },
    ],
  },
  { label: "News", href: "/news" },
  {
    label: "Media Hub",
    items: [
      { label: "Media Accreditation", href: "/media/accreditation" },
      { label: "Media Services", href: "/media/services" },
      { label: "Press Releases", href: "/media/press-releases" },
      { label: "Media Library", href: "/media/library" },
      { label: "Brand Assets", href: "/media/brand-assets" },
    ],
  },
  { label: "Contact", href: "/contact" },
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
        <Link href="/" className="shrink-0 text-white">
          <Logo />
        </Link>

        <nav className="hidden items-center xl:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href ?? "#"}
                className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 font-display text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
                {item.items && (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>
              {item.items && (
                <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-[220px] translate-y-2 rounded-xl bg-white px-5 py-4 shadow-xl shadow-cop-navy-dark/15 transition-transform duration-300 group-hover:translate-y-0">
                    {item.items.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className="flex items-center gap-2 py-2 font-display text-[14.5px] font-semibold text-cop-blue transition hover:text-cop-navy"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="group relative hidden sm:block">
            <a
              href="#"
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-cop-green px-5 py-2.5 font-display text-[14px] font-semibold text-white transition hover:bg-cop-mint"
            >
              <QrCode className="h-4 w-4" />
              Register / Sign In
            </a>
            <div className="invisible absolute top-full right-0 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="w-[190px] translate-y-2 rounded-2xl bg-white p-4 text-center shadow-xl shadow-cop-navy-dark/15 transition-transform duration-300 group-hover:translate-y-0">
                <div className="mx-auto h-[130px] w-[130px] overflow-hidden rounded-xl border border-cop-blue-soft/60 p-1.5">
                  <Image src={qrCode} alt="Scan to register for COP32" className="h-full w-full object-contain" />
                </div>
                <p className="mt-3 font-display text-[13px] font-semibold text-cop-navy">Scan to Register</p>
                <p className="mt-0.5 text-[11.5px] text-cop-ink/60">& use every COP32 service</p>
              </div>
            </div>
          </div>
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
          {nav.map((item) =>
            item.items ? (
              <details key={item.label} className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-[16px] text-white">
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <ul className="space-y-3 pb-4 pl-3">
                  {item.items.map((sub) => (
                    <li key={sub.label}>
                      <Link href={sub.href} className="text-[14px] text-white/75 hover:text-cop-mint">
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block border-b border-white/10 py-4 font-display text-[16px] text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
