const BASE_URL = 'http://localhost:4000/api';

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || 'Something went wrong';
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return data;
};

export const getDentists = async () => {
  const res = await fetch(`${BASE_URL}/dentists`);
  return handleResponse(res);
};

export const createAppointment = async (payload) => {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const getAppointments = async () => {
  const res = await fetch(`${BASE_URL}/appointments`);
  return handleResponse(res);
};

