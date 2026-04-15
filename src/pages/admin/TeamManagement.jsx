import { useState, useRef } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const EMPTY = { name: "", designation: "", description: "", photo: "" };

export default function TeamManagement() {
  const { teamMembers, teamOps } = useAdmin();
  const [modal, setModal] = useState(null); // null | { mode: "add"|"edit", data }
  const [form, setForm] = useState(EMPTY);
  const fileRef = useRef();

  const open = (mode, data = EMPTY) => { setForm(data); setModal({ mode, data }); };
  const close = () => setModal(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal.mode === "add") teamOps.add(form);
    else teamOps.update(modal.data.id, form);
    close();
  };

  const columns = [
    {
      key: "photo", label: "Photo",
      render: (v, row) => v
        ? <img src={v} alt={row.name} className="w-9 h-9 rounded-full object-cover" />
        : <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{row.name?.[0] ?? "?"}</div>,
    },
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs">{v || "—"}</span> },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground text-sm mt-1">{teamMembers.length} member{teamMembers.length !== 1 ? "s" : ""}</p>
        </div>
        <Button size="sm" className="glow-border hover-glow" onClick={() => open("add")}>
          <UserCircle size={15} className="mr-1.5" /> Add Member
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={teamMembers}
      />

      {modal && (
        <FormModal
          title={modal.mode === "add" ? "Add Team Member" : "Edit Team Member"}
          onClose={close}
          onSubmit={handleSubmit}
        >
          {/* Photo upload */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileRef.current.click()}
              className="w-16 h-16 rounded-full border-2 border-dashed border-border hover:border-primary cursor-pointer flex items-center justify-center overflow-hidden shrink-0 transition-colors"
            >
              {form.photo
                ? <img src={form.photo} alt="preview" className="w-full h-full object-cover" />
                : <UserCircle size={28} className="text-muted-foreground" />}
            </div>
            <div>
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-xs text-muted-foreground">Click avatar to upload from device</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>

          <TextField label="Name" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField label="Designation" placeholder="e.g. Frontend Developer" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />
          <TextField label="Description" placeholder="Short bio or role description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} textarea />
        </FormModal>
      )}
    </AdminLayout>
  );
}


