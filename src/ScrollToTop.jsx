import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();
  const ticking = useRef(false);

  const forceScrollTop = useCallback((smooth = true) => {
    const behavior = smooth ? "smooth" : "auto";

    // Window scroll
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior });
    }

    // Document fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Inner container fallback
    const main = document.querySelector(".main-content");
    if (main) {
      if (typeof main.scrollTo === "function") {
        main.scrollTo({ top: 0, behavior });
      } else {
        main.scrollTop = 0;
      }
    }
  }, []);

  // Prevent browser auto-restore
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll listener (throttled with rAF)
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
          setShowButton(y > 300);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    forceScrollTop(false); // jump immediately
    const timeout = setTimeout(() => forceScrollTop(true), 120); // smooth polish
    setShowButton(false);

    return () => clearTimeout(timeout);
  }, [pathname, forceScrollTop]);

  return (
    <>
      {showButton && (
        <button
          type="button"
          onClick={() => forceScrollTop(true)}
          aria-label="Scroll to top"
          title="Back to top"
          className="scroll-to-top-btn"
        >
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
          <span className="sr-only">Back to top</span>
        </button>
      )}

      <style>
        {`
          .scroll-to-top-btn {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 55px;
            height: 55px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            z-index: 1000;
            transition: opacity 0.4s ease, transform 0.3s ease;
            animation: float 2s ease-in-out infinite;
          }

          .scroll-to-top-btn:hover {
            background-color: #0056b3;
            box-shadow: 0 6px 15px rgba(0,123,255,0.6);
            transform: translateY(-3px);
          }

          .scroll-to-top-btn:focus {
            outline: 2px solid #fff;
            outline-offset: 3px;
          }

          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border: 0;
          }
        `}
      </style>
    </>
  );
}
