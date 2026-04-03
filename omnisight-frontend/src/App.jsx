import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import HeroSection from "./HeroSection";
import FeatureGrid from "./FeatureGrid";
import AuthPage from "./AuthPage";
import Footer from "./Footer";
import ClientDashboard from "./ClientDashboard";
import AdminDashboard from "./AdminDashboard";
import Loading from "./Loading";
import ProtectedRoute from "./components/ProtectedRoute";
  
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

            
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;