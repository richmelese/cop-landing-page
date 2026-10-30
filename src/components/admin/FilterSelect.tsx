"use client";

import { ChevronDown } from "lucide-react";

export default function FilterSelect({
  value,
  onChange,
  options,
  placeholder = "All",
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full appearance-none rounded-full border border-cop-blue-soft/60 bg-white py-2.5 pr-9 pl-4 text-[14px] text-cop-ink transition focus:border-cop-green focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-cop-ink/40" />
    </div>
  );
}
