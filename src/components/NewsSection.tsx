"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getNews, type NewsPost } from "@/lib/api";
import NewsCard from "./NewsCard";

export default function NewsSection() {
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    getNews({ limit: 3 })
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-20 lg:px-8 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-display text-[13px] font-semibold tracking-[0.25em] text-cop-green uppercase">
            Latest News
          </p>
          <h2 className="mt-4 max-w-[640px] font-display text-4xl leading-tight font-bold text-cop-navy md:text-5xl">
            COP32 Updates
          </h2>
        </div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-cop-green transition hover:gap-3"
        >
          All News <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-7 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
