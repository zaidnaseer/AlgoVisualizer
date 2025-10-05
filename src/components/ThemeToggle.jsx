import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

/**
 * ThemeToggle Component
 *
 * A creative circular button that allows users to switch between light and dark themes.
 * The component persists user preferences in localStorage and updates the UI accordingly.
 *
 * @returns {JSX.Element} A themed toggle button with sun/moon icons
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  /**
   * Handle theme change when user clicks the toggle button
   * Delegates to the context's toggleTheme function
   */
  const handleThemeChange = () => {
    toggleTheme();
  };

  /**
   * Get dynamic styles based on current theme
   * @returns {Object} CSS styles object for the container
   */
  const getContainerStyles = () => ({
    position: "fixed",
    top: "15px",
    right: "20px",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    background:
      theme === "dark"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #ffef09ff 0%, #f5576c 100%)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    border: `2px solid ${
      theme === "dark" ? "rgba(102, 126, 234, 0.3)" : "rgba(240, 147, 251, 0.3)"
    }`,
    boxShadow:
      theme === "dark"
        ? "0 6px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
        : "0 6px 25px rgba(245, 87, 108, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
    zIndex: 9999,
    overflow: "hidden",
  });

  /**
   * Get icon styles based on current theme
   * @returns {Object} CSS styles object for the icon
   */
  const getIconStyles = () => ({
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    color: "white",
    strokeWidth: "2px",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
  });

  // Apply hover effects through CSS class
  const hoverStyles = `
        .theme-toggle-container:hover {
            transform: scale(1.1) rotate(12deg);
            box-shadow: ${
              theme === "dark"
                ? "0 10px 30px rgba(102, 126, 234, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                : "0 10px 30px rgba(245, 87, 108, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
            };
        }
        
        .theme-toggle-container:active {
            transform: scale(0.95) rotate(5deg);
            transition: all 0.1s ease;
        }

        .theme-toggle-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
            border-radius: 50%;
            pointer-events: none;
        }

        @keyframes iconPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .theme-toggle-container:hover .theme-toggle-icon {
            animation: iconPulse 1s ease-in-out;
        }
    `;

  return (
    <>
      <style>{`
                .theme-toggle-container {
                    ${Object.entries(getContainerStyles())
                      .map(
                        ([key, value]) =>
                          `${key
                            .replace(/([A-Z])/g, "-$1")
                            .toLowerCase()}: ${value};`
                      )
                      .join("\n                    ")}
                }
                
                .theme-toggle-icon {
                    ${Object.entries(getIconStyles())
                      .map(
                        ([key, value]) =>
                          `${key
                            .replace(/([A-Z])/g, "-$1")
                            .toLowerCase()}: ${value} !important;`
                      )
                      .join("\n                    ")}
                }
                
                ${hoverStyles}
            `}</style>
      <div
        className="theme-toggle-container"
        onClick={handleThemeChange}
        role="button"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleThemeChange()
        }
      >
        {theme === "dark" ? (
          <Sun className="theme-toggle-icon" size={22} />
        ) : (
          <Moon className="theme-toggle-icon" size={22} />
        )}
      </div>
    </>
  );
};

export default ThemeToggle;
