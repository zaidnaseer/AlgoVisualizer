// src/App.jsx
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
import Searching from "./pages/Searching";
import SearchingOverview from "./pages/SearchingOverview";
import DataStructures from "./pages/DataStructures";
import Graph from "./pages/Graph";
import GraphBFS from "./pages/GraphBFS";
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import CommunityLanding from "./pages/CommunityLanding";
import NotesPage from "./pages/NotesPage"; // New Notes Page

// Algorithm Pages
import DPOverview from "./pages/DPOverview";
import DPPage from "./pages/DPPage";
import BacktrackingOverview from "./pages/BacktrackingOverview";
import BacktrackingPage from "./pages/BacktrackingPage";
import GreedyOverview from "./pages/GreedyOverview";
import GreedyPage from "./pages/GreedyPage";
import HashingOverview from "./pages/HashingOverview";
import HashingPage from "./pages/HashingPage";
import TreeOverview from "./pages/TreeOverview";
import TreePage from "./pages/TreePage";
import DCOverview from "./pages/DCOverview";
import DCPage from "./pages/DCPage";
import GameSearchOverview from "./pages/GameSearchOverview";
import GameSearchPage from "./pages/GameSearchPage";
import BranchBoundOverview from "./pages/BranchBoundOverview";
import BranchBoundPage from "./pages/BranchBoundPage";
import StringOverview from "./pages/StringOverview";
import StringPage from "./pages/StringPage";

// Components
import LinkedListPage from "./components/pages/LinkedListPage";
import Queue from "./components/Queue/Queue";
import Stack from "./components/Stack/Stack";
import BinaryTreeVisualizer from "./components/BinaryTree/BinaryTreeVisualizer";
import AlgorithmComparison from "./components/AlgorithmComparison";
import GraphComparison from "./components/GraphComparison";

// Static / Info Pages
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";
import FAQ from "./pages/FAQ";
import SortingDoc from "./pages/SortingDoc";
import Contributors from "./components/Contributors";
import ContributorLeaderboard from "./pages/ContributorLeaderboard";
import AlgorithmDocumentation from "./pages/Documentation";

// Styles
import "./styles/components.css";

// Animation library
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const location = useLocation();
  const selectedAlgorithm = "bubbleSort"; // Default algorithm

  // Pages where ComplexityBox is shown
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
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Notes Page */}
            <Route path="/notes" element={<NotesPage />} />

            {/* Sorting */}
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/sorting/:algoId/docs" element={<SortingDoc />} />
            <Route
              path="/sorting/comparison"
              element={<AlgorithmComparison />}
            />

            {/* Searching */}
            <Route path="/searching" element={<Searching />} />
            <Route path="/searching/:id" element={<Searching />} />
            <Route path="/searching/comparison" element={<AlgorithmComparison />} />
            <Route path="/searching-overview" element={<SearchingOverview />} />

            {/* Data Structures */}
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/data-structures/linked-list" element={<LinkedListPage />} />
            <Route path="/data-structures/queue" element={<Queue />} />
            <Route path="/data-structures/stack" element={<Stack />} />

            {/* Graph */}
            <Route path="/graph" element={<Graph />} />
            <Route path="/graph/bfs" element={<GraphBFS />} />
            <Route path="/graph/dfs" element={<GraphDFS />} />
            <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
            <Route path="/graph/comparison" element={<GraphComparison />} />

            {/* Backtracking */}
            <Route path="/backtracking-overview" element={<BacktrackingOverview />} />
            <Route path="/backtracking" element={<BacktrackingPage />} />

            {/* Dynamic Programming */}
            <Route path="/dp-overview" element={<DPOverview />} />
            <Route path="/dp" element={<DPPage />} />

            {/* Hashing */}
            <Route path="/hashing-overview" element={<HashingOverview />} />
            <Route path="/hashing" element={<HashingPage />} />

            {/* Greedy */}
            <Route path="/greedy-overview" element={<GreedyOverview />} />
            <Route path="/greedy" element={<GreedyPage />} />

            {/* Trees */}
            <Route path="/tree-overview" element={<TreeOverview />} />
            <Route path="/tree" element={<TreePage />} />

            {/* Divide & Conquer */}
            <Route path="/dc-overview" element={<DCOverview />} />
            <Route path="/dc" element={<DCPage />} />

            {/* Game Search */}
            <Route path="/game-search-overview" element={<GameSearchOverview />} />
            <Route path="/game-search" element={<GameSearchPage />} />

            {/* Branch & Bound */}
            <Route path="/branchbound-overview" element={<BranchBoundOverview />} />
            <Route path="/branchbound" element={<BranchBoundPage />} />
            <Route path="/binary-tree" element={<BinaryTreeVisualizer />} />

            {/* String Algorithms */}
            <Route path="/string-overview" element={<StringOverview />} />
            <Route path="/string" element={<StringPage />} />

            {/* Other Pages */}
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/community" element={<CommunityLanding />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/documentation" element={<AlgorithmDocumentation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contributor-leaderboard" element={<ContributorLeaderboard />} />
          </Routes>

          {/* Show ComplexityBox only on selected pages */}
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
