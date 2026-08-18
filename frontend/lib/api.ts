const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

export async function searchMusicians(params: { q?: string; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 20));
  const res = await fetch(`${API_URL}/search/musicians?${query.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("جستجوی نوازنده‌ها ناموفق بود");
  return res.json() as Promise<{ total: number; page: number; limit: number; results: Musician[] }>;
}

export async function getMusician(id: string) {
  const res = await fetch(`${API_URL}/musician/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("پروفایل نوازنده پیدا نشد");
  return res.json() as Promise<{ profile: Musician; instruments: Array<Record<string, unknown>> }>;
}
