import { CalendarRange, Flag, MapPinned, Thermometer } from "lucide-react";
import Logo from "./Logo";

// TODO: confirm figures with the COP32 organisers.
const figures = [
  { icon: Flag, value: "197", label: "Parties" },
  { icon: Thermometer, value: "1.5°C", label: "Target" },
  { icon: CalendarRange, value: "32nd", label: "Session in 2027" },
  { icon: MapPinned, value: "Addis Ababa", label: "Host City" },
];

export default function KeyFigures() {
  return (
    <section className="relative overflow-hidden bg-cop-mist">
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cop-mint/15 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-cop-blue/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1320px] px-5 py-20 lg:px-8">
        <div className="flex justify-center text-cop-navy">
          <Logo />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {figures.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="group rounded-3xl bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cop-navy/10"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cop-mint to-cop-blue text-white transition-transform duration-500 group-hover:rotate-[360deg]">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-5 font-display text-3xl font-bold text-cop-navy md:text-4xl">{value}</p>
              <p className="mt-1 text-[15px] text-cop-ink/70">{label}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-[720px] text-center font-display text-2xl font-semibold text-cop-navy md:text-3xl">
          Uniting the world in Addis Ababa{" "}
          <span className="bg-gradient-to-r from-cop-green to-cop-blue bg-clip-text text-transparent">
            for climate action
          </span>
        </p>
      </div>
    </section>
  );
}
