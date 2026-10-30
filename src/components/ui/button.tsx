import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[14px] font-semibold font-display transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cop-green/40",
  {
    variants: {
      variant: {
        default: "bg-cop-green text-white shadow-sm hover:bg-cop-mint",
        outline:
          "border border-cop-blue-soft/60 bg-white text-cop-ink/80 hover:bg-cop-mist",
        ghost: "text-cop-ink/70 hover:bg-cop-mist",
        destructive: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
        navy: "bg-cop-navy text-white hover:bg-cop-navy-light",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4 text-[13px]",
        icon: "h-9 w-9 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
