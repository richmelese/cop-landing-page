function AdeyAbebaFlower({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "lg"
      ? "h-10 w-10 md:h-13 md:w-13"
      : size === "sm"
        ? "h-5 w-5 md:h-6 md:w-6"
        : "h-8 w-8 md:h-10 md:w-10";

  return (
    <svg viewBox="0 0 48 48" className={`${sizeClass} shrink-0`} aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="12"
          rx="6"
          ry="11"
          fill="#f2c230"
          transform={`rotate(${i * 60} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="5.5" fill="#e0592a" />
    </svg>
  );
}

function LeafAccent() {
  return (
    <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 shrink-0 md:h-3 md:w-3" aria-hidden>
      <ellipse cx="8" cy="8" rx="4" ry="7" fill="#2f8a52" transform="rotate(35 8 8)" />
    </svg>
  );
}

const pattern: Array<"sm" | "md" | "lg" | "leaf"> = ["md", "sm", "leaf", "sm", "lg", "sm", "leaf", "md", "sm"];

export default function AdeyAbebaBorder({ count = 54, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex w-full items-center justify-between overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const kind = pattern[i % pattern.length];
        return kind === "leaf" ? <LeafAccent key={i} /> : <AdeyAbebaFlower key={i} size={kind} />;
      })}
    </div>
  );
}
