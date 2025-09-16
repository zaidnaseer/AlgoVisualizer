
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Play, Code, Search, BarChart3, GitBranch, Users, Trophy, ArrowRight, Sparkles, BookOpen, Target, Clock, Star, Share2 } from 'lucide-react';
// // import '../styles/home.css';
// import '../styles/homerestyle.css'


// const Home = () => {
//   const [animatedBars, setAnimatedBars] = useState([30, 70, 45, 90, 20, 65]);

//   // Animate sorting bars
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimatedBars(prev => [...prev].sort(() => Math.random() - 0.5));
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const features = [
//     {
//       icon: BarChart3,
//       title: "Sorting Algorithms",
//       path: "/sorting",
//       description: "Visualize 12+ sorting algorithms including Bubble Sort, Quick Sort, Merge Sort, and Heap Sort in real-time",
//       gradient: "from-pink-500 to-rose-500",
//       algorithms: "12+ Algorithms",
//       difficulty: "Beginner to Advanced"
//     },
//     {
//       icon: Search,
//       title: "Search Algorithms",
//       path: "/searching", 
//       description: "Master search techniques with Binary Search, Linear Search, Jump Search, and Exponential Search visualizations",
//       gradient: "from-blue-500 to-cyan-500",
//       algorithms: "8+ Algorithms",
//       difficulty: "Easy to Intermediate"
//     },
//     {
//       icon: GitBranch,
//       title: "Data Structures",
//       path: "/data-structures",
//       description: "Explore complex data structures like Binary Trees, Linked Lists, Stacks, Queues, and Graph representations",
//       gradient: "from-purple-500 to-indigo-500",
//       algorithms: "15+ Structures",
//       difficulty: "Intermediate to Expert"
//     },
//     {
//       icon: Share2,
//       title: "Graph Algorithms",
//       path: "/graph",
//       description: "Explore BFS, DFS, and Dijkstra. Load a default graph or build your own and visualize.",
//       gradient: "from-emerald-500 to-teal-500",
//       algorithms: "BFS • DFS • Dijkstra",
//       difficulty: "Beginner to Intermediate"
//     }
//   ];

//   const learningPaths = [
//     {
//       title: "Complete Beginner",
//       description: "Start with basic sorting and searching algorithms",
//       duration: "2-3 weeks",
//       topics: ["Bubble Sort", "Linear Search", "Basic Arrays"]
//     },
//     {
//       title: "Intermediate Developer", 
//       description: "Dive into advanced algorithms and data structures",
//       duration: "4-6 weeks",
//       topics: ["Quick Sort", "Binary Search", "Trees & Graphs"]
//     },
//     {
//       title: "Algorithm Expert",
//       description: "Master complex algorithms and optimization techniques",
//       duration: "8-12 weeks", 
//       topics: ["Dynamic Programming", "Graph Algorithms", "Advanced Trees"]
//     }
//   ];

//   const recentUpdates = [
//     {
//       type: "new",
//       title: "Quick Sort visualization enhanced",
//       description: "Added step-by-step breakdown with complexity analysis",
//       time: "2 hours ago"
//     },
//     {
//       type: "update",
//       title: "Binary Search Tree improvements",
//       description: "Better visual representation and insertion animation",
//       time: "1 day ago"
//     },
//     {
//       type: "feature",
//       title: "Algorithm complexity comparison tool",
//       description: "Compare time and space complexity across algorithms",
//       time: "3 days ago"
//     },
//     {
//       type: "community",
//       title: "50+ new contributors joined",
//       description: "Growing open-source community contributions",
//       time: "1 week ago"
//     }
//   ];

//   return (
//     <div className="home-dashboard font">
//       {/* Main Dashboard Container */}
//       <div className="dashboard-grid">
//         {/* Hero Card - Main content area */}
//         <div className="hero-card">
//           <div className="hero-glow"></div>
//           <div className="hero-content">
//             <div className="hero-badge">
//               <Sparkles size={14} />
//               <span>Interactive Algorithm Learning Platform</span>
//             </div>
            
//             <h1 className="hero-title">
//               Master Algorithms Through 
//               <span className="gradient-text">Visual Learning</span>
//             </h1>
            
//             <p className="hero-subtitle">
//               Transform complex computer science concepts into beautiful, interactive experiences. 
//               Learn algorithms the way they were meant to be understood - visually and intuitively.
//             </p>
            
//             <div className="hero-features">
//               <div className="feature-highlight">
//                 <Clock size={16} />
//                 <span>Real-time Visualization</span>
//               </div>
//               <div className="feature-highlight">
//                 <BookOpen size={16} />
//                 <span>Step-by-step Learning</span>
//               </div>
//               <div className="feature-highlight">
//                 <Target size={16} />
//                 <span>Interactive Practice</span>
//               </div>
//             </div>
            
//             <div className="hero-actions">
//               <Link to="/sorting" className="btn-primary-new">
//                 <Play size={16} />
//                 Start Learning Now
//               </Link>
//               <Link to="/quiz" className="btn-secondary-new">
//                 <Trophy size={16} />
//                 Test Your Knowledge
//               </Link>
//             </div>
//           </div>
          
//           {/* Live Demo Area */}
//            <div className="demo-container">
//             <div className="demo-header">
//               <span className="demo-title">Live Algorithm Demo</span>
//               <div className="demo-indicator">
//                 <div className="pulse-dot"></div>
//                 <span>Bubble Sort Running</span>
//               </div>
//             </div>
            
//             <div className="demo-content">
//               <div className="animated-bars">
//                 {animatedBars.map((height, index) => (
//                   <div 
//                     key={index}
//                     className="demo-bar"
//                     style={{
//                       height: `${height}%`,
//                       background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)`,
//                       animationDelay: `${index * 0.1}s`
//                     }}
//                   />
//                 ))}
//               </div>
//               <div className="demo-stats">
//                 <div className="demo-stat">
//                   <span className="stat-label">Comparisons:</span>
//                   <span className="stat-value">24</span>
//                 </div>
//                 <div className="demo-stat">
//                   <span className="stat-label">Swaps:</span>
//                   <span className="stat-value">12</span>
//                 </div>
//               </div>
//               <div className="demo-label">Watch algorithms come to life with real-time statistics</div>
//             </div>
//           </div> 
//         </div>

//         {/* Feature Cards with detailed content */}
//         {features.map((feature, index) => (
//           <Link 
//             key={index}
//             to={feature.path}
//             className="feature-card"
//           >
//             <div className="feature-header">
//               <div className={`feature-icon bg-gradient-to-br ${feature.gradient}`}>
//                 <feature.icon size={24} />
//               </div>
//               <div className="feature-meta">
//                 <span className="algorithm-count">{feature.algorithms}</span>
//                 <span className="difficulty-level">{feature.difficulty}</span>
//               </div>
//             </div>
            
//             <div className="feature-content">
//               <h3 className="feature-title">{feature.title}</h3>
//               <p className="feature-desc">{feature.description}</p>
              
//               <div className="feature-highlights">
//                 <div className="highlight-item">
//                   <div className="highlight-dot"></div>
//                   <span>Interactive Visualization</span>
//                 </div>
//                 <div className="highlight-item">
//                   <div className="highlight-dot"></div>
//                   <span>Code Examples</span>
//                 </div>
//                 <div className="highlight-item">
//                   <div className="highlight-dot"></div>
//                   <span>Complexity Analysis</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="feature-footer">
//               <span className="feature-cta">Explore Now</span>
//               <div className="feature-arrow">
//                 <ArrowRight size={16} />
//               </div>
//             </div>
            
//             <div className="feature-glow"></div>
//           </Link>
//         ))} 

//         {/* Learning Paths */}
//         <div className="learning-paths">
//           <h3 className="section-title" style={{   background: 'linear-gradient(90deg, #FF69B4, #FF69B4, #00BFFF, #00BFFF, #FFB347, #FFD700, #FFB347, #FFA500, #FF69B4, #00BFFF)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent'}}>Learning Paths</h3>
//           <div className="paths-container">
//             {learningPaths.map((path, index) => (
//               <div key={index} className="path-item">
//                 <div className="path-header">
//                   <h4 className="path-title">{path.title}</h4>
//                   <span className="path-duration" >{path.duration}</span>
//                 </div>
//                 <p className="path-description">{path.description}</p>
//                 <div className="path-topics">
//                   {path.topics.map((topic, topicIndex) => (
//                     <span key={topicIndex} className="topic-tag">{topic}</span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> 

//         {/* Enhanced Activity Feed */}
//         <div className="activity-feed">
//           <h3 className="activity-title">Recent Updates</h3>
//           <div className="activity-items">
//             {recentUpdates.map((update, index) => (
//               <div key={index} className="activity-item">
//                 <div className={`activity-icon ${update.type}`}>
//                   {update.type === 'new' && <Sparkles size={14} />}
//                   {update.type === 'update' && <Code size={14} />}
//                   {update.type === 'feature' && <Star size={14} />}
//                   {update.type === 'community' && <Users size={14} />}
//                 </div>
//                 <div className="activity-content">
//                   <h4 className="activity-item-title">{update.title}</h4>
//                   <p className="activity-description">{update.description}</p>
//                   <span className="activity-time">{update.time}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> 
//       </div>
//     </div>    
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Code, Search, BarChart3, GitBranch, Users, Trophy, ArrowRight, Sparkles, BookOpen, Target, Clock, Star, Share2, Zap, Brain, Rocket, Award } from 'lucide-react';
import '../styles/homerestyle.css'

const Home = () => {
  const [animatedBars, setAnimatedBars] = useState([30, 70, 45, 90, 20, 65]);
  const [activeFeature, setActiveFeature] = useState(0);

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Code,
  Search as SearchIcon,
  BarChart3,
  GitBranch,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Star,
  Share2,
} from "lucide-react";
import "../styles/home.css";

/** ---------- Theme helpers ---------- */
function useColorScheme() {
  const [isLight, setIsLight] = useState(() => {
    const htmlTheme = document.documentElement.getAttribute("data-theme");
    if (htmlTheme) return htmlTheme === "light";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => {
      const htmlTheme = document.documentElement.getAttribute("data-theme");
      if (!htmlTheme) setIsLight(e.matches);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Also react to manual toggles via data-theme on <html>
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const htmlTheme = document.documentElement.getAttribute("data-theme");
      if (htmlTheme) setIsLight(htmlTheme === "light");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return isLight;
}

function getTheme(isLight) {
  if (!isLight) {
    // Dark theme (your existing look, slightly tuned)
    return {
      textPrimary: "#e5e7eb",
      textSecondary: "rgba(229,231,235,.85)",
      subText: "rgba(229,231,235,.75)",
      cardBg: "linear-gradient(180deg, rgba(23,23,35,.9), rgba(13,20,30,.9))",
      cardBorder: "1px solid rgba(180, 184, 255, 0.12)",
      surfaceBg: "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))",
      surfaceBorder: "1px solid rgba(255,255,255,.06)",
      baseline: "rgba(255,255,255,.12)",
      heroGradient: "linear-gradient(92deg,#ffffff 0%, #c7d2fe 40%, #a78bfa 70%, #fb7185 100%)",
      badgeBg: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
      badgeBorder: "1px solid rgba(255,255,255,.08)",
      updatesCardBg: "linear-gradient(180deg, rgba(33,43,56,.7), rgba(15,18,28,.85))",
      shadow: "0 14px 30px rgba(2,6,23,.35), 0 1px 0 rgba(255,255,255,.04) inset",
      demoShellBg: "linear-gradient(135deg, rgba(41,35,110,.9), rgba(19,20,48,.9))",
      demoShellShadow: "0 22px 55px rgba(2,6,23,.40), 0 1px 0 rgba(255,255,255,.04) inset",
      pillBg: "rgba(255,255,255,.06)",
      pillBorder: "1px solid rgba(255,255,255,.08)",
    };
  }
  // Light theme (new palette)
  return {
    textPrimary: "#0b1020",
    textSecondary: "rgba(11,16,32,.75)",
    subText: "rgba(11,16,32,.65)",
    cardBg: "linear-gradient(180deg, rgba(255,255,255,.92), rgba(247,249,255,.92))",
    cardBorder: "1px solid rgba(15,23,42,.08)",
    surfaceBg: "linear-gradient(180deg, rgba(15,23,42,.03), rgba(15,23,42,.015))",
    surfaceBorder: "1px solid rgba(15,23,42,.08)",
    baseline: "rgba(15,23,42,.15)",
    heroGradient: "linear-gradient(92deg,#1f2937 0%, #374151 40%, #4338ca 70%, #7c3aed 100%)",
    badgeBg: "linear-gradient(180deg, rgba(15,23,42,.06), rgba(15,23,42,.03))",
    badgeBorder: "1px solid rgba(15,23,42,.08)",
    updatesCardBg: "linear-gradient(180deg, rgba(255,255,255,.9), rgba(248,250,252,.9))",
    shadow: "0 10px 28px rgba(2,6,23,.10), 0 1px 0 rgba(255,255,255,.4) inset",
    demoShellBg: "linear-gradient(135deg, rgba(239,246,255,1), rgba(219,234,254,1))",
    demoShellShadow: "0 24px 40px rgba(2,6,23,.12), 0 1px 0 rgba(255,255,255,.75) inset",
    pillBg: "rgba(15,23,42,.05)",
    pillBorder: "1px solid rgba(15,23,42,.08)",
  };
}

/** ---------- Shared layout styles ---------- */
const container = { width: "100%", display: "flex", justifyContent: "center" };
const inner = { width: "min(1200px, 100%)", padding: "1.5rem" };

const Home = () => {
  const isLight = useColorScheme();
  const T = getTheme(isLight);

  /** ===== Bubble Sort — continuous ===== */
  const BAR_COUNT = 12;
  const STEP_MS = 350;
  const initial = useMemo(
    () => Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75)),
    []
  );

  const [values, setValues] = useState(initial);
  const [pass, setPass] = useState(0);
  const [idx, setIdx] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const animRef = useRef(null);
  const valuesRef = useRef(values);
  const passRef = useRef(pass);
  const idxRef = useRef(idx);

  useEffect(() => { valuesRef.current = values; }, [values]);
  useEffect(() => { passRef.current = pass; }, [pass]);
  useEffect(() => { idxRef.current = idx; }, [idx]);

  const reshuffle = () => {
    const fresh = Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75));
    setValues(fresh);
    setPass(0);
    setIdx(0);
    setComparisons(0);
    setSwaps(0);
    if (animRef.current) clearTimeout(animRef.current);
    animRef.current = window.setTimeout(tick, STEP_MS);
  };

  const tick = () => {
    let i = passRef.current;
    let j = idxRef.current;
    const arr = [...valuesRef.current];
    const n = arr.length;

    if (i >= n - 1) {
      animRef.current = window.setTimeout(reshuffle, 400);
      return;
    }
    if (j >= n - i - 1) {
      setPass(i + 1);
      setIdx(0);
      animRef.current = window.setTimeout(tick, STEP_MS);
      return;
    }
    setComparisons((c) => c + 1);
    if (arr[j] > arr[j + 1]) {
      const tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
      setSwaps((s) => s + 1);
      setValues(arr);
    }
    setIdx(j + 1);
    animRef.current = window.setTimeout(tick, STEP_MS);
  };


  useEffect(() => {
    animRef.current = window.setTimeout(tick, STEP_MS);
    return () => animRef.current && clearTimeout(animRef.current);
  }, []);


  // Cycle through featured algorithms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  const activeA = idx;
  const activeB = idx + 1;
  const sortedStart = values.length - pass;

  /** ===== Data ===== */

  const features = [
    {
      icon: BarChart3,
      title: "Sorting",
      path: "/sorting",

      description: "Master 12+ sorting algorithms with real-time visualizations, complexity analysis, and interactive code examples",
      gradient: "from-pink-500 via-rose-400 to-pink-600",
      algorithms: "12+ Algorithms",
      difficulty: "Beginner to Advanced",
      popular: ["Bubble Sort", "Quick Sort", "Merge Sort"],
      color: "pink"
    },
    {
      icon: Search,
      title: "Search Algorithms",
      path: "/searching", 
      description: "Explore efficient search techniques with step-by-step breakdowns and performance comparisons",
      gradient: "from-blue-500 via-cyan-400 to-blue-600",
      algorithms: "8+ Algorithms",
      difficulty: "Easy to Intermediate",
      popular: ["Binary Search", "Linear Search", "Jump Search"],
      color: "blue"

      description: "See Bubble, Quick, Merge, Heap & more in motion.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["12+ algos", "Live steps", "Big-O"],
    },
    {
      icon: SearchIcon,
      title: "Searching",
      path: "/searching",
      description: "Binary, Linear, Jump, Exponential—visual & fast.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["8+ algos", "Trace moves", "Compare runs"],

    },
    {
      icon: GitBranch,
      title: "Data Structures",
      path: "/data-structures",

      description: "Dive deep into trees, graphs, stacks, queues with interactive 3D visualizations",
      gradient: "from-purple-500 via-indigo-400 to-purple-600",
      algorithms: "15+ Structures",
      difficulty: "Intermediate to Expert",
      popular: ["Binary Trees", "Hash Tables", "Graphs"],
      color: "purple"

      description: "Lists, Trees, Stacks, Queues, Graphs—built up.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["15+ types", "Ops demo", "Memory view"],

    },
    {
      icon: Share2,
      title: "Graph Algorithms",
      path: "/graph",

      description: "Navigate complex networks with BFS, DFS, Dijkstra and build custom graph structures",
      gradient: "from-emerald-500 via-teal-400 to-emerald-600",
      algorithms: "6+ Algorithms",
      difficulty: "Beginner to Advanced",
      popular: ["BFS", "DFS", "Dijkstra"],
      color: "emerald"
    }

      description: "BFS, DFS, Dijkstra on your own or sample graphs.",
      gradient: "from-sky-400 to-blue-600",
      badges: ["Build graph", "Path trace", "Weights"],
    },
  ];

  const recentUpdates = [
    { type: "new", title: "Quick Sort: step guide", description: "Clean overlays with pivot highlights.", time: "2h ago" },
    { type: "update", title: "BST visuals", description: "Smoother insert + balanced spacing.", time: "1d ago" },
    { type: "feature", title: "Complexity compare", description: "Side-by-side time/space charts.", time: "3d ago" },
    { type: "community", title: "50+ contributors", description: "Docs & fixes from new members.", time: "1w ago" },

  ];

  const learningPaths = [
    {
      title: "Complete Beginner",

      description: "Perfect starting point for programming newcomers",
      duration: "2-3 weeks",
      icon: BookOpen,
      topics: ["Bubble Sort", "Linear Search", "Basic Arrays"],
      color: "from-green-400 to-green-600",
      students: "2.3k"
    },
    {
      title: "Intermediate Developer", 
      description: "Level up your algorithmic thinking",
      duration: "4-6 weeks",
      icon: Brain,
      topics: ["Quick Sort", "Binary Search", "Trees & Graphs"],
      color: "from-orange-400 to-orange-600",
      students: "1.8k"
    },
    {
      title: "Algorithm Expert",
      description: "Master advanced optimization techniques",
      duration: "8-12 weeks", 
      icon: Rocket,
      topics: ["Dynamic Programming", "Graph Algorithms", "Advanced Trees"],
      color: "from-purple-400 to-purple-600",
      students: "892"
    }
  ];

  const stats = [
    {
      label: "Active Learners",
      value: "47.2k",
      change: "+12%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      label: "Algorithms Mastered",
      value: "156k",
      change: "+8%",
      icon: Trophy,
      color: "text-yellow-400"
    },
    {
      label: "Success Rate",
      value: "94%",
      change: "+3%",
      icon: Award,
      color: "text-green-400"
    }
  ];

  const recentUpdates = [
    {
      type: "new",
      title: "AI-Powered Code Analysis",
      description: "Get personalized feedback on your algorithm implementations",
      time: "2 hours ago",
      badge: "NEW"
    },
    {
      type: "update",
      title: "3D Tree Visualization",
      description: "Experience binary trees in immersive 3D space",
      time: "1 day ago",
      badge: "ENHANCED"
    },
    {
      type: "feature",
      title: "Real-time Collaboration",
      description: "Study algorithms with friends in shared workspaces",
      time: "3 days ago",
      badge: "BETA"
    },
    {
      type: "community",
      title: "Algorithm Challenge Series",
      description: "Join weekly coding challenges with global leaderboards",
      time: "1 week ago",
      badge: "EVENT"
    }

      duration: "2–3 weeks",
      color: "linear-gradient(90deg,#f59e0b,#10b981,#22d3ee)",
      desc: "Start with basic sorting and searching algorithms",
      tags: ["Bubble Sort", "Linear Search", "Basic Arrays"],
    },
    {
      title: "Intermediate Developer",
      duration: "4–6 weeks",
      color: "linear-gradient(90deg,#f59e0b,#10b981,#22d3ee)",
      desc: "Dive into advanced algorithms and data structures",
      tags: ["Quick Sort", "Binary Search", "Trees & Graphs"],
    },
    {
      title: "Algorithm Expert",
      duration: "8–12 weeks",
      color: "linear-gradient(90deg,#f59e0b,#10b981,#22d3ee)",
      desc: "Master complex algorithms and optimization techniques",
      tags: ["Dynamic Programming", "Graph Algorithms", "Advanced Trees"],
    },

  ];

  /** ===== Quick responsive helpers (no external CSS changes) ===== */
  const gridStyles = `
    .hero-grid { display:grid; grid-template-columns: 1.08fr 1fr; gap:2.25rem; align-items:stretch; }
    .grid-2 { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1.25rem; }
    .updates-grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1rem; }
    .paths-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; }
    @media (max-width: 980px){ .hero-grid{ grid-template-columns:1fr; } }
    @media (max-width: 780px){ .grid-2{ grid-template-columns:1fr; } .updates-grid{ grid-template-columns:1fr; } }
  `;

  return (
    <div className="modern-home">
      {/* Animated Background Elements */}
      <div className="bg-effects">
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-container">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Interactive Algorithm Learning Platform</span>
              <div className="badge-glow"></div>
            </div>
            
            <h1 className="hero-title">
              Master Algorithms Through
              <span className="gradient-text"> Visual Learning</span>
              <div className="title-decoration">
                <div className="decoration-line"></div>
              </div>
            </h1>
            
        
            <p className="hero-description">
              Transform complex computer science concepts into beautiful, interactive experiences. 
              Learn algorithms the way they were meant to be understood—visually and intuitively.
            </p>
            
            <div className="hero-features">
              <div className="feature-pill">
                <Clock size={18} />
                <span>Real-time Visualization</span>
              </div>
              <div className="feature-pill">
                <Brain size={18} />
                <span>AI-Powered Learning</span>
              </div>
              <div className="feature-pill">
                <Target size={18} />
                <span>Interactive Practice</span>
              </div>
            </div>
            
            <div className="hero-actions">
              <Link to="/sorting" className="cta-primary">
                <Play size={20} />
                <span>Start Learning</span>
                <div className="button-shine"></div>
              </Link>
              <Link to="/quiz" className="cta-secondary">
                <Trophy size={20} />
                <span>Take Quiz</span>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <stat.icon size={20} className={stat.color} />
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                  <div className={`stat-change ${stat.change.includes('+') ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Live Demo */}
          <div className="demo-section">
            <div className="demo-container">
              <div className="demo-header">
                <div className="demo-title">
                  <div className="live-indicator">
                    <div className="pulse-dot"></div>
                    <span>Live Algorithm Demo</span>
                  </div>
                </div>
                <div className="demo-controls">
                  <button className="demo-btn active">Bubble Sort</button>
                  <button className="demo-btn">Quick Sort</button>
                </div>
              </div>
              
              <div className="visualization-area">
                <div className="animated-bars">
                  {animatedBars.map((height, index) => (
                    <div 
                      key={index}
                      className="demo-bar"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="demo-metrics">
                  <div className="metric">
                    <span className="metric-label">Comparisons</span>
                    <span className="metric-value">24</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Swaps</span>
                    <span className="metric-value">12</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Time</span>
                    <span className="metric-value">O(n²)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">Explore Algorithm Categories</h2>
            <p className="section-subtitle">Interactive learning experiences tailored for every skill level</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.path}
                className={`feature-card ${index === activeFeature ? 'featured' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="card-background">
                  <div className={`card-gradient bg-gradient-to-br ${feature.gradient}`}></div>
                </div>
                
                <div className="card-header">
                  <div className="card-icon">
                    <feature.icon size={28} />
                  </div>
                  <div className="card-meta">
                    <span className="algorithm-count">{feature.algorithms}</span>
                    <span className="difficulty">{feature.difficulty}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                  
                  <div className="popular-algorithms">
                    <span className="popular-label">Popular:</span>
                    <div className="algorithm-tags">
                      {feature.popular.map((algo, i) => (
                        <span key={i} className="algorithm-tag">{algo}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <span className="explore-text">Explore Now</span>
                  <ArrowRight size={18} className="arrow-icon" />
                </div>
                
                <div className="card-glow"></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="learning-paths-section">
          <div className="section-header">
            <h2 className="section-title">Choose Your Learning Path</h2>
            <p className="section-subtitle">Structured curriculum designed for your current skill level</p>
          </div>
          
          <div className="paths-grid">
            {learningPaths.map((path, index) => (
              <div key={index} className="path-card">
                <div className={`path-icon bg-gradient-to-r ${path.color}`}>
                  <path.icon size={24} />
                </div>
                
                <div className="path-content">
                  <div className="path-header">
                    <h3 className="path-title">{path.title}</h3>
                    <div className="path-stats">
                      <span className="duration">{path.duration}</span>
                      <span className="students">{path.students} students</span>
                    </div>
                  </div>
                  
                  <p className="path-description">{path.description}</p>
                  
                  <div className="path-topics">
                    {path.topics.map((topic, i) => (
                      <span key={i} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
                
                <button className="start-path-btn">
                  <span>Start Path</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section className="updates-section">
          <div className="section-header">
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-subtitle">New features and improvements to enhance your learning</p>
          </div>
          
          <div className="updates-grid">
            {recentUpdates.map((update, index) => (
              <div key={index} className="update-card">
                <div className="update-badge">
                  <span className={`badge badge-${update.type}`}>{update.badge}</span>
                </div>
                
                <div className="update-icon">
                  {update.type === 'new' && <Sparkles size={20} />}
                  {update.type === 'update' && <Zap size={20} />}
                  {update.type === 'feature' && <Star size={20} />}
                  {update.type === 'community' && <Users size={20} />}
                </div>
                
                <div className="update-content">
                  <h4 className="update-title">{update.title}</h4>
                  <p className="update-description">{update.description}</p>
                  <span className="update-time">{update.time}</span>

    <div className="home-dashboard">
      <style>{gridStyles}</style>

      {/* ===== Hero ===== */}
      <section style={{ ...container, padding: "4.25rem 1.5rem 2rem" }}>
        <div style={{ ...inner }}>
          <div className="hero-grid">
            {/* LEFT: Bubble Sort */}
            <div
              style={{
                background: T.demoShellBg,
                borderRadius: 22,
                padding: "1.2rem 1.2rem 1rem",
                border: T.cardBorder,
                boxShadow: T.demoShellShadow,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
                gap: "0.85rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isLight ? "#1f2937" : "#c7d2fe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8, height: 8, borderRadius: 999,
                      background: isLight
                        ? "radial-gradient(circle at 40% 40%, #10b981 0%, #059669 60%, #065f46 100%)"
                        : "radial-gradient(circle at 40% 40%, #34d399 0%, #059669 60%, #065f46 100%)",
                      boxShadow: isLight ? "0 0 0 3px rgba(16,185,129,.20)" : "0 0 0 3px rgba(52,211,153,.17)",
                    }}
                  />
                  <strong style={{ letterSpacing: ".2px" }}>Live Demo</strong>
                </div>
                <span style={{ opacity: 0.85, fontSize: ".9rem", color: isLight ? "#334155" : undefined }}>
                  Bubble Sort · {values.length} bars
                </span>
              </div>

              {/* Chart */}
              <div
                style={{
                  position: "relative", height: 240,
                  background: T.surfaceBg,
                  borderRadius: 14, border: T.surfaceBorder,
                  padding: "12px 10px 18px",
                  display: "flex", alignItems: "flex-end", gap: 10, overflow: "hidden",
                }}
              >
                {/* horizontal grid */}
                <div aria-hidden style={{
                  position: "absolute", inset: 0,
                  background: isLight
                    ? "repeating-linear-gradient(to top, rgba(15,23,42,.06), rgba(15,23,42,.06) 1px, transparent 1px, transparent 32px)"
                    : "repeating-linear-gradient(to top, rgba(255,255,255,.04), rgba(255,255,255,.04) 1px, transparent 1px, transparent 32px)",
                  pointerEvents: "none",
                }} />
                {/* baseline */}
                <div aria-hidden style={{
                  position: "absolute", left: 10, right: 10, bottom: 16, height: 2,
                  background: T.baseline, borderRadius: 2,
                }} />
                {values.map((h, i) => {
                  const isActive = i === activeA || i === activeB;
                  const isSorted = i >= sortedStart;
                  const baseGradient = isLight
                    ? "linear-gradient(180deg,#60a5fa 0%,#93c5fd 35%,#a78bfa 70%,#f9a8d4 100%)"
                    : "linear-gradient(180deg,#9aa4ff 0%,#7c83ff 35%,#8b5cf6 70%,#f472b6 100%)";
                  const activeGradient = isLight
                    ? "linear-gradient(180deg,#2563eb 0%,#3b82f6 40%,#6366f1 80%)"
                    : "linear-gradient(180deg,#60a5fa 0%,#3b82f6 40%,#6366f1 80%)";
                  const sortedGradient = isLight
                    ? "linear-gradient(180deg,#10b981 0%,#22c55e 60%,#16a34a 100%)"
                    : "linear-gradient(180deg,#34d399 0%,#10b981 60%,#059669 100%)";

                  return (
                    <div
                      key={i}
                      style={{
                        width: `calc((100% - ${10 * (values.length - 1)}px) / ${values.length})`,
                        height: `${h}%`,
                        minWidth: 16,
                        borderRadius: 10,
                        background: isSorted ? sortedGradient : isActive ? activeGradient : baseGradient,
                        boxShadow: isLight
                          ? "0 8px 16px rgba(30,64,175,.20), 0 1px 0 rgba(255,255,255,.65) inset"
                          : "0 10px 22px rgba(124,131,255,.38), 0 1px 0 rgba(255,255,255,.12) inset",
                        transition: "height .5s cubic-bezier(.2,.8,.2,1), transform .22s ease, background .2s ease",
                        transform: isActive ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                      }}
                      title={`Value: ${h}`}
                    />
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: T.textSecondary, fontSize: ".92rem", paddingTop: 2 }}>
                <span>Pass {Math.min(pass + 1, values.length - 1)}</span>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span style={{ color: isLight ? "#16a34a" : "#34d399" }}>Comparisons: {comparisons}</span>
                  <span style={{ color: isLight ? "#dc2626" : "#f87171" }}>Swaps: {swaps}</span>
                </div>
              </div>
            </div>

            {/* RIGHT: copy */}
            <div style={{ padding: ".4rem 0", display: "grid", gridTemplateRows: "auto auto 1fr auto", alignItems: "start" }}>
              <div
                className="hero-badge"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px",
                  borderRadius: 999, border: T.badgeBorder, color: T.textSecondary,
                  background: T.badgeBg, width: "fit-content",
                }}
              >
                <Sparkles size={14} />
                <span>Interactive Algorithm Lab</span>
              </div>

              <h1
                className="hero-title"
                style={{
                  marginTop: "1rem", lineHeight: 1.05, fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 900, letterSpacing: "-.3px",
                  color: "transparent",
                  background: T.heroGradient,
                  WebkitBackgroundClip: "text", backgroundClip: "text",
                }}
              >
                Master Algorithms Through Visual Learning  <span style={{ opacity: 0.9 }}>Visually</span>
              </h1>

              <p className="hero-subtitle" style={{ marginTop: ".9rem", color: T.textSecondary, maxWidth: 560, fontSize: "1rem" }}>
                Learn by seeing. Trace every step, compare complexity, and build intuition fast.
              </p>

              <div className="hero-features" style={{ marginTop: "1rem", display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
                <div className="feature-highlight" style={{ background: T.badgeBg, border: T.badgeBorder }}><Clock size={16} /><span>Real-time views</span></div>
                <div className="feature-highlight" style={{ background: T.badgeBg, border: T.badgeBorder }}><BookOpen size={16} /><span>Step guides</span></div>
                <div className="feature-highlight" style={{ background: T.badgeBg, border: T.badgeBorder }}><Target size={16} /><span>Hands-on practice</span></div>
              </div>

              <div style={{ marginTop: "1.4rem", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <Link to="/sorting" className="btn-primary-new"><Play size={16} />Start Learning</Link>
                <Link to="/quiz" className="btn-secondary-new"><Trophy size={16} />Take a Quiz</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features (2×2) ===== */}
      <section style={{ ...container }}>
        <div style={{ ...inner, paddingTop: 0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1rem" }}>
            <h2 style={{ fontSize:"1.35rem", fontWeight:800, letterSpacing:".2px", color: T.textPrimary }}>Learning Paths</h2>
            <div style={{ fontSize:".95rem", color: T.subText }}>Pick a topic • Visualize • Practice</div>
          </div>

          <div className="grid-2">
            {features.map((f, i) => (
              <Link key={i} to={f.path} className="feature-card"
                style={{
                  position:"relative",
                  background: T.cardBg,
                  border: T.cardBorder,
                  borderRadius: 18,
                  padding: "1.1rem 1.15rem",
                  boxShadow: T.shadow,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 280,
                }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                  <div className={`feature-icon bg-gradient-to-br ${f.gradient}`}
                       style={{ width:44, height:44, borderRadius:12, display:"grid", placeItems:"center", border: T.badgeBorder }}>
                    <f.icon size={22} />
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"flex-end" }}>
                      {f.badges.map((b, k) => (
                        <span key={k}
                              style={{
                                fontSize:".76rem", padding:"3px 8px", borderRadius:999,
                                border: T.badgeBorder, color: isLight ? "#1f2937" : "rgba(229,231,235,.9)",
                                background: T.badgeBg
                              }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop:10 }}>
                  <h3 style={{ marginBottom:6, fontSize:"1.05rem", fontWeight:700, color: T.textPrimary }}>{f.title}</h3>
                  <p style={{ opacity: 0.9, color: T.textSecondary }}>{f.description}</p>
                </div>

                <div style={{ marginTop:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span className="feature-cta" style={{ color: isLight ? "#1f2937" : undefined }}>Explore</span>
                  <div className="feature-arrow"><ArrowRight size={16} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recent Updates ===== */}
      <section style={{ ...container, paddingBottom:"1.5rem" }}>
        <div style={{ ...inner, paddingTop:"1.15rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1rem" }}>
            <h2 style={{ fontSize:"1.35rem", fontWeight:800, letterSpacing:".2px", color: T.textPrimary }}>Recent Updates</h2>
            <div style={{ fontSize:".95rem", color: T.subText }}>Fresh improvements across the app</div>
          </div>

          <div className="updates-grid">
            {recentUpdates.map((u, i) => (
              <div key={i} style={{
                background: T.updatesCardBg,
                border: T.cardBorder,
                borderRadius: 16,
                padding: "0.9rem 1rem",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                boxShadow: T.shadow,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center",
                  background:
                    u.type === "new" ? (isLight ? "rgba(59,130,246,.18)" : "rgba(99,102,241,.2)") :
                    u.type === "update" ? (isLight ? "rgba(37,99,235,.18)" : "rgba(59,130,246,.2)") :
                    u.type === "feature" ? (isLight ? "rgba(234,179,8,.18)" : "rgba(234,179,8,.2)") :
                    (isLight ? "rgba(16,185,129,.18)" : "rgba(16,185,129,.2)"),
                  border: T.badgeBorder,
                }}>
                  {u.type === "new" && <Sparkles size={16} />}
                  {u.type === "update" && <Code size={16} />}
                  {u.type === "feature" && <Star size={16} />}
                  {u.type === "community" && <Users size={16} />}
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ color: T.textPrimary, marginBottom: 4, fontWeight: 700 }}>{u.title}</h4>
                  <p style={{ color: T.textSecondary }}>{u.description}</p>
                </div>

                <span style={{ fontSize: ".85rem", color: T.subText, whiteSpace: "nowrap" }}>{u.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Learning Paths (curriculum, at the end) ===== */}
      <section style={{ ...container, paddingBottom:"2.25rem" }}>
        <div style={{ ...inner, paddingTop: 0 }}>
          <h2
            style={{
              fontSize:"1.35rem", fontWeight:800, letterSpacing:".2px",
              background: isLight
                ? "linear-gradient(92deg,#2563eb,#059669,#06b6d4)"
                : "linear-gradient(92deg,#60a5fa,#34d399,#f472b6)",
              WebkitBackgroundClip:"text", color:"transparent"
            }}
          >
            Learning Paths
          </h2>

          <div className="paths-grid">
            {learningPaths.map((p, i) => (
              <div key={i}
                   style={{
                     background: T.cardBg,
                     border: T.cardBorder,
                     borderRadius: 18,
                     padding: "1rem 1.1rem",
                     boxShadow: T.shadow,
                   }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 6 }}>
                  <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: "1.05rem" }}>{p.title}</h3>
                  <span style={{
                    fontSize: ".8rem", fontWeight: 700, color: isLight ? "#0b1020" : "#0b1020",
                    backgroundImage: p.color,
                    padding: "6px 10px", borderRadius: 999,
                    boxShadow: isLight ? "0 1px 0 rgba(255,255,255,.7) inset" : "0 1px 0 rgba(255,255,255,.15) inset",
                    border: isLight ? "1px solid rgba(15,23,42,.08)" : "1px solid rgba(255,255,255,.08)",
                  }}>
                    {p.duration}
                  </span>
                </div>
                <p style={{ color: T.textSecondary, marginBottom: 10 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map((t, k) => (
                    <span key={k}
                          style={{
                            fontSize: ".85rem",
                            color: T.textPrimary,
                            background: T.pillBg,
                            border: T.pillBorder,
                            borderRadius: 10,
                            padding: "6px 10px",
                          }}>
                      {t}
                    </span>
                  ))}

                </div>
                
                <div className="update-glow"></div>
              </div>
            ))}
          </div>

        </section>
      </div>
    </div>    

        </div>
      </section>
    </div>

  );
};

export default Home;

