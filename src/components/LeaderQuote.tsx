"use client";

import { useEffect, useState } from "react";
import { Quote, User } from "lucide-react";
import { assetUrl, getLeaders, type Leader } from "@/lib/api";

// Shown until the backend responds (or if no leader is marked "PM" yet) so the
// section never renders empty.
const FALLBACK_LEADER: Pick<Leader, "name" | "role" | "quote" | "image"> = {
  name: "Office of the Prime Minister",
  role: "Federal Democratic Republic of Ethiopia",
  quote:
    "Hosting COP32 in Addis Ababa is a chance for Africa and the world to move from pledges to concrete, measurable climate action — rooted in dialogue, fairness, and shared responsibility.",
  image: null,
};

export default function LeaderQuote() {
  const [leader, setLeader] = useState(FALLBACK_LEADER);

  useEffect(() => {
    getLeaders({ displayAs: "pm", limit: 1 })
      .then((leaders) => {
        if (leaders[0]) setLeader(leaders[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-cop-mist">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 lg:grid-cols-[220px_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="mx-auto grid h-44 w-44 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-cop-navy to-cop-blue shadow-xl shadow-cop-navy/20 lg:mx-0">
          {leader.image ? (
            <img src={assetUrl(leader.image)} alt="" className="h-full w-full object-cover" />
          ) : (
            <User className="h-20 w-20 text-white/90" strokeWidth={1.5} />
          )}
        </div>
        <div>
          <Quote className="h-10 w-10 text-cop-mint" />
          <p className="mt-4 font-display text-2xl leading-snug font-medium text-cop-navy md:text-3xl">
            “{leader.quote}”
          </p>
          <div className="mt-6">
            <p className="font-display text-[16px] font-semibold text-cop-navy">{leader.name}</p>
            <p className="text-[14px] text-cop-ink/60">{leader.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
