"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 25, 50],
}: {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
}) {
  if (total === 0) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pageNumbers = (() => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let p = Math.max(1, end - 4); p <= end; p++) pages.push(p);
    return pages;
  })();

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-cop-blue-soft/50 pt-5">
      <div className="flex items-center gap-4">
        <p className="text-[13px] text-cop-ink/55">
          Showing <span className="font-semibold text-cop-ink/80">{from}–{to}</span> of{" "}
          <span className="font-semibold text-cop-ink/80">{total}</span>
        </p>
        {onLimitChange && (
          <label className="flex items-center gap-2 text-[13px] text-cop-ink/55">
            Rows per page
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="rounded-full border border-cop-blue-soft/60 bg-white px-2.5 py-1 text-[13px] font-semibold text-cop-navy outline-none focus:border-cop-green"
            >
              {limitOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className="grid h-8 w-8 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-navy transition hover:bg-cop-mist disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageNumbers[0] > 1 && <span className="px-1 text-[13px] text-cop-ink/40">…</span>}
          {pageNumbers.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold transition ${
                p === page
                  ? "bg-cop-navy text-white"
                  : "border border-cop-blue-soft/60 text-cop-navy hover:bg-cop-mist"
              }`}
            >
              {p}
            </button>
          ))}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <span className="px-1 text-[13px] text-cop-ink/40">…</span>
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className="grid h-8 w-8 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-navy transition hover:bg-cop-mist disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
