import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

// Create ticket (multipart)
export const createTicket = (ticketData, images) => {
  const formData = new FormData();
  formData.append('ticket', JSON.stringify(ticketData));
  if (images && images.length > 0) {
    images.forEach((img) => formData.append('images', img));
  }
  return api.post('/tickets', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Get all tickets
export const getAllTickets = () => api.get('/tickets');

// Get a single ticket by id
export const getTicket = (id) => api.get(`/tickets/${id}`);

// Get my tickets
export const getMyTickets = (userId) => api.get(`/tickets/my?userId=${userId}`);

// Assign technician
export const assignTechnician = (id, technician) =>
  api.put(`/tickets/${id}/assign`, { assignedTechnician: technician });

// Update status
export const updateStatus = (id, status, reason) =>
  api.put(`/tickets/${id}/status`, { status, reason });

// Add comment
export const addComment = (id, author, message) =>
  api.post(`/tickets/${id}/comment`, { author, message });

// Image URL helper
export const getImageUrl = (filename) => `${BASE_URL}/uploads/${filename}`;

export default api;
