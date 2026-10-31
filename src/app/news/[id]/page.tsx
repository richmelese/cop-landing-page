import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import DetailHero from "@/components/DetailHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ApiError, getNewsPost, type NewsPost } from "@/lib/api";

export const instant = false;

async function getPost(id: string): Promise<NewsPost | null> {
  try {
    return await getNewsPost(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const post = await getPost((await params).id);
  if (!post) return {};
  return { title: `${post.title} | COP32 Ethiopia`, description: post.excerpt };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPost((await params).id);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <DetailHero
          eyebrow={post.category}
          title={post.title}
          summary={post.excerpt}
          image="night"
          crumbs={[{ label: "News & Announcements", href: "/news" }, { label: post.title }]}
        />

        <article className="mx-auto w-full max-w-[760px] px-5 py-14 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cop-mist px-3 py-1 text-[12.5px] font-semibold text-cop-navy">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[12.5px] font-semibold text-red-600">
              <CalendarDays className="h-3.5 w-3.5" /> {post.date}
            </span>
          </div>

          <p className="mt-6 text-[17px] leading-relaxed text-cop-ink/80 md:text-[18px]">{post.excerpt}</p>

          <p className="mt-6 text-[14px] leading-relaxed text-cop-ink/50 italic">
            Full coverage of this update will be published as the COP32 Presidency releases further detail.
          </p>

          <Link
            href="/news"
            className="mt-10 inline-flex items-center gap-2 font-display text-[14.5px] font-semibold text-cop-green transition hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" /> Back to News &amp; Announcements
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
