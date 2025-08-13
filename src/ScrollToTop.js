import React, { useState, useEffect } from 'react';

function ScrollToTop() {
  // This creates a variable that remembers if button should show or hide
  const [showButton, setShowButton] = useState(false);

  // This function checks how far down the page you've scrolled
  const checkScrollPosition = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);  // Show button if scrolled down 300px
    } else {
      setShowButton(false); // Hide button if near top
    }
  };

  // This function scrolls back to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // This runs when the component loads - it listens for scrolling
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    
    // Cleanup when component is removed
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // This is what gets displayed on the page
  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default ScrollToTop;