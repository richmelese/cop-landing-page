import type { LucideIcon } from "lucide-react";

export default function EmptyState({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-cop-blue-soft/60 bg-white py-14 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-cop-mist text-cop-ink/40">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-[14px] text-cop-ink/50">{message}</p>
    </div>
  );
}
