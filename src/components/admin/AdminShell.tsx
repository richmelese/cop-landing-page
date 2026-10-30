"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Globe2,
  Users,
} from "lucide-react";
import Logo from "@/components/Logo";
import { clearToken, getMe, getToken } from "@/lib/api";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Leaders", href: "/admin/leaders", icon: Users },
];

const EMAIL_CACHE_KEY = "cop_admin_email";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  // Server render always has no access to localStorage, so the initial state must match
  // that (false/"") to avoid a hydration mismatch — then a layout effect (client-only,
  // runs before paint) flips it from the cached token/email synchronously, so logged-in
  // users never see a blocking "checking session" screen or a flash of the wrong state.
  const [authorized, setAuthorized] = useState(isLoginPage);
  const [email, setEmail] = useState("");

  useLayoutEffect(() => {
    if (isLoginPage) return;
    if (getToken()) setAuthorized(true);
    try {
      const cached = window.localStorage.getItem(EMAIL_CACHE_KEY);
      if (cached) setEmail(cached);
    } catch {
      // ignore — purely a perf cache, safe to skip in private browsing
    }
  }, [isLoginPage]);

  useEffect(() => {
    if (isLoginPage) return;
    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    getMe()
      .then((me) => {
        setEmail(me.email);
        setAuthorized(true);
        try {
          window.localStorage.setItem(EMAIL_CACHE_KEY, me.email);
        } catch {
          // ignore — purely a perf cache, safe to skip in private browsing
        }
      })
      .catch(() => {
        clearToken();
        router.replace("/admin/login");
      });
    // Re-verify only when the route's auth boundary changes (login <-> admin), not on
    // every sub-page navigation — the layout instance persists across those already.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  const logout = () => {
    clearToken();
    try {
      window.localStorage.removeItem(EMAIL_CACHE_KEY);
    } catch {
      // ignore
    }
    router.push("/admin/login");
  };

  if (isLoginPage) return <>{children}</>;

  if (!authorized) {
    return (
      <div className="grid min-h-screen place-items-center bg-cop-mist">
        <p className="text-[14px] font-medium text-cop-ink/60">Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cop-mist text-cop-ink">
      <aside className="flex h-screen w-[240px] shrink-0 flex-col overflow-y-auto border-r border-cop-blue-soft/50 bg-cop-navy-dark text-white">
        <div className="flex h-16 shrink-0 items-center px-5">
          <Logo className="text-white" />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-display text-[14px] font-medium transition ${
                  active ? "bg-cop-green text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-display text-[14px] font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Globe2 className="h-4 w-4" />
            View Site
          </Link>
        </div>
      </aside>

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-cop-blue-soft/50 bg-white px-6">
          <div>
            <p className="font-display text-[13px] font-semibold tracking-[0.15em] text-cop-green uppercase">
              COP32 Admin
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13.5px] font-medium text-cop-ink/70">{email}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cop-navy font-display text-[13px] font-semibold text-white">
              {email ? email.slice(0, 2).toUpperCase() : "AM"}
            </span>
            <button
              type="button"
              onClick={logout}
              aria-label="Log out"
              className="grid h-9 w-9 place-items-center rounded-full border border-cop-blue-soft/60 text-cop-ink/60 transition hover:bg-cop-mist hover:text-cop-navy"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
