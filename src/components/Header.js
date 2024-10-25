import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1>AlgoVisualizer</h1>
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/sorting">Sorting</Link>
                <Link to="/searching">Searching</Link>
                <Link to="/data-structures">Data Structures</Link>
            </nav>
        </header>
    );
};

export default Header;
