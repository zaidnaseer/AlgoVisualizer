import React from 'react';
import '../styles/footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <h3 className="footer-heading">AlgoVisualizer</h3>
                <p className="footer-description">
                    Visualize and understand algorithms in an interactive way! 
                    Master data structures and algorithms with beautiful, step-by-step visualizations.
                </p>

                <div className="footer-social">
                    <h4 style={{ color: '#b8c5d1', marginBottom: '15px', fontFamily: 'Poppins, sans-serif' }}>Connect with us</h4>
                    <div className="social-icons">
                        <a href="https://github.com/SandeepVashishtha/AlgoVisualizer" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com/in/sandeep-vashishtha" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaLinkedin />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaTwitter />
                        </a>
                        <a href="mailto:contact@algovisualizer.com" className="social-icon">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>

                <div className="footer-links">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/contribute">Contribute</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AlgoVisualizer. All rights reserved.</p>
                <p>Developed with ❤️ by <strong>Sandeep Vashishtha</strong></p>
                <div className="copyright">
                    <span>Made with React & JavaScript</span> • <span>Open Source</span> • <span>Educational Purpose</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;