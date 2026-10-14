import Image from "next/image";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Logo from "./Logo";

const columns = [
  { title: "Explore", links: ["Rooms & Suites", "Restaurant", "Spa & Wellness", "Gallery", "Events"] },
  { title: "Information", links: ["About Us", "News", "Special Offers", "FAQ", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-x-clip bg-navy-dark text-white/75">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/95 via-navy-dark/85 to-navy-dark/95" />
      </div>
      <Logo className="absolute right-0 bottom-0 h-[380px] w-[380px] translate-x-1/4 text-[200px] text-white/[0.04]" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-[88px]">
        <div className="relative -top-16 -mb-4 bg-sky px-8 py-10 shadow-[0_25px_50px_-12px_rgba(27,36,73,0.5)] md:flex md:items-center md:justify-between md:px-14">
          <div>
            <h3 className="font-serif text-[22px] text-white">Subscribe to our newsletter</h3>
            <p className="mt-1 text-[12px] text-white/85">Get exclusive offers and the latest news first.</p>
          </div>
          <form className="mt-6 flex w-full max-w-sm md:mt-0">
            <input
              type="email"
              placeholder="Your email address"
              className="h-11 flex-1 bg-white/15 px-4 text-[12px] text-white placeholder:text-white/70 outline-none transition focus:bg-white/25"
            />
            <button
              type="button"
              aria-label="Subscribe"
              className="grid h-11 w-12 cursor-pointer place-items-center bg-navy text-white transition hover:bg-navy-dark"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <a href="#" className="group flex items-center gap-3 text-white">
              <Logo className="h-11 w-11 text-xl transition-transform duration-700 group-hover:rotate-[360deg]" />
              <span className="font-serif text-lg tracking-wide">COP</span>
            </a>
            <p className="mt-6 text-[12px] leading-6">
              Stylish, modern and forward thinking hospitality with smart design, innovative
              restaurant concepts and unique activities by the sea.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-[16px] text-white">{col.title}</h4>
              <span className="mt-3 block h-0.5 w-8 bg-gold" />
              <ul className="mt-6 space-y-3 text-[12px]">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-gold">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-serif text-[16px] text-white">Contact</h4>
            <span className="mt-3 block h-0.5 w-8 bg-gold" />
            <ul className="mt-6 space-y-4 text-[12px]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Oia, Santorini 847 02, Greece
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href="tel:+302286000000" className="transition hover:text-gold">+30 2286 000 000</a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:hello@cop32ethiopia.et" className="transition hover:text-gold">hello@cop32ethiopia.et</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] sm:flex-row lg:px-[88px]">
          <p>© 2026 COP Hotel Resort. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-gold">Privacy Policy</a>
            <a href="#" className="transition hover:text-gold">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
