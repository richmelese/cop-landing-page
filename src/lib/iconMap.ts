import {
  Briefcase,
  Building2,
  Factory,
  FileCheck2,
  Flame,
  GraduationCap,
  Globe2,
  HeartHandshake,
  Hotel,
  Landmark,
  Megaphone,
  Plane,
  Radio,
  Recycle,
  Rocket,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  Truck,
  Users,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Building2,
  Factory,
  FileCheck2,
  Flame,
  GraduationCap,
  Globe2,
  HeartHandshake,
  Hotel,
  Landmark,
  Megaphone,
  Plane,
  Radio,
  Recycle,
  Rocket,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  Truck,
  Users,
  Wind,
  Zap,
};

/**
 * Page content fetched from the backend stores `icon` fields as string names
 * (Json columns can't hold React components). This walks the fetched object
 * and swaps every `icon: "Name"` back into the actual lucide-react component,
 * so it can be rendered exactly like the old statically-imported content.
 */
export function hydrateIcons<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => hydrateIcons(item)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(([key, v]) => {
      if (key === "icon" && typeof v === "string") {
        return [key, iconMap[v] ?? Building2];
      }
      return [key, hydrateIcons(v)];
    });
    return Object.fromEntries(entries) as T;
  }
  return value;
}
