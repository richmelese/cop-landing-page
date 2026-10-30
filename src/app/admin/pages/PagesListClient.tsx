"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Pencil } from "lucide-react";
import { getPages, getPagesPaged, type PageRow } from "@/lib/api";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/admin/EmptyState";
import FilterSelect from "@/components/admin/FilterSelect";
import ListSkeleton from "@/components/admin/ListSkeleton";
import Pagination from "@/components/admin/Pagination";
import SearchInput from "@/components/admin/SearchInput";

const DEFAULT_LIMIT = 10;

export default function PagesListClient() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [search, setSearch] = useState("");
  const [sectionLabel, setSectionLabel] = useState("");
  const [sectionOptions, setSectionOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPagesPaged({ page, limit, search: search || undefined, sectionLabel: sectionLabel || undefined })
      .then(({ items, meta }) => {
        setPages(items);
        setMeta(meta);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load pages from the backend API.");
        setLoading(false);
      });
  }, [page, limit, search, sectionLabel]);

  // Populates the section filter dropdown from every section in use, independent of
  // the current search/filter/page.
  useEffect(() => {
    getPages({ limit: 100 })
      .then((all) => setSectionOptions([...new Set(all.map((p) => p.sectionLabel))].sort()))
      .catch(() => setSectionOptions([]));
  }, []);

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearch(value);
    setPage(1);
  };

  const handleSection = (value: string) => {
    setLoading(true);
    setSectionLabel(value);
    setPage(1);
  };

  const clearFilters = () => {
    setLoading(true);
    setSearch("");
    setSectionLabel("");
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setLoading(true);
    setPage(p);
  };

  const handleLimitChange = (n: number) => {
    setLoading(true);
    setLimit(n);
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cop-blue to-cop-navy text-white">
          <FileText className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </span>
        <div>
          <h1 className="font-display text-[22px] font-bold text-cop-navy">Pages</h1>
          <p className="text-[13px] text-cop-ink/55">
            {loading ? "Loading pages…" : `${meta.total} content pages on the site`} — click a page to edit its full
            content.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-700">
          {error}
        </p>
      )}

      {/* Toolbar — search + section filter in one consolidated bar */}
      <Card className="mt-5 flex flex-wrap items-center gap-3 border-cop-blue-soft/50 px-4 py-3">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search pages by title or slug…" />
        <FilterSelect value={sectionLabel} onChange={handleSection} options={sectionOptions} placeholder="All sections" />
        <span className="ml-auto rounded-full bg-cop-mist px-3 py-1.5 font-display text-[12px] font-bold text-cop-navy">
          {meta.total} {meta.total === 1 ? "page" : "pages"}
        </span>
        {(search || sectionLabel) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[13px] font-medium text-cop-ink/55 underline-offset-2 transition hover:text-cop-navy hover:underline"
          >
            Clear filters
          </button>
        )}
      </Card>

      {loading && (
        <div className="mt-5">
          <ListSkeleton />
        </div>
      )}

      {!loading && pages.length === 0 && (
        <div className="mt-5">
          <EmptyState
            icon={FileText}
            message={search || sectionLabel ? "No pages match your search/filter." : "No pages yet in the backend database."}
          />
        </div>
      )}

      {!loading && pages.length > 0 && (
        <Card className="mt-5 overflow-hidden border-cop-blue-soft/50">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-cop-blue-soft/40 text-[11px] font-semibold tracking-wide text-cop-ink/45 uppercase">
                <th className="px-5 py-3.5">Page</th>
                <th className="px-5 py-3.5">Section</th>
                <th className="px-5 py-3.5">Slug</th>
                <th className="px-5 py-3.5">Sections</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.slug} className="group border-b border-cop-blue-soft/25 transition last:border-0 hover:bg-cop-mist/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cop-blue to-cop-navy text-white transition-transform duration-200 group-hover:scale-105">
                        <FileText className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="font-semibold text-cop-navy">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cop-mist px-2.5 py-1 text-[12px] font-medium text-cop-ink/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-cop-blue/60" />
                      {page.sectionLabel}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <code className="rounded-md bg-cop-mist px-2 py-1 font-mono text-[12px] text-cop-ink/55">
                      /{page.slug}
                    </code>
                  </td>
                  <td className="px-5 py-3 text-cop-ink/70">{page.sections?.length ?? 0}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        aria-label={`Edit ${page.title}`}
                        title="Edit"
                        className="grid h-8 w-8 place-items-center rounded-full bg-cop-navy text-white transition hover:bg-cop-navy-light"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        aria-label={`View ${page.title}`}
                        title="View"
                        className="grid h-8 w-8 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-ink/60 transition hover:bg-cop-mist hover:text-cop-navy"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {!loading && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          limit={meta.limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      )}
    </div>
  );
}
