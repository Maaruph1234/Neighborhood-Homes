"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    console.log("Auth response:", { data, error: authError });
    if (authError) {
      // Show the real Supabase error message so we can debug
      setError(`Error: ${authError.message} (${authError.status})`);
      setLoading(false);
    } else {
      router.push("/nhe-admin/dashboard");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-[#071629] flex items-center justify-center px-4">
      {/* Background rings */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-[#C9A84C]/06 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full border border-[#C9A84C]/08 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="text-white text-[22px] font-semibold tracking-wide leading-none mb-1"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Neighbourhood Homes
          </div>
          <div className="text-[9px] tracking-[0.22em] text-[#C9A84C] uppercase mb-6">
            Ecosystem Ltd.
          </div>
          <div className="w-px h-8 bg-[#C9A84C]/30 mx-auto mb-6" />
          <p className="text-white/40 text-[12px] tracking-[0.14em] uppercase">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-[#0B1F3A] border border-white/06 p-8">
          <div className="border-t-2 border-[#C9A84C] -mt-px mb-8" />

          <h2
            className="text-white text-[24px] font-light mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Sign In
          </h2>
          <p className="text-white/40 text-[13px] font-light mb-8">
            Enter your credentials to access the admin panel.
          </p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6"
            >
              <AlertCircle size={14} className="stroke-red-400 flex-shrink-0" />
              <p className="text-red-400 text-[13px] font-light">{error}</p>
            </motion.div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 stroke-white/30" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#071629] border border-white/10 pl-10 pr-4 py-3.5 text-[14px] text-white placeholder-white/20 outline-none focus:border-[#C9A84C] transition-colors font-light"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 stroke-white/30" />
              <input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#071629] border border-white/10 pl-10 pr-12 py-3.5 text-[14px] text-white placeholder-white/20 outline-none focus:border-[#C9A84C] transition-colors font-light"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.12em] uppercase font-medium py-4 hover:bg-[#E8C97A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6 font-light">
          This portal is not publicly accessible. Authorised personnel only.
        </p>
      </motion.div>
    </div>
  );
}
