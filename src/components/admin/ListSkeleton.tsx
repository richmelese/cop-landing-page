export default function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-cop-blue-soft/60 bg-white p-5">
          <div className="h-3.5 w-24 rounded-full bg-cop-mist" />
          <div className="mt-3 h-4 w-2/3 rounded-full bg-cop-mist" />
          <div className="mt-2 h-3.5 w-1/2 rounded-full bg-cop-mist" />
        </div>
      ))}
    </div>
  );
}
