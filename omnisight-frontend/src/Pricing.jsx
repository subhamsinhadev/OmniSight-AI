// src/pages/Pricing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import logo from "./assets/logo.png";

const Pricing = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const Item = ({ text }) => (
        <div className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-omni-emerald cursor-pointer">
            {text}
        </div>
    );
    
    return (
        <div className="pt-28">
            <nav
                className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-300
 ${scrolled
                        ? "bg-white/5 border-b border-emerald-400/20 shadow-lg shadow-emerald-500/10"
                        : "bg-transparent"
                    }`}
            >
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/10 via-green-400/10 to-emerald-600/10 blur-2xl"></div>

                <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-4 container mx-auto">

                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img src={logo} alt="OmniSight AI" className="w-10 h-10 sm:w-12 sm:h-12" />
                        <span className="text-lg sm:text-xl font-bold text-white">
                            OmniSight <span className="text-omni-emerald">AI</span>
                        </span>
                    </div>

                    {/* Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">

                        {/* Solutions */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-omni-emerald">
                                Solutions <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-10 left-0 opacity-0 translate-y-2 scale-95
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
          transition-all duration-300">

                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-60">
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Delivery Protection</a>
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Risk Models</a>
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Smart Triggers</a>
                                </div>
                            </div>
                        </div>

                        {/* Renew */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-omni-emerald">
                                Renew <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-10 opacity-0 group-hover:opacity-100 transition">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-52">
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Renew Policy</a>
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Check Status</a>
                                </div>
                            </div>
                        </div>

                        {/* Claims */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-omni-emerald">
                                Claim <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-10 opacity-0 group-hover:opacity-100 transition">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-52">
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">File Claim</a>
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Track Claim</a>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-omni-emerald">
                                Support <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-10 opacity-0 group-hover:opacity-100 transition">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-52">
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Help Center</a>
                                    <a href="#" className="block py-2 px-3 hover:bg-white/10 rounded-lg">Contact Us</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">

                        <button className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20">
                            <Phone size={16} />
                            Talk to Expert
                        </button>

                        <Link to="/auth" className="text-sm font-semibold text-gray-300 hover:text-omni-emerald">
                            Sign in
                        </Link>

                    </div>

                </div>
            </nav>
            <div className="bg-omni-dark text-white min-h-screen">

                {/* ================= HERO ================= */}
                <section className="text-center py-28 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-3xl"></div>

                    <h1 className="text-6xl font-extrabold mb-6">
                        Choose Your Protection Plan
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        AI-powered parametric insurance built for gig workers.
                        Pay weekly, stay protected during disruptions.
                    </p>
                </section>

                {/* ================= TRUST SECTION ================= */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="grid md:grid-cols-3 gap-8 text-center">

                        <div className="bg-omni-dark-card p-8 rounded-2xl">
                            <h3 className="text-3xl font-bold text-omni-emerald">10K+</h3>
                            <p className="text-gray-400">Workers Protected</p>
                        </div>

                        <div className="bg-omni-dark-card p-8 rounded-2xl">
                            <h3 className="text-3xl font-bold text-omni-emerald">₹5L+</h3>
                            <p className="text-gray-400">Income Secured</p>
                        </div>

                        <div className="bg-omni-dark-card p-8 rounded-2xl">
                            <h3 className="text-3xl font-bold text-omni-emerald">99%</h3>
                            <p className="text-gray-400">Auto Claim Accuracy</p>
                        </div>

                    </div>
                </section>

                {/* ================= PRICING CARDS ================= */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="grid md:grid-cols-3 gap-10">

                        {[{
                            title: "Basic",
                            weekly: "₹53",
                            monthly: "₹199",
                            features: ["Rain Coverage", "Zone Risk Pricing", "Weekly Billing"],
                        }, {
                            title: "Pro",
                            features: ["Weather + Pollution", "Priority Payout", "Fraud Detection"],
                            highlight: true
                        }, {
                            title: "Elite",
                            features: ["Full Coverage", "Instant Payout", "Max Compensation"],
                        }].map((plan, i) => (

                            <div key={i}
                                className={`rounded-3xl overflow-hidden border transition-all duration-300
      ${plan.highlight
                                        ? "border-omni-emerald scale-105 shadow-xl shadow-omni-emerald/20"
                                        : "border-gray-800 hover:border-omni-emerald"}
      `}
                            >

                                <div className="p-8">

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>

                                    {/* PRICE SECTION */}
                                    {plan.weekly ? (
                                        <div className="mb-6 space-y-1">
                                            <div>
                                                <span className="text-4xl font-extrabold">{plan.weekly}</span>
                                                <span className="text-gray-400"> /week</span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {plan.monthly} /month
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-6 text-lg font-semibold text-omni-emerald">
                                            Contact Us for Pricing
                                        </div>
                                    )}

                                    {/* FEATURES */}
                                    <ul className="space-y-3 text-gray-400 mb-8">
                                        {plan.features.map((f, idx) => (
                                            <li key={idx}>✔ {f}</li>
                                        ))}
                                    </ul>

                                    {/* BUTTON */}
                                    {plan.weekly ? (
                                        <button
                                            onClick={() => navigate("/auth")}
                                            className="w-full py-3 rounded-full bg-omni-emerald text-black font-bold hover:bg-green-400"
                                        >
                                            Get Started
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20"
                                        >
                                            Contact Us
                                        </button>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>
                </section>

                {/* ================= COMPARISON TABLE ================= */}
                <section className="container mx-auto px-6 mb-32">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Compare Plans
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border border-gray-800 rounded-xl overflow-hidden">

                            <thead className="bg-omni-dark-card">
                                <tr>
                                    <th className="p-4">Features</th>
                                    <th className="p-4">Basic</th>
                                    <th className="p-4">Pro</th>
                                    <th className="p-4">Elite</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-400">
                                <tr className="border-t border-gray-800">
                                    <td className="p-4">Rain Coverage</td>
                                    <td className="p-4">✔</td>
                                    <td className="p-4">✔</td>
                                    <td className="p-4">✔</td>
                                </tr>

                                <tr className="border-t border-gray-800">
                                    <td className="p-4">Pollution Coverage</td>
                                    <td className="p-4">✖</td>
                                    <td className="p-4">✔</td>
                                    <td className="p-4">✔</td>
                                </tr>

                                <tr className="border-t border-gray-800">
                                    <td className="p-4">Instant Payout</td>
                                    <td className="p-4">✖</td>
                                    <td className="p-4">✔</td>
                                    <td className="p-4">✔</td>
                                </tr>

                            </tbody>

                        </table>
                    </div>
                </section>
                <section className="relative py-32 bg-omni-dark overflow-hidden">

                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>

                    <div className="container mx-auto px-6">

                        {/* Heading */}
                        <div className="text-center mb-24">
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                                How Your Weekly Price is Calculated
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                Not fixed. Not random. Your premium is intelligently calculated using real-world data,
                                ensuring fair pricing for every delivery partner.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-28">

                            {/* STEP 1 */}
                            <div className="grid md:grid-cols-2 gap-16 items-center group">

                                {/* Text */}
                                <div className="space-y-6 transform transition duration-700 group-hover:-translate-y-2">
                                    <h3 className="text-3xl font-bold">
                                        📍 Location-Based Risk Analysis
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Your delivery zone plays a crucial role in pricing. Areas prone to frequent
                                        heavy rainfall, flooding, or high pollution levels are considered higher risk.
                                        Our system analyzes historical disruption data across your exact location —
                                        not just city-level averages.
                                    </p>
                                </div>

                                {/* Visual */}
                                <div className="h-64 bg-omni-dark-card rounded-3xl flex items-center justify-center 
                        transition duration-700 group-hover:scale-105">
                                    <span className="text-6xl">🌍</span>
                                </div>

                            </div>

                            {/* STEP 2 */}
                            <div className="grid md:grid-cols-2 gap-16 items-center group">

                                <div className="h-64 bg-omni-dark-card rounded-3xl flex items-center justify-center 
                        transition duration-700 group-hover:scale-105 order-2 md:order-1">
                                    <span className="text-6xl">🌧</span>
                                </div>

                                <div className="space-y-6 transform transition duration-700 group-hover:-translate-y-2 order-1 md:order-2">
                                    <h3 className="text-3xl font-bold">
                                        🌧 Real-Time Disruption Signals
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        We continuously monitor weather conditions, air quality, and urban disruptions
                                        using live data sources. If your area shows high probability of disruption in the
                                        upcoming week, your premium adjusts accordingly — ensuring accurate, real-time pricing.
                                    </p>
                                </div>

                            </div>

                            {/* STEP 3 */}
                            <div className="grid md:grid-cols-2 gap-16 items-center group">

                                <div className="space-y-6 transform transition duration-700 group-hover:-translate-y-2">
                                    <h3 className="text-3xl font-bold">
                                        📊 AI Risk Prediction Engine
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Our machine learning models analyze patterns from thousands of past disruption events.
                                        It predicts the likelihood of income loss in your zone and calculates a fair weekly premium
                                        that balances affordability and coverage.
                                    </p>
                                </div>

                                <div className="h-64 bg-omni-dark-card rounded-3xl flex items-center justify-center 
                        transition duration-700 group-hover:scale-105">
                                    <span className="text-6xl">🤖</span>
                                </div>

                            </div>

                            {/* STEP 4 */}
                            <div className="grid md:grid-cols-2 gap-16 items-center group">

                                <div className="h-64 bg-omni-dark-card rounded-3xl flex items-center justify-center 
                        transition duration-700 group-hover:scale-105 order-2 md:order-1">
                                    <span className="text-6xl">💸</span>
                                </div>

                                <div className="space-y-6 transform transition duration-700 group-hover:-translate-y-2 order-1 md:order-2">
                                    <h3 className="text-3xl font-bold">
                                        💸 Weekly Premium Output
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Based on all inputs — location, disruption probability, and AI predictions —
                                        your final premium is calculated and charged weekly. This ensures flexibility,
                                        transparency, and alignment with your income cycle.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* FINAL NOTE */}
                        <div className="mt-28 text-center">
                            <p className="text-gray-500 max-w-xl mx-auto">
                                Unlike traditional insurance, you don’t pay for fixed coverage.
                                You pay based on real-world risk — making it smarter, fairer, and built for gig workers.
                            </p>
                        </div>

                    </div>
                </section>

                {/* ================= CTA ================= */}
                <section className="text-center pb-24">
                    <h2 className="text-3xl font-bold mb-6">
                        Start Protecting Your Income Today
                    </h2>

                    <button
                        onClick={() => navigate("/auth")}
                        className="bg-omni-emerald px-8 py-4 rounded-full text-black font-bold hover:bg-green-400"
                    >
                        Get Started Now
                    </button>
                </section>
                <Footer />
            </div>
        </div>
    );
};

export default Pricing;