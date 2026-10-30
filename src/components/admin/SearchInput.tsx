"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  debounceMs = 350,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}) {
  // Typed characters update `draft` immediately for a responsive field; the parent's
  // (network-triggering) onChange only fires after the user pauses typing.
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  useEffect(() => {
    if (draft === value) return;
    const id = setTimeout(() => onChange(draft), debounceMs);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  return (
    <div className="relative w-full max-w-[280px]">
      <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-cop-ink/40" />
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-cop-blue-soft/60 bg-white py-2.5 pr-9 pl-10 text-[14px] text-cop-ink transition focus:border-cop-green focus:outline-none"
      />
      {draft && (
        <button
          type="button"
          onClick={() => setDraft("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-cop-ink/35 transition hover:text-cop-ink"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
