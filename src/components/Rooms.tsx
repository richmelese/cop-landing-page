import Image from "next/image";
import {
  ArrowRight,
  BedDouble,
  Car,
  Flower2,
  Mountain,
  Presentation,
  UtensilsCrossed,
} from "lucide-react";

const services = [
  {
    name: "Hotels & Accommodation",
    description: "Verified hotels and suites for delegates and attendees.",
    icon: BedDouble,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
  },
  {
    name: "Catering & Dining",
    description: "Restaurants, event catering and room service.",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  },
  {
    name: "Airport Transfers",
    description: "Comfortable rides between the airport, hotel and venue.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
  },
  {
    name: "Meetings & Conferences",
    description: "Fully equipped rooms for meetings and side events.",
    icon: Presentation,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80",
  },
  {
    name: "Spa & Wellness",
    description: "Massage, spa treatments, gym and yoga.",
    icon: Flower2,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
  },
  {
    name: "Tours & Excursions",
    description: "Guided city tours and trips to discover the country.",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80",
  },
];

export default function Rooms() {
  return (
    <section id="services" className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-[88px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="block h-0.5 w-11 bg-gold" />
          <p className="mt-5 text-[9px] font-bold tracking-[0.15em] text-navy uppercase">
            Everything you need in one place
          </p>
          <h2 className="mt-2 font-serif text-[26px] text-slate-800">Our Services</h2>
        </div>
        <a
          href="#"
          className="rounded-full bg-gold px-8 py-3 text-[9px] font-bold tracking-[0.15em] text-white uppercase shadow-md shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-lg hover:shadow-navy/30"
        >
          View All
        </a>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ name, description, icon: Icon, image }) => (
          <a
            key={name}
            href="#"
            className="group bg-white shadow-[0_10px_40px_-15px_rgba(36,48,94,0.25)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(36,48,94,0.45)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <span className="absolute bottom-0 left-6 grid h-12 w-12 translate-y-1/2 place-items-center rounded-full bg-sky text-white shadow-lg ring-4 ring-white transition-colors duration-300 group-hover:bg-gold">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 px-6 pt-10 pb-6">
              <div>
                <h3 className="font-serif text-[15px] text-slate-800 transition-colors group-hover:text-sky">
                  {name}
                </h3>
                <p className="mt-1.5 text-[12px] leading-5 text-slate-500">{description}</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
