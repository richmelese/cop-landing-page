"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, HelpCircle, Newspaper, Users } from "lucide-react";
import { getDashboardStats, getMe } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";

type Stats = {
  pages: number;
  news: number;
  faq: number;
  leaders: number;
};

// Fixed categorical order — validated for CVD-safe adjacent contrast (see dataviz skill).
// The same color always means the same content type everywhere in the admin panel.
const CARD_CONFIG = [
  { key: "pages", label: "Pages", icon: FileText, href: "/admin/pages", color: "#1c75bc", dark: "#0f4f82" },
  { key: "news", label: "News Posts", icon: Newspaper, href: "/admin/news", color: "#43b97d", dark: "#1f9d62" },
  { key: "faq", label: "FAQ Entries", icon: HelpCircle, href: "/admin/faq", color: "#f59e0b", dark: "#d97706" },
  { key: "leaders", label: "Leaders", icon: Users, href: "/admin/leaders", color: "#a855f7", dark: "#7e22ce" },
] as const;

const QUICK_LINKS = [
  { label: "Manage all site pages", href: "/admin/pages", icon: FileText, color: "#1c75bc", dark: "#0f4f82" },
  { label: "Add a news post", href: "/admin/news", icon: Newspaper, color: "#43b97d", dark: "#1f9d62" },
  { label: "Edit FAQ entries", href: "/admin/faq", icon: HelpCircle, color: "#f59e0b", dark: "#d97706" },
  { label: "Edit leader quotes", href: "/admin/leaders", icon: Users, color: "#a855f7", dark: "#7e22ce" },
];

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
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cop-navy to-cop-navy-dark font-display text-[15px] font-bold text-white">
            {initials}
          </span>
          <div>
            <p className="inline-flex items-center gap-1.5 font-display text-[12px] font-semibold tracking-[0.15em] text-cop-green uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cop-green opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cop-green" />
              </span>
              Welcome back{email ? `, ${email.split("@")[0]}` : ""}
            </p>
            <h1 className="mt-1 font-display text-[24px] font-bold text-cop-navy">Dashboard</h1>
            <p className="mt-0.5 text-[13px] text-cop-ink/55">{today}</p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARD_CONFIG.map(({ key, label, icon: Icon, href, color, dark }, i) => {
          const pct = stats && total > 0 ? Math.round(((stats[key] ?? 0) / total) * 100) : null;
          return (
            <Reveal key={key} variant="up" delay={i * 60}>
              <Link href={href} className="group block">
                <Card className="border-cop-blue-soft/50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cop-blue-soft hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-white"
                      style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${dark})` }}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                    </span>
                    {pct !== null && (
                      <span
                        className="rounded-full px-2 py-0.5 font-display text-[11px] font-bold"
                        style={{ backgroundColor: `${color}14`, color: dark }}
                      >
                        {pct}%
                      </span>
                    )}
                  </div>

                  <p className="mt-4 font-display text-[30px] leading-none font-bold tracking-tight text-cop-navy">
                    {stats ? (stats[key] ?? 0) : "—"}
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium text-cop-ink/55">{label}</p>

                  <div className="mt-3 flex items-center justify-between border-t border-cop-blue-soft/30 pt-2.5">
                    <span className="text-[11px] font-medium text-cop-ink/40">of {total} total</span>
                    <span
                      className="inline-flex items-center gap-1 text-[12px] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ color }}
                    >
                      Manage <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {stats && total > 0 && (
        <Reveal variant="up" delay={280}>
          <Card className="mt-5 border-cop-blue-soft/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-[15px] font-semibold text-cop-navy">Content Distribution</h2>
                  <p className="mt-1 text-[13px] text-cop-ink/55">Share of all {total} managed content items by type.</p>
                </div>
                <span className="rounded-full bg-cop-mist px-3 py-1 font-display text-[12px] font-bold text-cop-navy">
                  {total} total
                </span>
              </div>

              <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-cop-mist">
                {CARD_CONFIG.map(({ key, label, color, dark }) => {
                  const value = stats[key] ?? 0;
                  const pct = (value / total) * 100;
                  if (pct === 0) return null;
                  return (
                    <div
                      key={key}
                      style={{ width: `${pct}%`, backgroundImage: `linear-gradient(to right, ${color}, ${dark})` }}
                      className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                      title={`${label}: ${value}`}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {CARD_CONFIG.map(({ key, label, color }) => {
                  const value = stats[key] ?? 0;
                  const pct = Math.round((value / total) * 100);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[13px] font-medium text-cop-ink/70">
                        {label} <span className="font-semibold text-cop-ink/45">{value} · {pct}%</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal variant="left" delay={80}>
          <Card className="h-full border-cop-blue-soft/50">
            <CardContent className="p-6">
              <h2 className="font-display text-[15px] font-semibold text-cop-navy">Quick Links</h2>
              <ul className="mt-3 space-y-1">
                {QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-cop-ink/80 transition hover:bg-cop-mist"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white"
                          style={{ backgroundImage: `linear-gradient(135deg, ${item.color}, ${item.dark})` }}
                        >
                          <item.icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-cop-ink/35 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal variant="right" delay={130}>
          <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-cop-navy to-cop-navy-dark p-6 text-white">
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
              <h2 className="font-display text-[15px] font-semibold text-white">About This Panel</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/75">
                Content here — pages, news, FAQ, and leader quotes — is stored in a real PostgreSQL
                database via cop-landing-backend, so changes persist across sessions and show up on the
                live site immediately.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
