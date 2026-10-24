"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const HIDDEN: Record<string, string> = {
  up: "opacity-0 [transform:perspective(1200px)_translateY(48px)_rotateX(-14deg)]",
  down: "opacity-0 [transform:perspective(1200px)_translateY(-48px)_rotateX(14deg)]",
  left: "opacity-0 [transform:perspective(1200px)_translateX(-64px)_rotateY(22deg)]",
  right: "opacity-0 [transform:perspective(1200px)_translateX(64px)_rotateY(-22deg)]",
  in: "opacity-0 [transform:perspective(1200px)_rotateX(6deg)_scale(0.95)]",
};

const SHOWN =
  "opacity-100 [transform:perspective(1200px)_translateX(0)_translateY(0)_rotateX(0deg)_rotateY(0deg)_scale(1)]";

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: "up" | "down" | "left" | "right" | "in";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden [perspective:1200px] ${className}`}>
      <div
        className={`transition-all duration-1000 ease-out will-change-transform [transform-style:preserve-3d] ${visible ? SHOWN : HIDDEN[variant]}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}
