import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {

  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Calculator,
  Trophy,
  Settings,
  X,
  Type,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Menu,
  Home, BarChart3, Search, Database, GitBranch, Users, Trophy, Settings,
  X, Type, ChevronDown, BookOpen, Cpu, Code, Hash, Zap, Gamepad, TreeDeciduous, Menu
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

  const getIconComponent = (iconName) => {
    const icons = {
      Home, BarChart3, Search, Database, GitBranch, Users, Trophy, Settings,
      Type, BookOpen, Cpu, Code, Hash, Zap, Gamepad, TreeDeciduous, Menu
    };
    return icons[iconName] || null;
  };

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
    { path: "/", icon: Home, label: "Home" },
    {
      label: "Sorting",
      icon: BarChart3,
      dropdown: [
        { path: "/sorting", label: "Overview" },
        { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
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
        { path: "/data-structures/queue", label: "Queue visualization" },
        { path: "/data-structures/stack", label: "Stack visualization" },
        { path: "/binary-tree", label: "Binary Tree visualization" },
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
      icon: BookOpen,
      dropdown: [
        { path: "/backtracking-overview", label: "Overview" },
        { path: "/backtracking", label: "Algorithms" },
      ],
    },
    {
      label: "Dynamic Programming",
      icon: Cpu,
      dropdown: [
        { path: "/dp-overview", label: "Overview" },
        { path: "/dp", label: "Algorithms" },
      ],
    },
    {
      label: "Hashing",
      icon: Hash,
      dropdown: [
        { path: "/hashing-overview", label: "Overview" },
        { path: "/hashing", label: "Algorithms" },
      ],
    },
    {
      label: "Greedy Algorithms",
      icon: Zap,
      dropdown: [
        { path: "/greedy-overview", label: "Overview" },
        { path: "/greedy", label: "Algorithms" },
      ],
    },
    {
      label: "Divide & Conquer",
      icon: Code,
      dropdown: [
        { path: "/dc-overview", label: "Overview" },
        { path: "/dc", label: "Algorithms" },
      ],
    },
    {
      label: "Trees",
      icon: TreeDeciduous,
      dropdown: [
        { path: "/tree-overview", label: "Overview" },
        { path: "/tree", label: "Algorithms" },
      ],
    },
    {
      label: "Game Search",
      icon: Gamepad,
      dropdown: [
        { path: "/game-search-overview", label: "Overview" },
        { path: "/game-search", label: "Algorithms" },
      ],
    },
    {
      label: "Branch & Bound",
      icon: BookOpen,
      dropdown: [
        { path: "/branchbound-overview", label: "Overview" },
        { path: "/branchbound", label: "Algorithms" },
      ],
    },

    {
      label: "Mathematics",
      icon: Calculator,
      dropdown: [
        { path: "/math-overview", label: "Overview" },
        { path: "/math", label: "Algorithms" },
      ],
    },

    { path: "/editor", icon: Code, label: "Code Editor" },

    {
      label: "Strings",
      icon: Type,
      dropdown: [
        { path: "/string-overview", label: "Overview" },
        { path: "/string", label: "Algorithms" },
      ],
    },
    { path: "/quiz", icon: Trophy, label: "Quiz" },
    { path: "/settings", icon: Settings, label: "Settings" },

  ]; // <-- This closing bracket for navigationItems array was the issue



  const isActive = (path) => location.pathname === path;


  // Flatten all nav items for search
  const haystack = React.useMemo(() => {
    return navbarNavigationItems
      .filter(i => i.path)
      .map(i => ({ path: i.path, label: i.label }));
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) {

  const handleDropdownToggle = (index) =>
    setIsDropdownOpen(isDropdownOpen === index ? null : index);


  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {

      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const res = haystack.filter(i =>
      i.label.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(res);
    setIsSearchOpen(res.length > 0);
  };

  // click outside to close search


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

    // Add Notes Page to search results
    if ("notes".includes(query.toLowerCase())) {
      results.push({ path: "/notes", label: "Notes" });
    }

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };

  // Click outside

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`navbar ${theme}`}
      ref={navbarRef}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">Algo<span>Visualizer</span></span>
        </Link>

        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => {
              setSearchQuery(""); setSearchResults([]); setIsSearchOpen(false);
            }}>
              <X size={16} />
            </button>
          )}
          <Search size={18} className="search-icon" />
          {isSearchOpen && (
            <div className="search-results">

              {searchResults.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="search-result-item"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {searchResults.length === 0 && <div className="search-no-results">No results</div>}

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

        <div className="navbar-menu">
          {navbarNavigationItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon && React.createElement(getIconComponent(item.icon), {
                size: 18, className: "icon"
              })}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Desktop Navigation */}
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
                    <ChevronDown
                      size={16}
                      className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`}
                    />
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
                key={index}
                to={item.path}
                className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.icon &&
                  React.createElement(getIconComponent(item.icon), {
                    size: 18,
                    className: "icon",
                  })}
                <span>{item.label}</span>
              </Link>
            )
          )}

          {/* Add Notes link manually if not in navigation items */}
          <Link
            to="/notes"
            className={`navbar-link ${isActive("/notes") ? "active" : ""}`}
          >
            <BookOpen size={18} className="icon" />
            <span>Notes</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
