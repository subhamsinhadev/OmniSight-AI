import React, { useState } from 'react';
import { Shield, Mail, Lock, User, ChevronRight } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 DYNAMIC API URL: Uses environment variable or falls back to local
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/signup";

    // Basic Validation
    if (!email || !email.includes("@")) return alert("Enter a valid email");
    if (!password || password.length < 6) return alert("Password must be at least 6 characters");
    if (!isLogin && (!name || name.trim().length < 2)) return alert("Enter a valid name");

    const body = isLogin 
      ? { email, password } 
      : { name, email, password, role };

    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Something went wrong");
        return;
      }

      if (isLogin) {
        // SUCCESS: Save to storage
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userName", data.name || "User");

        // Redirect based on the role returned by the server
        window.location.href = data.role === "admin" ? "/admin/dashboard" : "/client/dashboard";
      } else {
        // SIGNUP SUCCESS
        alert("Account created successfully! Please login.");
        setIsLogin(true);
        setName("");
      }
    } catch (err) {
      console.error(err);
      alert("Connection failed. Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-[420px] z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="p-2.5 bg-emerald-500 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Shield className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            OmniSight <span className="text-emerald-400">AI</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          {/* Role Switch (Only show during Signup) */}
          {!isLogin && (
            <div className="flex p-1 bg-black/40 rounded-2xl mb-8 border border-white/5">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  role === 'client' ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Delivery Partner
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  role === 'admin' ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Join OmniSight"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? "Secure access to your earnings protection" : "Start yourparametric income journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 text-white border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work Email"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 text-white border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Password"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 text-white border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all mt-4 active:scale-[0.98] shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
              {isLogin ? "Sign In" : "Create Account"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center mt-8">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              {isLogin ? "New to OmniSight? " : "Already protected? "}
              <span className="text-emerald-400 font-semibold">{isLogin ? "Create account" : "Sign in here"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;