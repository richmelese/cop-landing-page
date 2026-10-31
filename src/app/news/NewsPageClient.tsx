"use client";

import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";
import { getNews, getNewsPaged, type NewsPost } from "@/lib/api";
import EmptyState from "@/components/admin/EmptyState";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/admin/Pagination";

const LIMIT = 9;

export default function NewsPageClient() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: LIMIT, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNewsPaged({ page, limit: LIMIT, category: category || undefined })
      .then(({ items, meta }) => {
        setPosts(items);
        setMeta(meta);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load news from the backend API.");
        setLoading(false);
      });
  }, [page, category]);

  useEffect(() => {
    getNews({ limit: 100 })
      .then((all) => setCategories([...new Set(all.map((p) => p.category))].sort()))
      .catch(() => setCategories([]));
  }, []);

  const handleCategory = (value: string) => {
    setLoading(true);
    setCategory(value);
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setLoading(true);
    setPage(p);
  };

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-14 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-center gap-2.5">
        {["", ...categories].map((c) => (
          <button
            key={c || "all"}
            type="button"
            onClick={() => handleCategory(c)}
            className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition ${
              category === c
                ? "bg-cop-blue text-white shadow-sm shadow-cop-blue/30"
                : "border border-cop-blue-soft/60 bg-white text-cop-ink/70 hover:bg-cop-mist"
            }`}
          >
            {c || "All"}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      {loading && (
        <div className="mt-8 grid gap-7 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[340px] animate-pulse rounded-3xl bg-cop-mist" />
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="mt-8">
          <EmptyState icon={Newspaper} message="No news posts yet." />
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="mt-8 grid gap-7 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!loading && (
        <Pagination page={meta.page} totalPages={meta.totalPages} total={meta.total} limit={meta.limit} onPageChange={handlePageChange} />
      )}
    </section>
  );
}
