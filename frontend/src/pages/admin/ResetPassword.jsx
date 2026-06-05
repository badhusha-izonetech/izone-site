import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-destructive text-sm">Invalid or missing reset link.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword(token, form.password);
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 3000);
    } catch (err) {
      setError(err.message || "Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[360px] sm:max-w-sm"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-background/50 border border-border/60 flex items-center justify-center mx-auto mb-3 overflow-hidden">
            <img src="/hero/logo.png" alt="Izone Technologies" className="h-8 sm:h-9 w-auto object-contain" draggable="false" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">Enter your new admin password</p>
        </div>

        <div className="glass-card p-5 sm:p-6 glow-border">
          {success ? (
            <p className="text-sm text-green-500 text-center py-2">
              Password reset successfully! Redirecting to login...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="New password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="pl-9 pr-9 bg-background border-border"
                    minLength={6}
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

              <div className="space-y-1">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className="pl-9 bg-background border-border"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <Button type="submit" className="w-full glow-border hover-glow" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
