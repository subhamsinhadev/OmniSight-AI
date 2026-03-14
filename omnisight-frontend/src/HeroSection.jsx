// src/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Shield, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-omni-dark text-gray-100 min-h-screen flex flex-col font-sans overflow-hidden relative">
      
      {/* --- PREMIUM NAVBAR --- */}
      <nav className="z-50 flex items-center justify-between px-6 py-6 container mx-auto">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-1.5 bg-omni-emerald rounded-lg">
            <Shield className="w-6 h-6 text-omni-dark" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">OmniSight <span className="text-omni-emerald">AI</span></span>
        </div>

        {/* Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-omni-emerald transition-colors">Solutions</a>
          <a href="#" className="hover:text-omni-emerald transition-colors">Risk Models</a>
          <a href="#" className="hover:text-omni-emerald transition-colors">Pricing</a>
        </div>

        {/* CTA in Navbar */}
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-sm font-semibold hover:text-omni-emerald transition-colors">
            Log in
          </Link>
          <Link to="/auth" className="bg-omni-emerald text-omni-dark px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-400 transition-all shadow-lg shadow-omni-emerald/20">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 flex-grow flex flex-col justify-center items-center text-center z-10 py-20">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-omni-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-omni-emerald"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Hackathon Prototype v1.0</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">
          Income Protection, <br />
          <span className="bg-gradient-to-r from-green-300 via-omni-emerald to-emerald-600 bg-clip-text text-transparent">
            Automated by AI.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          The first AI-enabled parametric platform for India’s gig delivery workforce. 
          Instant payouts triggered by external disruptions. No claims. No delays.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link to="/auth" className="group bg-omni-emerald text-omni-dark font-black px-10 py-5 rounded-full text-lg shadow-2xl hover:bg-green-400 transition-all flex items-center gap-2">
            Get Protected
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button className="bg-white/5 border border-white/10 text-white font-bold px-10 py-5 rounded-full text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-omni-emerald/10 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default HeroSection;