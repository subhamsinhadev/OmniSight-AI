import React, { useState } from 'react';
import { Shield, Mail, Lock, User, ArrowRight, ChevronRight } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('client'); // 'client' or 'admin'

  return (
    <div className="min-h-screen bg-omni-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-omni-emerald/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-[450px] z-10">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-2 mb-8 group cursor-pointer">
          <div className="p-2 bg-omni-emerald rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Shield className="w-6 h-6 text-omni-dark" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">OmniSight <span className="text-omni-emerald">AI</span></span>
        </div>

        {/* Auth Card */}
        <div className="bg-omni-dark-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          
          {/* Role Switcher */}
          <div className="flex p-1 bg-omni-dark/50 rounded-xl mb-8 border border-white/5">
            <button 
              onClick={() => setRole('client')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'client' ? 'bg-omni-emerald text-omni-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Partner
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'admin' ? 'bg-omni-emerald text-omni-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Administrator
            </button>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Shield'}
            </h2>
            <p className="text-gray-400 text-sm">
              {role === 'admin' ? 'Access the oversight control center' : 'Secure your gig earnings today'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Ayan Chowdhury" 
                    className="w-full bg-omni-dark/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-omni-emerald/50 focus:ring-1 focus:ring-omni-emerald/50 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-omni-dark/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-omni-emerald/50 focus:ring-1 focus:ring-omni-emerald/50 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
                {isLogin && <a href="#" className="text-xs text-omni-emerald hover:underline">Forgot?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-omni-dark/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-omni-emerald/50 focus:ring-1 focus:ring-omni-emerald/50 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <button className="w-full bg-omni-emerald hover:bg-emerald-400 text-omni-dark font-bold py-4 rounded-xl shadow-xl shadow-omni-emerald/10 flex items-center justify-center gap-2 group transition-all mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already protected?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-omni-emerald font-semibold hover:underline"
              >
                {isLogin ? 'Create one now' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-gray-600 text-xs uppercase tracking-widest">
          Secured by OmniSight AI Parametric Protocol
        </p>
      </div>
    </div>
  );
};

export default AuthPage;