import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">AlgoVisualizer</h1>
                <p className="hero-subtitle">
                    Master algorithms and data structures through beautiful, interactive visualizations. 
                    Learn, practice, and understand complex concepts with step-by-step animations.
                </p>
                <Link to="/sorting">
                    <button className="cta-button">Start Learning</button>
                </Link>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose AlgoVisualizer?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3 className="feature-title">Interactive Learning</h3>
                        <p className="feature-description">
                            Step through algorithms at your own pace with interactive controls. 
                            Pause, rewind, and replay to fully understand each step.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3 className="feature-title">Real-time Visualization</h3>
                        <p className="feature-description">
                            Watch algorithms come to life with smooth animations and 
                            real-time updates showing exactly how data is being processed.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🧠</div>
                        <h3 className="feature-title">Deep Understanding</h3>
                        <p className="feature-description">
                            Gain intuitive understanding of time complexity, space complexity, 
                            and algorithm behavior through visual analysis.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3 className="feature-title">Comprehensive Library</h3>
                        <p className="feature-description">
                            Explore a wide range of sorting, searching, and data structure 
                            algorithms all in one place.
                        </p>
                    </div>
                </div>
            </section>

            {/* Algorithm Categories */}
            <section className="categories-section">
                <h2 className="section-title">Explore Algorithm Categories</h2>
                <div className="categories-grid">
                    <Link to="/sorting" className="category-card">
                        <div className="category-icon">🔄</div>
                        <h3 className="category-title">Sorting Algorithms</h3>
                        <p className="category-count">6+ algorithms including Bubble, Merge, Quick Sort</p>
                    </Link>
                    <Link to="/searching" className="category-card">
                        <div className="category-icon">🔍</div>
                        <h3 className="category-title">Search Algorithms</h3>
                        <p className="category-count">4+ algorithms including Binary, Linear Search</p>
                    </Link>
                    <Link to="/data-structures" className="category-card">
                        <div className="category-icon">🏗️</div>
                        <h3 className="category-title">Data Structures</h3>
                        <p className="category-count">Various structures including Trees, Graphs</p>
                    </Link>
                    <div className="category-card" style={{ opacity: 0.6 }}>
                        <div className="category-icon">🌐</div>
                        <h3 className="category-title">Graph Algorithms</h3>
                        <p className="category-count">Coming Soon - BFS, DFS, Dijkstra's</p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section">
                <h2 className="section-title">Learning Made Visual</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Algorithms</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">3</div>
                        <div className="stat-label">Categories</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Interactive</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">∞</div>
                        <div className="stat-label">Learning</div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    About AlgoVisualizer
                </h2>
                <div className="about-content">
                    <div>
                        <p className="about-text">
                            AlgoVisualizer is designed for students, developers, and anyone curious about 
                            how algorithms work. Our interactive platform transforms abstract concepts 
                            into engaging visual experiences.
                        </p>
                        <p className="about-text">
                            Whether you're preparing for technical interviews, studying computer science, 
                            or simply want to understand the magic behind efficient code, AlgoVisualizer 
                            provides the tools you need to succeed.
                        </p>
                        <ul className="about-highlights">
                            <li>Visual step-by-step algorithm execution</li>
                            <li>Customizable input arrays and parameters</li>
                            <li>Performance metrics and complexity analysis</li>
                            <li>Mobile-friendly responsive design</li>
                            <li>Open source and completely free</li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <span>📊</span>
                    </div>
                </div>
            </section>

            {/* Getting Started Section */}
            <section className="hero-section" style={{ marginTop: '80px' }}>
                <h2 className="section-title" style={{ color: '#66ccff', marginBottom: '30px' }}>
                    Ready to Start Learning?
                </h2>
                <p className="hero-subtitle" style={{ marginBottom: '40px' }}>
                    Choose your learning path and begin your journey into the fascinating world of algorithms.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/sorting">
                        <button className="cta-button">Explore Sorting</button>
                    </Link>
                    <Link to="/searching">
                        <button className="cta-button" style={{ background: 'linear-gradient(45deg, #4da6ff, #3385ff)' }}>
                            Try Searching
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}