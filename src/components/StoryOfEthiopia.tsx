import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Landmark, Sprout, Target } from "lucide-react";
import ethiopiaEmblemArt from "../../public/images/ethiopia-emblem-art.png";

const cards = [
  {
    label: "HERITAGE",
    title: "Cradle of Humankind",
    body: "Home to some of humanity's oldest fossil records and the seat of the African Union, Ethiopia has long stood at the crossroads of global diplomacy.",
    icon: Landmark,
  },
  {
    label: "GREEN LEGACY",
    title: "A Nation That Plants",
    body: "Ethiopia's Green Legacy Initiative has mobilised millions of citizens in record-breaking, nationwide tree-planting campaigns since 2019.",
    icon: Sprout,
  },
  {
    label: "ACTION",
    title: "From Pledge to Practice",
    body: "COP32 builds on this tradition, bringing negotiators, cities, and civil society together to turn climate commitments into delivery.",
    icon: Target,
  },
];

export default function StoryOfEthiopia() {
  return (
    <section className="relative overflow-hidden bg-cop-navy-dark py-20 text-white lg:py-28">
      <Image
        src={ethiopiaEmblemArt}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cop-navy-dark/60 via-cop-navy-dark/35 to-cop-navy-dark/80" />

      <div className="relative mx-auto w-full max-w-[860px] px-5 text-center lg:px-8">
        <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-mint uppercase">
          The Story of Ethiopia
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight font-bold text-white md:text-5xl">
          Where Ancient Heritage Meets Climate Leadership
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-white/75">
          COP32 builds on Ethiopia&apos;s tradition of dialogue and diplomacy as home to the African Union
          and the UN Economic Commission for Africa. Delivering real climate action requires the same
          qualities that have long defined Ethiopia&apos;s role on the world stage: trust, fairness, and
          follow-through.
        </p>
        <Link
          href="/vision/climate-story"
          className="mt-6 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-cop-mint transition hover:gap-3"
        >
          Discover Ethiopia&apos;s climate story <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative mx-auto mt-14 grid w-full max-w-[1320px] gap-5 px-5 sm:grid-cols-3 lg:px-8">
        {cards.map(({ label, title, body, icon: Icon }) => (
          <div
            key={label}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cop-mint to-cop-blue text-white">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-[11px] font-bold tracking-[0.18em] text-cop-mint uppercase">
              {label}
            </p>
            <h3 className="mt-1 font-display text-[16px] font-semibold text-white">{title}</h3>
            <p className="mt-2 text-[13.5px] leading-snug text-white/65">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
