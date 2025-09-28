import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { SettingsProvider } from "./contexts/SettingsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import ComplexityBox from "./components/ComplexityBox";
import Doubt from "./components/Doubt";
import FeedbackWidget from "./components/FeedbackWidget";

// Pages
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import SortingDoc from "./pages/SortingDoc.jsx";
import Searching from "./pages/Searching";
import SearchingOverview from "./pages/SearchingOverview.jsx";
import DataStructures from "./pages/DataStructures";
import Graph from "./pages/Graph";
import GraphBFS from "./pages/GraphBFS";
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Contributors from "./components/Contributors";
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";
import AlgorithmDocumentation from "./pages/Documentation";
import ContributorLeaderboard from "./pages/ContributorLeaderboard";
import LinkedListPage from "./components/pages/LinkedListPage";
import AlgorithmComparison from "./components/AlgorithmComparison";
import Blog from "./pages/Blog";
import CommunityLanding from "./pages/CommunityLanding";
import FAQ from "./pages/FAQ";
import BacktrackingOverview from "./pages/BacktrackingOverview";
import BacktrackingPage from "./pages/BacktrackingPage";
import DPOverview from "./pages/DPOverview";
import DPPage from "./pages/DPPage";
import HashingOverview from "./pages/HashingOverview";
import HashingPage from "./pages/HashingPage";
import GreedyOverview from "./pages/GreedyOverview";
import GreedyPage from "./pages/GreedyPage";
import TreeOverview from "./pages/TreeOverview";
import TreePage from "./pages/TreePage";
import DCOverview from "./pages/DCOverview";
import DCPage from "./pages/DCPage";
import Queue from "./components/Queue/Queue";
import Stack from "./components/Stack/Stack";
import CodeEditor from "./pages/CodeEditor";

import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/components.css";

const App = () => {
  const location = useLocation();
  const selectedAlgorithm = "bubbleSort";

  const showComplexityBoxOn = [
    "/sorting",
    "/searching",
    "/data-structures",
    "/graph",
    "/graph/bfs",
    "/graph/dfs",
    "/graph/dijkstra",
    "/data-structures/stack",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <SettingsProvider>
      <div className="app-container">
        <ScrollToTop />
        <ThemeToggle />
        <Navbar />

        <main className="main-content page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/sorting/:algoId/docs" element={<SortingDoc />} />

            <Route path="/searching" element={<Searching />} />
            <Route path="/searching/:id" element={<Searching />} />
            <Route path="/searchingOverview" element={<SearchingOverview />} />
            <Route path="/searching/comparison" element={<AlgorithmComparison />} />

            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/data-structures/linked-list" element={<LinkedListPage />} />
            <Route path="/data-structures/queue" element={<Queue />} />
            <Route path="/data-structures/stack" element={<Stack />} />

            <Route path="/graph" element={<Graph />} />
            <Route path="/graph/bfs" element={<GraphBFS />} />
            <Route path="/graph/dfs" element={<GraphDFS />} />
            <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
            <Route path="/graph/comparison" element={<AlgorithmComparison />} />

            <Route path="/backtracking-overview" element={<BacktrackingOverview />} />
            <Route path="/backtracking" element={<BacktrackingPage />} />

            <Route path="/dp-overview" element={<DPOverview />} />
            <Route path="/dp" element={<DPPage />} />

            <Route path="/hashing-overview" element={<HashingOverview />} />
            <Route path="/hashing" element={<HashingPage />} />

            <Route path="/greedy-overview" element={<GreedyOverview />} />
            <Route path="/greedy" element={<GreedyPage />} />

            <Route path="/tree-overview" element={<TreeOverview />} />
            <Route path="/tree" element={<TreePage />} />

            <Route path="/dc-overview" element={<DCOverview />} />
            <Route path="/dc" element={<DCPage />} />

            <Route path="/quiz" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/community" element={<CommunityLanding />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/documentation" element={<AlgorithmDocumentation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ContributorLeaderboard" element={<ContributorLeaderboard />} />

            {/* Code Editor */}
            <Route path="/editor" element={<CodeEditor />} />
          </Routes>

          {showComplexityBoxOn.includes(location.pathname) && (
            <div style={{ marginTop: "2rem" }}>
              <ComplexityBox algorithm={selectedAlgorithm} />
            </div>
          )}
        </main>

        <Doubt />
        <FeedbackWidget />
        <Footer />
        <Analytics />
      </div>
    </SettingsProvider>
  );
};

export default App;
