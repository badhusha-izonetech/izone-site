import { motion } from "framer-motion";

export default function HeroOrbitBg({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`.trim()} aria-hidden="true">
      {/* Outer orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "min(72rem, 140%)",
          height: "min(72rem, 140%)",
          transform: "translate(-50%, -50%)",
          borderRadius: "999px",
          border: "1px dashed rgba(22, 125, 98, 0.18)",
        }}
      >
        {/* dot on outer ring */}
        <span style={{
          position: "absolute", top: "50%", left: "-0.3rem",
          width: "0.6rem", height: "0.6rem", borderRadius: "999px",
          background: "linear-gradient(135deg, rgba(22,125,98,0.92), rgba(54,178,149,0.78))",
          boxShadow: "0 0 0 6px rgba(255,255,255,0.45)",
          transform: "translateY(-50%)",
        }} />
      </motion.div>

      {/* Middle orbit ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "min(52rem, 105%)",
          height: "min(52rem, 105%)",
          transform: "translate(-50%, -50%)",
          borderRadius: "999px",
          border: "1px dashed rgba(22, 125, 98, 0.14)",
        }}
      >
        <span style={{
          position: "absolute", top: "50%", right: "-0.3rem",
          width: "0.5rem", height: "0.5rem", borderRadius: "999px",
          background: "rgba(22,125,98,0.72)",
          boxShadow: "0 0 0 5px rgba(255,255,255,0.4)",
          transform: "translateY(-50%)",
        }} />
      </motion.div>

      {/* Inner orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "min(34rem, 70%)",
          height: "min(34rem, 70%)",
          transform: "translate(-50%, -50%)",
          borderRadius: "999px",
          border: "1px dashed rgba(22, 125, 98, 0.12)",
        }}
      />

      {/* Soft radial glow center */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40rem", height: "40rem",
        borderRadius: "999px",
        background: "radial-gradient(circle, rgba(22,125,98,0.10), transparent 65%)",
        filter: "blur(24px)",
      }} />
    </div>
  );
}



