import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import addisView from "../../public/images/addis-view.jpg";
import Logo from "./Logo";

const quickLinks = [
  { label: "Become a Partner", href: "/partners/partnerships" },
  { label: "Volunteer Programme", href: "/#volunteer" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Register to Visit", href: "/visitor/accreditation" },
  { label: "COP32 Action Agenda", href: "/vision/action-agenda" },
  { label: "Media Library", href: "/media/library" },
  { label: "Brand Assets", href: "/media/brand-assets" },
  { label: "Climate Cooperation", href: "/vision/climate-cooperation" },
  { label: "FAQ", href: "/visitor/faq" },
  { label: "Contact", href: "/contact" },
];

const officialLinks = [
  { label: "UNFCCC", href: "https://unfccc.int/" },
  { label: "Paris Agreement", href: "https://unfccc.int/process-and-meetings/the-paris-agreement" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const socials = [
  { label: "X", d: "M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z" },
  { label: "Instagram", d: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2ZM17 5.9a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3ZM12 2c-2.7 0-3 0-4.1.1C4 2.3 2.3 4 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1C2.3 20 4 21.7 7.9 21.9 9 22 9.3 22 12 22s3 0 4.1-.1c3.9-.2 5.6-1.9 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1C21.7 4 20 2.3 16.1 2.1 15 2 14.7 2 12 2Z" },
  { label: "Facebook", d: "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z" },
  { label: "LinkedIn", d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z" },
  { label: "YouTube", d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-cop-navy-dark text-white/75">
      <Image
        src={addisView}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cop-navy-dark/70 via-cop-navy-dark/92 to-cop-navy-dark" />
      <div className="absolute -top-20 left-1/4 -z-10 h-80 w-80 rounded-full bg-cop-mint/20 blur-[120px]" />

      <div className="mx-auto max-w-[1320px] px-5 pt-24 pb-16 text-center lg:px-8">
        <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-mint uppercase">
          See you in Addis Ababa
        </p>
        <h2 className="mx-auto mt-4 max-w-[1000px] font-display text-4xl leading-tight font-bold text-white md:text-6xl">
          Your stay at COP32{" "}
          <span className="inline-block animate-shimmer bg-gradient-to-r from-cop-mint via-white to-cop-mint bg-[length:200%_auto] bg-clip-text text-transparent">
            starts here
          </span>
        </h2>
        <a
          href="https://catering.cop32ethiopia.et/hotels"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-9 py-4 font-display text-[17px] font-bold text-cop-navy shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cop-mint hover:text-white"
        >
          Book Accommodation
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="border-y border-white/10 bg-cop-navy-dark/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 py-6 lg:px-8">
          <p className="font-display text-[16px] text-white">Follow COP32</p>
          <div className="flex gap-2">
            {socials.map(({ label, d }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-cop-mint hover:bg-cop-mint hover:text-cop-navy-dark"
              >
                <Icon d={d} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 lg:grid-cols-[1.2fr_2fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-block text-white">
            <Logo />
          </Link>
          <p className="mt-6 max-w-[300px] text-[15px] leading-relaxed">
            The 32nd UN Climate Change Conference, hosted by Ethiopia in Addis Ababa.
          </p>
        </div>

        <div>
          <h3 className="font-display text-[18px] font-semibold text-white">Quick Links</h3>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] sm:grid-cols-3">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="transition hover:text-cop-mint">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-[18px] font-semibold text-white">Official Links</h3>
          <ul className="mt-6 space-y-3 text-[15px]">
            {officialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 transition hover:text-cop-mint"
                >
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-5 py-6 text-[13px] sm:flex-row lg:px-8">
          <div className="text-center sm:text-left">
            <p>© 2026 COP32 Ethiopia. All rights reserved.</p>
            <p className="mt-1 text-[11px] text-white/45">
              Photos via Wikimedia Commons: Abshewaga (CC BY-SA 4.0), DaneyWiki (CC BY-SA 4.0), Jean
              Rebiffé (CC BY 2.0).
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-cop-mint">Cookie Policy</a>
            <a href="#" className="transition hover:text-cop-mint">Terms and Conditions</a>
            <a href="#" className="transition hover:text-cop-mint">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
