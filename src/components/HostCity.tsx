import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Plane } from "lucide-react";
import Reveal from "@/components/Reveal";
import addisNight from "../../public/images/addis-night.jpg";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";

const cards = [
  {
    image: addisNight,
    icon: Building2,
    title: "Addis Ababa",
    subtitle: "Africa's Diplomatic Capital",
    body: "Home to the African Union headquarters and the UN Economic Commission for Africa, sitting at 2,355m above sea level.",
    cta: "Explore the City",
    href: "/vision/climate-story",
  },
  {
    image: addisSunset,
    icon: Plane,
    title: "Bole International Airport",
    subtitle: "Addis Ababa's Gateway",
    body: "Ethiopia's main international hub, with direct connections across Africa, Europe, Asia, and the Americas.",
    cta: "Go to Location",
    href: "/visitor/flight-ticket",
  },
  {
    image: addisView,
    icon: Building2,
    title: "UN Conference Centre",
    subtitle: "UNCC-AA — COP32 Venue",
    body: "A purpose-built UN facility in Addis Ababa, regularly hosting African Union summits and major international gatherings.",
    cta: "Explore Venue",
    href: "/conference/venue",
  },
];

export default function HostCity() {
  return (
    <section className="relative overflow-hidden bg-cop-navy-dark py-20 text-white lg:py-28">
      <Image
        src={addisSunset}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-cop-navy-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-cop-navy-dark/70 via-cop-navy-dark/45 to-cop-navy-dark/75" />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 text-center lg:px-8">
        <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-mint uppercase">
          COP32 Host City
        </p>
        <h2 className="mx-auto mt-4 max-w-[560px] font-display text-[22px] leading-tight font-semibold text-white/85 md:text-2xl">
          The Meeting Point of Global Climate Dialogue
        </h2>
        <p className="mt-2 font-display text-7xl font-extrabold tracking-tight text-white md:text-8xl">
          Addis Ababa
        </p>
        "

        <div className="mt-16 grid gap-x-7 gap-y-14 sm:grid-cols-3">
          {cards.map(({ image, icon: Icon, title, subtitle, body, cta, href }, i) => (
            <Reveal key={title} variant={i === 0 ? "left" : i === 2 ? "right" : "up"} delay={i * 120}>
              <div className="group flex flex-col items-center text-center">
                <div className="relative h-56 w-full max-w-[280px] overflow-hidden rounded-t-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 640px) 33vw, 80vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cop-navy-dark/60 via-transparent to-transparent" />
                </div>
                <span className="relative z-10 -mt-8 grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-cop-navy-dark bg-cop-green text-white shadow-lg shadow-cop-navy-dark/40">
                  <Icon className="h-7 w-7" strokeWidth={2.25} />
                </span>
                <p className="mt-5 font-display text-[11px] font-bold tracking-[0.18em] text-cop-mint uppercase">{subtitle}</p>
                <h3 className="mt-1.5 font-display text-[20px] font-semibold text-white">{title}</h3>
                <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-white/70">{body}</p>
                <Link
                  href={href}
                  className="mt-5 inline-flex items-center gap-2 font-display text-[14px] font-semibold text-cop-mint transition hover:gap-3"
                >
                  {cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
