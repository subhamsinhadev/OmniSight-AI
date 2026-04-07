import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HeroSection from "./HeroSection";
import FeatureGrid from "./FeatureGrid";
import AuthPage from "./AuthPage";
import Footer from "./Footer";
import ClientDashboard from "./ClientDashboard";
import AdminDashboard from "./AdminDashboard";
import Loading from "./Loading";
  
import Pricing from "./Pricing";
import ProtectedRoute from "./components/ProtectedRoute";
import PlanDashboard from "./PlanDashboard"
import BuyForm from "./BuyForm"
import PayoutHistory from "./PayoutHistory";


function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      {loading ? (
        <Loading onFinish={() => setLoading(false)} />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeatureGrid />
                  <Footer />
                </>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute role="client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/plan-dashboard"
              element={
                <ProtectedRoute role="client">
                  <PlanDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/client/payout-history" element={<PayoutHistory />} />
            {/* <Route path="/client/plan-dashboard" element={<PlanDashboard />} /> */}
            <Route path="/buy" element={<BuyForm />} />
            
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;