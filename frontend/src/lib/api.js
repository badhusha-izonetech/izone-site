const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const token = localStorage.getItem("admin_token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_auth");
      window.location.href = "/admin/login";
      return;
    }
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export const api = {
  // Auth
  login: (username, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  // Contacts
  createContact: (data) =>
    request("/api/contacts", { method: "POST", body: JSON.stringify(data) }),
  getContacts: () => request("/api/contacts"),
  deleteContact: (id) => request(`/api/contacts/${id}`, { method: "DELETE" }),
  markContactRead: (id) => request(`/api/contacts/${id}/read`, { method: "PATCH" }),

  // Job Applications
  createJobApplication: (data) =>
    request("/api/job-applications", { method: "POST", body: JSON.stringify(data) }),
  getJobApplications: () => request("/api/job-applications"),
  deleteJobApplication: (id) => request(`/api/job-applications/${id}`, { method: "DELETE" }),
  updateJobApplication: (id, data) =>
    request(`/api/job-applications/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Intern Applications
  createInternApplication: (data) =>
    request("/api/intern-applications", { method: "POST", body: JSON.stringify(data) }),
  getInternApplications: () => request("/api/intern-applications"),
  deleteInternApplication: (id) => request(`/api/intern-applications/${id}`, { method: "DELETE" }),
  updateInternApplication: (id, data) =>
    request(`/api/intern-applications/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Job Roles
  getJobRoles: () => request("/api/job-roles"),
  createJobRole: (data) =>
    request("/api/job-roles", { method: "POST", body: JSON.stringify(data) }),
  updateJobRole: (id, data) =>
    request(`/api/job-roles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteJobRole: (id) => request(`/api/job-roles/${id}`, { method: "DELETE" }),

  // Intern Roles
  getInternRoles: () => request("/api/intern-roles"),
  createInternRole: (data) =>
    request("/api/intern-roles", { method: "POST", body: JSON.stringify(data) }),
  updateInternRole: (id, data) =>
    request(`/api/intern-roles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteInternRole: (id) => request(`/api/intern-roles/${id}`, { method: "DELETE" }),

  // Clients
  getClients: () => request("/api/clients"),
  createClient: (data) =>
    request("/api/clients", { method: "POST", body: JSON.stringify(data) }),
  deleteClient: (id) => request(`/api/clients/${id}`, { method: "DELETE" }),

  // Testimonials
  getTestimonials: () => request("/api/testimonials"),
  createTestimonial: (data) =>
    request("/api/testimonials", { method: "POST", body: JSON.stringify(data) }),
  deleteTestimonial: (id) => request(`/api/testimonials/${id}`, { method: "DELETE" }),

  // Team
  getTeam: () => request("/api/team"),
  createTeamMember: (data) =>
    request("/api/team", { method: "POST", body: JSON.stringify(data) }),
  deleteTeamMember: (id) => request(`/api/team/${id}`, { method: "DELETE" }),

  // Popups
  getPopups: () => request("/api/popups"),
  createPopup: (data) =>
    request("/api/popups", { method: "POST", body: JSON.stringify(data) }),
  deletePopup: (id) => request(`/api/popups/${id}`, { method: "DELETE" }),

  // Site Photos
  getSitePhotos: () => request("/api/site-photos"),
  createSitePhoto: (data) =>
    request("/api/site-photos", { method: "POST", body: JSON.stringify(data) }),
  deleteSitePhoto: (id) => request(`/api/site-photos/${id}`, { method: "DELETE" }),

  // Project Inquiries
  createProjectInquiry: (data) =>
    request("/api/project-inquiries", { method: "POST", body: JSON.stringify(data) }),
  getProjectInquiries: () => request("/api/project-inquiries"),
  deleteProjectInquiry: (id) => request(`/api/project-inquiries/${id}`, { method: "DELETE" }),
  updateProjectInquiry: (id, data) =>
    request(`/api/project-inquiries/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Dashboard
  getDashboard: () => request("/api/dashboard"),
};
