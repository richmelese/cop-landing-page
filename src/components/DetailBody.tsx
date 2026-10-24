import Image from "next/image";
import { ArrowUpRight, ChevronDown, CircleCheck, Info, QrCode, User, type LucideIcon } from "lucide-react";
import qrCode from "../../public/images/superapp-qr.png";
import DetailImageCollage from "./DetailImageCollage";
import Weather from "./Weather";

export type Fact = { label: string; value: string };
export type SubSection = { title: string; body: string };
export type ListItem = { title: string; body: string };
export type Pillar = { title: string; body: string };
export type TargetCard = { icon: LucideIcon; value?: string; title: string; body: string };
export type Step = { title: string; body: string };
export type FaqItem = { q: string; a: string };
export type Cta = { label: string; href: string };
export type BoardSeat = { role: string; status?: string };
export type BoardGroup = { title: string; description?: string; seats: BoardSeat[] };
export type Section = {
  heading?: string;
  body?: string[];
  facts?: Fact[];
  subsections?: SubSection[];
  list?: ListItem[];
  pillars?: Pillar[];
  targets?: TargetCard[];
  steps?: Step[];
  faq?: FaqItem[];
  cta?: Cta;
  qr?: boolean;
  boardGroups?: BoardGroup[];
};
export type TimelineItem = { year: string; title: string; body: string; icon: LucideIcon; current?: boolean };
export type Stat = { label: string; value: string };

export default function DetailBody({
  sections,
  timeline,
  stats,
  tagline,
  note,
  showWeather,
}: {
  sections: Section[];
  timeline?: TimelineItem[];
  stats?: Stat[];
  tagline?: string;
  note?: string;
  showWeather?: boolean;
}) {
  return (
    <>
      <section className="mx-auto grid w-full max-w-[1320px] gap-14 px-5 py-16 lg:grid-cols-[1fr_340px] lg:px-8 lg:py-20">
        <div>
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-display text-[26px] font-bold text-cop-navy md:text-[30px]">{section.heading}</h2>
              )}
              {section.body && (
                <div className={`space-y-4 ${section.heading ? "mt-4" : ""}`}>
                  {section.body.map((p, j) => (
                    <p
                      key={j}
                      className={`leading-relaxed text-cop-ink/85 ${
                        i === 0 && j === 0
                          ? "font-display text-[19px] text-cop-navy md:text-[21px]"
                          : "text-[16px] md:text-[17px]"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {section.facts && (
                <div className="mt-6 rounded-3xl border border-cop-blue-soft/60 bg-cop-mist p-6">
                  <p className="font-display text-[12px] font-bold tracking-[0.18em] text-cop-green uppercase">
                    Quick Facts
                  </p>
                  <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {section.facts.map((f) => (
                      <div
                        key={f.label}
                        className="flex items-baseline justify-between gap-3 border-b border-cop-blue-soft/40 pb-2 text-[14px]"
                      >
                        <dt className="text-cop-ink/60">{f.label}</dt>
                        <dd className="text-right font-semibold text-cop-navy">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {section.subsections && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.subsections.map((s) => (
                    <div key={s.title} className="rounded-2xl border border-cop-blue-soft/60 bg-white p-5">
                      <h3 className="font-display text-[15.5px] font-semibold text-cop-navy">{s.title}</h3>
                      <p className="mt-2 text-[14px] leading-snug text-cop-ink/70">{s.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.list && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.list.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-2xl border border-cop-blue-soft/60 bg-white p-5"
                    >
                      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-cop-mint" />
                      <div>
                        <p className="font-display text-[15px] font-semibold text-cop-navy">{item.title}</p>
                        <p className="mt-1 text-[14px] leading-snug text-cop-ink/70">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.boardGroups && (
                <div className="mt-6 space-y-6">
                  {section.boardGroups.map((group, idx) => (
                    <div
                      key={group.title}
                      className={`rounded-3xl border p-6 md:p-8 ${
                        idx % 2 === 0
                          ? "border-cop-blue-soft/60 bg-gradient-to-br from-cop-mist to-white"
                          : "border-cop-mint/30 bg-gradient-to-br from-cop-green/5 to-white"
                      }`}
                    >
                      <h3 className="font-display text-[19px] font-bold text-cop-green">{group.title}</h3>
                      {group.description && (
                        <p className="mt-2 max-w-[760px] text-[14.5px] leading-relaxed text-cop-ink/70">
                          {group.description}
                        </p>
                      )}
                      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {group.seats.map((seat, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-cop-blue ring-1 ring-cop-blue-soft/60">
                              <User className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="font-display text-[14.5px] font-semibold text-cop-navy">{seat.role}</p>
                              <p className="text-[13px] text-cop-ink/55 italic">{seat.status ?? "To be announced"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.pillars && (
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {section.pillars.map((p, idx) => (
                    <div key={p.title} className="rounded-3xl border border-cop-blue-soft/60 bg-white p-6">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-cop-navy font-display text-[15px] font-bold text-white">
                        {idx + 1}
                      </span>
                      <h3 className="mt-4 font-display text-[17px] font-semibold text-cop-navy">{p.title}</h3>
                      <p className="mt-2 text-[14px] leading-snug text-cop-ink/70">{p.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.targets && (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.targets.map(({ icon: Icon, value, title, body }) => (
                    <div
                      key={title}
                      className="rounded-3xl border border-cop-blue-soft/60 bg-white p-6 text-center"
                    >
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cop-mint to-cop-blue text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      {value && <p className="mt-4 font-display text-3xl font-bold text-cop-navy">{value}</p>}
                      <p
                        className={`font-display text-[15px] font-semibold text-cop-navy ${value ? "mt-1" : "mt-4"}`}
                      >
                        {title}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-snug text-cop-ink/70">{body}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.steps && (
                <ol className="mt-8 space-y-5">
                  {section.steps.map((s, idx) => (
                    <li key={s.title} className="flex gap-4 rounded-2xl border border-cop-blue-soft/60 bg-white p-5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cop-green font-display text-[14px] font-bold text-white">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-display text-[15px] font-semibold text-cop-navy">{s.title}</p>
                        <p className="mt-1 text-[14px] leading-snug text-cop-ink/70">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {section.cta && (
                <a
                  href={section.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-cop-green px-7 py-3.5 font-display text-[15px] font-bold text-white shadow-[0_15px_35px_-10px_rgba(0,120,76,0.6)] transition hover:-translate-y-0.5 hover:bg-cop-mint"
                >
                  {section.cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}

              {section.qr && (
                <div className="mt-8 flex flex-wrap items-center gap-5 rounded-3xl border border-cop-blue-soft/60 bg-cop-mist p-6">
                  <div className="overflow-hidden rounded-2xl border border-cop-blue-soft/60 bg-white p-2">
                    <Image src={qrCode} alt="Scan to open the COP32 SuperApp" className="h-24 w-24" />
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-display text-[15px] font-semibold text-cop-navy">
                      <QrCode className="h-4 w-4 text-cop-green" /> Manage It in the SuperApp
                    </p>
                    <p className="mt-1 max-w-[320px] text-[14px] leading-snug text-cop-ink/70">
                      Scan to track your application and keep every COP32 service, including accommodation, in
                      one app.
                    </p>
                  </div>
                </div>
              )}

              {section.faq && (
                <div className="mt-8 divide-y divide-cop-blue-soft/60 overflow-hidden rounded-3xl border border-cop-blue-soft/60 bg-white">
                  {section.faq.map(({ q, a }) => (
                    <details key={q} className="group p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-semibold text-cop-navy">
                        {q}
                        <ChevronDown className="h-4 w-4 shrink-0 text-cop-green transition group-open:rotate-180" />
                      </summary>
                      <p className="mt-2 text-[14px] leading-relaxed text-cop-ink/75">{a}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {note && (
          <div className="mt-10 flex items-start gap-4 rounded-2xl border-l-4 border-cop-blue bg-cop-blue/5 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cop-blue text-white">
              <Info className="h-5 w-5" />
            </span>
            <p className="text-[15px] leading-relaxed text-cop-ink">{note}</p>
          </div>
        )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-40 space-y-6">
            <DetailImageCollage />
            {showWeather && <Weather />}
          </div>
        </aside>
      </section>

      {timeline && (
        <section className="bg-cop-mist py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
            <h2 className="font-display text-[26px] font-bold text-cop-navy md:text-[30px]">
              Key Milestones in UNFCCC History
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {timeline.map(({ year, title, body, icon: Icon, current }) => (
                <div
                  key={year}
                  className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cop-navy/10 ${
                    current
                      ? "border-cop-mint/60 bg-gradient-to-br from-cop-green to-cop-green-dark text-white"
                      : "border-cop-blue-soft/60 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                        current ? "bg-white/15 text-white" : "bg-gradient-to-br from-cop-mint to-cop-blue text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className={`font-display text-2xl font-bold ${current ? "text-white" : "text-cop-navy"}`}>
                      {year}
                    </p>
                  </div>
                  <p
                    className={`mt-4 font-display text-[15px] font-semibold ${current ? "text-white" : "text-cop-navy"}`}
                  >
                    {title}
                  </p>
                  <p className={`mt-1.5 text-[14px] leading-snug ${current ? "text-white/80" : "text-cop-ink/70"}`}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {stats && (
        <section className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-white p-6 text-center shadow-sm">
                <p className="font-display text-3xl font-bold text-cop-navy">{s.value}</p>
                <p className="mt-1 text-[14px] text-cop-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
          {tagline && (
            <p className="mx-auto mt-10 max-w-[720px] text-center font-display text-2xl font-semibold text-cop-navy">
              {tagline}
            </p>
          )}
        </section>
      )}
    </>
  );
}
