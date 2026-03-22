import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeatureGrid from './FeatureGrid';
import AuthPage from './AuthPage';
import Footer from "./Footer";
import ClientDashboard from './ClientDashboard';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <FeatureGrid />
      <Footer />
          </>
        } />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
      </Routes>

    </Router>
  );
}

export default App;