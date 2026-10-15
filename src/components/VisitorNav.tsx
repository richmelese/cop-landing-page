const links = [
  "Accreditation",
  "Flight Ticket",
  "Accommodation",
  "Transport & Digital Maps",
  "Visa and Entry",
  "Plan Your Travel",
  "Shipping & Logistics",
  "Interpretation",
  "FAQ",
];

export default function VisitorNav() {
  return (
    <div className="sticky top-20 z-40 border-b border-cop-blue-soft/60 bg-white/95 backdrop-blur-md">
      <nav
        aria-label="Visitor information"
        className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] lg:px-8"
      >
        {links.map((link) => {
          const active = link === "Accommodation";
          return (
            <a
              key={link}
              href="#"
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 font-display text-[14px] font-medium transition ${
                active
                  ? "bg-cop-navy text-white shadow-md shadow-cop-navy/25"
                  : "text-cop-navy hover:bg-cop-mist hover:text-cop-green"
              }`}
            >
              {link}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
