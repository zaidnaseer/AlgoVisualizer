import React from 'react';
import { useTheme } from '../ThemeContext';
import { Moon, Sun, Palette, Monitor, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  // Modern color palette with better organization
  const colors = {
    dark: {
      primary: '#0a0e16',
      secondary: '#1a1f2e',
      tertiary: '#2a3441',
      accent: '#6366f1',
      accentHover: '#5855eb',
      text: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      border: '#334155',
      borderLight: '#475569',
      glow: 'rgba(99, 102, 241, 0.1)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    light: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      accent: '#6366f1',
      accentHover: '#5855eb',
      text: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      border: '#e2e8f0',
      borderLight: '#cbd5e1',
      glow: 'rgba(99, 102, 241, 0.05)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }
  };

  const currentColors = colors[theme] || colors.dark;

  const containerStyle = {
    minHeight: '100vh',
    background: `var(--bg-primary, ${currentColors.primary})`,
    color: `var(--text-primary, ${currentColors.text})`,
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const contentStyle = {
    maxWidth: '900px',
    margin: '20px auto',
  };

  const headerStyle = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '800',
    marginBottom: '3rem',
    background: `var(--gradient, ${currentColors.gradient})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const cardStyle = {
    background: `var(--bg-secondary, ${currentColors.secondary})`,
    border: `1px solid var(--border, ${currentColors.border})`,
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: `
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06)
    `,
    position: 'relative',
    overflow: 'hidden',
  };

  const sectionHeaderStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: `var(--text-primary, ${currentColors.text})`,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: `var(--text-secondary, ${currentColors.textSecondary})`,
    letterSpacing: '-0.025em',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.75rem',
    background: `var(--accent, ${currentColors.accent})`,
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 2px 8px rgba(99, 102, 241, 0.2)`,
    letterSpacing: '-0.025em',
    minWidth: '200px',
    justifyContent: 'center',
  };

  const infoCardStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    background: `var(--bg-tertiary, ${currentColors.tertiary})`,
    border: `1px solid var(--border-light, ${currentColors.borderLight})`,
    borderRadius: '16px',
    color: `var(--text-muted, ${currentColors.textMuted})`,
    fontSize: '1rem',
    lineHeight: '1.6',
    position: 'relative',
  };

  const glowStyle = {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `conic-gradient(from 0deg, transparent, ${currentColors.accent}20, transparent)`,
    borderRadius: '50%',
    animation: 'rotate 10s linear infinite',
    zIndex: -1,
  };

  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .theme-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            background: var(--accent-hover, ${currentColors.accentHover});
          }
          
          .theme-button:active {
            transform: translateY(0px);
          }
          
          .sparkle {
            position: absolute;
            color: ${currentColors.accent};
            opacity: 0.6;
            animation: sparkle 2s ease-in-out infinite;
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
      
      <div style={contentStyle}>
        <motion.h1 
          style={headerStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Sparkles size={40} />
          Settings
        </motion.h1>
        
        <motion.div 
          style={cardStyle}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Sparkles className="sparkle" size={16} style={{ top: '20px', right: '30px' }} />
          <Sparkles className="sparkle" size={12} style={{ top: '60px', right: '80px', animationDelay: '1s' }} />
          
          <motion.h2 
            style={sectionHeaderStyle}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Palette size={24} />
            Appearance
          </motion.h2>
          
          <motion.div 
            style={{ marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label style={labelStyle}>
              Theme Preference
            </label>
            
            <motion.button
              className="theme-button"
              onClick={toggleTheme}
              style={buttonStyle}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)"
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
                <span style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'inline-block',
                  height: '1.2em'
                }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={theme === 'dark' ? 'light' : 'dark'}
                      initial={{ y: theme === 'dark' ? 20 : -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: theme === 'dark' ? -20 : 20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        position: 'absolute',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            style={infoCardStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              marginBottom: '0.5rem'
            }}>
              <Sparkles size={18} style={{ color: currentColors.accent }} />
              <strong style={{ color: currentColors.text }}>Coming Soon</strong>
            </div>
            <p style={{ margin: 0 }}>
              Advanced customization options including custom color schemes, 
              font preferences, and personalized themes are in development. 
              Stay tuned for exciting updates!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;