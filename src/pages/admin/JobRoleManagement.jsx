import { useState } from "react";
import { Plus, X, User, Mail, Phone, Briefcase, MapPin, FileText, GraduationCap, Clock, Activity, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField, SelectField } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const emptyRole = { roleName: "", qualification: "", workTiming: "", location: "", workCulture: "" };

const workCultureOptions = [
  { value: "Remote", label: "Remote" },
  { value: "Onsite", label: "Onsite" },
];

const workTimingOptions = [
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
];

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={13} className="text-primary" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground break-words">{value || "—"}</p>
    </div>
  </div>
);

export default function JobRoleManagement() {
  const { jobRoles, jobRoleOps, jobApplications, jobAppOps, markRead } = useAdmin();
  const [tab, setTab] = useState("roles");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyRole);
  const [errors, setErrors] = useState({});
  const [viewModal, setViewModal] = useState(null); // applicant detail + doc modal

  const open = (mode, data = emptyRole) => { setModal({ mode }); setForm(data); setErrors({}); };
  const close = () => setModal(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.roleName.trim()) e.roleName = "Role name is required";
    if (!form.qualification.trim()) e.qualification = "Qualification is required";
    if (!form.workTiming) e.workTiming = "Work timing is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.workCulture) e.workCulture = "Work culture is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    modal.mode === "edit" ? jobRoleOps.update(form.id, form) : jobRoleOps.add(form);
    close();
  };

  const handleDeleteApp = (id) => {
    jobAppOps.remove(id);
    if (viewModal?.id === id) setViewModal(null);
  };

  const openView = (row) => { setViewModal(row); markRead(row.id); };

  const roleColumns = [
    { key: "roleName", label: "Role Name" },
    { key: "qualification", label: "Qualification" },
    {
      key: "workTiming", label: "Work Timing",
      render: (v) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === "Full Time" ? "bg-primary/15 text-primary" : "bg-primary/10 text-primary/80"}`}>
          {v}
        </span>
      ),
    },
    { key: "location", label: "Location" },
    {
      key: "workCulture", label: "Work Culture",
      render: (v) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === "Remote" ? "bg-primary/15 text-primary" : "bg-primary/10 text-primary/80"}`}>
          {v}
        </span>
      ),
    },
  ];

  const appColumns = [
    {
      key: "name", label: "Applicant",
      render: (v) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
            {v?.[0]?.toUpperCase()}
          </div>
          <span className="font-medium">{v}</span>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "jobRole", label: "Applied For" },
    { key: "date", label: "Applied On" },
    {
      key: "resume", label: "Document",
      render: (v, row) => v ? (
        <button
          onClick={(e) => { e.stopPropagation(); openView(row); }}
          className="flex items-center gap-1 text-primary text-xs hover:underline"
        >
          <Eye size={13} /> View
        </button>
      ) : <span className="text-muted-foreground text-xs">—</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold">Job Role Management</h1>
        {tab === "roles" && (
          <Button onClick={() => open("create")} className="gap-2 self-start sm:self-auto" size="sm"><Plus size={15} /> Add Job Role</Button>
        )}
        {tab === "applications" && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {jobApplications.length} Applications
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg w-full sm:w-fit mb-5">
        {[["roles", "Job Roles"], ["applications", "Applications"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${tab === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
            {key === "applications" && jobApplications.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs">{jobApplications.length}</span>
            )}
          </button>
        ))}
      </div>

      {tab === "roles" && (
        <DataTable columns={roleColumns} data={jobRoles} onEdit={(row) => open("edit", row)} onDelete={jobRoleOps.remove} />
      )}

      {tab === "applications" && (
        <DataTable
          columns={appColumns}
          data={jobApplications}
          onDelete={handleDeleteApp}
          onRowClick={(row) => openView(row)}
          selectedId={viewModal?.id}
        />
      )}

      {/* Job Role Form Modal */}
      {modal && (
        <FormModal title={modal.mode === "edit" ? "Edit Job Role" : "New Job Role"} onClose={close} onSubmit={handleSubmit}>
          <TextField label="Role Name" placeholder="e.g. Frontend Developer" value={form.roleName} onChange={set("roleName")} error={errors.roleName} />
          <TextField label="Qualification" placeholder="e.g. B.Tech in CS" value={form.qualification} onChange={set("qualification")} error={errors.qualification} />
          <SelectField label="Work Timing" options={workTimingOptions} value={form.workTiming} onChange={set("workTiming")} error={errors.workTiming} />
          <TextField label="Location" placeholder="e.g. Chennai, Tamil Nadu" value={form.location} onChange={set("location")} error={errors.location} />
          <SelectField label="Work Culture" options={workCultureOptions} value={form.workCulture} onChange={set("workCulture")} error={errors.workCulture} />
        </FormModal>
      )}

      {/* Applicant View Modal */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70" onClick={() => setViewModal(null)}>
          <div
            className="bg-card border border-border rounded-2xl w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {viewModal.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm sm:text-base">{viewModal.name}</p>
                  <p className="text-xs text-muted-foreground">{viewModal.jobRole}</p>
                </div>
              </div>
              <button onClick={() => setViewModal(null)} className="text-muted-foreground hover:text-foreground p-1">
                <X size={18} />
              </button>
            </div>

            {/* Body — single scroll: details then document */}
            <div className="flex-1 overflow-y-auto">
              {/* Applicant details */}
              <div className="px-4 sm:px-6 py-4 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Applicant Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <DetailRow icon={User} label="Full Name" value={viewModal.name} />
                  <DetailRow icon={Phone} label="Phone" value={viewModal.phone} />
                  <DetailRow icon={Mail} label="Email" value={viewModal.email} />
                  <DetailRow icon={Briefcase} label="Applied For" value={viewModal.jobRole} />
                  <DetailRow icon={GraduationCap} label="Qualification" value={viewModal.qualification} />
                  <DetailRow icon={Clock} label="Experience" value={viewModal.experience} />
                  <DetailRow icon={MapPin} label="Location" value={viewModal.location} />
                  <DetailRow icon={Activity} label="Applied On" value={viewModal.date} />
                </div>
                {viewModal.message && (
                  <div className="mt-1">
                    <DetailRow icon={FileText} label="Cover Letter" value={viewModal.message} />
                  </div>
                )}
              </div>

              {/* Document */}
              <div className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Document</p>
                  {viewModal.resume && (
                    <a href={viewModal.resume} download={viewModal.resumeName || "document"} className="flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download size={12} /> Download
                    </a>
                  )}
                </div>
                {viewModal.resume ? (
                  viewModal.resume.startsWith("data:image") ? (
                    <img src={viewModal.resume} alt="document" className="max-w-full rounded-lg" />
                  ) : (
                    <embed
                      src={`${viewModal.resume}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      type="application/pdf"
                      className="w-full rounded-lg border border-border"
                      style={{ height: "60vh" }}
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 bg-muted/20 rounded-lg">
                    <FileText size={28} className="opacity-30" />
                    <p className="text-sm">No document uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border flex justify-end gap-2 shrink-0">
              <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs sm:text-sm" onClick={() => handleDeleteApp(viewModal.id)}>
                Delete
              </Button>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm" onClick={() => setViewModal(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}




