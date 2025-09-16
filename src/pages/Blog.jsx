import React, { useState } from "react";
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
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import "../styles/blog.css";

const Blog = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample blog articles
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Big O Notation: A Comprehensive Guide",
      excerpt:
        "Dive deep into algorithmic complexity analysis and learn how to evaluate the efficiency of your algorithms with practical examples.",
      content:
        "Big O notation is a mathematical concept that describes the performance characteristics of algorithms...",
      author: "Algorithm Expert",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Theory",
      tags: ["Big O", "Algorithms", "Complexity"],
      featured: true,
    },
    {
      id: 2,
      title: "Visualizing Sorting Algorithms: From Bubble to Quick Sort",
      excerpt:
        "Explore the fascinating world of sorting algorithms through interactive visualizations and understand their trade-offs.",
      content:
        "Sorting algorithms are fundamental to computer science. In this article, we'll explore various sorting techniques...",
      author: "Sorting Specialist",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Sorting",
      tags: ["Sorting", "Visualization", "Algorithms"],
      featured: false,
    },
    {
      id: 3,
      title: "Graph Algorithms in Real-World Applications",
      excerpt:
        "Discover how graph algorithms power modern applications like social networks, GPS navigation, and recommendation systems.",
      content:
        "Graph algorithms are everywhere in our digital world. From finding the shortest path in GPS navigation...",
      author: "Graph Guru",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Graphs",
      tags: ["Graphs", "Applications", "Real-world"],
      featured: true,
    },
    {
      id: 4,
      title: "Data Structures Mastery: Trees, Heaps, and Hash Tables",
      excerpt:
        "Master the essential data structures that form the backbone of efficient algorithms and software systems.",
      content:
        "Data structures are the building blocks of efficient algorithms. In this comprehensive guide...",
      author: "Data Structure Pro",
      date: "2024-01-08",
      readTime: "15 min read",
      category: "Data Structures",
      tags: ["Trees", "Heaps", "Hash Tables"],
      featured: false,
    },
    {
      id: 5,
      title: "Search Algorithms: Beyond Linear and Binary Search",
      excerpt:
        "Explore advanced search techniques including interpolation search, exponential search, and more.",
      content:
        "While linear and binary search are fundamental, there are many specialized search algorithms...",
      author: "Search Expert",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Search",
      tags: ["Search", "Binary Search", "Advanced"],
      featured: false,
    },
    {
      id: 6,
      title: "Algorithm Optimization Techniques and Best Practices",
      excerpt:
        "Learn practical techniques to optimize your algorithms for better performance and efficiency.",
      content:
        "Algorithm optimization is crucial for building scalable applications. Here are key techniques...",
      author: "Performance Expert",
      date: "2024-01-03",
      readTime: "11 min read",
      category: "Optimization",
      tags: ["Optimization", "Performance", "Best Practices"],
      featured: false,
    },
  ];

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
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                <p className="post-excerpt">{post.excerpt}</p>
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
                  <button className="btn btn-primary read-more-btn">
                    Read More
                    <ArrowRight size={16} />
                  </button>
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
                  <p className="blog-card-excerpt">{post.excerpt}</p>

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
                  <button className="blog-card-btn">
                    Read More
                    <ArrowRight size={16} />
                  </button>
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
