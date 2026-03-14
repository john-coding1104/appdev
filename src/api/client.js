// src/api/client.js
import { getToken } from '../utils/tokenStorage'; // adjust path if needed

const API_BASE_URL = 'http://192.168.5.38:8000/api';

export async function fetchProtectedResource(path) {
  const token = await getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }

  return res.json();
}