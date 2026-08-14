const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API ${response.status}: ${text || response.statusText}`
    );
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function getMusicians() {
  return request("/musician/");
}

export async function getInstruments() {
  return request("/instrument/");
}

export async function searchMusicians(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const suffix = query.toString()
    ? `?${query.toString()}`
    : "";

  return request(`/search/musicians${suffix}`);
}

export async function getBands() {
  return request("/band/");
}

export async function getCollaborations() {
  return request("/collaboration-request/inbox");
}

export async function getHealth() {
  return request("/health");
}

export async function getSystemHealth() {
  return request("/system/health");
}

export async function getMusicianInstruments(userId) {
  return request(`/musician-instrument/${userId}`);
}
