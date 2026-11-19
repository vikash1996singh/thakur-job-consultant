/**
 * Thakur Job Consultancy — Spring Boot API Client Service
 * Connects React frontend directly to Spring Boot REST backend on http://localhost:8080/api
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('tk_jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // 1. Auth APIs
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.data?.token) {
        sessionStorage.setItem('tk_jwt_token', data.data.token);
        sessionStorage.setItem('tk_logged_user', JSON.stringify(data.data));
      }
      return data;
    },

    adminLogin: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.data?.token) {
        sessionStorage.setItem('tk_jwt_token', data.data.token);
        sessionStorage.setItem('tk_admin_auth', 'true');
        sessionStorage.setItem('tk_logged_user', JSON.stringify(data.data));
      }
      return data;
    },

    register: async (userData) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return res.json();
    },

    getProfile: async () => {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    logout: () => {
      sessionStorage.removeItem('tk_jwt_token');
      sessionStorage.removeItem('tk_logged_user');
      sessionStorage.removeItem('tk_admin_auth');
    }
  },

  // 2. Jobs APIs
  jobs: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/jobs${query ? `?${query}` : ''}`);
      return res.json();
    },

    getById: async (id) => {
      const res = await fetch(`${API_BASE}/jobs/${id}`);
      return res.json();
    },

    create: async (jobData) => {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(jobData)
      });
      return res.json();
    },

    updateStatus: async (id, status) => {
      const res = await fetch(`${API_BASE}/jobs/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return res.json();
    },

    getCategories: async () => {
      const res = await fetch(`${API_BASE}/jobs/categories`);
      return res.json();
    },

    getLocations: async () => {
      const res = await fetch(`${API_BASE}/jobs/locations`);
      return res.json();
    }
  },

  // 3. Applications APIs
  applications: {
    apply: async (applicationData) => {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData)
      });
      return res.json();
    },

    publicApply: async (applicationData) => {
      const res = await fetch(`${API_BASE}/applications/public-apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      return res.json();
    },

    getMy: async () => {
      const res = await fetch(`${API_BASE}/applications/my`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    getByJob: async (jobId) => {
      const res = await fetch(`${API_BASE}/applications/job/${jobId}`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    updateStatus: async (id, status) => {
      const res = await fetch(`${API_BASE}/applications/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return res.json();
    }
  },

  // 4. Resume APIs
  resumes: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const token = sessionStorage.getItem('tk_jwt_token');
      const res = await fetch(`${API_BASE}/resumes/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
      return res.json();
    },

    getMyProfile: async () => {
      const res = await fetch(`${API_BASE}/resumes/my`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    updateProfile: async (profileData) => {
      const res = await fetch(`${API_BASE}/resumes/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      return res.json();
    }
  },

  // 5. Admin APIs
  admin: {
    getMetrics: async () => {
      const res = await fetch(`${API_BASE}/admin/metrics`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    getAuditLogs: async () => {
      const res = await fetch(`${API_BASE}/admin/audit-logs`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    approveJob: async (id) => {
      const res = await fetch(`${API_BASE}/admin/jobs/${id}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    rejectJob: async (id) => {
      const res = await fetch(`${API_BASE}/admin/jobs/${id}/reject`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // 6. Companies APIs
  companies: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/companies`);
      return res.json();
    },

    toggleVerify: async (id) => {
      const res = await fetch(`${API_BASE}/companies/${id}/verify`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // 7. Site Settings APIs
  settings: {
    get: async () => {
      const res = await fetch(`${API_BASE}/settings`);
      return res.json();
    },

    update: async (settingsData) => {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settingsData)
      });
      return res.json();
    }
  }
};

export default api;
