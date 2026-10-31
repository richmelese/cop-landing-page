"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { login, setToken } from "@/lib/api";
import Logo from "@/components/Logo";
import ethiopiaEmblemArt from "../../../../public/images/ethiopia-emblem-art.png";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@cop32ethiopia.et");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { accessToken } = await login(email, password);
      setToken(accessToken);
      router.push("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cop-navy-dark px-5">
      <Image src={ethiopiaEmblemArt} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-cop-navy-dark/70 via-cop-navy-dark/55 to-cop-navy-dark/80" />

      <div className="relative w-full max-w-[460px] rounded-3xl bg-white p-10 shadow-2xl">
        <div className="flex justify-center text-cop-navy">
          <Logo />
        </div>
        <h1 className="mt-7 text-center font-display text-[23px] font-bold text-cop-navy">Admin Sign In</h1>
        <p className="mt-1.5 text-center text-[14.5px] text-cop-ink/60">Manage COP32 Ethiopia site content.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[13.5px] font-medium text-cop-ink/60">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-cop-blue-soft/60 px-4 py-2.5 text-[15px] focus:border-cop-green focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[13.5px] font-medium text-cop-ink/60">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-cop-blue-soft/60 px-4 py-2.5 text-[15px] focus:border-cop-green focus:outline-none"
            />
          </label>

          {error && <p className="text-[13.5px] font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cop-green px-5 py-3.5 font-display text-[15px] font-semibold text-white transition hover:bg-cop-mint disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
