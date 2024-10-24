import React from 'react';
import '../styles/components.css'; // Import your CSS file

const Header = () => {
    return (
        <header>
            <h1>AlgoVisualizer</h1>
            <nav className="nav-links">
                <a href="/">Home</a>
                <a href="/sorting">Sorting</a>
                <a href="/searching">Searching</a>
                <a href="/data-structures">Data Structures</a>
            </nav>
        </header>
    );
};

export default Header;