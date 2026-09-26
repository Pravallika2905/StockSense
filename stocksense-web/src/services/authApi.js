const API_BASE_URL = 'http://localhost:9095';

export function getToken() {
  return localStorage.getItem('stockSenseToken');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('stockSenseToken', token);
  } else {
    localStorage.removeItem('stockSenseToken');
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }

  return data;
}

export async function registerUser(payload) {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function forgotPassword(payload) {
  return apiRequest('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function verifyOtp(payload) {
  return apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload) {
  return apiRequest('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getProfile() {
  return apiRequest('/api/user/profile', {
    method: 'GET',
  });
}

export async function logoutUser() {
  try {
    await apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.warn('Logout request failed, continuing local logout.', error);
  }

  setToken(null);
}
