import { useRef, useState } from "react";
import { Plus, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField, Field } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const ACCEPTED = "image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff";
const empty = { title: "", description: "", isActive: false, image: "" };

export default function PopupManagement() {
  const { popups, popupOps } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const open = (mode, data = empty) => { setModal({ mode }); setForm(data); setErrors({}); };
  const close = () => setModal(null);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result;
      // Compress to max 900px wide, quality 0.75 so it fits in localStorage
      const img = new Image();
      img.onload = () => {
        const maxW = 900;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.75);
        setForm((f) => ({ ...f, image: compressed }));
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    modal.mode === "edit" ? popupOps.update(form.id, form) : popupOps.add(form);
    close();
  };

  const toggleActive = (row) => popupOps.update(row.id, { isActive: !row.isActive });

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs">{v}</span> },
    { key: "image", label: "Image", render: (v) => v ? <img src={v} alt="popup" className="w-10 h-10 rounded object-cover border border-border" /> : <span className="text-muted-foreground text-xs">—</span> },
    {
      key: "isActive", label: "Status",
      render: (v, row) => (
        <button
          onClick={(e) => { e.stopPropagation(); toggleActive(row); }}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
            v ? "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25"
              : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
          }`}
        >
          {v ? "Active" : "Inactive"}
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold">Popup Management</h1>
          <p className="text-muted-foreground text-xs md:text-sm mt-0.5">Popups display in the Hero section of the homepage.</p>
        </div>
        <Button onClick={() => open("create")} size="sm" className="gap-1.5">
          <Plus size={15} /> <span className="hidden sm:inline">Add Popup</span><span className="sm:hidden">Add</span>
        </Button>
      </div>

      <DataTable columns={columns} data={popups} onEdit={(row) => open("edit", row)} onDelete={popupOps.remove} />

      {modal && (
        <FormModal title={modal.mode === "edit" ? "Edit Popup" : "New Popup"} onClose={close} onSubmit={handleSubmit}>
          <TextField label="Title" placeholder="Popup title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} error={errors.title} />
          <TextField label="Description" placeholder="Popup description" textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} error={errors.description} />
          <Field label="Image (optional)">
            <input ref={fileRef} type="file" accept={ACCEPTED} className="hidden" onChange={handleImage} />
            {form.image ? (
              <div className="relative w-full rounded-xl overflow-hidden border border-border">
                <img src={form.image} alt="preview" className="w-full max-h-48 object-contain bg-muted" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, image: "" }))} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current.click()} className="w-full h-24 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <ImageIcon size={20} />
                <span className="text-xs">Click to upload image</span>
                <span className="text-[10px] opacity-60">JPG, PNG, GIF, WebP, SVG…</span>
              </button>
            )}
          </Field>
        </FormModal>
      )}
    </AdminLayout>
  );
}




