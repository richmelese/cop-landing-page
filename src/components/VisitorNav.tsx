import Link from "next/link";

export const visitorLinks = [
  { label: "Accreditation", href: "/visitor/accreditation" },
  { label: "Flight Ticket", href: "/visitor/flight-ticket" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Transport & Digital Maps", href: "/visitor/transport" },
  { label: "Visa and Entry", href: "/visitor/visa" },
  { label: "Plan Your Travel", href: "/visitor/plan-your-travel" },
  { label: "Shipping & Logistics", href: "/visitor/shipping-logistics" },
  { label: "Interpretation", href: "/visitor/interpretation" },
  { label: "FAQ", href: "/visitor/faq" },
];

export default function VisitorNav({ current }: { current?: string }) {
  return (
    <div className="sticky top-20 z-40 border-b border-cop-blue-soft/60 bg-white/95 backdrop-blur-md">
      <nav
        aria-label="Visitor information"
        className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] lg:px-8"
      >
        {visitorLinks.map(({ label, href }) => {
          const active = label === current;
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 font-display text-[14px] font-medium transition ${
                active
                  ? "bg-cop-navy text-white shadow-md shadow-cop-navy/25"
                  : "text-cop-navy hover:bg-cop-mist hover:text-cop-green"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
