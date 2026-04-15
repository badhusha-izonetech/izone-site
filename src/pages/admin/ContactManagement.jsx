import { useState } from "react";
import { X, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

export default function ContactManagement() {
  const { contacts, contactOps, markRead } = useAdmin();
  const [viewing, setViewing] = useState(null);

  const openView = (row) => { setViewing(row); markRead(row.id); };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "subject", label: "Subject" },
    { key: "date", label: "Date" },
    {
      key: "_actions", label: "Actions",
      render: (_, row) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openView(row)}>
            <Eye size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => contactOps.remove(row.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">Submissions from the website contact form.</p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {contacts.length} total
        </span>
      </div>

      <DataTable columns={columns} data={contacts} />

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold">Contact Details</h3>
              <button onClick={() => setViewing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="px-5 py-4 space-y-3 text-sm max-h-[60vh] overflow-y-auto">
              {[["Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Subject", "subject"], ["Date", "date"], ["Message", "message"]].map(([label, key]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium text-muted-foreground text-xs sm:text-sm sm:w-20 shrink-0">{label}</span>
                  <span className="text-foreground break-words">{viewing[key] || "—"}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setViewing(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}




