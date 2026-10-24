import Image from "next/image";
import { HandHeart } from "lucide-react";
import addisNight from "../../public/images/addis-night.jpg";

export default function Volunteer() {
  return (
    <section id="volunteer" className="relative w-full scroll-mt-28 overflow-hidden">
      <Image
        src={addisNight}
        alt="Addis Ababa skyline at night"
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cop-navy-dark/85 via-cop-green-dark/70 to-cop-navy-dark/90" />
      <div className="absolute top-1/4 -left-32 h-80 w-80 rounded-full bg-cop-mint/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cop-green/25 blur-[120px]" />

      <div className="relative mx-auto max-w-[760px] px-6 py-20 text-center text-white sm:py-28">
        <HandHeart className="mx-auto h-12 w-12 text-cop-mint" />
        <h2 className="mx-auto mt-5 max-w-[640px] font-display text-3xl leading-tight font-bold md:text-4xl">
          Volunteer for Climate. Leave Your Mark on the Future.
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/85">
          The COP32 Volunteer Programme will bring thousands of Ethiopians together to welcome the world to
          Addis Ababa. Applications open closer to the conference.
        </p>
        <button
          disabled
          className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-display text-[16px] font-semibold text-white/80 backdrop-blur-sm"
        >
          Applications Opening Soon
        </button>
      </div>
    </section>
  );
}
