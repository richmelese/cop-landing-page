import Image from "next/image";
import { Dumbbell, Fish, Flower2, Mic, Sailboat, Ship, Umbrella, Waves } from "lucide-react";
import Logo from "./Logo";

const amenities = [
  { icon: Waves, label: "Swimming pool" },
  { icon: Dumbbell, label: "Gym & yoga" },
  { icon: Flower2, label: "Spa & massage" },
  { icon: Ship, label: "Boat tours" },
  { icon: Sailboat, label: "Surfing lessons" },
  { icon: Mic, label: "Conference room" },
  { icon: Fish, label: "Diving & snorkling" },
  { icon: Umbrella, label: "Private Beach" },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative md:py-10">
      <div className="relative h-[300px] md:absolute md:inset-x-0 md:inset-y-10 md:h-auto">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=80"
          alt="Infinity pool overlooking the hills"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] md:px-6 lg:px-[88px]">
        <div className="relative overflow-hidden bg-sky px-8 py-14 text-white md:ml-auto md:w-[362px] md:px-14 md:py-20">
          <Logo className="absolute -top-10 -left-10 h-44 w-44 text-7xl text-white/10" />
          <h2 className="relative font-serif text-[26px]">Our Amenities</h2>
          <p className="relative mt-5 text-[12px] leading-6 text-white/95">
            The hotel is arranged on three floors without a lift. On the ground floor, apart from
            the reception, there is a comfortable lounge where you can sit and drink tea.
          </p>
          <ul className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {amenities.map(({ icon: Icon, label }) => (
              <li key={label} className="group flex cursor-default items-center gap-3 text-[11px]">
                <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
