import Image from "next/image";
import { Bell, BriefcaseBusiness, CalendarDays, Hotel, QrCode, ShieldCheck } from "lucide-react";
import qrCode from "../../public/images/superapp-qr.png";
import bgImage from "../../public/images/addis-night.jpg";

const features = [
  { icon: Hotel, title: "Accommodation", body: "Browse and book official COP32 hotels in Addis Ababa." },
  { icon: ShieldCheck, title: "Accreditation", body: "Manage your Blue Zone or Green Zone badge." },
  { icon: BriefcaseBusiness, title: "Transport & Maps", body: "Live shuttle routes and venue maps." },
  { icon: CalendarDays, title: "Programme", body: "Your personal COP32 schedule, in one place." },
  { icon: Bell, title: "Alerts", body: "Real-time updates from the Presidency." },
];

export default function SuperApp() {
  return (
    <section className="relative overflow-hidden bg-cop-navy-dark py-20 text-white lg:py-28">
      <Image
        src={bgImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-cop-navy-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-cop-navy-dark via-cop-navy-dark/85 to-cop-navy-dark/70" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cop-mint/20 blur-[120px]" />
      <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-cop-blue/25 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div>
          <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-mint uppercase">
            COP32 SuperApp
          </p>
          <h2 className="mt-4 max-w-[560px] font-display text-4xl leading-tight font-bold md:text-5xl">
            One App for Everything COP32
          </h2>
          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-white/80">
            Accommodation, accreditation, transport, and the full programme — the official COP32 SuperApp
            brings every visitor service into a single place, so you can manage your whole trip to Addis
            Ababa from your phone.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cop-mint to-cop-blue text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold text-white">{title}</p>
                  <p className="mt-1 text-[13.5px] leading-snug text-white/65">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[320px] rounded-3xl bg-white p-8 text-center text-cop-ink shadow-2xl">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-cop-mist text-cop-green">
            <QrCode className="h-5 w-5" />
          </span>
          <p className="mt-4 font-display text-[18px] font-semibold text-cop-navy">Scan to Get the App</p>
          <p className="mt-1 text-[14px] text-cop-ink/70">
            All COP32 services, including accommodation, in one app.
          </p>
          <div className="mx-auto mt-6 w-full max-w-[200px] overflow-hidden rounded-2xl border border-cop-blue-soft/60">
            <Image src={qrCode} alt="Scan to download the COP32 SuperApp" className="h-auto w-full" />
          </div>
          <p className="mt-5 text-[12px] text-cop-ink/50">Available for iOS and Android</p>
        </div>
      </div>
    </section>
  );
}
