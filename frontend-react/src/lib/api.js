const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function request(path, options = {}) {
  const token = localStorage.getItem('hamnavaz_token')
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.detail || 'خطا در ارتباط با سرور')
  }
  return data
}

export const api = {
  register: (payload) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  login: async (payload) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    localStorage.setItem('hamnavaz_token', data.access_token)
    return data
  },

  logout: () => localStorage.removeItem('hamnavaz_token'),

  searchMusicians: (params = {}) => {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') query.set(key, value)
    })
    return request(`/search/musicians${query.toString() ? `?${query}` : ''}`)
  },

  searchInstruments: (q = '') => request(`/search/instruments${q ? `?q=${encodeURIComponent(q)}` : ''}`),
}
