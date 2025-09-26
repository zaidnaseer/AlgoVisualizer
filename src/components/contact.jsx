import React from "react";
import "../styles/contact.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaUsers, FaLightbulb, FaCode } from 'react-icons/fa';
import FaqChatbot from './FaqChatbot';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    return (
        <div className="contact">
            {/* Hero Section */}
            <div className="hero-section" data-aos="fade-down" data-aos-duration="1000">
                <h1 className="hero-title">
                    <span className="gradient-text">Get In Touch</span>
                </h1>
                <p className="hero-subtitle">
                    Ready to visualize your learning journey? Let's connect and make algorithms come alive!
                </p>
                <div className="floating-elements">
                    <div className="floating-icon icon-1" data-aos="fade-up" data-aos-delay="300"><FaCode /></div>
                    <div className="floating-icon icon-2" data-aos="fade-up" data-aos-delay="500"><FaLightbulb /></div>
                    <div className="floating-icon icon-3" data-aos="fade-up" data-aos-delay="700"><FaUsers /></div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="form-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div className="form-container">
                    <div className="form-header">
                        <h3>Let's Start a Conversation</h3>
                        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
                    </div>
                    
                    <form className="contact-form">
                        <div className="form-grid" data-aos="fade-up" data-aos-delay="300">
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    placeholder="Enter your name" 
                                    required
                                />
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="Enter your email" 
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="input-group full-width" data-aos="fade-up" data-aos-delay="400">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message"
                                placeholder="Tell us about your project, questions, or how we can help..."
                                rows="6"
                                required
                            ></textarea>
                        </div>
                        
                        <div className="submit-container" data-aos="fade-up" data-aos-delay="500">
                            <button type="submit" className="submit-btn">
                                <FaPaperPlane />
                                <span>Send Message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Social Links Section */}
            <div className="social-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                <div className="social-container">
                    <h4>Connect With Us</h4>
                    <div className="social-grid">
                        <a href="https://github.com/RhythmPahwa14/AlgoVisualizer" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="social-card github" data-aos="zoom-in" data-aos-delay="500">
                            <div className="social-icon">
                                <FaGithub />
                            </div>
                            <div className="social-info">
                                <h5>GitHub</h5>
                                <span>View our code</span>
                            </div>
                        </a>
                        
                        <a href="https://www.linkedin.com/in/pahwa-rhythm/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="social-card linkedin" data-aos="zoom-in" data-aos-delay="600">
                            <div className="social-icon">
                                <FaLinkedin />
                            </div>
                            <div className="social-info">
                                <h5>LinkedIn</h5>
                                <span>Professional network</span>
                            </div>
                        </a>
                        
                        <a href="https://twitter.com" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="social-card twitter" data-aos="zoom-in" data-aos-delay="700">
                            <div className="social-icon">
                                <FaTwitter />
                            </div>
                            <div className="social-info">
                                <h5>Twitter</h5>
                                <span>Latest updates</span>
                            </div>
                        </a>
                        
                        <a href="mailto:contact@algovisualizer.com" 
                           className="social-card email" data-aos="zoom-in" data-aos-delay="800">
                            <div className="social-icon">
                                <FaEnvelope />
                            </div>
                            <div className="social-info">
                                <h5>Email</h5>
                                <span>Direct contact</span>
                            </div>
                        </a>
                    </div>
                    
                    <div className="response-note" data-aos="fade-up" data-aos-delay="900">
                        <p>
                            <strong>Quick Response Promise:</strong> We typically respond within 24 hours. 
                            For urgent inquiries, feel free to reach out directly through our social channels!
                        </p>
                    </div>
                </div>
            </div>
            
            {/* FAQ Chatbot */}
            <div className="chatbot-section" data-aos="fade-up" data-aos-delay="1000">
                <FaqChatbot />
            </div>
        </div>
    );
}
