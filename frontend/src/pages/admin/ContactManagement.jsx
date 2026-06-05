import { useState, useEffect, useCallback } from "react";
import { X, Eye, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable } from "@/components/admin";
import { api } from "@/lib/api";

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const openView = async (row) => {
    setViewing(row);
    try { await api.markContactRead(row.id); } catch (_) {}
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (viewing?.id === id) setViewing(null);
    } catch (err) {
      alert(err.message || "Failed to delete contact.");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "subject", label: "Subject" },
    {
      key: "createdAt", label: "Date",
      render: (val) => val ? new Date(val).toLocaleDateString() : "—",
    },
    {
      key: "_actions", label: "Actions",
      render: (_, row) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openView(row)}>
            <Eye size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(row.id)}>
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
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {contacts.length} total
          </span>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={fetchContacts} disabled={loading}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">Loading contacts...</div>
      ) : (
        <DataTable columns={columns} data={contacts} />
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold">Contact Details</h3>
              <button onClick={() => setViewing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="px-5 py-4 space-y-3 text-sm max-h-[60vh] overflow-y-auto">
              {[
                ["Name", "name"],
                ["Email", "email"],
                ["Phone", "phone"],
                ["Subject", "subject"],
                ["Message", "message"],
                ["Date", "createdAt"],
              ].map(([label, key]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium text-muted-foreground text-xs sm:text-sm sm:w-20 shrink-0">{label}</span>
                  <span className="text-foreground break-words">
                    {key === "createdAt" && viewing[key]
                      ? new Date(viewing[key]).toLocaleString()
                      : viewing[key] || "—"}
                  </span>
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




