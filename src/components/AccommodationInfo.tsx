import { ArrowUpRight, Building2, CircleCheck, Clock, Headset, MapPin } from "lucide-react";
import Weather from "./Weather";

const sections = [
  {
    title: "Official COP32 Hotels",
    icon: Building2,
    items: [
      "Official delegation hotels",
      "Conference partner hotels",
      "Business and budget hotels",
      "Group allocations coordinated through organization focal points",
    ],
  },
  {
    title: "Recommended Accommodation Areas",
    icon: MapPin,
    items: [
      "Vicinity of the Addis Ababa COP32 Venue",
      "Bole and the airport district",
      "Addis Ababa city centre",
      "Locations with shuttle or public transport links to the venue",
    ],
  },
];

export default function AccommodationInfo() {
  return (
    <section id="info" className="mx-auto grid w-full max-w-[1320px] scroll-mt-36 gap-10 px-5 py-16 lg:grid-cols-[1fr_360px] lg:gap-14 lg:px-8 lg:py-24">
      <div>
        <p className="font-display text-[22px] leading-relaxed text-cop-navy md:text-[26px]">
          A wide range of accommodation options will be available for participants attending COP32
          in Addis Ababa. Participants can explore official hotels and accommodation options through
          the official COP32 accommodation partner platform.
        </p>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border-l-4 border-cop-green bg-cop-green/5 p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cop-green text-white">
            <Clock className="h-5 w-5" />
          </span>
          <p className="text-[16px] leading-relaxed text-cop-ink">
            Due to the high number of expected participants,{" "}
            <strong className="text-cop-green">early booking is strongly recommended.</strong>
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map(({ title, icon: Icon, items }) => (
            <div
              key={title}
              className="group rounded-3xl border border-cop-blue-soft/70 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cop-blue/40 hover:shadow-2xl hover:shadow-cop-navy/10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cop-mist text-cop-blue transition-colors duration-300 group-hover:bg-cop-blue group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-[22px] font-semibold text-cop-navy">{title}</h2>
              <ul className="mt-5 space-y-3.5">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px] leading-snug text-cop-ink/85">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-cop-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-40 lg:self-start">
        <Weather />
        <div className="rounded-3xl bg-cop-mist p-7">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-cop-green shadow">
            <Headset className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-[20px] font-semibold text-cop-navy">Ready to book?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-cop-ink/80">
            Reserve your stay through the official COP32 accommodation platform.
          </p>
          <a
            href="#book"
            className="mt-5 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-cop-green transition hover:gap-3"
          >
            Go to booking <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </aside>
    </section>
  );
}
