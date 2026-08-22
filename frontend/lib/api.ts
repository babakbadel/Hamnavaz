const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new ApiError(res.status === 404 ? "منبع پیدا نشد" : "ارتباط با سرویس همنواز ناموفق بود", res.status);
  }
  return res.json() as Promise<T>;
}

export type Musician = {
  id: string;
  user_id: number;
  display_name: string;
  city_name?: string | null;
  city?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  is_verified?: boolean;
  is_online?: boolean;
};

export type MusicianSearchParams = {
  q?: string;
  page?: number;
  limit?: number;
  city_id?: number;
  instrument_id?: string;
  level?: string;
  online?: boolean;
};

export async function searchMusicians(params: MusicianSearchParams = {}) {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 20));
  if (params.q?.trim()) query.set("q", params.q.trim());
  if (params.city_id != null) query.set("city_id", String(params.city_id));
  if (params.instrument_id) query.set("instrument_id", params.instrument_id);
  if (params.level) query.set("level", params.level);
  if (params.online) query.set("online", "true");
  return request<{
    total: number;
    page: number;
    limit: number;
    pages: number;
    results: Musician[];
  }>(`/search/musicians?${query.toString()}`);
}

export async function getMusician(id: string) {
  return request<{
    user?: Record<string, unknown>;
    profile: Musician;
    instruments: Array<Record<string, unknown>>;
  }>(`/musician/${encodeURIComponent(id)}`);
}
