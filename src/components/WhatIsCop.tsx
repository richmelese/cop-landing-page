import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";
import Reveal from "@/components/Reveal";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";

export default function WhatIsCop() {
  return (
    <section id="what-is-cop" className="mx-auto w-full max-w-[1320px] scroll-mt-28 px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
        <Reveal variant="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={addisSunset}
              alt="Addis Ababa at sunset"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <div>
            <p className="flex items-center gap-2 font-display text-[14px] font-semibold text-cop-green">
              <Leaf className="h-4 w-4" />
              What is COP? What is COP32?
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold md:text-4xl">
              <span className="text-cop-green">A Turning Point</span>{" "}
              <span className="text-cop-navy">for the Planet</span>
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-cop-ink/80">
              The Conference of the Parties, or COP, is the highest-level annual decision-making body of the
              United Nations Framework Convention on Climate Change (UNFCCC), bringing together nearly every
              nation on earth to negotiate the global response to climate change.{" "}
              <strong className="font-semibold text-cop-navy">
                COP32 is the 32nd session of this conference, hosted by Ethiopia in Addis Ababa in 2027.
              </strong>{" "}
              It marks the first time the summit is held in the Horn of Africa, bringing the negotiations
              closer to the communities most exposed to climate impacts.
            </p>
            <Link
              href="/presidency/what-is-cop"
              className="mt-8 inline-flex items-center rounded-full border-2 border-cop-navy px-7 py-2.5 font-display text-[15px] font-semibold text-cop-navy transition hover:bg-cop-navy hover:text-white"
            >
              Detail
            </Link>
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={addisView}
              alt="View of Addis Ababa"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
