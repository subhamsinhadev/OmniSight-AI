import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Shield,
  Activity,
  Users,
  AlertOctagon,
  Zap,
  Map as MapIcon,
  Search,
  RefreshCw,
  Filter
} from "lucide-react";
import { LogOut } from "lucide-react";
import ZoneRiskMap from "./components/ZoneRiskMap";


const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const MonitoringPanel = ({ handleSimulate, isSimulating, handleLogout }) => {

const [fraudLogs, setFraudLogs] = useState([]);
const [fraudStats, setFraudStats] = useState({
  total_flags: 0,
  high_risk: 0
});

const [killSwitch, setKillSwitch] = useState({
  active: false,
  reason: null
});

useEffect(() => {
  const fetchKillSwitch = async () => {
    try {
      const killRes = await axios.get("/admin/kill-switch-status");
      setKillSwitch(killRes.data);
    } catch (err) {
      console.error("Kill switch fetch error:", err);
    }
  };

  fetchKillSwitch();

  const interval = setInterval(fetchKillSwitch, 5000); // 🔥 live

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const fetchFraudData = async () => {
    try {
      const logsRes = await axios.get("/admin/fraud-logs");
      const statsRes = await axios.get("/admin/fraud-stats");

      setFraudLogs(
        Array.isArray(logsRes.data)
          ? logsRes.data
          : logsRes.data?.logs || []
      );
      setFraudStats(statsRes.data);
    } catch (err) {
      console.error("Fraud fetch error:", err);
    }
  };

  fetchFraudData();

  const interval = setInterval(fetchFraudData, 5000); // 🔥 every 5 sec

  return () => clearInterval(interval); // cleanup
}, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold italic tracking-tight">
          SYSTEM OVERVIEW
        </h1>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Zone ID..."
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 outline-none focus:border-red-500/50"
            />
          </div>

          <button
            onClick={handleSimulate}
            className="px-6 py-2 bg-red-600 rounded-full font-bold flex items-center gap-2"
          >
            <Zap size={18} />
            {isSimulating ? "SIMULATING..." : "SIMULATE DISRUPTION"}
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Emergency & Actuarial Cards */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-black/40 border border-red-500/20 rounded-3xl p-6">
          <h2 className="text-red-400 text-lg font-semibold">
            Emergency Control
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Instantly halt all new policy enrollments and renewals during
            high-risk scenarios.
          </p>

          <button
            className={`mt-5 w-full py-3 rounded-xl font-bold text-lg ${
              killSwitch.active
                ? "bg-red-700 animate-pulse"
                : "bg-green-600"
            }`}
          >
            🚨 KILL SWITCH
          </button>

          <p
            className={`text-xs mt-2 ${
              killSwitch.active ? "text-red-400" : "text-green-400"
            }`}
          >
            Status: {killSwitch.active ? "ACTIVE 🚨" : "System Safe"}
          </p>

          {killSwitch.reason && (
            <p className="text-orange-400 text-xs mt-1">
              Reason: {killSwitch.reason}
            </p>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-lg font-semibold">
            Actuarial Risk Monitor
          </h2>
          <p className="text-gray-400 mt-2">Loss Ratio</p>
          <p className="text-2xl font-bold text-orange-400">78%</p>
          <p className="text-gray-400 mt-2">Active Risk Zones</p>
          <p className="text-red-400 font-bold">20 Zones · 4 Cities</p>
          <p className="text-gray-400 mt-2">Premium vs Payout</p>
          <p className="text-green-400 font-bold">₹1.2L / ₹95K</p>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
            <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {[
          { label: "TOTAL PARTNERS", value: "12,402", icon: <Users /> },
          { label: "ACTIVE TRIGGERS", value: "3", icon: <Zap /> },
          { label: "FRAUD FLAGGED", value: fraudStats.total_flags, icon: <AlertOctagon /> },
          { label: "HIGH RISK", value: fraudStats.high_risk, icon: <AlertOctagon /> }
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            {card.icon}
            <p className="text-gray-400 text-sm mt-2">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Live Parametric Triggers & AI Shield */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Live Parametric Triggers
          </h2>
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left">Zone</th>
                <th>Trigger</th>
                <th>Intensity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bandra West</td>
                <td>Heavy Rain</td>
                <td className="text-red-400">22mm/hr</td>
                <td className="text-red-400">ACTIVE</td>
                <td>Override</td>
              </tr>
              <tr>
                <td>Salt Lake</td>
                <td>Water Logging</td>
                <td className="text-red-400">Critical</td>
                <td className="text-red-400">ACTIVE</td>
                <td>Override</td>
              </tr>
              <tr>
                <td>Indiranagar</td>
                <td>Roadblock</td>
                <td className="text-yellow-400">High</td>
                <td className="text-yellow-400">PENDING</td>
                <td>Override</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            AI Anomaly Shield
          </h2>
          {fraudLogs.map((log, index) => (
            <div
              key={index}
              className="border border-red-500/20 rounded-xl p-4 mb-4"
            >
              <p className="text-orange-400 font-semibold">
                {log.risk_level} Risk
              </p>

              <p className="text-gray-400 text-sm">
                {log.reasons}
              </p>

              <div className="flex gap-2 mt-2">
                <button className="bg-red-600 px-3 py-1 rounded-md">
                  Block
                </button>
                <button className="bg-gray-700 px-3 py-1 rounded-md">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


// ---------------------------------------------------------------------------
// Zone Control Panel — Live 20-Zone All-India Heatmap
// ---------------------------------------------------------------------------

const CITY_COLORS = {
  Mumbai:  { bg: "bg-red-500/10",    border: "border-red-500/30",    text: "text-red-400",    dot: "bg-red-500"    },
  Delhi:   { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", dot: "bg-orange-500" },
  Kolkata: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", dot: "bg-violet-500" },
  Chennai: { bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   text: "text-cyan-400",   dot: "bg-cyan-500"   },
};

const CITIES = ["All", "Mumbai", "Delhi", "Kolkata", "Chennai"];

const ZoneControlPanel = () => {
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const [cityFilter, setCityFilter] = useState("All");
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch live zone scores from API, fallback to static JSON if offline
  const fetchScores = async () => {
    try {
      const res = await fetch(`${API_BASE}/zones/risk/heatmap`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.zones && data.zones.length > 0) {
        setScores(data.zones);
        setLoading(false);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.warn("[OmniSight] Live backend offline, falling back to static zones data.", err.message);
      try {
        const fallbackRes = await fetch('/zones_data.json');
        const fallbackData = await fallbackRes.json();
        if (fallbackData.zones && fallbackData.zones.length > 0) {
          setScores(fallbackData.zones);
          setLastUpdate(new Date());
        }
      } catch (fallbackErr) {
        console.error("Static fallback also failed.", fallbackErr);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 10 * 60 * 1000); // 10 min
    return () => clearInterval(interval);
  }, []);

  const filteredScores = cityFilter === "All"
    ? scores
    : scores.filter(z => z.city === cityFilter);

  const getBadge = (score) => {
    if (score >= 75) return { label: "DANGER", bg: "bg-red-600", text: "text-white" };
    if (score >= 50) return { label: "CAUTION", bg: "bg-yellow-500", text: "text-black" };
    return { label: "SAFE", bg: "bg-green-600", text: "text-white" };
  };

  // Stats
  const dangerCount  = scores.filter(z => z.risk_score >= 75).length;
  const cautionCount = scores.filter(z => z.risk_score >= 50 && z.risk_score < 75).length;
  const safeCount    = scores.filter(z => z.risk_score < 50).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold italic tracking-tight">ZONE CONTROL</h1>
          <p className="text-gray-500 text-sm mt-1">Live risk heatmap · Pan-India Coverage · 20 Zones · DevTrails 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchScores}
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={14} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Refresh</span>
          </button>
          <div className="flex items-center gap-2 bg-red-600/10 border border-red-500/30 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Total Zones</p>
          <p className="text-2xl font-bold text-white">{scores.length}</p>
        </div>
        <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Danger</p>
          <p className="text-2xl font-bold text-red-400">{dangerCount}</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Caution</p>
          <p className="text-2xl font-bold text-yellow-400">{cautionCount}</p>
        </div>
        <div className="bg-green-600/10 border border-green-500/20 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Safe</p>
          <p className="text-2xl font-bold text-green-400">{safeCount}</p>
        </div>
      </div>

      {/* Map — Live ZoneRiskMap */}
      <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-4">
        <div className="relative" style={{ height: "520px" }}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a] z-10">
              <RefreshCw className="animate-spin text-red-500" />
            </div>
          )}
          <ZoneRiskMap height="520px" showLegend={true} />
        </div>
      </div>

      {/* City Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <Filter size={14} className="text-gray-500" />
        {CITIES.map(city => (
          <button
            key={city}
            onClick={() => setCityFilter(city)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              cityFilter === city
                ? "bg-red-600 text-white"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {city === "All" ? "All Cities" : city}
            {city !== "All" && (
              <span className="ml-1 text-xs opacity-60">
                ({scores.filter(z => z.city === city).length})
              </span>
            )}
          </button>
        ))}
        {lastUpdate && (
          <span className="ml-auto text-xs text-gray-600">
            Updated: {lastUpdate.toLocaleTimeString("en-IN", { hour12: true })} · refreshes every 10 min
          </span>
        )}
      </div>

      {/* Live Zone Risk Cards */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-red-400" />
          <h2 className="text-sm font-bold tracking-widest text-gray-300 uppercase">Live Gig Worker Risk Scores</h2>
          <span className="ml-auto text-xs text-gray-600">
            {filteredScores.length} zone{filteredScores.length !== 1 ? "s" : ""} shown
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3 max-h-[520px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
          {filteredScores.map((zone) => {
            const badge = getBadge(zone.risk_score);
            const pct = Math.min(100, zone.risk_score);
            const cityStyle = CITY_COLORS[zone.city] || CITY_COLORS.Mumbai;
            return (
              <div
                key={zone.id}
                className={`bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:border-red-500/30 transition-all hover:scale-[1.02] cursor-default`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-mono uppercase">{zone.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{zone.display_name}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${cityStyle.dot}`} />
                  <p className={`text-xs ${cityStyle.text}`}>{zone.city}</p>
                  {zone.condition && zone.condition !== "Fallback" && (
                    <span className="text-[10px] text-gray-600 ml-auto">{zone.condition}</span>
                  )}
                </div>
                <div className="mt-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Risk</span>
                    <span className="font-bold font-mono" style={{ color: zone.risk_score >= 75 ? "#dc2626" : zone.risk_score >= 50 ? "#f59e0b" : "#16a34a" }}>
                      {zone.risk_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: zone.risk_score > 75 ? "#dc2626" : zone.risk_score > 50 ? "#f59e0b" : "#16a34a" }}
                    />
                  </div>
                </div>
                {(zone.precip_mm > 0 || zone.wind_kph > 0) && (
                  <div className="flex gap-3 text-[10px] text-gray-500 mt-0.5">
                    <span>🌧 {zone.precip_mm}mm</span>
                    <span>💨 {zone.wind_kph}kph</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


const ComingSoonPanel = ({ title }) => (
  <div className="flex items-center justify-center h-[70vh] text-gray-500 text-xl font-bold">
    {title} — Coming Soon
  </div>
);


const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("monitoring");
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const navItems = [
    { key: "monitoring",  label: "Monitoring",   Icon: Activity },
    { key: "zonecontrol", label: "Zone Control", Icon: MapIcon },
    { key: "partners",    label: "Partners",     Icon: Users },
    { key: "fraud",       label: "Fraud AI",     Icon: AlertOctagon },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-[#0d1220] border-r border-white/10 p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-1">
          <Shield className="text-red-500 shrink-0" size={22} />
          <span className="hidden lg:block font-bold text-lg tracking-wide text-white">
            OMNISIGHT OPS
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                activeNav === key
                  ? "bg-red-600/20 text-red-400 border border-red-500/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeNav === "monitoring" && (
          <MonitoringPanel
            handleSimulate={handleSimulate}
            isSimulating={isSimulating}
            handleLogout={handleLogout}
          />
        )}
        {activeNav === "zonecontrol" && <ZoneControlPanel />}
        {activeNav === "partners" && <ComingSoonPanel title="Partners" />}
        {activeNav === "fraud" && <ComingSoonPanel title="Fraud AI" />}
      </main>
    </div>
  );
};

export default AdminDashboard;
