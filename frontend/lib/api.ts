const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export type Musician = {
  id: string;
  user_id: number;
  display_name: string;
  city_name?: string | null;
  city?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  is_verified?: boolean;
};

export type MusicianSearchParams = {
  q?: string;
  page?: number;
  limit?: number;
  city_id?: number;
  instrument_id?: string;
  level?: string;
};

export async function searchMusicians(params: MusicianSearchParams = {}) {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 20));
  if (params.q?.trim()) query.set("q", params.q.trim());
  if (params.city_id != null) query.set("city_id", String(params.city_id));
  if (params.instrument_id) query.set("instrument_id", params.instrument_id);
  if (params.level) query.set("level", params.level);

  const res = await fetch(`${API_URL}/search/musicians?${query.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("جستجوی نوازنده‌ها ناموفق بود");
  return res.json() as Promise<{
    total: number;
    page: number;
    limit: number;
    results: Musician[];
  }>;
}

export async function getMusician(id: string) {
  const res = await fetch(`${API_URL}/musician/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("پروفایل نوازنده پیدا نشد");
  return res.json() as Promise<{
    user?: Record<string, unknown>;
    profile: Musician;
    instruments: Array<Record<string, unknown>>;
  }>;
}
