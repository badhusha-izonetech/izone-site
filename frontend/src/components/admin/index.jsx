import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  Building2,
  ChevronRight,
  ClipboardList,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Phone,
  Star,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Popups", icon: MessageSquare, path: "/admin/popups" },
  { label: "Clients", icon: Building2, path: "/admin/clients" },
  { label: "Testimonials", icon: Star, path: "/admin/testimonials" },
  { label: "Job Roles", icon: Briefcase, path: "/admin/job-roles" },
  { label: "Contacts", icon: Mail, path: "/admin/contacts" },
  { label: "Interns", icon: Users, path: "/admin/interns" },
  { label: "Photo", icon: Image, path: "/admin/photo" },
  { label: "Service Requests", icon: ClipboardList, path: "/admin/service-requests" },
];

function NotificationBell() {
  const { jobApplications, internApplications, contacts, serviceRequests, readIds, markRead } = useAdmin();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    ...jobApplications.map((item) => ({
      id: item.id,
      type: "job",
      label: `${item.name} applied for ${item.jobRole}`,
      time: item.date,
      createdAt: item.createdAt ?? 0,
    })),
    ...internApplications.map((item) => ({
      id: item.id,
      type: "intern",
      label: `${item.name} applied for internship (${item.role})`,
      time: item.date,
      createdAt: item.createdAt ?? 0,
    })),
    ...contacts.map((item) => ({
      id: item.id,
      type: "contact",
      label: `${item.name} sent a contact message`,
      time: item.date,
      createdAt: item.createdAt ?? 0,
    })),
    ...(serviceRequests ?? []).map((item) => ({
      id: item.id,
      type: "service",
      label: `${item.name} requested: ${item.selectedServices?.join(", ") || "service"}`,
      time: item.date,
      createdAt: item.createdAt ?? 0,
    })),
  ].sort((a, b) => b.createdAt - a.createdAt);

  const unread = notifications.filter((item) => !readIds.includes(item.id));

  const typeIcon = (type) => {
    if (type === "job") return <Briefcase size={13} className="text-primary" />;
    if (type === "intern") return <UserCheck size={13} className="text-primary" />;
    if (type === "service") return <ClipboardList size={13} className="text-primary" />;
    return <Phone size={13} className="text-primary" />;
  };

  const typePath = (type) => {
    if (type === "job") return "/admin/job-roles";
    if (type === "intern") return "/admin/interns";
    if (type === "service") return "/admin/service-requests";
    return "/admin/contacts";
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-xl border border-border/60 bg-background/70 p-2.5 transition-colors hover:bg-muted"
        aria-label="Open notifications"
      >
        <Bell size={18} />
        {unread.length > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-none text-white">
            {unread.length > 9 ? "9+" : unread.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full z-[60] mt-2 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-80"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-display text-sm font-semibold">Notifications</span>
              {unread.length > 0 && (
                <button
                  onClick={() => unread.forEach((item) => markRead(item.id))}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-border">
              {notifications.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No notifications</p>
              ) : (
                notifications.map((item) => (
                  <Link
                    key={item.id}
                    to={typePath(item.type)}
                    onClick={() => {
                      markRead(item.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
                      !readIds.includes(item.id) && "bg-primary/5"
                    )}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                      {typeIcon(item.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-xs leading-snug break-words",
                          !readIds.includes(item.id) ? "font-medium text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{item.time}</p>
                    </div>
                    {!readIds.includes(item.id) && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const {
    adminLogout,
    contacts,
    internApplications,
    jobApplications,
    readIds,
    serviceRequests,
  } = useAdmin();

  const notifications = [
    ...jobApplications,
    ...internApplications,
    ...contacts,
    ...(serviceRequests ?? []),
  ];
  const unreadCount = notifications.filter((item) => !readIds.includes(item.id)).length;

  const handleLogout = () => {
    adminLogout();
    window.location.href = "/";
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(255,251,244,0.94),rgba(245,239,230,0.92))]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/55 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed left-0 top-0 z-30 flex h-[100svh] max-h-[100svh] w-72 flex-col overflow-hidden border-r border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b border-border/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center">
              <img src="/hero/logo.png" alt="Izone" className="h-18 w-auto origin-left scale-[1.7] object-contain" />
            </Link>
            <button
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="ios-scroll-panel flex-1 min-h-0 space-y-1 overflow-y-auto p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-primary/15 text-primary shadow-[0_10px_32px_rgba(76,175,80,0.10)]"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                    active ? "bg-primary/10" : "bg-muted/80 group-hover:bg-muted"
                  )}
                >
                  <Icon size={17} />
                </div>
                <span className="flex-1 truncate">{label}</span>
                {active && <ChevronRight size={14} className="shrink-0 text-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/70 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={17} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      <div className="relative flex min-h-screen flex-1 flex-col overflow-x-hidden lg:ml-72">
        <header className="sticky top-0 z-10 border-b border-border/70 bg-card/85 px-4 py-3 backdrop-blur-xl sm:px-5 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="rounded-xl border border-border/60 bg-background/70 p-2 transition-colors hover:bg-muted lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <Link to="/" className="font-display text-base font-bold gradient-text sm:text-lg">
                IZone Technologies
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground md:flex md:items-center md:gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{unreadCount > 0 ? `${unreadCount} unread updates` : "All updates reviewed"}</span>
              </div>
              <NotificationBell />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 p-3 sm:p-4 md:p-6"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DataTable({ columns, data, onEdit, onDelete, onRowClick, selectedId }) {
  if (!data.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center text-sm text-muted-foreground"
      >
        No records found.
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden max-h-[62vh] overflow-auto rounded-2xl border border-border bg-card/75 shadow-sm backdrop-blur-sm md:block"
      >
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted/70 backdrop-blur">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "transition-colors",
                  row.id === selectedId
                    ? "border-l-2 border-primary bg-primary/10"
                    : index % 2 === 0
                      ? "bg-card hover:bg-muted/30"
                      : "bg-muted/20 hover:bg-muted/40",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-middle">
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? "-"}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                    <div className="flex gap-1">
                      {onEdit && (
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(row)}>
                          <Pencil size={14} />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => onDelete(row.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="space-y-3 md:hidden">
        {data.map((row, index) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.04, 0.2) }}
            onClick={() => onRowClick?.(row)}
            className={cn(
              "glass-card rounded-2xl border p-4 transition-all",
              row.id === selectedId ? "border-primary bg-primary/5" : "border-border",
              onRowClick && "cursor-pointer active:scale-[0.99]"
            )}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {columns[0].render ? (
                  columns[0].render(row[columns[0].key], row)
                ) : (
                  <p className="truncate text-sm font-semibold">{row[columns[0].key] ?? "-"}</p>
                )}
                {columns[1] && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {columns[1].render ? columns[1].render(row[columns[1].key], row) : row[columns[1].key] ?? ""}
                  </div>
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="flex shrink-0 gap-1" onClick={(event) => event.stopPropagation()}>
                  {onEdit && (
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(row)}>
                      <Pencil size={13} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => onDelete(row.id)}
                    >
                      <Trash2 size={13} />
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
              {columns
                .slice(2)
                .filter((col) => col.key !== "_actions")
                .map((col) => (
                  <div key={col.key} className="min-w-0 rounded-xl bg-background/60 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{col.label}</p>
                    <div className="mt-1 text-xs font-medium">
                      {col.render ? col.render(row[col.key], row) : row[col.key] ?? "-"}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export function FormModal({ title, onClose, onSubmit, children, submitting }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:max-w-lg lg:max-w-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">{children}</div>
          <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function TextField({ label, error, textarea, ...props }) {
  return (
    <Field label={label} error={error}>
      {textarea ? (
        <Textarea {...props} className="resize-none border-border bg-background text-sm" rows={3} />
      ) : (
        <Input {...props} className="border-border bg-background text-sm" />
      )}
    </Field>
  );
}

export function SelectField({ label, error, options, ...props }) {
  return (
    <Field label={label} error={error}>
      <select
        {...props}
        className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-2.5 last:border-0">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon size={13} className="text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="break-words text-sm font-medium text-foreground">{value || "-"}</p>
      </div>
    </div>
  );
}

export function ProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useAdmin();
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" replace />;
}
