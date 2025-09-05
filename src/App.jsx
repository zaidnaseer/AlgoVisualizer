import React from 'react';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sorting from './pages/Sorting';
import Searching from './pages/Searching';
import DataStructures from './pages/DataStructures';
import Graph from './pages/Graph';
import GraphBFS from './pages/GraphBFS';
import GraphDFS from './pages/GraphDFS';
import GraphDijkstra from './pages/GraphDijkstra';
import Quiz from './pages/Quiz';
import Settings from './pages/Settings';
import Contributors from './components/Contributors';
import ScrollToTop from './ScrollToTop';
import About from './components/about';
import Contact from './components/contact';
import PrivacyPolicy from './components/Privacy';
import TermsOfService from './components/terms';
import Doubt from './components/Doubt';
import AlgorithmDocumentation from './pages/Documentation';
import ComplexityBox from './components/ComplexityBox';
import './styles/components.css';
import { ThemeProvider } from './ThemeContext';

// Clerk imports
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthButtons = () => {
  const location = useLocation();

  if (location.pathname === "/sign-in" || location.pathname === "/sign-up") return null;

  return (
    <div className="auth-buttons">
      <Link to="/sign-in" className="auth-btn">Sign In</Link>
      <Link to="/sign-up" className="auth-btn">Sign Up</Link>
    </div>
  );
};

const App = () => {
  const selectedAlgorithm = "bubbleSort"; // You can set this dynamically

  return (
    <ThemeProvider>
      <div className="app-container">
        <ScrollToTop />
        <Sidebar />
        <AuthButtons />

        <main className="main-content main-content-with-sidebar">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/graph/bfs" element={<GraphBFS />} />
            <Route path="/graph/dfs" element={<GraphDFS />} />
            <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/documentation" element={<AlgorithmDocumentation />} />

            {/* Clerk Authentication Routes */}
            <Route path="/sign-in" element={<div className="auth-page"><SignIn routing="path" path="/sign-in" /></div>} />
            <Route path="/sign-up" element={<div className="auth-page"><SignUp routing="path" path="/sign-up" /></div>} />
          </Routes>

          {/* Complexity Info Box */}
          <div style={{ marginTop: "2rem" }}>
            <ComplexityBox algorithm={selectedAlgorithm} />
          </div>
        </main>

        <Doubt />
        <Footer />
        <Analytics />
      </div>
    </ThemeProvider>
  );
};

export default App;