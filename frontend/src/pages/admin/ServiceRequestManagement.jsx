import { useState, useEffect, useCallback } from "react";
import { X, Eye, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout, DataTable } from "@/components/admin";
import { api } from "@/lib/api";

export default function ServiceRequestManagement() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getProjectInquiries();
      setServiceRequests(data);
    } catch (err) {
      setError(err.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleDelete = async (id) => {
    try {
      await api.deleteProjectInquiry(id);
      setServiceRequests((prev) => prev.filter((r) => r.id !== id));
      if (viewing?.id === id) setViewing(null);
    } catch (err) {
      alert(err.message || "Failed to delete request.");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "selectedServices", label: "Services",
      render: (v) => {
        const parsed = typeof v === "string" ? (() => { try { return JSON.parse(v); } catch { return [v]; } })() : v;
        return <span className="text-xs">{Array.isArray(parsed) ? parsed.join(", ") : parsed || "—"}</span>;
      },
    },
    {
      key: "createdAt", label: "Date",
      render: (v) => v ? new Date(v).toLocaleDateString() : "—",
    },
    {
      key: "status", label: "Status",
      render: (v) => <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{v || "New"}</span>,
    },
    {
      key: "_actions", label: "Actions",
      render: (_, row) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setViewing(row)}>
            <Eye size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(row.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  const parseServices = (v) => {
    const parsed = typeof v === "string" ? (() => { try { return JSON.parse(v); } catch { return [v]; } })() : v;
    return Array.isArray(parsed) ? parsed.join(", ") : parsed || "—";
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold">Client Requests</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">Submissions from the Get Started form.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {serviceRequests.length} total
          </span>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={fetchRequests} disabled={loading}>
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
        <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">Loading requests...</div>
      ) : (
        <DataTable columns={columns} data={serviceRequests} />
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold">Service Request Details</h3>
              <button onClick={() => setViewing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="px-5 py-4 space-y-3 text-sm max-h-[60vh] overflow-y-auto">
              {[
                ["Name", "name"],
                ["Email", "email"],
                ["Phone", "phone"],
                ["Company", "company"],
                ["Status", "status"],
              ].map(([label, key]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium text-muted-foreground text-xs sm:text-sm sm:w-24 shrink-0">{label}</span>
                  <span className="text-foreground break-words">{viewing[key] || "—"}</span>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-muted-foreground text-xs sm:text-sm sm:w-24 shrink-0">Date</span>
                <span className="text-foreground">{viewing.createdAt ? new Date(viewing.createdAt).toLocaleString() : "—"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-muted-foreground text-xs sm:text-sm sm:w-24 shrink-0">Services</span>
                <span className="text-foreground break-words">{parseServices(viewing.selectedServices)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-muted-foreground text-xs sm:text-sm sm:w-24 shrink-0">Project Details</span>
                <span className="text-foreground break-words whitespace-pre-wrap">{viewing.projectDetails || "—"}</span>
              </div>
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




