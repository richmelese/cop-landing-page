export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M4 20h32M20 1.5c5 5 7.5 11 7.5 18.5S25 33.5 20 38.5M20 1.5C15 6.5 12.5 12.5 12.5 20S15 33.5 20 38.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M9 11c4 3 8 3 11 0s7-3 11 0" stroke="#43b97d" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="font-display leading-none">
        <span className="block text-[20px] font-light tracking-wide">COP32</span>
        <span className="block text-[10px] font-bold tracking-[0.2em]">ETHIOPIA</span>
      </span>
    </span>
  );
}
