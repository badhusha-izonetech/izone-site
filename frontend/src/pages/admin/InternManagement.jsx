import { useState, useEffect, useCallback } from "react";
import { Plus, X, User, Mail, Briefcase, Clock, Activity, FileText, Phone, MapPin, Star, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField } from "@/components/admin";
import { api } from "@/lib/api";

const emptyRole = { roleName: "" };

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

const getDocumentKind = (application) => {
  const extension = application.resumeName?.split(".").pop()?.toLowerCase();
  if (extension === "pdf" || application.resumeType === "application/pdf") return "pdf";
  if (extension === "doc" || extension === "docx") return "word";
  return application.resume ? "file" : "none";
};

export default function InternManagement() {
  const [internRoles, setInternRoles] = useState([]);
  const [internApplications, setInternApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("roles");
  const [roleModal, setRoleModal] = useState(null);
  const [roleForm, setRoleForm] = useState(emptyRole);
  const [roleError, setRoleError] = useState("");
  const [viewModal, setViewModal] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [roles, apps] = await Promise.all([
        api.getInternRoles(),
        api.getInternApplications(),
      ]);
      setInternRoles(roles);
      setInternApplications(apps);
    } catch (_) {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openRole = (mode, data = emptyRole) => { setRoleModal({ mode }); setRoleForm(data); setRoleError(""); };
  const closeRole = () => setRoleModal(null);

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!roleForm.roleName.trim()) { setRoleError("Role name is required"); return; }
    try {
      if (roleModal.mode === "edit") {
        const updated = await api.updateInternRole(roleForm.id, roleForm);
        setInternRoles((prev) => prev.map((r) => r.id === roleForm.id ? updated : r));
      } else {
        const created = await api.createInternRole(roleForm);
        setInternRoles((prev) => [created, ...prev]);
      }
      closeRole();
    } catch (err) { alert(err.message || "Failed to save role."); }
  };

  const handleDeleteRole = async (id) => {
    try {
      await api.deleteInternRole(id);
      setInternRoles((prev) => prev.filter((r) => r.id !== id));
    } catch (err) { alert(err.message || "Failed to delete."); }
  };

  const handleDeleteApp = async (id) => {
    try {
      await api.deleteInternApplication(id);
      setInternApplications((prev) => prev.filter((a) => a.id !== id));
      if (viewModal?.id === id) setViewModal(null);
    } catch (err) { alert(err.message || "Failed to delete."); }
  };

  const roleColumns = [
    { key: "roleName", label: "Role Name" },
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
    { key: "role", label: "Applied Role" },
    { key: "qualification", label: "Qualification" },
    {
      key: "createdAt", label: "Applied On",
      render: (v, row) => v ? new Date(v).toLocaleDateString() : (row.date || "—"),
    },
    {
      key: "resume", label: "Document",
      render: (v, row) => v ? (
        <button
          onClick={(e) => { e.stopPropagation(); openView(row); }}
          className="flex items-center gap-1 text-primary text-xs hover:underline"
        >
          <FileText size={13} /> View
        </button>
      ) : <span className="text-muted-foreground text-xs">-</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold">Intern Management</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">Manage intern roles and applications.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {tab === "roles" && (
            <Button onClick={() => openRole("create")} size="sm" className="gap-1.5">
              <Plus size={15} /> <span className="hidden sm:inline">Add Role</span><span className="sm:hidden">Add</span>
            </Button>
          )}
          {tab === "applications" && (
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {internApplications.length} Applications
            </span>
          )}
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={fetchAll} disabled={loading}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg w-full sm:w-fit mb-5">
        {[["roles", "Intern Roles"], ["applications", "Applications"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${tab === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
            {key === "applications" && internApplications.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs">{internApplications.length}</span>
            )}
          </button>
        ))}
      </div>

      {tab === "roles" && (
        <DataTable columns={roleColumns} data={internRoles} onEdit={(row) => openRole("edit", row)} onDelete={handleDeleteRole} />
      )}

      {tab === "applications" && (
        <DataTable
          columns={appColumns}
          data={internApplications}
          onDelete={handleDeleteApp}
          onRowClick={(row) => setViewModal(row)}
          selectedId={viewModal?.id}
        />
      )}

      {/* Role Form Modal */}
      {roleModal && (
        <FormModal title={roleModal.mode === "edit" ? "Edit Role" : "New Intern Role"} onClose={closeRole} onSubmit={handleRoleSubmit}>
          <TextField
            label="Role Name"
            placeholder="e.g. Frontend Development Intern"
            value={roleForm.roleName}
            onChange={(e) => setRoleForm({ roleName: e.target.value })}
            error={roleError}
            required
          />
        </FormModal>
      )}

      {/* Applicant View Modal — centered, details + document */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setViewModal(null)}>
          <div
            className="bg-card border border-border rounded-t-2xl sm:rounded-xl w-full sm:max-w-md max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {viewModal.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-display font-semibold">{viewModal.name}</p>
                  <p className="text-xs text-muted-foreground">{viewModal.role}</p>
                </div>
              </div>
              <button onClick={() => setViewModal(null)} className="text-muted-foreground hover:text-foreground p-1">
                <X size={18} />
              </button>
            </div>

            {/* Body — details only */}
            <div className="overflow-y-auto px-5 py-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Intern Details</p>
              <DetailRow icon={User} label="Full Name" value={viewModal.name} />
              <DetailRow icon={Mail} label="Email" value={viewModal.email} />
              <DetailRow icon={Phone} label="Phone" value={viewModal.phone} />
              <DetailRow icon={MapPin} label="Address" value={viewModal.address} />
              <DetailRow icon={FileText} label="Qualification" value={viewModal.qualification} />
              <DetailRow icon={Star} label="Skills" value={viewModal.skills} />
              <DetailRow icon={Briefcase} label="Applied Role" value={viewModal.role} />
              <DetailRow icon={Clock} label="Duration" value={viewModal.duration} />
              <DetailRow icon={Activity} label="Applied On" value={viewModal.createdAt ? new Date(viewModal.createdAt).toLocaleDateString() : viewModal.date} />
              <DetailRow
                icon={FileText}
                label="Resume"
                value={
                  viewModal.resumeName
                    ? `${viewModal.resumeName}${viewModal.attachmentStatus ? ` (${viewModal.attachmentStatus})` : ""}`
                    : viewModal.attachmentStatus || "Not uploaded"
                }
              />
              {viewModal.message && <DetailRow icon={FileText} label="Message" value={viewModal.message} />}
              <div className="pt-3">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Document</p>
                {viewModal.resume ? (
                  getDocumentKind(viewModal) === "pdf" ? (
                    <div className="space-y-3">
                      <embed
                        src={`${viewModal.resume}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        type="application/pdf"
                        className="h-[55vh] w-full rounded-lg border border-border"
                      />
                      <a
                        href={viewModal.resume}
                        download={viewModal.resumeName || "document"}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        <Download size={14} /> Download PDF
                      </a>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <FileText size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">Word document attached</p>
                          <p className="mt-1 break-words text-sm text-muted-foreground">{viewModal.resumeName || "Document file"}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            PDF files preview inline here. DOC and DOCX files are available to download from the admin page.
                          </p>
                          <a
                            href={viewModal.resume}
                            download={viewModal.resumeName || "document"}
                            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                          >
                            <Download size={14} /> Download Document
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="rounded-lg bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
                    No document uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleDeleteApp(viewModal.id)}>
                Delete Application
              </Button>
              <Button size="sm" variant="outline" onClick={() => setViewModal(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}




