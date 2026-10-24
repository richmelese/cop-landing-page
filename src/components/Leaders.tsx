import { Quote } from "lucide-react";

// TODO: replace roles, names and quotes once the COP32 leadership team is formally announced.
const leaders = [
  {
    initials: "CP",
    role: "COP32 President-Designate",
    quote:
      "COP32 is a meeting point for dialogue, consensus, and implementation-focused action — for Ethiopia, for Africa, and for the world.",
  },
  {
    initials: "EA",
    role: "Minister of Planning and Development",
    quote:
      "Climate resilience and economic development must move together. Addis Ababa gives us the platform to show how.",
  },
];

export default function Leaders() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-20 lg:px-8 lg:py-28">
      <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase">
        COP32 Leaders
      </p>
      <h2 className="mt-4 max-w-[680px] font-display text-4xl leading-tight font-bold text-cop-navy md:text-5xl">
        Voices Shaping COP32
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {leaders.map(({ initials, role, quote }) => (
          <div
            key={role}
            className="flex gap-6 rounded-3xl border border-cop-blue-soft/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cop-navy/10"
          >
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cop-navy to-cop-blue font-display text-xl font-bold text-white">
              {initials}
            </span>
            <div>
              <Quote className="h-6 w-6 text-cop-mint" />
              <p className="mt-2 text-[16px] leading-relaxed text-cop-ink/85">“{quote}”</p>
              <p className="mt-4 font-display text-[15px] font-semibold text-cop-navy">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
