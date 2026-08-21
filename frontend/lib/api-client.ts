const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "/api").replace(/\/$/, "");

export type MusicianProfile = {
  id: string;
  user_id: number;
  display_name: string;
  city?: string | null;
  bio?: string | null;
  birth_year?: number | null;
  gender?: string | null;
  avatar_url?: string | null;
  is_verified?: boolean;
  instruments: Array<{ id: string; instrument_id: number; level?: string | null; years_experience?: number | null; is_primary?: boolean }>;
};

export type MatchResult = { user_id: number; profile_id: string; display_name: string; city?: string; match_score: number; reasons: string[] };
export type Notification = { id: number; user_id: number; title: string; text: string; is_read: boolean; created_at: string };
export type Message = { id: string; sender_profile_id: string; receiver_profile_id: string; text: string; is_read: boolean };

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("hamnavaz_token") : null;
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) throw new Error((await response.text()) || `API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const getMusician = (userId: number) => apiFetch<{ user: { id: number; is_active: boolean }; profile: MusicianProfile }>(`/musician/${userId}`);
export const getMyMatches = (limit = 20, minScore = 0) => apiFetch<MatchResult[]>(`/match/me?limit=${limit}&min_score=${minScore}`);
export const sendCollaboration = (profileId: string, message?: string) => apiFetch(`/collaboration-request/`, { method: "POST", body: JSON.stringify({ profile_id: profileId, message }) });
export const sendMessage = (receiverProfileId: string, text: string) => apiFetch(`/messages/`, { method: "POST", body: JSON.stringify({ receiver_profile_id: receiverProfileId, text }) });
export const getNotifications = () => apiFetch<Notification[]>("/notifications/");
export const markNotificationRead = (id: number) => apiFetch(`/notifications/${id}/read`, { method: "PUT" });
export const getMessages = () => apiFetch<Message[]>("/messages/");
export const getFavorites = () => apiFetch<unknown[]>("/favorites/");
export const deleteFavorite = (profileId: string) => apiFetch(`/favorites/${profileId}`, { method: "DELETE" });
export const getRatings = (profileId: string) => apiFetch<unknown[]>(`/ratings/profile/${profileId}`);
