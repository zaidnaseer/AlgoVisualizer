import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  Star,
  Github,
  UserPlus,
  Award,
  ArrowRight,
} from "lucide-react";
import "../styles/global-theme.css";

const CommunityLanding = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="theme-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="theme-title">Welcome to Our Community</h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--theme-text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Join our vibrant community of developers, contributors, and
            algorithm enthusiasts. Explore our community sections to connect,
            contribute, and celebrate together.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          variants={itemVariants}
          className="stats-grid mb-12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem", // space between boxes
            width: "100%",
          }}
        >
          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #4f46e5 10%, #7c3aed 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem 1.5rem",
              borderRadius: "1rem",
              minWidth: "200px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
          >
            <Users size={32} style={{ marginBottom: "1rem", opacity: 0.9 }} />
            <div
              className="stat-value"
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              100+
            </div>
            <div
              className="stat-label"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Contributors
            </div>
          </div>

          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #16a34a 10%, #22c55e 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem 1.5rem",
              borderRadius: "1rem",
              minWidth: "200px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
          >
            <Github size={32} style={{ marginBottom: "1rem", opacity: 0.9 }} />
            <div
              className="stat-value"
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              500+
            </div>
            <div
              className="stat-label"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Commits
            </div>
          </div>

          <div
            className="stat-card"
            style={{
              background: "linear-gradient(135deg, #dc2626 10%, #f59e0b 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem 1.5rem",
              borderRadius: "1rem",
              minWidth: "200px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            }}
          >
            <Star size={32} style={{ marginBottom: "1rem", opacity: 0.9 }} />
            <div
              className="stat-value"
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#ffffffff",
              }}
            >
              50+
            </div>
            <div
              className="stat-label"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Projects
            </div>
          </div>
        </motion.div>

        {/* Community Sections */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Overview Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="theme-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
              }}
            >
              <Users
                size={48}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #4f46e5 10%, #7c3aed 100%)",
                    color: "white",
                  }}
                >
                  <Users size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                  }}
                >
                  Community Overview
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                Get an overview of our amazing community, learn about our
                mission, values, and discover how you can get involved in
                building the future of algorithm visualization.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Community Guidelines
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Getting Started
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Mission & Values
                </span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--theme-accent)",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Learn More <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contributors Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="theme-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() => (window.location.href = "/contributors")}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
              }}
            >
              <UserPlus
                size={48}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #16a34a 10%, #22c55e 100%)",
                    color: "white",
                  }}
                >
                  <UserPlus size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                  }}
                >
                  Contributors
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                Meet the amazing people who make AlgoVisualizer possible! Browse
                our contributor profiles, see their contributions, and learn
                about their expertise.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  GitHub Profiles
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Contribution Stats
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Developer Roles
                </span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                <Link
                  to="/contributors"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <UserPlus size={16} />
                  View Contributors
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="theme-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() => (window.location.href = "/ContributorLeaderboard")}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
              }}
            >
              <Trophy
                size={48}
                style={{
                  color: "var(--theme-accent)",
                  opacity: 0.1,
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #dc2626 10%, #f59e0b 100%)",
                    color: "white",
                  }}
                >
                  <Trophy size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--theme-text-primary)",
                    margin: 0,
                  }}
                >
                  Leaderboard
                </h3>
              </div>

              <p
                style={{
                  color: "var(--theme-text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                See the top contributors in our GSSoC'25 leaderboard! Track
                points, view rankings, and celebrate the achievements of our
                community members.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  GSSoC'25 Rankings
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Points System
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--theme-bg)",
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    color: "var(--theme-text-secondary)",
                  }}
                >
                  Top Performers
                </span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                <Link
                  to="/ContributorLeaderboard"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <Trophy size={16} />
                  View Leaderboard
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="theme-card"
          style={{ textAlign: "center" }}
        >
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "var(--theme-text-primary)",
              marginBottom: "1rem",
            }}
          >
            Ready to Join Our Community?
          </h3>
          <p
            style={{
              color: "var(--theme-text-secondary)",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto 2rem auto",
              lineHeight: "1.6",
            }}
          >
            Whether you're a seasoned developer or just getting started, there's
            a place for you in our community. Contribute to open-source, learn
            new algorithms, and help make computer science education more
            accessible.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/RhythmPahwa14/AlgoVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              <Github size={16} />
              Start Contributing
            </a>
            <Link
              to="/contributors"
              className="btn btn-secondary"
              style={{ textDecoration: "none" }}
            >
              <Users size={16} />
              Meet the Team
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommunityLanding;
