import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeatureGrid from './FeatureGrid';
import AuthPage from './AuthPage';
import Footer from "./Footer";

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
      </Routes>

    </Router>
  );
}

export default App;