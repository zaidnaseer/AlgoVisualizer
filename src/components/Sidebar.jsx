import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import {
  Home,
  BarChart3,
  Search,
  Database,
  Share2,
  Users,
  Settings,
  Code,
  Brain,
  FileText,
  Menu,
  X,
  ChevronRight,
  LogIn,
  UserPlus
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useUser } from "@clerk/clerk-react";


const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const sidebarRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorPos, setIndicatorPos] = useState({ top: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); 
  const { theme } = useTheme();
  const { isSignedIn, user } = useUser();

  const colors = {
    dark: {
      bg: 'var(--sidebar-bg)',
      border: 'var(--sidebar-border)',
      textPrimary: 'var(--sidebar-text)',
      textSecondary: 'var(--sidebar-text-secondary)',
      textMuted: 'var(--text-muted)',
      accent: 'var(--accent-primary)',
      accentGradient: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)',
      accentText: 'var(--text-inverse)',
      hoverBg: 'var(--sidebar-hover)',
      activeBg: 'var(--sidebar-active)',
      subtleBg: 'var(--surface-bg)',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      mobileMenuButton: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)',
      mobileMenuButtonText: 'var(--text-inverse)',
    },
    light: {
      bg: 'var(--sidebar-bg)',
      border: 'var(--sidebar-border)',
      textPrimary: 'var(--sidebar-text)',
      textSecondary: 'var(--sidebar-text-secondary)',
      textMuted: 'var(--text-muted)',
      accent: 'var(--accent-primary)',
      accentGradient: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)',
      accentText: 'var(--text-inverse)',
      hoverBg: 'var(--sidebar-hover)',
      activeBg: 'var(--sidebar-active)',
      subtleBg: 'var(--surface-bg)',
      backdrop: 'rgba(255, 255, 255, 0.5)',
      mobileMenuButton: 'var(--sidebar-bg)',
      mobileMenuButtonText: 'var(--accent-primary)',
    }
  };
  const currentColors = colors[theme] || colors.dark;

  // Update active indicator position
  useEffect(() => {
    const activeLink = linkRefs.current[activeTab];
    if (sidebarRef.current && activeLink) {
      const containerRect = sidebarRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const indicatorHeight = 48;
      const top = linkRect.top - containerRect.top + linkRect.height / 2 - indicatorHeight / 2;
      setIndicatorPos({ top });
    }
  }, [activeTab]);

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const SidebarLink = React.forwardRef(
    ({ to, IconComponent, label, badge, isActive, end = false }, ref) => {
      return (
        <div
          ref={ref}
          className={`sidebar-link ${isActive ? 'active' : ''}`}
          onClick={() => {
            setActiveTab(to);
            setIsMobileMenuOpen(false);
            navigate(to); // Add this line to handle navigation
          }}
        >
          <div className="sidebar-link-content">
            <IconComponent className="sidebar-icon" size={20} />
            <span className="sidebar-label">{label}</span>
            {badge && <span className="sidebar-badge">{badge}</span>}
            {isActive && <ChevronRight className="sidebar-arrow" size={16} />}
          </div>
        </div>
      );
    }
  );
  SidebarLink.displayName = "SidebarLink";

  const sidebarItems = [
    {
      group: "main",
      items: [
        {
          path: "/",
          icon: Home,
          label: "Dashboard",
          end: true
        }
      ]
    },
    {
      group: "Algorithms",
      items: [
        {
          path: "/sorting",
          icon: BarChart3,
          label: "Sorting",
          badge: "12"
        },
        {
          path: "/searching",
          icon: Search,
          label: "Search",
          badge: "8"
        },
        {
          path: "/data-structures",
          icon: Database,
          label: "Data Structures",
          badge: "15"
        },
        {
          path: "/graph",
          icon: Share2,
          label: "Graph Theory",
          badge: "6",
          children: [
            { path: "/graph/bfs", label: "BFS" },
            { path: "/graph/dfs", label: "DFS" },
            { path: "/graph/dijkstra", label: "Dijkstra" }
          ]
        }
      ]
    },
    {
      group: "Learning",
      items: [
        {
          path: "/quiz",
          icon: Brain,
          label: "Interactive Quiz"
        },
        {
          path: "/documentation",
          icon: FileText,
          label: "Documentation"
        },
        {
          path: "/contributors",
          icon: Users,
          label: "Contributors"
        },
        {
          path: "/ContributorLeaderboard",
          icon: Users,
          label: "LeaderBoard"
        }
      ]
    },
    // Add authentication section only if user is not signed in
    ...(!isSignedIn ? [{
      group: "Account",
      items: [
        {
          path: "/sign-in",
          icon: LogIn,
          label: "Sign In"
        },
        {
          path: "/sign-up",
          icon: UserPlus,
          label: "Sign Up"
        }
      ]
    }] : [])
  ];

  return (
    <div className="sidebar-container">
      {/* Enhanced Mobile Menu Button with Animation */}
      <button 
        className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={24} color={currentColors.mobileMenuButtonText} /> : <Menu size={24} color={currentColors.mobileMenuButtonText} />}
      </button>

      {/* Backdrop with blur effect */}
      <div 
        className={`sidebar-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Modern Sidebar */}
      <nav 
        ref={sidebarRef} 
        className={`app-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        {/* Enhanced Logo Section */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => {
            setActiveTab('/');
            setIsMobileMenuOpen(false);
          }}>
            <div className="logo-icon">
              <Code size={28} />
            </div>
            <div className="logo-text">
              <span className="logo-main">Algo</span>
              <span className="logo-highlight">Visualizer</span>
              <div className="logo-subtitle">Learn & Explore</div>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="sidebar-content">
          {sidebarItems.map((group, groupIndex) => (
            <div key={group.group} className="sidebar-group">
              {group.group !== "main" && (
                <div className="sidebar-group-header">
                  <span className="sidebar-group-title">{group.group}</span>
                  <div className="sidebar-group-line"></div>
                </div>
              )}
              <div className="sidebar-group-items">
                {group.items.map((item) => (
                  <div key={item.path} className="sidebar-item-with-children">
                    <SidebarLink
                      to={item.path}
                      IconComponent={item.icon}
                      label={item.label}
                      badge={item.badge}
                      isActive={activeTab === item.path}
                      end={item.end}
                      ref={(el) => (linkRefs.current[item.path] = el)}
                    />
                    {item.children && item.children.length > 0 && (
                      <div className="sidebar-subitems">
                        {item.children.map((child) => (
                          <SidebarLink
                            key={child.path}
                            to={child.path}
                            IconComponent={ChevronRight}
                            label={child.label}
                            isActive={activeTab === child.path}
                            ref={(el) => (linkRefs.current[child.path] = el)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Settings at Bottom */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <div className="avatar-placeholder">
                {isSignedIn ? (
                  user?.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                  )
                ) : (
                  <Users size={16} />
                )}
              </div>
            </div>
            <div className="user-info">
              <div className="user-name">
                {isSignedIn ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User' : 'Guest User'}
              </div>
              <div className="user-status">
                {isSignedIn ? 'Signed In' : 'Learning Mode'}
              </div>
            </div>
          </div>
          <SidebarLink
            to="/settings"
            IconComponent={Settings}
            label="Settings"
            isActive={activeTab === "/settings"}
            ref={(el) => (linkRefs.current["/settings"] = el)}
          />
        </div>

        {/* Enhanced Active Indicator */}
        <div
          className="sidebar-indicator"
          style={{
            transform: `translateY(${indicatorPos.top}px)`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </nav>

      <style jsx>{`
        .sidebar-container {
          position: relative;
          z-index: 1000;
        }

        .mobile-menu-button {
          position: fixed;
          top: 1rem;
          left: 1rem; 
          z-index: 1100;
          width: 48px;
          height: 48px;
          background: ${currentColors.mobileMenuButton};
          border: 1px solid ${currentColors.border};
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        .mobile-menu-button.active {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          left: calc(280px + 1rem);

        }

        .hamburger {
          width: 20px;
          height: 16px;
          position: relative;
          transform: rotate(0deg);
          transition: 0.3s ease-in-out;
        }

        .hamburger span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: ${currentColors.mobileMenuButtonText};
          border-radius: 1px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
        }

        .hamburger span:nth-child(1) {
          top: 0;
        }

        .hamburger span:nth-child(2) {
          top: 7px;
        }

        .hamburger span:nth-child(3) {
          top: 14px;
        }

        .mobile-menu-button.active .hamburger span:nth-child(1) {
          top: 7px;
          transform: rotate(135deg);
        }

        .mobile-menu-button.active .hamburger span:nth-child(2) {
          opacity: 0;
          left: -20px;
        }

        .mobile-menu-button.active .hamburger span:nth-child(3) {
          top: 7px;
          transform: rotate(-135deg);
        }

        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: ${currentColors.backdrop};
          backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
        }

        .sidebar-backdrop.active {
          opacity: 1;
          visibility: visible;
        }

        .app-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 280px;
          height: 100vh;
          background: ${currentColors.bg};
          border-right: border-right: 1px solid ${currentColors.border};
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
        }

        .app-sidebar.mobile-open {
          transform: translateX(0);
        }

        .sidebar-header {
          padding: 2rem 1.5rem 1.5rem;
          border-bottom: 1px solid ${currentColors.border};
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sidebar-logo:hover {
          transform: translateX(4px);
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: ${currentColors.accentGradient};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${currentColors.accentText};
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .logo-text {
          flex: 1;
        }

        .logo-main {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${currentColors.textPrimary};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .logo-highlight {
          font-size: 1.5rem;
          font-weight: 700;
          background: ${currentColors.accentGradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-left: 0.25rem;
        }

        .logo-subtitle {
          font-size: 0.75rem;
          color: ${currentColors.textSecondary};
          font-weight: 400;
          margin-top: 2px;
        }

        .sidebar-content {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .sidebar-content::-webkit-scrollbar {
          display: none;
        }

        .sidebar-group {
          margin-bottom: 2rem;
        }

        .sidebar-group-header {
          padding: 0 1.5rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sidebar-group-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: ${currentColors.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sidebar-group-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, ${currentColors.border} 0%, transparent 100%);
        }

        .sidebar-group-items {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0 1rem;
        }

        .sidebar-subitems {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-left: 2.25rem;
          margin-top: 0.25rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .sidebar-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, ${currentColors.border} 0%, transparent 100%);
          transition: left 0.5s ease;
        }

        .sidebar-link:hover::before {
          left: 100%;
        }

        .sidebar-link:hover {
          background: background: ${currentColors.hoverBg};
          transform: translateX(4px);
        }

        .sidebar-link.active {
          background: ${currentColors.activeBg};
          border: 1px solid ${currentColors.border};
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .sidebar-link-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
        }

        .sidebar-icon {
          color: ${currentColors.textSecondary};
          transition: all 0.3s ease;
        }

        .sidebar-link.active .sidebar-icon {
          color: color: ${currentColors.accent};
        }

        .sidebar-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: color: ${currentColors.textSecondary};
          flex: 1;
          transition: all 0.3s ease;
        }

        .sidebar-link.active .sidebar-label {
          color: ${currentColors.textPrimary};
          font-weight: 600;
        }

        .sidebar-badge {
          background: ${currentColors.accentGradient};
          color: ${currentColors.accentText};
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          min-width: 20px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
        }

        .sidebar-arrow {
          color: ${currentColors.accent};
          opacity: 0;
          transition: all 0.3s ease;
        }

        .sidebar-link.active .sidebar-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .sidebar-footer {
          padding: 1rem 1.5rem 2rem;
          border-top: 1px solid ${currentColors.border};
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: ${currentColors.subtleBg};
          border-radius: 12px;
          margin-bottom: 1rem;
          border: 1px solid ${currentColors.border};
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: ${currentColors.accentGradient};
          display: flex;
          align-items: center;
          justify-content: center;
          color:  ${currentColors.accentText};
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: ${currentColors.textPrimary};
        }

        .user-status {
          font-size: 0.75rem;
          color: ${currentColors.textSecondary};
        }

        .sidebar-indicator {
          position: absolute;
          left: 0;
          width: 4px;
          height: 48px;
          background: ${currentColors.accentGradient};
          border-radius: 0 4px 4px 0;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.5);
        }

        @media (max-width: 767px) {
          .app-sidebar {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;