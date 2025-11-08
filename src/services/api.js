const API_URL = 'http://localhost:3001/api/auth';

export const registro = async (nombre, email, password) => {
  const response = await fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nombre, email, password })
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  });
  return response.json();
};