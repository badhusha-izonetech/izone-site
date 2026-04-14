import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BellRing,
  Briefcase,
  Building2,
  ClipboardList,
  Clock3,
  Image,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { useAdmin } from "@/context/AdminContext";

const modules = [
  { label: "Popups", icon: MessageSquare, path: "/admin/popups", key: "popups", color: "text-primary", bg: "bg-primary/10" },
  { label: "Clients", icon: Building2, path: "/admin/clients", key: "clients", color: "text-primary", bg: "bg-primary/10" },
  { label: "Testimonials", icon: Star, path: "/admin/testimonials", key: "testimonials", color: "text-primary", bg: "bg-primary/10" },
  { label: "Job Roles", icon: Briefcase, path: "/admin/job-roles", key: "jobRoles", color: "text-primary", bg: "bg-primary/10" },
  { label: "Contacts", icon: BellRing, path: "/admin/contacts", key: "contacts", color: "text-primary", bg: "bg-primary/10" },
  { label: "Client Requests", icon: ClipboardList, path: "/admin/service-requests", key: "serviceRequests", color: "text-primary", bg: "bg-primary/10" },
  { label: "Interns", icon: Users, path: "/admin/interns", key: "internApplications", color: "text-primary", bg: "bg-primary/10" },
  { label: "Photos", icon: Image, path: "/admin/photo", key: "sitePhotos", color: "text-primary", bg: "bg-primary/10" },
];

const cardTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

export default function AdminDashboard() {
  const admin = useAdmin();

  const activePopupCount = admin.popups.filter((item) => item.isActive).length;
  const unreadUpdates = [
    ...admin.jobApplications,
    ...admin.internApplications,
    ...admin.contacts,
    ...(admin.serviceRequests ?? []),
  ].filter((item) => !admin.readIds.includes(item.id)).length;

  const recentActivity = [
    ...admin.serviceRequests.map((item) => ({
      id: `service-${item.id}`,
      type: "Service request",
      title: item.name,
      detail: item.selectedServices?.join(", ") || "Requested a service",
      date: item.date,
      createdAt: item.createdAt ?? 0,
      color: "bg-primary/10 text-primary",
    })),
    ...admin.contacts.map((item) => ({
      id: `contact-${item.id}`,
      type: "Contact",
      title: item.name,
      detail: item.subject || "Sent a website message",
      date: item.date,
      createdAt: item.createdAt ?? 0,
      color: "bg-primary/10 text-primary",
    })),
    ...admin.jobApplications.map((item) => ({
      id: `job-${item.id}`,
      type: "Job application",
      title: item.name,
      detail: item.jobRole || "Applied for a role",
      date: item.date,
      createdAt: item.createdAt ?? 0,
      color: "bg-primary/10 text-primary",
    })),
    ...admin.internApplications.map((item) => ({
      id: `intern-${item.id}`,
      type: "Intern application",
      title: item.name,
      detail: item.role || "Applied for internship",
      date: item.date,
      createdAt: item.createdAt ?? 0,
      color: "bg-primary/10 text-primary",
    })),
  ]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 6);

  return (
    <AdminLayout>
      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map(({ label, icon: Icon, path, key, color, bg }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cardTransition, delay: Math.min(index * 0.04, 0.2) }}
          >
            <Link
              to={path}
              className="glass-card flex h-full items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-1"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bg} ${color}`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-3xl font-bold leading-none">{admin[key]?.length ?? 0}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr,0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cardTransition, delay: 0.08 }}
          className="rounded-[1.8rem] border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold">Recent activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">Auto-collected from contact forms, service requests, and applications.</p>
            </div>
            <div className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:block">
              {recentActivity.length} latest items
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...cardTransition, delay: Math.min(index * 0.04, 0.16) }}
                  className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${item.color}`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <Clock3 size={13} />
                    Latest update
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-background/70 px-5 py-12 text-center text-sm text-muted-foreground">
                New contacts, requests, and applications will appear here automatically.
              </div>
            )}
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cardTransition, delay: 0.12 }}
            className="rounded-[1.8rem] border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-xl"
          >
            <h2 className="font-display text-xl font-semibold">Automation snapshot</h2>
            <p className="mt-1 text-sm text-muted-foreground">Helpful status hints generated from current admin data.</p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Lead queue</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {unreadUpdates > 0 ? `${unreadUpdates} items waiting` : "Everything reviewed"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Unread updates are counted automatically from the notification stream.</p>
              </div>

              <div className="rounded-2xl bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Hero popup</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {activePopupCount > 0 ? "Homepage alert is active" : "No homepage alert live"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">The newest active popup now appears as an alert-style card on the home hero load.</p>
              </div>

              <div className="rounded-2xl bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Content health</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {admin.testimonials.length} testimonials and {admin.sitePhotos.length} photos ready
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Social proof and media totals update immediately when you add or remove content.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </AdminLayout>
  );
}
