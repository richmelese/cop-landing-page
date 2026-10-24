import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import addisNight from "../../public/images/addis-night.jpg";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";

// TODO: replace with real press releases once the COP32 Presidency begins publishing news.
const news = [
  {
    category: "Accommodation",
    date: "Preview",
    title: "Official COP32 Accommodation Platform Opens for Early Access",
    excerpt: "Delegates and attendees can now browse verified hotels across Addis Ababa ahead of the 2027 conference.",
    image: addisView,
  },
  {
    category: "Action Agenda",
    date: "Preview",
    title: "COP32 Presidency Outlines Ten Implementation Themes",
    excerpt: "From clean energy to resilient health systems, the draft Action Agenda sets priorities for 2027.",
    image: addisSunset,
  },
  {
    category: "Host City",
    date: "Preview",
    title: "Addis Ababa Begins Infrastructure Upgrades Ahead of COP32",
    excerpt: "Transport, venue, and digital infrastructure projects are underway across the host city.",
    image: addisNight,
  },
];

export default function NewsSection() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-20 lg:px-8 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase">
            Latest News
          </p>
          <h2 className="mt-4 max-w-[640px] font-display text-4xl leading-tight font-bold text-cop-navy md:text-5xl">
            COP32 Updates
          </h2>
        </div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-cop-green transition hover:gap-3"
        >
          All News <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-7 lg:grid-cols-3">
        {news.map(({ category, date, title, excerpt, image }) => (
          <Link
            key={title}
            href="/news"
            className="group flex flex-col overflow-hidden rounded-3xl border border-cop-blue-soft/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cop-navy/10"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cop-navy-dark/70 via-cop-navy-dark/10 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
                {category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-cop-ink/50">
                <CalendarDays className="h-3.5 w-3.5" /> {date}
              </span>
              <h3 className="mt-3 font-display text-[18px] leading-snug font-semibold text-cop-navy">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-cop-ink/70">{excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[14px] font-semibold text-cop-green transition group-hover:gap-3">
                Read More <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
