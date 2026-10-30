import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-xl border border-cop-blue-soft/60 bg-white px-3.5 py-2.5 text-[14px] text-cop-ink transition outline-none placeholder:text-cop-ink/40 focus:border-cop-green focus:ring-2 focus:ring-cop-green/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
