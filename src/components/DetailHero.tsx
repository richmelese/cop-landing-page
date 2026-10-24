import Image from "next/image";
import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import addisNight from "../../public/images/addis-night.jpg";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";

const images = { night: addisNight, sunset: addisSunset, view: addisView };

export type Crumb = { label: string; href?: string };

export default function DetailHero({
  crumbs,
  eyebrow,
  title,
  summary,
  image = "night",
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  summary: string;
  image?: keyof typeof images;
}) {
  return (
    <>
      <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-cop-navy-dark pt-20 md:min-h-[520px]">
        <Image
          src={images[image]}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cop-navy-dark via-cop-navy-dark/60 to-cop-navy-dark/30" />

        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-14 lg:px-8 lg:pb-20">
          <p className="animate-fade-up font-display text-[13px] font-semibold tracking-[0.25em] text-cop-mint uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 animate-fade-up font-display text-5xl leading-[1.02] font-bold tracking-tight text-white [animation-delay:150ms] md:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-[640px] animate-fade-up text-[17px] leading-relaxed text-white/85 [animation-delay:300ms] md:text-[18px]">
            {summary}
          </p>
        </div>
      </section>

      <div className="border-b border-cop-blue-soft/50 bg-white">
        <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1320px] px-5 py-3.5 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-cop-ink/55">
            <li>
              <Link href="/" className="flex items-center gap-1.5 transition hover:text-cop-navy">
                <House className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const isCurrent = i === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {isCurrent ? (
                    <span aria-current="page" className="font-semibold text-cop-green">
                      {crumb.label}
                    </span>
                  ) : crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-cop-navy">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-cop-ink/55">{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </>
  );
}
