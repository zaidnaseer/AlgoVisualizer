import React from 'react';
import { motion } from 'framer-motion';

const LinkedListNode = ({ 
  node, 
  position, 
  isHighlighted, 
  isTarget, 
  isVisited, 
  isAnimating 
}) => {
  // Animation variants for different states
  const nodeVariants = {
    initial: { 
      scale: 0, 
      opacity: 0, 
      x: -50,
      rotateY: -90 
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: position * 0.1
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0, 
      x: 50,
      rotateY: 90,
      transition: {
        duration: 0.3
      }
    },
    highlighted: {
      scale: 1.1,
      y: -8,
      boxShadow: "0 8px 25px rgba(255, 193, 7, 0.4)",
      borderColor: "#ffc107",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    target: {
      scale: 1.05,
      y: -4,
      boxShadow: "0 6px 20px rgba(220, 53, 69, 0.4)",
      borderColor: "#dc3545",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    visited: {
      backgroundColor: "rgba(40, 167, 69, 0.2)",
      borderColor: "#28a745",
      transition: {
        duration: 0.5
      }
    },
    normal: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      borderColor: "#3b82f6",
      backgroundColor: "#2563eb",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const pointerVariants = {
    normal: {
      scale: 1,
      rotate: 0,
      color: "#ffd93d"
    },
    highlighted: {
      scale: 1.3,
      rotate: [0, 10, -10, 0],
      color: "#ffc107",
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.3
        }
      }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: [0, 1, 0], 
      scale: [0.8, 1.2, 1.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Determine current state
  const getCurrentState = () => {
    if (isHighlighted) return 'highlighted';
    if (isTarget) return 'target';
    if (isVisited) return 'visited';
    return 'normal';
  };

  const currentState = getCurrentState();

  return (
    <div className="node-wrapper">
      {/* Glow effect for highlighted nodes */}
      {(isHighlighted || isTarget) && (
        <motion.div
          className="node-glow"
          variants={glowVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '20px',
            background: isHighlighted 
              ? 'radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(220, 53, 69, 0.3) 0%, transparent 70%)',
            zIndex: -1
          }}
        />
      )}

      <motion.div
        className={`linked-list-node ${currentState}`}
        variants={nodeVariants}
        initial="initial"
        animate={[currentState, "animate"]}
        exit="exit"
        whileHover={{
          scale: 1.05,
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        style={{
          position: 'relative'
        }}
      >
        {/* Status indicator */}
        {(isHighlighted || isTarget || isVisited) && (
          <motion.div
            className="status-indicator"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: isHighlighted ? '#ffc107' : isTarget ? '#dc3545' : '#28a745',
              border: '2px solid white',
              zIndex: 10
            }}
          />
        )}

        <div className="node-content">
          <motion.div 
            className="node-data"
            animate={{
              color: isHighlighted ? '#000' : isTarget ? '#fff' : isVisited ? '#000' : '#fff'
            }}
          >
            {node.data}
          </motion.div>
          <motion.div 
            className="node-id"
            animate={{
              opacity: isHighlighted || isTarget ? 1 : 0.7
            }}
          >
            #{node.id.substring(0, 4)}
          </motion.div>
        </div>
        
        <motion.div 
          className="node-pointer"
          variants={pointerVariants}
          animate={isHighlighted ? 'highlighted' : isAnimating ? 'pulse' : 'normal'}
        >
          {node.next ? '→' : '∅'}
        </motion.div>

        {/* Ripple effect for interactions */}
        {isHighlighted && (
          <motion.div
            className="ripple-effect"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '12px',
              border: '2px solid #ffc107',
              zIndex: -1
            }}
          />
        )}

        {/* Processing indicator */}
        {isHighlighted && (
          <motion.div
            className="processing-indicator"
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: '#ffc107',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Processing...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LinkedListNode;