import { useState, useRef } from "react";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable, FormModal, TextField } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const empty = { name: "", designation: "", rating: 5, description: "", image: "" };

const compressImage = (dataUrl) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 400 / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = dataUrl;
  });

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} type="button" onClick={() => onChange(s)}>
        <Star size={22} className={s <= value ? "fill-primary text-primary" : "text-muted-foreground"} />
      </button>
    ))}
  </div>
);

const Avatar = ({ name, image }) =>
  image ? (
    <img src={image} alt={name} className="w-8 h-8 rounded-full object-cover" />
  ) : (
    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
      {name?.[0]?.toUpperCase() ?? "?"}
    </div>
  );

export default function TestimonialManagement() {
  const { testimonials, testimonialOps } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const formRef = useRef(empty);

  const open = (mode, data = empty) => {
    setModal({ mode });
    setForm(data);
    formRef.current = data;
    setErrors({});
  };
  const close = () => setModal(null);

  const set = (k) => (e) => {
    const next = { ...formRef.current, [k]: e.target.value };
    formRef.current = next;
    setForm(next);
  };

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.designation.trim()) e.designation = "Designation is required";
    if (!data.description.trim()) e.description = "Description is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (imageLoading) return;
    const latest = formRef.current;
    if (!validate(latest)) return;
    modal.mode === "edit" ? testimonialOps.update(latest.id, latest) : testimonialOps.add(latest);
    close();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageLoading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressImage(ev.target.result);
      const next = { ...formRef.current, image: compressed };
      formRef.current = next;
      setForm(next);
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const columns = [
    { key: "name", label: "Name", render: (v, row) => <div className="flex items-center gap-2"><Avatar name={v} image={row.image} /><span className="font-medium">{v}</span></div> },
    { key: "designation", label: "Designation" },
    { key: "rating", label: "Rating", render: (v) => <div className="flex gap-0.5">{Array.from({ length: v }).map((_, i) => <Star key={i} size={13} className="fill-primary text-primary" />)}</div> },
    { key: "description", label: "Review", render: (v) => <span className="line-clamp-1 max-w-xs text-xs">{v}</span> },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl md:text-2xl font-bold">Testimonials</h1>
        <Button onClick={() => open("create")} size="sm" className="gap-1.5">
          <Plus size={15} /> <span className="hidden sm:inline">Add Testimonial</span><span className="sm:hidden">Add</span>
        </Button>
      </div>

      <DataTable columns={columns} data={testimonials} onEdit={(row) => open("edit", row)} onDelete={testimonialOps.remove} />

      {modal && (
        <FormModal title={modal.mode === "edit" ? "Edit Testimonial" : "New Testimonial"} onClose={close} onSubmit={handleSubmit} submitting={imageLoading}>
          <TextField label="Name" placeholder="John Doe" value={form.name} onChange={set("name")} error={errors.name} />
          <TextField label="Designation" placeholder="CEO, Company" value={form.designation} onChange={set("designation")} error={errors.designation} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Rating</label>
            <StarRating value={form.rating} onChange={(v) => { const next = { ...formRef.current, rating: v }; formRef.current = next; setForm(next); }} />
          </div>
          <TextField label="Review" placeholder="Testimonial text..." textarea value={form.description} onChange={set("description")} error={errors.description} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Profile Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-muted-foreground w-full" />
            {imageLoading && <p className="text-xs text-muted-foreground">Processing image...</p>}
            {form.image && !imageLoading && <img src={form.image} alt="preview" className="w-12 h-12 rounded-full object-cover" />}
          </div>
        </FormModal>
      )}
    </AdminLayout>
  );
}


