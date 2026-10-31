import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import type { NewsPost } from "@/lib/api";
import adeyAbebaPattern from "../../public/images/adey-abeba-pattern.png";

export default function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-cop-blue-soft/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cop-navy/10"
    >
      <div className="relative h-40 shrink-0 overflow-hidden bg-gradient-to-br from-cop-navy to-cop-green-dark">
        <Image src={adeyAbebaPattern} alt="" fill className="object-cover opacity-[0.12]" />
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 40 40" className="h-14 w-14 text-white/85" fill="none" aria-hidden>
            <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M4 20h32M20 1.5c5 5 7.5 11 7.5 18.5S25 33.5 20 38.5M20 1.5C15 6.5 12.5 12.5 12.5 20S15 33.5 20 38.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M9 11c4 3 8 3 11 0s7-3 11 0" stroke="#43b97d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-white uppercase shadow-sm">
          <Newspaper className="h-3 w-3" /> News
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-block w-fit rounded-full bg-cop-mist px-2.5 py-0.5 text-[11.5px] font-semibold text-cop-navy">
          {post.category}
        </span>
        <h3 className="mt-2.5 font-display text-[16.5px] leading-snug font-bold text-cop-navy">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-cop-ink/65">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between border-t border-cop-blue-soft/30 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11.5px] font-semibold text-red-600">
            <CalendarDays className="h-3.5 w-3.5" /> {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-cop-green transition-all duration-200 group-hover:gap-2.5">
            Read more
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cop-green/10 transition group-hover:bg-cop-green group-hover:text-white">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
