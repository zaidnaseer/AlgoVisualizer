import React, { useState } from "react";
import "../styles/contact.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Send, MessageCircle, Mail, Code, Heart, Users } from 'lucide-react';
// Import the FaqChatbot component you provided
import FaqChatbot from './FaqChatbot';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // You can add actual form submission logic here
    };

    return (
        <div className="contact">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <MessageCircle size={16} />
                        <span>Let's Connect</span>
                    </div>
                    <h1>Contact Us</h1>
                    <p className="hero-description">
                        AlgoVisualizer is more than just a tool—it's a bridge between abstract algorithms and intuitive understanding. 
                        Whether you're a student struggling with sorting concepts, a developer prepping for interviews, or an educator 
                        seeking dynamic teaching aids, we're here to help.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="contact-content">
                {/* Contact Form Card */}
                <div className="contact-card form-card">
                    <div className="card-header">
                        <div className="card-icon">
                            <Send size={24} />
                        </div>
                        <div>
                            <h2>Send us a Message</h2>
                            <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
                        </div>
                    </div>
                    
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-input form-textarea"
                                placeholder="Tell us about your question, suggestion, or how we can help you..."
                                rows={6}
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="btn btn-primary submit-btn">
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Connect With Us Card */}
                <div className="contact-card social-card">
                    <div className="card-header">
                        <div className="card-icon">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2>Connect With Us</h2>
                            <p>Follow our journey and join the community</p>
                        </div>
                    </div>
                    
                    <div className="social-links">
                        <a 
                            href="https://github.com/SandeepVashishtha/AlgoVisualizer" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-link github-link"
                        >
                            <div className="social-icon">
                                <FaGithub />
                            </div>
                            <div className="social-content">
                                <h3>GitHub</h3>
                                <p>Contribute to our open-source project</p>
                            </div>
                        </a>
                        
                        <a 
                            href="https://linkedin.com/in/sandeep-vashishtha" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-link linkedin-link"
                        >
                            <div className="social-icon">
                                <FaLinkedin />
                            </div>
                            <div className="social-content">
                                <h3>LinkedIn</h3>
                                <p>Connect with us professionally</p>
                            </div>
                        </a>
                        
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-link twitter-link"
                        >
                            <div className="social-icon">
                                <FaTwitter />
                            </div>
                            <div className="social-content">
                                <h3>Twitter</h3>
                                <p>Follow for updates and tips</p>
                            </div>
                        </a>
                        
                        <a 
                            href="mailto:contact@algovisualizer.com" 
                            className="social-link email-link"
                        >
                            <div className="social-icon">
                                <FaEnvelope />
                            </div>
                            <div className="social-content">
                                <h3>Email</h3>
                                <p>Direct email communication</p>
                            </div>
                        </a>
                    </div>
                    
                    <div className="response-info">
                        <div className="info-item">
                            <Mail size={16} />
                            <span>We typically respond within 24 hours</span>
                        </div>
                        <div className="info-item">
                            <Heart size={16} />
                            <span>Your feedback helps us improve</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="mission-section">
                <div className="mission-content">
                    <div className="mission-icon">
                        <Code size={32} />
                    </div>
                    <h3>Our Mission</h3>
                    <p>
                        Your input drives our mission to make algorithm learning visual, interactive, and accessible to all. 
                        Let's build a smarter coding community together.
                    </p>
                </div>
            </div>
            
            {/* Add the FaqChatbot component here */}
            <FaqChatbot />
        </div>
    );
}