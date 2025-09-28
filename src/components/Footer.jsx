import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <Link to="/" className="footer-logo-link">
              <img src="/logo.jpg" alt="AlgoVisualizer" className="footer-logo-img" />
              <span className="footer-logo-text">AlgoVisualizer</span>
            </Link>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div className="footer-section">
              <h4>Algorithms</h4>
              <ul>
                <li><Link to="/sorting">Sorting</Link></li>
                <li><Link to="/searching">Searching</Link></li>
                <li><Link to="/graph">Graph</Link></li>
                <li><Link to="/data-structures">Data Structures</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/quiz">Quiz</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Community</h4>
              <ul>
                <li><Link to="/contributors">Contributors</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2024 AlgoVisualizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;