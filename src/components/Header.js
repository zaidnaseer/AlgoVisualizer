import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2em', fontWeight: 'bold' }}>AlgoVisualizer</h1>
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/" style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Home</Link>
                <Link to="/sorting" style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Sorting</Link>
                <Link to="/searching" style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Searching</Link>
                <Link to="/data-structures" style={{ fontFamily: "'Annie Use Your Telescope', cursive", fontSize: '1.2em' }}>Data Structures</Link>
            </nav>
        </header>
    );
};

export default Header;