"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Pencil } from "lucide-react";
import { getPages } from "@/lib/api";

type PageRow = { slug: string; title: string; sectionLabel: string; sections: unknown[] };

export default function PagesListClient() {
  const [pages, setPages] = useState<PageRow[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPages()
      .then(setPages)
      .catch(() => setError("Could not load pages from the backend API."));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-cop-navy">Pages</h1>
          <p className="mt-1 text-[14px] text-cop-ink/60">
            {pages ? `All ${pages.length} content pages on the site.` : "Loading pages…"} Click a page to edit its
            full content.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      {pages && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-cop-blue-soft/60 bg-white">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-cop-blue-soft/60 bg-cop-mist text-[12px] font-semibold tracking-wide text-cop-ink/60 uppercase">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Section</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Sections</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.slug} className="border-b border-cop-blue-soft/40 last:border-0 hover:bg-cop-mist/50">
                  <td className="px-5 py-3.5 font-semibold text-cop-navy">{page.title}</td>
                  <td className="px-5 py-3.5 text-cop-ink/70">{page.sectionLabel}</td>
                  <td className="px-5 py-3.5 font-mono text-[12.5px] text-cop-ink/50">/{page.slug}</td>
                  <td className="px-5 py-3.5 text-cop-ink/70">{page.sections?.length ?? 0}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cop-navy px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-cop-navy-light"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-full border border-cop-blue-soft/60 px-3.5 py-1.5 text-[12.5px] font-semibold text-cop-ink/70 transition hover:bg-cop-mist"
                      >
                        View <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-cop-ink/50">
                    No pages yet in the backend database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
