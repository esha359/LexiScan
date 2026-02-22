import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Learn from './pages/Learn';
import HistoryPage from './pages/HistoryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
