import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(null);

const STORAGE_LIMIT_NOTE = "Resume file was omitted because browser storage space is limited.";

const STORAGE_KEYS = {
  auth: "admin_auth",
  popups: "admin_popups",
  testimonials: "admin_testimonials",
  jobRoles: "admin_jobroles",
  contacts: "admin_contacts",
  interns: "admin_interns",
  clients: "admin_clients",
  internApplications: "admin_intern_apps",
  jobApplications: "admin_job_apps",
  teamMembers: "admin_team",
  internRoles: "admin_intern_roles",
  sitePhotos: "admin_site_photos",
  readIds: "admin_read_ids",
  serviceRequests: "admin_service_requests",
};

const load = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const persist = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.warn(`[AdminContext] localStorage quota exceeded for key "${key}".`);
    }
    return false;
  }
};

const compressImage = (dataUrl, maxW = 800, quality = 0.7) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = dataUrl;
  });

const makeCrud = (setter) => ({
  add: (item) => setter((items) => [...items, { ...item, id: Date.now().toString() }]),
  update: (id, item) => setter((items) => items.map((entry) => (entry.id === id ? { ...entry, ...item } : entry))),
  remove: (id) => setter((items) => items.filter((entry) => entry.id !== id)),
});

const stripStoredResume = (item) => {
  if (!item?.resume) return item;
  return {
    ...item,
    resume: "",
    attachmentStatus: item.attachmentStatus || STORAGE_LIMIT_NOTE,
  };
};

const compactApplicationsForStorage = (items) => {
  let changed = false;
  const compacted = items.map((item) => {
    if (!item?.resume) return item;
    changed = true;
    return stripStoredResume(item);
  });
  return changed ? compacted : items;
};

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => load(STORAGE_KEYS.auth, false) && !!localStorage.getItem("admin_token")
  );
  const [popups, setPopups] = useState(() => load(STORAGE_KEYS.popups, []));
  const [testimonials, setTestimonials] = useState(() => load(STORAGE_KEYS.testimonials, []));
  const [jobRoles, setJobRoles] = useState(() => load(STORAGE_KEYS.jobRoles, []));
  const [contacts, setContacts] = useState(() => load(STORAGE_KEYS.contacts, []));
  const [interns, setInterns] = useState(() => load(STORAGE_KEYS.interns, []));
  const [clients, setClients] = useState(() => load(STORAGE_KEYS.clients, []));
  const [internApplications, setInternApplications] = useState(() => load(STORAGE_KEYS.internApplications, []));
  const [jobApplications, setJobApplications] = useState(() => load(STORAGE_KEYS.jobApplications, []));
  const [teamMembers, setTeamMembers] = useState(() => load(STORAGE_KEYS.teamMembers, []));
  const [internRoles, setInternRoles] = useState(() => load(STORAGE_KEYS.internRoles, []));
  const [sitePhotos, setSitePhotos] = useState(() => load(STORAGE_KEYS.sitePhotos, []));
  const [readIds, setReadIds] = useState(() => load(STORAGE_KEYS.readIds, []));
  const [serviceRequests, setServiceRequests] = useState(() => load(STORAGE_KEYS.serviceRequests, []));

  useEffect(() => { persist(STORAGE_KEYS.popups, popups); }, [popups]);
  useEffect(() => { persist(STORAGE_KEYS.testimonials, testimonials); }, [testimonials]);
  useEffect(() => { persist(STORAGE_KEYS.jobRoles, jobRoles); }, [jobRoles]);
  useEffect(() => { persist(STORAGE_KEYS.contacts, contacts); }, [contacts]);
  useEffect(() => { persist(STORAGE_KEYS.interns, interns); }, [interns]);
  useEffect(() => { persist(STORAGE_KEYS.clients, clients); }, [clients]);
  useEffect(() => { persist(STORAGE_KEYS.internApplications, internApplications); }, [internApplications]);
  useEffect(() => { persist(STORAGE_KEYS.jobApplications, jobApplications); }, [jobApplications]);
  useEffect(() => { persist(STORAGE_KEYS.teamMembers, teamMembers); }, [teamMembers]);
  useEffect(() => { persist(STORAGE_KEYS.internRoles, internRoles); }, [internRoles]);
  useEffect(() => { persist(STORAGE_KEYS.sitePhotos, sitePhotos); }, [sitePhotos]);
  useEffect(() => { persist(STORAGE_KEYS.readIds, readIds); }, [readIds]);
  useEffect(() => { persist(STORAGE_KEYS.serviceRequests, serviceRequests); }, [serviceRequests]);

  useEffect(() => {
    const bindings = {
      [STORAGE_KEYS.auth]: { setter: setIsAdminLoggedIn, fallback: false },
      [STORAGE_KEYS.popups]: { setter: setPopups, fallback: [] },
      [STORAGE_KEYS.testimonials]: { setter: setTestimonials, fallback: [] },
      [STORAGE_KEYS.jobRoles]: { setter: setJobRoles, fallback: [] },
      [STORAGE_KEYS.contacts]: { setter: setContacts, fallback: [] },
      [STORAGE_KEYS.interns]: { setter: setInterns, fallback: [] },
      [STORAGE_KEYS.clients]: { setter: setClients, fallback: [] },
      [STORAGE_KEYS.internApplications]: { setter: setInternApplications, fallback: [] },
      [STORAGE_KEYS.jobApplications]: { setter: setJobApplications, fallback: [] },
      [STORAGE_KEYS.teamMembers]: { setter: setTeamMembers, fallback: [] },
      [STORAGE_KEYS.internRoles]: { setter: setInternRoles, fallback: [] },
      [STORAGE_KEYS.sitePhotos]: { setter: setSitePhotos, fallback: [] },
      [STORAGE_KEYS.readIds]: { setter: setReadIds, fallback: [] },
      [STORAGE_KEYS.serviceRequests]: { setter: setServiceRequests, fallback: [] },
    };

    const syncFromStorage = (event) => {
      if (event.storageArea !== window.localStorage || !event.key) return;
      const binding = bindings[event.key];
      if (!binding) return;
      binding.setter(load(event.key, binding.fallback));
    };

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const addPersistentApplication = (setter, storageKey, item) =>
    setter((items) => {
      const next = [...items, item];
      if (persist(storageKey, next)) return next;

      const compacted = compactApplicationsForStorage(next);
      if (compacted !== next && persist(storageKey, compacted)) return compacted;

      console.warn(`[AdminContext] Unable to persist "${storageKey}". Keeping the latest application in memory only.`);
      return compacted;
    });

  const adminLogin = (token) => {
    localStorage.setItem("admin_token", token);
    persist(STORAGE_KEYS.auth, true);
    setIsAdminLoggedIn(true);
  };

  const adminLogout = () => {
    localStorage.removeItem("admin_token");
    persist(STORAGE_KEYS.auth, false);
    setIsAdminLoggedIn(false);
  };

  const addInternApplication = (item) =>
    addPersistentApplication(
      setInternApplications,
      STORAGE_KEYS.internApplications,
      { ...item, id: Date.now().toString(), date: new Date().toLocaleDateString(), status: "Pending", createdAt: Date.now() }
    );

  const addJobApplication = (item) =>
    addPersistentApplication(
      setJobApplications,
      STORAGE_KEYS.jobApplications,
      { ...item, id: Date.now().toString(), date: new Date().toLocaleDateString(), status: "Pending", createdAt: Date.now() }
    );

  const addContact = (item) =>
    setContacts((items) => [
      ...items,
      { ...item, id: Date.now().toString(), date: new Date().toLocaleDateString(), createdAt: Date.now() },
    ]);

  const addServiceRequest = (item) =>
    setServiceRequests((items) => [
      ...items,
      { ...item, id: Date.now().toString(), date: new Date().toLocaleDateString(), createdAt: Date.now(), status: "New" },
    ]);

  const markRead = (id) => setReadIds((items) => (items.includes(id) ? items : [...items, id]));

  const addSitePhoto = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const compressed = await compressImage(reader.result);
      setSitePhotos((items) => [...items, { url: compressed, name: file.name, id: Date.now().toString() }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn, adminLogin, adminLogout,
        popups, popupOps: makeCrud(setPopups),
        testimonials, testimonialOps: makeCrud(setTestimonials),
        jobRoles, jobRoleOps: makeCrud(setJobRoles),
        contacts, contactOps: makeCrud(setContacts), addContact,
        interns, internOps: makeCrud(setInterns),
        clients, clientOps: makeCrud(setClients),
        internApplications, internAppOps: makeCrud(setInternApplications), addInternApplication,
        jobApplications, jobAppOps: makeCrud(setJobApplications), addJobApplication,
        teamMembers, teamOps: makeCrud(setTeamMembers),
        internRoles, internRoleOps: makeCrud(setInternRoles),
        sitePhotos, sitePhotoOps: makeCrud(setSitePhotos), addSitePhoto,
        readIds, markRead,
        serviceRequests, serviceRequestOps: makeCrud(setServiceRequests), addServiceRequest,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
