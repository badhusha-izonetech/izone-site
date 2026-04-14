import { useState } from "react";
import { Plus, X, User, Mail, Briefcase, Clock, Activity, FileText, Phone, MapPin, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

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

export default function InternManagement() {
  const { internApplications, internAppOps, internRoles, internRoleOps, markRead } = useAdmin();
  const [tab, setTab] = useState("roles");
  const [roleModal, setRoleModal] = useState(null);
  const [roleForm, setRoleForm] = useState(emptyRole);
  const [roleError, setRoleError] = useState("");
  const [viewModal, setViewModal] = useState(null);

  const openRole = (mode, data = emptyRole) => { setRoleModal({ mode }); setRoleForm(data); setRoleError(""); };
  const closeRole = () => setRoleModal(null);

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (!roleForm.roleName.trim()) { setRoleError("Role name is required"); return; }
    roleModal.mode === "edit" ? internRoleOps.update(roleForm.id, roleForm) : internRoleOps.add(roleForm);
    closeRole();
  };

  const handleDeleteApp = (id) => {
    internAppOps.remove(id);
    if (viewModal?.id === id) setViewModal(null);
  };

  const openView = (row) => { setViewModal(row); markRead(row.id); };

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
    { key: "date", label: "Applied On" },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold">Intern Management</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">Manage intern roles and applications.</p>
        </div>
        {tab === "roles" && (
          <Button onClick={() => openRole("create")} size="sm" className="gap-1.5 self-start sm:self-auto">
            <Plus size={15} /> <span className="hidden sm:inline">Add Role</span><span className="sm:hidden">Add</span>
          </Button>
        )}
        {tab === "applications" && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {internApplications.length} Applications
          </span>
        )}
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
        <DataTable columns={roleColumns} data={internRoles} onEdit={(row) => openRole("edit", row)} onDelete={internRoleOps.remove} />
      )}

      {tab === "applications" && (
        <DataTable
          columns={appColumns}
          data={internApplications}
          onDelete={handleDeleteApp}
          onRowClick={(row) => openView(row)}
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
              <DetailRow icon={Activity} label="Applied On" value={viewModal.date} />
              {viewModal.message && <DetailRow icon={FileText} label="Message" value={viewModal.message} />}
              {viewModal.resume && (
                <div className="pt-3">
                  <a
                    href={viewModal.resume}
                    download={viewModal.resumeName || "document"}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors w-fit"
                  >
                    <Download size={14} /> Download Document
                  </a>
                </div>
              )}
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




