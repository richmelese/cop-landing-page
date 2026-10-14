export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative grid place-items-center rounded-full border border-current ${className}`}
    >
      <span className="absolute inset-1 rounded-full border border-dashed border-current opacity-60" />
      <span className="font-serif italic leading-none">C</span>
    </span>
  );
}
