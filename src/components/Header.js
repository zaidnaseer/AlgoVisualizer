import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2em', fontWeight: 'bold' }}>AlgoVisualizer</h1>
                </Link>
            </div>
            <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
                <Link to="/" onClick={toggleMobileMenu} style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Home</Link>
                <Link to="/sorting" onClick={toggleMobileMenu} style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Sorting</Link>
                <Link to="/searching" onClick={toggleMobileMenu} style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Searching</Link>
                <Link to="/data-structures" onClick={toggleMobileMenu} style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Data Structures</Link>
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
