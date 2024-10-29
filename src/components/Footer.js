import React from 'react';
import '../styles/components.css'; // Import your CSS file
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon from react-icons

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content" style={{ maxWidth: "90%" }}>
                <h3 className="footer-heading" style={{ fontFamily: "'Dancing Script', cursive" }}>AlgoVisualizer</h3>
                <p style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}>Visualize and understand algorithms in an interactive way!</p>

                <div className="footer-links">
                    <a href="https://github.com/SandeepVashishtha/AlgoVisualizer" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={30} style={{ color: 'white' }} />
                    </a>
                    <p style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}>Developed by Sandeep Vashishtha </p>

                </div>
            </div>

            <div className="footer-bottom">
                <p style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}>&copy; {new Date().getFullYear()} AlgoVisualizer. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;