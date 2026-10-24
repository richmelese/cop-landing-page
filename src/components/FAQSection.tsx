import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is COP and why does it matter?",
    a: "COP (Conference of the Parties) is the UN's annual climate summit, where nearly 200 countries negotiate the global response to climate change under the UNFCCC.",
  },
  {
    q: "Who can attend COP32?",
    a: "Blue Zone access is limited to accredited delegations, observers, and media. The Green Zone, coordinated by Ethiopia, is open to the private sector, academia, civil society, and the public.",
  },
  {
    q: "What themes will be prioritized?",
    a: "The COP32 Action Agenda spans clean energy, zero waste, resilient cities, green industrialisation, food security, forests, youth, finance, and health.",
  },
  {
    q: "What is the difference between the Blue Zone and the Green Zone?",
    a: "The Blue Zone is UN-managed territory for official negotiations. The Green Zone is organised by the host country for dialogue, exhibitions, and public engagement.",
  },
  {
    q: "Where can I book accommodation for COP32?",
    a: "All official hotel bookings for delegates and attendees are managed through the COP32 accommodation platform — see the Accommodation page for details.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-cop-mist">
      <div className="mx-auto max-w-[920px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase">
              FAQ
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-bold text-cop-navy md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <Link
            href="/visitor/faq"
            className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-cop-green transition hover:gap-3"
          >
            See All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 divide-y divide-cop-blue-soft/60 overflow-hidden rounded-3xl bg-white shadow-sm">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group p-6 open:bg-cop-mist/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[16px] font-semibold text-cop-navy">
                {q}
                <ChevronDown className="h-4 w-4 shrink-0 text-cop-green transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-cop-ink/75">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
