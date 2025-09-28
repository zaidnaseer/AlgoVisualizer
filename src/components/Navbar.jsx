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
  X,
  ChevronDown,
  BookOpen,
  Code,
  Menu,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationItems = [
    { path: "/", icon: Home, label: "Home" },
    {
      label: "Sorting",
      icon: BarChart3,
      dropdown: [
        { path: "/sorting", label: "Overview" },
        { path: "/sorting/comparison", label: "Algorithm Comparison" },
      ],
    },
    {
      label: "Searching",
      icon: Search,
      dropdown: [
        { path: "/searchingOverview", label: "Overview" },
        { path: "/searching", label: "Searching Algorithm" },
        { path: "/searching/comparison", label: "Algorithm Comparison" },
      ],
    },
    {
      label: "Data Structures",
      icon: Database,
      dropdown: [
        { path: "/data-structures", label: "Overview" },
        { path: "/data-structures/linked-list", label: "Linked List" },
        { path: "/data-structures/queue", label: "Queue" },
        { path: "/data-structures/stack", label: "Stack" },
        { path: "/binary-tree", label: "Binary Tree" },
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
      label: "Java Notes",
      icon: BookOpen,
      dropdown: [
        { path: "/notes/java/fundamentals", label: "Fundamentals" },
        { path: "/notes/java/variables-and-data-types", label: "Variables & Data Types" },
      ],
    },
    { path: "/editor", icon: Code, label: "Code Editor" },
    { path: "/quiz", icon: Trophy, label: "Quiz" },
    {
      label: "Community",
      icon: Users,
      dropdown: [
        { path: "/community", label: "Overview" },
        { path: "/contributors", label: "Contributors" },
        { path: "/contributor-leaderboard", label: "Leaderboard" },
      ],
    },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;
  const handleDropdownToggle = (index) =>
    setIsDropdownOpen(isDropdownOpen === index ? null : index);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }
    const results = [];
    navigationItems.forEach((item) => {
      if (item.label.toLowerCase().includes(query.toLowerCase()) && item.path) {
        results.push({ path: item.path, label: item.label });
      }
      if (item.dropdown) {
        item.dropdown.forEach((subItem) => {
          if (subItem.label.toLowerCase().includes(query.toLowerCase())) {
            results.push({ path: subItem.path, label: subItem.label });
          }
        });
      }
    });
    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };

  return (
    <nav className={`navbar ${theme}`} ref={navbarRef} data-aos="fade-down">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">Algo<span>Visualizer</span></span>
        </Link>

        {/* Search */}
        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-btn"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                setIsSearchOpen(false);
              }}
            >
              <X size={16} />
            </button>
          )}
          {isSearchOpen && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="search-result-item"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))
              ) : (
                <div className="search-no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Button */}
        {isMobile && (
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="navbar-menu">
            {navigationItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="navbar-item dropdown">
                  <button
                    className={`dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
                    onClick={() => handleDropdownToggle(index)}
                  >
                    <item.icon size={18} className="drop-icon" />
                    <span>{item.label}</span>
                    <ChevronDown size={16} className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`} />
                  </button>
                  {isDropdownOpen === index && (
                    <div className="dropdown-menu">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
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
                  key={index}
                  to={item.path}
                  className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
                >
                  <item.icon size={18} className="icon" />
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <div className="mobile-menu">
            {navigationItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="mobile-dropdown">
                  <button
                    className={`mobile-dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
                    onClick={() => handleDropdownToggle(index)}
                  >
                    <item.icon size={18} className="icon" />
                    <span>{item.label}</span>
                    <ChevronDown size={16} className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`} />
                  </button>
                  {isDropdownOpen === index && (
                    <div className="mobile-dropdown-menu">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`mobile-dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
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
                  key={index}
                  to={item.path}
                  className={`mobile-menu-link ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} className="icon" />
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
