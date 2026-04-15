import { useState, useRef } from "react";
import { Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const empty = { icon: "", companyName: "", industry: "", description: "" };

export default function ClientManagement() {
  const { clients, clientOps } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const open = (mode, data = empty) => { setModal({ mode }); setForm(data); setErrors({}); };
  const close = () => setModal(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, icon: reader.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.industry.trim()) e.industry = "Industry is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    modal.mode === "edit" ? clientOps.update(form.id, form) : clientOps.add(form);
    close();
  };

  const columns = [
    {
      key: "icon", label: "Icon",
      render: (v, row) => v
        ? <img src={v} alt={row.companyName} className="w-9 h-9 rounded-lg object-cover" />
        : <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 size={16} className="text-primary" /></div>,
    },
    { key: "companyName", label: "Company Name" },
    { key: "industry", label: "Industry" },
    { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs">{v || "—"}</span> },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold">Client Management</h1>
        <Button onClick={() => open("create")} size="sm" className="gap-1.5 self-start sm:self-auto">
          <Plus size={15} /> <span className="hidden sm:inline">Add Client</span><span className="sm:hidden">Add</span>
        </Button>
      </div>

      <DataTable columns={columns} data={clients} onEdit={(row) => open("edit", row)} onDelete={clientOps.remove} />

      {modal && (
        <FormModal title={modal.mode === "edit" ? "Edit Client" : "New Client"} onClose={close} onSubmit={handleSubmit}>
          {/* Icon upload */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileRef.current.click()}
              className="w-16 h-16 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer flex items-center justify-center overflow-hidden shrink-0 transition-colors"
            >
              {form.icon
                ? <img src={form.icon} alt="icon" className="w-full h-full object-cover" />
                : <Building2 size={24} className="text-muted-foreground" />}
            </div>
            <div>
              <p className="text-sm font-medium">Company Icon</p>
              <p className="text-xs text-muted-foreground">Click to upload logo</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleIcon} />
          </div>

          <TextField label="Company Name" placeholder="Company Inc." value={form.companyName} onChange={set("companyName")} error={errors.companyName} required />
          <TextField label="Industry" placeholder="e.g. Technology, Healthcare" value={form.industry} onChange={set("industry")} error={errors.industry} required />
          <TextField label="Description" placeholder="Short description about the client..." textarea value={form.description} onChange={set("description")} />
        </FormModal>
      )}
    </AdminLayout>
  );
}


