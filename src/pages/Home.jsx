import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BookOpen, Users, Zap, Target, TrendingUp } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  const quickActions = [
    {
      title: "Sorting Algorithms",
      description: "Visualize how different sorting algorithms work",
      icon: TrendingUp,
      path: "/sorting",
      color: "from-blue-500 to-cyan-500",
      stats: "12 Algorithms"
    },
    {
      title: "Search Algorithms", 
      description: "Explore binary search, linear search and more",
      icon: Target,
      path: "/searching",
      color: "from-purple-500 to-pink-500",
      stats: "8 Algorithms"
    },
    {
      title: "Data Structures",
      description: "Learn about arrays, trees, graphs and more", 
      icon: BookOpen,
      path: "/data-structures",
      color: "from-green-500 to-emerald-500",
      stats: "15 Structures"
    }
  ];

  const stats = [
    { label: "Algorithms", value: "35+", icon: Zap },
    { label: "Visualizations", value: "50+", icon: Play },
    { label: "Contributors", value: "25+", icon: Users }
  ];

  return (
    <div className="home-modern">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Open Source</span>
            <span className="badge-dot"></span>
            <span className="badge-text">Interactive Learning</span>
          </div>
          
          <h1 className="hero-title">
            Master Algorithms
            <span className="hero-highlight">Visually</span>
          </h1>
          
          <p className="hero-description">
            Interactive visualizations that make complex algorithms easy to understand. 
            Learn through exploration, not memorization.
          </p>
          
          <div className="hero-actions">
            <Link to="/sorting" className="btn-primary">
              Start Learning
              <ArrowRight size={20} />
            </Link>
            <Link to="/documentation" className="btn-secondary">
              <BookOpen size={20} />
              Documentation
            </Link>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-card card-1">
              <div className="mini-chart">
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '40%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar" style={{height: '30%'}}></div>
                <div className="bar" style={{height: '90%'}}></div>
              </div>
              <span>Bubble Sort</span>
            </div>
            
            <div className="floating-card card-2">
              <div className="tree-structure">
                <div className="node root"></div>
                <div className="node left"></div>
                <div className="node right"></div>
              </div>
              <span>Binary Tree</span>
            </div>
            
            <div className="floating-card card-3">
              <div className="search-demo">
                <div className="search-array">
                  <div className="cell active"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
                </div>
              </div>
              <span>Linear Search</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <stat.icon size={24} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2 className="section-title">Start Your Journey</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path} className="action-card">
              <div className={`action-icon bg-gradient-to-br ${action.color}`}>
                <action.icon size={24} />
              </div>
              <div className="action-content">
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
                <div className="action-stats">{action.stats}</div>
              </div>
              <div className="action-arrow">
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to dive deeper?</h2>
          <p className="cta-description">
            Join our community and contribute to making algorithms accessible for everyone.
          </p>
          <div className="cta-actions">
            <Link to="/contributors" className="btn-outline">
              <Users size={20} />
              View Contributors
            </Link>
            <Link to="/quiz" className="btn-primary">
              Take Quiz
              <Target size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
