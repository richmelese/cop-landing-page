"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, FileText, HelpCircle, Newspaper, Users } from "lucide-react";
import { getDashboardStats, getMe } from "@/lib/api";
import Reveal from "@/components/Reveal";

type Stats = {
  pages: number;
  news: number;
  faq: number;
  sponsorSlots: number;
  sponsorTiers: number;
  leaders: number;
};

// Fixed categorical order — validated for CVD-safe adjacent contrast (see dataviz skill).
// The same color always means the same content type everywhere in the admin panel.
const CARD_CONFIG = [
  { key: "pages", label: "Pages", icon: FileText, href: "/admin/pages", color: "#1c75bc", dark: "#0f4f82" },
  { key: "news", label: "News Posts", icon: Newspaper, href: "/admin/news", color: "#43b97d", dark: "#1f9d62" },
  {
    key: "sponsorSlots",
    label: "Sponsor Slots",
    icon: Building2,
    href: "/admin/sponsors",
    color: "#6366f1",
    dark: "#4338ca",
  },
  { key: "faq", label: "FAQ Entries", icon: HelpCircle, href: "/admin/faq", color: "#f59e0b", dark: "#d97706" },
  { key: "leaders", label: "Leaders", icon: Users, href: "/admin/leaders", color: "#a855f7", dark: "#7e22ce" },
] as const;

export default function DashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setError("Could not reach the backend API. Is cop-landing-backend running on port 3001?"));
    getMe()
      .then((me) => setEmail(me.email))
      .catch(() => {});
  }, []);

  const total = stats ? CARD_CONFIG.reduce((sum, c) => sum + (stats[c.key] ?? 0), 0) : 0;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const initials = email ? email.slice(0, 2).toUpperCase() : "AD";

  return (
    <div className="relative">
      {/* Ambient background glow — purely decorative, matches the public site's hero treatment */}
      <div
        className="pointer-events-none absolute -top-16 right-0 -z-10 h-72 w-72 rounded-full opacity-[0.12] blur-[90px]"
        style={{ backgroundColor: "#43b97d" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-40 left-10 -z-10 h-64 w-64 rounded-full opacity-[0.08] blur-[90px]"
        style={{ backgroundColor: "#6366f1" }}
        aria-hidden
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cop-navy to-cop-navy-dark font-display text-[17px] font-bold text-white shadow-lg shadow-cop-navy/25">
            {initials}
          </span>
          <div>
            <p className="inline-flex items-center gap-1.5 font-display text-[12.5px] font-semibold tracking-[0.15em] text-cop-green uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cop-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cop-green" />
              </span>
              Welcome back{email ? `, ${email.split("@")[0]}` : ""}
            </p>
            <h1 className="mt-1 font-display text-[26px] font-bold text-cop-navy">Dashboard</h1>
            <p className="mt-0.5 text-[13.5px] text-cop-ink/55">{today}</p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {CARD_CONFIG.map(({ key, label, icon: Icon, href, color, dark }, i) => (
          <Reveal key={key} variant="up" delay={i * 70}>
            <Link
              href={href}
              className="group relative block overflow-hidden rounded-3xl bg-white p-6 shadow-[0_2px_10px_-2px_rgba(16,40,70,0.08)] transition-all duration-300 hover:-translate-y-2"
              style={{ backgroundImage: `linear-gradient(160deg, white 55%, ${color}10)` }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 24px 48px -14px ${color}4d`)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 10px -2px rgba(16,40,70,0.08)")
              }
            >
              <div
                className="absolute inset-x-0 top-0 h-[4px]"
                style={{ backgroundImage: `linear-gradient(to right, ${color}, ${dark})` }}
              />
              <Icon
                className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-[0.07] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ color }}
                strokeWidth={1.2}
              />

              <div className="relative flex items-start justify-between">
                <span
                  className="relative grid h-14 w-14 place-items-center rounded-2xl text-white ring-4"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${color}, ${dark})`,
                    boxShadow: `0 8px 20px -6px ${color}80`,
                    ["--tw-ring-color" as string]: `${color}1f`,
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.35), transparent 60%)" }}
                  />
                  <Icon className="relative h-6 w-6" strokeWidth={1.75} />
                </span>
                {stats && total > 0 && (
                  <span
                    className="mt-1 rounded-full px-2 py-1 font-display text-[11px] font-bold"
                    style={{ backgroundColor: `${color}14`, color: dark }}
                  >
                    {Math.round(((stats[key] ?? 0) / total) * 100)}%
                  </span>
                )}
              </div>

              <p className="relative mt-5 font-display text-[36px] leading-none font-bold tracking-tight text-cop-navy">
                {stats ? (stats[key] ?? 0) : "—"}
              </p>
              <p className="relative mt-2 text-[13.5px] font-medium text-cop-ink/55">{label}</p>

              <div className="relative mt-4 flex items-center justify-between border-t border-cop-blue-soft/30 pt-3">
                <span className="text-[11.5px] font-medium text-cop-ink/40">of {total} total</span>
                <span
                  className="inline-flex items-center gap-1 text-[12.5px] font-semibold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  style={{ color }}
                >
                  Manage <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {stats && total > 0 && (
        <Reveal variant="up" delay={350}>
          <div className="mt-6 rounded-3xl border border-cop-blue-soft/40 bg-white p-6 shadow-[0_1px_3px_rgba(16,40,70,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-[15px] font-semibold text-cop-navy">Content Distribution</h2>
                <p className="mt-1 text-[13px] text-cop-ink/55">Share of all {total} managed content items by type.</p>
              </div>
              <span className="rounded-full bg-cop-mist px-3 py-1 font-display text-[12px] font-bold text-cop-navy">
                {total} total
              </span>
            </div>

            <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full bg-cop-mist shadow-inner">
              {CARD_CONFIG.map(({ key, label, color, dark }) => {
                const value = stats[key] ?? 0;
                const pct = (value / total) * 100;
                if (pct === 0) return null;
                return (
                  <div
                    key={key}
                    style={{ width: `${pct}%`, backgroundImage: `linear-gradient(to right, ${color}, ${dark})` }}
                    className="h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                    title={`${label}: ${value}`}
                  />
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {CARD_CONFIG.map(({ key, label, color }) => {
                const value = stats[key] ?? 0;
                const pct = Math.round((value / total) * 100);
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full shadow-sm" style={{ backgroundColor: color }} />
                    <span className="text-[13px] font-medium text-cop-ink/70">
                      {label} <span className="font-semibold text-cop-ink/50">{value} · {pct}%</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal variant="left" delay={100}>
          <div className="h-full rounded-3xl border border-cop-blue-soft/40 bg-white p-6 shadow-[0_1px_3px_rgba(16,40,70,0.06)]">
            <h2 className="font-display text-[16px] font-semibold text-cop-navy">Quick Links</h2>
            <ul className="mt-4 space-y-1.5">
              {[
                { label: "Manage all site pages", href: "/admin/pages", icon: FileText, color: "#1c75bc", dark: "#0f4f82" },
                { label: "Add a news post", href: "/admin/news", icon: Newspaper, color: "#43b97d", dark: "#1f9d62" },
                { label: "Edit sponsor tiers", href: "/admin/sponsors", icon: Building2, color: "#6366f1", dark: "#4338ca" },
                { label: "Edit FAQ entries", href: "/admin/faq", icon: HelpCircle, color: "#f59e0b", dark: "#d97706" },
                { label: "Edit leader quotes", href: "/admin/leaders", icon: Users, color: "#a855f7", dark: "#7e22ce" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-cop-ink/80 transition hover:bg-cop-mist"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: `linear-gradient(135deg, ${item.color}, ${item.dark})` }}
                      >
                        <item.icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-cop-ink/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="right" delay={150}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-cop-blue-soft/40 bg-gradient-to-br from-cop-navy to-cop-navy-dark p-6 text-white shadow-lg shadow-cop-navy/20">
            <svg
              viewBox="0 0 400 300"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <circle cx="340" cy="30" r="110" stroke="#ffffff" strokeWidth="1" fill="none" />
              <circle cx="340" cy="30" r="70" stroke="#43b97d" strokeWidth="1" fill="none" />
              <circle cx="40" cy="270" r="90" fill="#43b97d" fillOpacity="0.1" />
            </svg>
            <div className="relative">
              <h2 className="font-display text-[16px] font-semibold text-white">About This Panel</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/75">
                Content here — pages, news, sponsors, FAQ, and leader quotes — is stored in a real
                PostgreSQL database via cop-landing-backend, so changes persist across sessions and show up
                on the live site immediately.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
