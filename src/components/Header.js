import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <h1>AlgoVisualizer</h1>
                </Link>
            </div>
            <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
                <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                <Link to="/sorting" onClick={toggleMobileMenu}>Sorting</Link>
                <Link to="/searching" onClick={toggleMobileMenu}>Searching</Link>
                <Link to="/data-structures" onClick={toggleMobileMenu}>Data Structures</Link>
            </nav>
            <div className="hamburger" onClick={toggleMobileMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </header>
    );
};

export default Header;
