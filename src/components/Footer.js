import React from 'react';
import '../styles/components.css'; // Import your CSS file
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon from react-icons

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <h3 className="footer-heading">AlgoVisualizer</h3>
                <p>Visualize and understand algorithms in an interactive way!</p>

                <div className="footer-links">
                    <a href="https://github.com/SandeepVashishtha/AlgoVisualizer" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={30} style={{ color: 'white' }} />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AlgoVisualizer. All rights reserved.</p>
                {/*<div className="footer-links">*/}
                {/*    <span>About</span>*/}
                {/*    <span className="border-l">Contact</span>*/}
                {/*    <span className="border-l">Privacy Policy</span>*/}
                {/*</div>*/}
            </div>
        </footer>
    );
};

export default Footer;
