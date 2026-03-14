import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeatureGrid from './FeatureGrid';
import AuthPage from './AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <FeatureGrid />
          </>
        } />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
export default App;