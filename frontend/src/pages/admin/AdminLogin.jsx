import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";

function ForgotPasswordModal({ onClose }) {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.forgotPassword(identifier);
      setMessage(data.message);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-sm glass-card p-6 glow-border relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>

        <h2 className="font-display text-lg font-bold mb-1">Forgot Password</h2>
        <p className="text-muted-foreground text-xs mb-4">
          Enter your username or email. We'll send a reset link if the account exists.
        </p>

        {message ? (
          <p className="text-sm text-green-500 text-center py-2">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="bg-background border-border"
              required
            />
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button type="submit" className="w-full glow-border hover-glow" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function AdminLogin() {
  const { adminLogin, isAdminLoggedIn } = useAdmin();
  if (isAdminLoggedIn) { window.location.href = "/admin"; return null; }

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(form.username, form.password);
      adminLogin(data.access_token);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden bg-background">
      <AnimatePresence>
        {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[360px] sm:max-w-sm relative z-10"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-background/50 border border-border/60 flex items-center justify-center mx-auto mb-3 sm:mb-4 overflow-hidden">
            <img
              src="/hero/logo.png"
              alt="Izone Technologies"
              className="h-8 sm:h-9 w-auto object-contain"
              draggable="false"
            />
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">Sign in to access the dashboard</p>
        </div>

        <div className="glass-card p-5 sm:p-6 glow-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="pl-9 bg-background border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pl-9 pr-9 bg-background border-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button type="submit" className="w-full glow-border hover-glow" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
