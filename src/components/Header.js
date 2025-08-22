import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import { useTheme } from '../ThemeContext'; // ← import useTheme
import { FaGithub, FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme(); // ← access theme context

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="av-header">
            <div className="av-container">
                <div className="logo">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <h1 className="navbar-heading">AlgoVisualizer</h1>
                    </Link>
                </div>

                <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`} aria-label="Primary">
                    <NavLink to="/" onClick={toggleMobileMenu} end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/sorting" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Sorting</NavLink>
                    <NavLink to="/searching" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Searching</NavLink>
                    <NavLink to="/data-structures" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Data Structures</NavLink>
                    <NavLink to="/quiz" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Quiz</NavLink>
                    <NavLink to="/contributors" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contributors</NavLink>
                    <NavLink to="/documentation" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Documentation</NavLink>
                </nav>

                <div className="nav-actions">
                    <a className="github-btn" href="https://github.com/RhythmPahwa14/AlgoVisualizer" target="_blank" rel="noreferrer noopener" aria-label="Open GitHub repository">
                        <FaGithub />
                        <span>Star</span>
                    </a>

                    {/* Dark/Light mode toggle */}
                    <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle dark/light mode">
                        {theme === 'light' ? (
                            <FaMoon/>
                        ) : (
                            <FaSun/>
                        )}
                    </button>

                    <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
