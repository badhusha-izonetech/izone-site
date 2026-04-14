import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const empty = { roleName: "" };

export default function InternRoleManagement() {
  const { internRoles, internRoleOps } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const open = (mode, data = empty) => { setModal({ mode }); setForm(data); setError(""); };
  const close = () => setModal(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.roleName.trim()) { setError("Role name is required"); return; }
    modal.mode === "edit" ? internRoleOps.update(form.id, form) : internRoleOps.add(form);
    close();
  };

  const columns = [
    { key: "roleName", label: "Role Name" },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Intern Roles</h1>
          <p className="text-muted-foreground text-sm mt-1">Role names shown in the intern application form.</p>
        </div>
        <Button onClick={() => open("create")} className="gap-2"><Plus size={16} /> Add Role</Button>
      </div>

      <DataTable columns={columns} data={internRoles} onEdit={(row) => open("edit", row)} onDelete={internRoleOps.remove} />

      {modal && (
        <FormModal title={modal.mode === "edit" ? "Edit Role" : "New Intern Role"} onClose={close} onSubmit={handleSubmit}>
          <TextField
            label="Role Name"
            placeholder="e.g. Frontend Development Intern"
            value={form.roleName}
            onChange={(e) => setForm({ roleName: e.target.value })}
            error={error}
            required
          />
        </FormModal>
      )}
    </AdminLayout>
  );
}


