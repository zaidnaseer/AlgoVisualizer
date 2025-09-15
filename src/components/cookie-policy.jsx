import React from 'react';
import { useTheme } from '../ThemeContext';
import "../styles/cookie-policy.css";

const CookiePolicy = () => {
    const { theme } = useTheme();
    
    return (
        <div className="cookie-policy-container" data-theme={theme}>
            <div className="cookie-policy-content">
                <div className="cookie-policy-header">
                    <h1>Cookie Policy</h1>
                    <p className="effective-date">Last Updated: 13th August, 2025</p>
                </div>
                
                <div className="cookie-policy-sections">
                    <section className="cookie-policy-section">
                        <h2>1. What Are Cookies</h2>
                        <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our platform.</p>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>2. How We Use Cookies</h2>
                        <p>We use cookies for the following purposes:</p>
                        <ul className="cookie-policy-list">
                            <li><strong>Essential Cookies:</strong> Required for basic website functionality and security</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings like theme preferences and language</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our algorithms and visualizations</li>
                            <li><strong>Performance Cookies:</strong> Improve website loading times and user experience</li>
                        </ul>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>3. Types of Cookies We Use</h2>
                        <p>Our platform uses the following categories of cookies:</p>
                        <ul className="cookie-policy-list">
                            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
                            <li><strong>First-party Cookies:</strong> Set directly by AlgoVisualizer</li>
                            <li><strong>Third-party Cookies:</strong> Set by external services like analytics providers</li>
                        </ul>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>4. Specific Cookies We Use</h2>
                        <p>Here are the main cookies used on our platform:</p>
                        <ul className="cookie-policy-list">
                            <li><strong>theme:</strong> Stores your preferred theme (light/dark mode)</li>
                            <li><strong>algorithm_preferences:</strong> Remembers your favorite algorithms and settings</li>
                            <li><strong>session_id:</strong> Maintains your session for security purposes</li>
                            <li><strong>analytics_*:</strong> Anonymous usage data for improving our services</li>
                        </ul>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>5. Managing Your Cookie Preferences</h2>
                        <p>You have several options to manage cookies:</p>
                        <ul className="cookie-policy-list">
                            <li>Use your browser settings to block or delete cookies</li>
                            <li>Adjust cookie preferences in our settings panel</li>
                            <li>Opt out of analytics cookies while maintaining functionality</li>
                            <li>Use private/incognito browsing mode</li>
                        </ul>
                        <p>Please note that disabling certain cookies may affect website functionality and your user experience.</p>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>6. Third-Party Services</h2>
                        <p>We use the following third-party services that may set cookies:</p>
                        <ul className="cookie-policy-list">
                            <li><strong>Vercel Analytics:</strong> For website performance and usage analytics</li>
                            <li><strong>GitHub:</strong> For authentication and repository integration</li>
                            <li><strong>Google Fonts:</strong> For typography (may cache font preferences)</li>
                        </ul>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>7. Cookie Consent</h2>
                        <p>By continuing to use AlgoVisualizer, you consent to our use of cookies as described in this policy. You can withdraw consent at any time by adjusting your browser settings or contacting us.</p>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>8. Updates to This Policy</h2>
                        <p>We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes through our platform or via email.</p>
                    </section>

                    <section className="cookie-policy-section">
                        <h2>9. Contact Us</h2>
                        <p>If you have questions about our use of cookies or this policy, please contact us through our <a href="/contact">Contact page</a> or reach out to our development team on GitHub.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;