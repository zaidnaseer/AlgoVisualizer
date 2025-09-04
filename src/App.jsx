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
import './styles/components.css';
import { ThemeProvider } from './ThemeContext'; 

// Clerk imports
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthButtons = () => {
  const location = useLocation();

  // Hide auth buttons when already on sign-in or sign-up page
  if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
    return null;
  }

  return (
    <div className="auth-buttons">
      <Link to="/sign-in" className="auth-btn">Sign In</Link>
      <Link to="/sign-up" className="auth-btn">Sign Up</Link>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        {/* This runs on every route change (Router is provided in index.jsx) */}
        <ScrollToTop />

        <Sidebar />
        <AuthButtons /> {/* Top-left auth buttons */}

        <main className="main-content main-content-with-sidebar">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/documentation" element={<AlgorithmDocumentation />} />

            {/* Clerk Authentication Routes */}
            <Route
              path="/sign-in"
              element={
                <div className="auth-page">
                  <SignIn routing="path" path="/sign-in" />
                </div>
              }
            />
            <Route
              path="/sign-up"
              element={
                <div className="auth-page">
                  <SignUp routing="path" path="/sign-up" />
                </div>
              }
            />
          </Routes>
        </main>

        <Doubt />
        <Footer />
        <Analytics />
      </div>
    </ThemeProvider>
  );
};

export default App;
