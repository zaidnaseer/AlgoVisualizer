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

  // Animate sorting bars
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBars(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through featured algorithms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Sorting Algorithms",
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
  ];

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
                </div>
                
                <div className="update-glow"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>    
  );
};

export default Home;

