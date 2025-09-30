import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  Code,
  TrendingUp,
  Zap,
  Target,
  Search,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import "../styles/blog.css";
// Import the blog posts data
import blogPostsData from "../data/blogPosts.json";

const Blog = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);

  // Load blog posts from JSON file
  useEffect(() => {
    setBlogPosts(blogPostsData);
  }, []);

  const categories = [
    "All",
    "Theory",
    "Sorting",
    "Graphs",
    "Data Structures",
    "Search",
    "Optimization",
  ];

  // Filter posts based on category and search term
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="theme-container">
      {/* Header Section */}
      <header className="blog-header">
        <div className="blog-hero">
          <div className="hero-content">
            <h1 className="theme-title">
              <BookOpen className="title-icon" />
              Algorithm Insights Blog
            </h1>
            <p className="hero-description">
              Explore the fascinating world of algorithms, data structures, and
              computational thinking. From beginner tutorials to advanced
              concepts, dive deep into the theory and practice of computer
              science fundamentals.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{blogPosts.length}</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">6</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Readers</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="featured-section">
          <h2 className="section-title">
            <Zap size={24} />
            Featured Articles
          </h2>
          <div className="featured-grid">
            {featuredPosts.map((post) => (
              <article key={post.id} className="theme-card featured-card">
                <div className="featured-badge">
                  <Target size={16} />
                  Featured
                </div>
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.description}</p>
                <div className="post-footer">
                  <div className="post-info">
                    <span className="post-author">
                      <User size={14} />
                      {post.author}
                    </span>
                    <span className="post-read-time">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  {/* Link button if available */}
                  {post.link ? (
                    <a 
                      href={post.link} 
                      className="btn btn-primary read-more-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button className="btn btn-primary read-more-btn">
                      Read More
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="filters-section">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="form-control"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${
                selectedCategory === category ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <span className="count-badge">
                {category === "All"
                  ? blogPosts.length
                  : blogPosts.filter((post) => post.category === category)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section">
        <h2 className="section-title">
          <TrendingUp size={24} />
          Latest Articles
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="theme-card no-results-card">
            <BookOpen size={48} />
            <h3>No articles found</h3>
            <p>Try adjusting your search terms or category filters.</p>
          </div>
        ) : (
          <div className="blog-cards-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-card">
                {/* Post image if available */}
                {post.image && (
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                
                <div className="blog-card-header">
                  <div className="blog-card-category">
                    <Code size={16} />
                    {post.category}
                  </div>
                  <div className="blog-card-date">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="blog-card-content">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.description}</p>

                  <div className="blog-card-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="blog-card-footer">
                  <div className="blog-card-meta">
                    <span className="blog-card-author">
                      <User size={14} />
                      {post.author}
                    </span>
                    <span className="blog-card-read-time">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  {/* Link button if available */}
                  {post.link ? (
                    <a 
                      href={post.link} 
                      className="blog-card-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button className="blog-card-btn">
                      Read More
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <div className="theme-card newsletter-card">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>
              Get the latest algorithm insights and tutorials delivered to your
              inbox.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
              />
              <button className="btn btn-primary">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;