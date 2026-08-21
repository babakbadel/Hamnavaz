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
  instruments: Array<{
    id: string;
    instrument_id: number;
    level?: string | null;
    years_experience?: number | null;
    is_primary?: boolean;
  }>;
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("hamnavaz_token") : null;
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE}${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getMusician(userId: number) {
  return apiFetch<{ user: { id: number; is_active: boolean }; profile: MusicianProfile }>(`/musician/${userId}`);
}

export function getMyMatches(limit = 20, minScore = 0) {
  return apiFetch<Array<{ user_id: number; profile_id: string; display_name: string; city?: string; match_score: number; reasons: string[] }>>(`/match/me?limit=${limit}&min_score=${minScore}`);
}

export function sendCollaboration(profileId: string, message?: string) {
  return apiFetch(`/collaboration-request/`, {
    method: "POST",
    body: JSON.stringify({ profile_id: profileId, message }),
  });
}

export function sendMessage(receiverProfileId: string, text: string) {
  return apiFetch(`/messages/`, {
    method: "POST",
    body: JSON.stringify({ receiver_profile_id: receiverProfileId, text }),
  });
}
