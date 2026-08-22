const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

function authHeaders(init?: RequestInit): Headers {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("hamnavaz_token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: authHeaders(init),
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = "ارتباط با سرویس همنواز ناموفق بود";
    try {
      const body = await res.json();
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      // Keep the stable fallback error message when the response is not JSON.
    }
    throw new ApiError(detail, res.status);
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
  last_seen_at?: string | null;
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

export type MatchResult = {
  user_id: number;
  profile_id: string;
  display_name: string;
  city?: string;
  match_score: number;
  reasons: string[];
};

export type Notification = {
  id: number;
  user_id: number;
  title: string;
  text: string;
  is_read: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  sender_profile_id: string;
  receiver_profile_id: string;
  text: string;
  is_read: boolean;
  created_at?: string;
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

export const getMyMatches = (limit = 20, minScore = 0) =>
  request<MatchResult[]>(`/match/me?limit=${limit}&min_score=${minScore}`);

export const sendCollaboration = (profileId: string, message?: string) =>
  request(`/collaboration-request/`, {
    method: "POST",
    body: JSON.stringify({ profile_id: profileId, message }),
  });

export const sendMessage = (receiverProfileId: string, text: string) =>
  request(`/messages/`, {
    method: "POST",
    body: JSON.stringify({ receiver_profile_id: receiverProfileId, text }),
  });

export const getNotifications = () => request<Notification[]>("/notifications/");
export const markNotificationRead = (id: number) => request(`/notifications/${id}/read`, { method: "PUT" });
export const getMessages = () => request<Message[]>("/messages/");
export const getFavorites = () => request<unknown[]>("/favorites/");
export const deleteFavorite = (profileId: string) => request(`/favorites/${encodeURIComponent(profileId)}`, { method: "DELETE" });
export const getRatings = (profileId: string) => request<unknown[]>(`/ratings/profile/${encodeURIComponent(profileId)}`);
