import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Trophy,
  Settings,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const navbarRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Always keep menu closed by default
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { path: "/", icon: Home, label: "Home" },
    {
      label: "Sorting",
      icon: BarChart3,
      dropdown: [
        { path: "/sorting", label: "Overview" },
        {
          path: "/components/AlgorithmComparison",
          label: "Algorithm Comparison",
        },
      ],
    },
    {
      label: "Searching",
      icon: Search,
      dropdown: [
        { path: "/searchingOverview", label: "Overview" },
        { path: "/searching", label: "Searching Algorithm" },
      ],
    },
    {
      label: "Data Structures",
      icon: Database,
      dropdown: [
        { path: "/data-structures", label: "Overview" },
        { path: "/data-structures/linked-list", label: "Linked List" },
      ],
    },
    {
      label: "Graph",
      icon: GitBranch,
      dropdown: [
        { path: "/graph", label: "Overview" },
        { path: "/graph/bfs", label: "BFS" },
        { path: "/graph/dfs", label: "DFS" },
        { path: "/graph/dijkstra", label: "Dijkstra" },
        { path: "/graph/comparison", label: "Graph Comparison" },
      ],
    },
    {
    label: "Backtracking",
    icon: BookOpen, // you can choose a different icon if needed
    dropdown: [
      { path: "/backtracking-overview", label: "Overview" },
      { path: "/backtracking", label: "Algorithms" },
    ],
  },
    { path: "/quiz", icon: Trophy, label: "Quiz" },
    { path: "/blog", icon: BookOpen, label: "Blog" },
    { path: "/faq", icon: HelpCircle, label: "FAQ" },
    {
      label: "Community",
      icon: Users,
      dropdown: [
        { path: "/community", label: "Overview" },
        { path: "/contributors", label: "Contributors" },
        { path: "/ContributorLeaderboard", label: "Leaderboard" },
      ],
    },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-container">
          {/* Mobile Header Row */}
          {isMobile && (
            <div className="navbar-header">
              <Link to="/" className="navbar-logo">
                <img 
                  src="/logo.jpg" 
                  alt="AlgoVisualizer Logo" 
                  className="logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="logo-text">
                  Algo<span>Visualizer</span>
                </span>
              </Link>
              
              <div className="mobile-header-buttons">
                <Link 
                  to="/settings" 
                  className={`mobile-settings-btn ${
                    isActive("/settings") ? "active" : ""
                  }`}
                >
                  <Settings size={20} />
                </Link>
                
                <button
                  className="mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  style={{ 
                    display: 'flex !important',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid red', // Temporary for debugging
                    width: '44px',
                    height: '44px',
                    fontSize: '20px'
                  }}
                >
                  {isMobileMenuOpen ? '✕' : '☰'}
                </button>
              </div>
            </div>
          )}
          
          {/* Desktop Logo */}
          {!isMobile && (
            <Link to="/" className="navbar-logo">
              <img 
                src="/logo.jpg" 
                alt="AlgoVisualizer Logo" 
                className="logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="logo-text">
                Algo<span>Visualizer</span>
              </span>
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            {navigationItems.map((item, index) => (
              <div key={index} className="navbar-item">
                {item.dropdown ? (
                  <div className="dropdown">
                    <button
                      className={`dropdown-toggle ${
                        isDropdownOpen === index ? "active" : ""
                      }`}
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <item.icon size={18} className="drop-icon" />
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`dropdown-arrow ${
                          isDropdownOpen === index ? "rotated" : ""
                        }`}
                      />
                    </button>
                    {isDropdownOpen === index && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`dropdown-item ${
                              isActive(subItem.path) ? "active" : ""
                            }`}
                            onClick={() => setIsDropdownOpen(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`navbar-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    <item.icon size={18} className="icon" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Mobile Menu Button (hidden for now) */}
          {!isMobile && (
            <button
              className="mobile-menu-button desktop-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          {/* Mobile Menu Header */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-header-content">
              <h3 className="mobile-menu-title">
                <Database size={18} />
                Navigation
              </h3>
              <button
                className="mobile-menu-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p className="mobile-menu-subtitle">Explore algorithms & data structures</p>
          </div>
          
          {/* Mobile Menu Content */}
          <div className="mobile-menu-content">
            {navigationItems.map((item, index) => (
              <div 
                key={index} 
                className="mobile-menu-item"
                style={{ '--item-index': index }}
              >
              {item.dropdown ? (
                <div className="mobile-dropdown">
                  <button
                    className={`mobile-dropdown-toggle ${
                      isDropdownOpen === index ? "active" : ""
                    }`}
                    onClick={() => handleDropdownToggle(index)}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`dropdown-arrow ${
                        isDropdownOpen === index ? "rotated" : ""
                      }`}
                    />
                  </button>
                  {isDropdownOpen === index && (
                    <div className="mobile-dropdown-menu">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`mobile-dropdown-item ${
                            isActive(subItem.path) ? "active" : ""
                          }`}
                          onClick={() => {
                            setIsDropdownOpen(null);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`mobile-menu-link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;