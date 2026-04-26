import api from './axiosInstance';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const resourceAPI = {
  getAll: (params) => api.get('/resources', { params }),
  getById: (id) => api.get(`/resources/${id}`),
  create: (data) => api.post('/resources', data),
  update: (id, data) => api.put(`/resources/${id}`, data),
  updateStatus: (id, status) => api.patch(`/resources/${id}/status`, { status }),
  delete: (id) => api.delete(`/resources/${id}`),
};

export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getMy: (params) => api.get('/bookings/my', { params }),
  getAll: (params) => api.get('/bookings', { params }),
  getByResource: (resourceId, params) => api.get(`/bookings/resource/${resourceId}`, { params }),
  approve: (id) => api.put(`/bookings/${id}/approve`),
  reject: (id, reason) => api.put(`/bookings/${id}/reject`, { reason }),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
};

export const ticketAPI = {
  create: (data) => api.post('/tickets', data),
  getMy: (params) => api.get('/tickets/my', { params }),
  getAll: (params) => api.get('/tickets', { params }),
  getById: (id) => api.get(`/tickets/${id}`),
  assign: (id, technicianId) => api.put(`/tickets/${id}/assign`, { technicianId }),
  updateStatus: (id, status, rejectionReason) => api.put(`/tickets/${id}/status`, { status, rejectionReason }),
  addAttachments: (id, formData) => api.post(`/tickets/${id}/attachments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const commentAPI = {
  getByTicket: (ticketId) => api.get(`/tickets/${ticketId}/comments`),
  add: (ticketId, data) => api.post(`/tickets/${ticketId}/comments`, data),
  update: (id, data) => api.put(`/comments/${id}`, data),
  delete: (id) => api.delete(`/comments/${id}`),
};

export const notificationAPI = {
  getMy: (params) => api.get('/notifications/my', { params }),
  getUnreadCount: () => api.get('/notifications/my/unread-count'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  delete: (id) => api.delete(`/notifications/${id}`),
};

export const userAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
};
