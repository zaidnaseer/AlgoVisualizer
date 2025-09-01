import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();

  // Force scrollTop on all common scrollers
  const forceScrollTop = (smooth = true) => {
    const behavior = smooth ? "smooth" : "auto";
    // 1) Window API
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior });
    }
    // 2) Document-level fallbacks (some browsers use these)
    document.documentElement && (document.documentElement.scrollTop = 0);
    document.body && (document.body.scrollTop = 0);
    // 3) If your layout ever scrolls an inner container
    const main = document.querySelector(".main-content");
    if (main) {
      if (typeof main.scrollTo === "function") {
        main.scrollTo({ top: 0, behavior });
      } else {
        main.scrollTop = 0;
      }
    }
  };

  const checkScrollPosition = () => {
    const y =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    setShowButton(y > 300);
  };

  // Don’t let the browser restore old position automatically
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Track scroll for the FAB
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // 👉 On every route change, force to top (multiple ticks to beat late renders)
  useEffect(() => {
    // immediate (no animation) so you don’t see previous position
    forceScrollTop(false);

    // next paint
    requestAnimationFrame(() => forceScrollTop(false));

    // after content settles a bit
    const t1 = setTimeout(() => forceScrollTop(false), 80);
    const t2 = setTimeout(() => forceScrollTop(true), 160); // final smooth polish

    setShowButton(false);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <>
      {showButton && (
        <button
          type="button"
          onClick={() => forceScrollTop(true)}
          aria-label="Scroll to top"
          title="Back to top"
          style={{
            position: "fixed",
            bottom: "2px",
            right: "25px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            minWidth: "60px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: showButton ? 1 : 0,
            transform: showButton ? "scale(1)" : "scale(0.8)",
            animation: showButton ? "float 2s ease-in-out infinite" : "none",
            pointerEvents: showButton ? "auto" : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.boxShadow = "0 6px 15px #007bff";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
            e.currentTarget.style.boxShadow = "0 4px 10px #0056b3";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <i className="fa-solid fa-arrow-up" style={{ fontSize: "30px", color: "white" }} />
          <span style={{ position: "absolute", opacity: 0 }}>↑</span>
        </button>
      )}

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}
