const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const ASSET_ORIGIN = API_URL.replace(/\/api\/?$/, "");
const TOKEN_KEY = "cop_admin_token";

/**
 * Uploaded files are served from the backend's static /uploads path, not under /api —
 * so only /uploads/* paths need the backend origin prefixed. Other paths (e.g. /images/*)
 * are Next.js public assets served by the frontend itself and must be left untouched.
 */
export function assetUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${ASSET_ORIGIN}${path}`;
  return path;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

// The backend wraps every response in a common envelope:
//   success: { success: true, data: T, meta?: { page, limit, total, totalPages } }
//   error:   { success: false, error: { statusCode, error, message, path, timestamp } }
type ApiEnvelope<T> =
  | { success: true; data: T; meta?: { page: number; limit: number; total: number; totalPages: number } }
  | { success: false; error: { statusCode: number; error: string; message: string | string[]; path: string; timestamp: string } };

function errorMessageFrom(body: unknown, status: number): string {
  const envelope = body as Partial<ApiEnvelope<unknown>> | undefined;
  if (envelope && envelope.success === false && envelope.error) {
    const { message } = envelope.error;
    return Array.isArray(message) ? message.join(", ") : message;
  }
  return `Request failed with status ${status}`;
}

async function unwrap<T>(res: Response, fallbackMessage: string): Promise<T> {
  const body = await res.json().catch(() => undefined);

  if (!res.ok) {
    throw new ApiError(res.status, body ? errorMessageFrom(body, res.status) : fallbackMessage);
  }

  const envelope = body as ApiEnvelope<T> | undefined;
  if (envelope && typeof envelope === "object" && "success" in envelope && envelope.success) {
    return envelope.data;
  }
  // Fallback for any response that isn't wrapped in the common envelope (e.g. static files).
  return body as T;
}

export type PaginationQuery = { page?: number; limit?: number; search?: string };

function buildQuery(params?: Record<string, string | number | undefined>): string {
  if (!params) return "";
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") usp.set(key, String(value));
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

async function request<T>(path: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { cache: "no-store", ...options, headers });
  return unwrap<T>(res, `Request failed with status ${res.status}`);
}

// --- Uploads ---
export async function uploadFile(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append("file", file);
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/uploads`, { method: "POST", headers, body: form });
  return unwrap<{ url: string }>(res, `Upload failed with status ${res.status}`);
}

// --- Auth ---
export function login(email: string, password: string) {
  return request<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getMe() {
  return request<{ email: string }>("/auth/me", {}, true);
}

/**
 * The backend deliberately never echoes the user id in a response body — it's
 * only present in the accessToken's own `sub` claim. Decode it client-side here
 * if it's ever needed, rather than asking the API to expose it a second time.
 */
export function getUserIdFromToken(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payloadB64 = token.split(".")[1];
    const json = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

// --- Dashboard ---
export function getDashboardStats() {
  return request<{
    pages: number;
    news: number;
    faq: number;
    sponsorSlots: number;
    sponsorTiers: number;
    leaders: number;
  }>("/dashboard/stats");
}

// --- Pages ---
export function getPages(query?: PaginationQuery & { sectionLabel?: string }) {
  return request<Array<{ slug: string; title: string; sectionLabel: string; sections: unknown[] }>>(
    `/pages${buildQuery(query)}`,
  );
}

export function getPage(slug: string) {
  return request<Record<string, unknown>>(`/pages/${slug}`);
}

export function updatePage(slug: string, data: Record<string, unknown>) {
  return request<Record<string, unknown>>(
    `/pages/${slug}`,
    { method: "PATCH", body: JSON.stringify(data) },
    true,
  );
}

// --- News ---
export type NewsPost = { id: string; category: string; date: string; title: string; excerpt: string; order: number };

export function getNews(query?: PaginationQuery & { category?: string }) {
  return request<NewsPost[]>(`/news${buildQuery(query)}`);
}

export function createNews(data: Omit<NewsPost, "id" | "order">) {
  return request<NewsPost>("/news", { method: "POST", body: JSON.stringify(data) }, true);
}

export function updateNews(id: string, data: Partial<Omit<NewsPost, "id">>) {
  return request<NewsPost>(`/news/${id}`, { method: "PATCH", body: JSON.stringify(data) }, true);
}

export function deleteNews(id: string) {
  return request<void>(`/news/${id}`, { method: "DELETE" }, true);
}

// --- Sponsors ---
export type SponsorSlot = { id: string; category: string; status: string; order: number; tierId: string };
export type SponsorTier = { id: string; name: string; order: number; slots: SponsorSlot[] };

export function getSponsorTiers(query?: PaginationQuery) {
  return request<SponsorTier[]>(`/sponsors/tiers${buildQuery(query)}`);
}

export function createSponsorTier(name: string) {
  return request<SponsorTier>("/sponsors/tiers", { method: "POST", body: JSON.stringify({ name }) }, true);
}

export function updateSponsorTier(id: string, data: { name?: string; order?: number }) {
  return request<SponsorTier>(`/sponsors/tiers/${id}`, { method: "PATCH", body: JSON.stringify(data) }, true);
}

export function deleteSponsorTier(id: string) {
  return request<void>(`/sponsors/tiers/${id}`, { method: "DELETE" }, true);
}

export function createSponsorSlot(tierId: string, category: string) {
  return request<SponsorSlot>(
    `/sponsors/tiers/${tierId}/slots`,
    { method: "POST", body: JSON.stringify({ category }) },
    true,
  );
}

export function updateSponsorSlot(id: string, data: { category?: string; status?: string }) {
  return request<SponsorSlot>(`/sponsors/tiers/slots/${id}`, { method: "PATCH", body: JSON.stringify(data) }, true);
}

export function deleteSponsorSlot(id: string) {
  return request<void>(`/sponsors/tiers/slots/${id}`, { method: "DELETE" }, true);
}

// --- FAQ ---
export type FaqEntry = { id: string; question: string; answer: string; order: number };

export function getFaq(query?: PaginationQuery) {
  return request<FaqEntry[]>(`/faq${buildQuery(query)}`);
}

export function createFaq(data: { question: string; answer: string }) {
  return request<FaqEntry>("/faq", { method: "POST", body: JSON.stringify(data) }, true);
}

export function updateFaq(id: string, data: Partial<{ question: string; answer: string }>) {
  return request<FaqEntry>(`/faq/${id}`, { method: "PATCH", body: JSON.stringify(data) }, true);
}

export function deleteFaq(id: string) {
  return request<void>(`/faq/${id}`, { method: "DELETE" }, true);
}

// --- Leaders ---
export type LeaderColor = "navy" | "green" | "blue";
export type Leader = {
  id: string;
  tag: string;
  name: string;
  role: string;
  quote: string;
  image?: string | null;
  color: LeaderColor;
  order: number;
};

export function getLeaders(query?: PaginationQuery & { tag?: string; color?: LeaderColor }) {
  return request<Leader[]>(`/leaders${buildQuery(query)}`);
}

export function createLeader(data: {
  tag: string;
  name: string;
  role: string;
  quote: string;
  color: LeaderColor;
  image?: string;
}) {
  return request<Leader>("/leaders", { method: "POST", body: JSON.stringify(data) }, true);
}

export function updateLeader(id: string, data: Partial<Omit<Leader, "id" | "order">>) {
  return request<Leader>(`/leaders/${id}`, { method: "PATCH", body: JSON.stringify(data) }, true);
}

export function deleteLeader(id: string) {
  return request<void>(`/leaders/${id}`, { method: "DELETE" }, true);
}
