import React from 'react';
import { useTheme } from '../ThemeContext';
import { Moon, Sun, Palette, Monitor, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/global-theme.css";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.div
      className="theme-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >      
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.h1
          className="theme-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}
        >
          <Sparkles size={40} />
          Settings
        </motion.h1>
        
        <motion.div
          className="theme-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="theme-card-header"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <Palette size={24} />
            <h3>Appearance</h3>
          </motion.div>
          
          <motion.div
            style={{ marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="form-label" style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'block' }}>
              Theme Preference
            </label>
            
            <div className='theme-switch-container'>
              <Sun size={22} style={{ color: theme === 'light' ? '#f59e0b' : 'var(--theme-text-muted)' }} />
              <label className="theme-switch">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  aria-label="Theme toggle"
                />
                <span className="theme-switch-slider"></span>
              </label>
              <Moon size={22} style={{ color: theme === 'dark' ? 'var(--theme-accent)' : 'var(--theme-text-muted)' }} />
            </div>
          </motion.div>
          
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <strong>
              <Sparkles size={18} />
              Coming Soon
            </strong>
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