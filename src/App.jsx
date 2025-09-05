// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import DataStructures from "./pages/DataStructures";
import Graph from "./pages/Graph";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Contributors from "./components/Contributors";
import ScrollToTop from "./ScrollToTop";
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import Doubt from "./components/Doubt";
import AlgorithmDocumentation from "./pages/Documentation";
import "./styles/components.css";
import ComplexityBox from "./components/ComplexityBox";

const App = () => {
  // 🔹 for now, hardcoded to bubbleSort (later we can make it dynamic)
  const selectedAlgorithm = "bubbleSort";

  return (
    <div className="app-container">
      <ScrollToTop />

      <Sidebar />

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
        </Routes>

        {/* ✅ Complexity Info Box */}
        <div style={{ marginTop: "2rem" }}>
          <ComplexityBox algorithm={selectedAlgorithm} />
        </div>
      </main>

      <Doubt />
      <Footer />
    </div>
  );
};

export default App;
