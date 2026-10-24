import { Quote } from "lucide-react";

// TODO: replace with an authenticated statement from the Prime Minister's office once issued.
const STATEMENT =
  "Hosting COP32 in Addis Ababa is a chance for Africa and the world to move from pledges to concrete, measurable climate action — rooted in dialogue, fairness, and shared responsibility.";

export default function LeaderQuote() {
  return (
    <section className="bg-cop-mist">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 lg:grid-cols-[220px_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="mx-auto grid h-44 w-44 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cop-navy to-cop-blue font-display text-5xl font-bold text-white shadow-xl shadow-cop-navy/20 lg:mx-0">
          PM
        </div>
        <div>
          <Quote className="h-10 w-10 text-cop-mint" />
          <p className="mt-4 font-display text-2xl leading-snug font-medium text-cop-navy md:text-3xl">
            “{STATEMENT}”
          </p>
          <div className="mt-6">
            <p className="font-display text-[16px] font-semibold text-cop-navy">Office of the Prime Minister</p>
            <p className="text-[14px] text-cop-ink/60">Federal Democratic Republic of Ethiopia</p>
          </div>
          <p className="mt-6 font-display text-[13px] font-semibold tracking-[0.2em] text-cop-green uppercase">
            Political Leadership for Global Climate Action
          </p>
        </div>
      </div>
    </section>
  );
}
