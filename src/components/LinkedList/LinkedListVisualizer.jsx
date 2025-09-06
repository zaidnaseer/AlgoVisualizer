import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Search, Trash2, Download, Camera, StepForward, StepBack } from 'lucide-react';
import LinkedListNode from './LinkedListNode';
import { LinkedListNode as ListNode, linkedListOperations } from '../../algorithms/linkedListAlgorithms';
import '../../styles/LinkedList.css';

const LinkedListVisualizer = () => {
  // State management
  const [linkedList, setLinkedList] = useState({ head: null, size: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('none');
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [targetNodeId, setTargetNodeId] = useState(null);
  const [visitedNodeIds, setVisitedNodeIds] = useState(new Set());
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stats, setStats] = useState({ operations: 0, comparisons: 0 });
  
  const visualizationRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const shouldContinueAnimation = useRef(true);

  // Initialize with sample data
  useEffect(() => {
    const initialList = { head: null, size: 0 };
    linkedListOperations.insertAtEnd(initialList, 10);
    linkedListOperations.insertAtEnd(initialList, 20);
    linkedListOperations.insertAtEnd(initialList, 30);
    setLinkedList(initialList);
  }, []);

  // Cleanup animation on component unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Convert linked list to array for rendering
  const getVisualizationArray = () => {
    const nodes = [];
    let current = linkedList.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  };

  // Enhanced animation steps generation
  const generateAnimationSteps = (operation, targetValue, targetPosition) => {
    const steps = [];
    let current = linkedList.head;
    let index = 0;

    switch (operation) {
      case 'search':
        steps.push({
          type: 'start',
          description: `Starting search for value ${targetValue}...`
        });
        
        while (current) {
          steps.push({
            type: 'highlight',
            nodeId: current.id,
            description: `Checking node at position ${index}: ${current.data}`,
            comparing: true
          });
          
          if (current.data === targetValue) {
            steps.push({
              type: 'found',
              nodeId: current.id,
              description: `🎉 Found ${targetValue} at position ${index}!`,
              success: true
            });
            break;
          } else {
            steps.push({
              type: 'continue',
              nodeId: current.id,
              description: `${current.data} ≠ ${targetValue}, moving to next node...`,
              visited: true
            });
          }
          
          current = current.next;
          index++;
        }
        
        if (!steps.some(step => step.type === 'found')) {
          steps.push({
            type: 'notfound',
            description: `❌ Value ${targetValue} not found in the list`,
            failure: true
          });
        }
        break;

      case 'traverse':
        steps.push({
          type: 'start',
          description: 'Starting complete traversal of the linked list...'
        });
        
        while (current) {
          steps.push({
            type: 'highlight',
            nodeId: current.id,
            description: `Visiting node ${index}: ${current.data}`,
            visiting: true
          });
          
          steps.push({
            type: 'visit',
            nodeId: current.id,
            description: `Processed node ${index} with value ${current.data}`,
            visited: true
          });
          
          current = current.next;
          index++;
        }
        
        steps.push({
          type: 'complete',
          description: `✅ Traversal complete! Visited ${index} nodes.`,
          success: true
        });
        break;

      case 'insertEnd':
        steps.push({
          type: 'start',
          description: `Inserting ${targetValue} at the end of the list...`
        });
        
        if (!linkedList.head) {
          steps.push({
            type: 'insert',
            description: `List is empty, ${targetValue} will be the first node.`,
            success: true
          });
        } else {
          let stepCount = 0;
          while (current && current.next) {
            steps.push({
              type: 'highlight',
              nodeId: current.id,
              description: `Traversing... Current node: ${current.data}`,
              traversing: true
            });
            current = current.next;
            stepCount++;
          }
          
          if (current) {
            steps.push({
              type: 'highlight',
              nodeId: current.id,
              description: `Found last node: ${current.data}`,
              target: true
            });
            
            steps.push({
              type: 'insert',
              nodeId: current.id,
              description: `Linking new node (${targetValue}) after ${current.data}`,
              success: true
            });
          }
        }
        break;

      case 'insertBeginning':
        steps.push({
          type: 'start',
          description: `Inserting ${targetValue} at the beginning of the list...`
        });
        
        if (linkedList.head) {
          steps.push({
            type: 'highlight',
            nodeId: linkedList.head.id,
            description: `Current head: ${linkedList.head.data}`,
            target: true
          });
        }
        
        steps.push({
          type: 'insert',
          description: `New node (${targetValue}) will become the new head`,
          success: true
        });
        break;

      case 'reverse':
        steps.push({
          type: 'start',
          description: 'Starting to reverse the linked list...'
        });
        
        let nodeCount = 0;
        current = linkedList.head;
        while (current) {
          steps.push({
            type: 'highlight',
            nodeId: current.id,
            description: `Reversing pointers for node: ${current.data}`,
            reversing: true
          });
          current = current.next;
          nodeCount++;
        }
        
        steps.push({
          type: 'complete',
          description: `✅ Reversed ${nodeCount} nodes successfully!`,
          success: true
        });
        break;

      default:
        steps.push({
          type: 'info',
          description: `Performing ${operation}...`
        });
    }

    return steps;
  };

  // Enhanced animation execution
  const executeAnimationSteps = async () => {
    if (animationSteps.length === 0) return;

    setIsAnimating(true);
    setIsPaused(false);
    shouldContinueAnimation.current = true;
    setVisitedNodeIds(new Set());
    
    for (let i = 0; i < animationSteps.length; i++) {
      // Check if animation should continue
      if (!shouldContinueAnimation.current) break;
      
      // Handle pause
      while (isPaused && shouldContinueAnimation.current) {
        await new Promise(resolve => {
          animationTimeoutRef.current = setTimeout(resolve, 100);
        });
      }
      
      if (!shouldContinueAnimation.current) break;
      
      const step = animationSteps[i];
      setCurrentStepIndex(i);

      // Reset previous states
      setHighlightedNodeId(null);
      setTargetNodeId(null);

      // Apply step-specific effects
      if (step.nodeId) {
        if (step.comparing || step.visiting || step.traversing || step.reversing) {
          setHighlightedNodeId(step.nodeId);
        }
        
        if (step.target) {
          setTargetNodeId(step.nodeId);
        }
        
        if (step.visited) {
          setVisitedNodeIds(prev => new Set([...prev, step.nodeId]));
        }
      }

      // Wait for animation duration
      await new Promise(resolve => {
        animationTimeoutRef.current = setTimeout(resolve, animationSpeed);
      });
    }

    // Animation complete
    setIsAnimating(false);
    setIsPaused(false);
    setHighlightedNodeId(null);
    setTargetNodeId(null);
    setCurrentStepIndex(0);
    
    // Keep visited nodes highlighted for a moment
    setTimeout(() => {
      setVisitedNodeIds(new Set());
      setAnimationSteps([]);
    }, 1000);
  };

  // Control handlers
  const handlePlay = () => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }
    
    if (animationSteps.length > 0) {
      executeAnimationSteps();
    } else {
      // Generate default traverse animation
      const steps = generateAnimationSteps('traverse');
      setAnimationSteps(steps);
      setTimeout(() => executeAnimationSteps(), 100);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    shouldContinueAnimation.current = false;
    setIsAnimating(false);
    setIsPaused(false);
    setHighlightedNodeId(null);
    setTargetNodeId(null);
    setVisitedNodeIds(new Set());
    setAnimationSteps([]);
    setCurrentStepIndex(0);
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  const handleStepForward = () => {
    if (!isAnimating && animationSteps.length > 0 && currentStepIndex < animationSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const step = animationSteps[nextIndex];
      setCurrentStepIndex(nextIndex);
      
      if (step.nodeId) {
        setHighlightedNodeId(step.nodeId);
      }
    }
  };

  const handleStepBack = () => {
    if (!isAnimating && currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      const step = animationSteps[prevIndex];
      setCurrentStepIndex(prevIndex);
      
      if (step.nodeId) {
        setHighlightedNodeId(step.nodeId);
      }
    }
  };

  // Operations with enhanced animation
  const handleInsertAtBeginning = async () => {
    if (!inputValue || isAnimating) return;
    
    const steps = generateAnimationSteps('insertBeginning', parseInt(inputValue));
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.insertAtBeginning(newList, parseInt(inputValue));
    setLinkedList(newList);
    setInputValue('');
    setCurrentOperation('insertBeginning');
    setStats(prev => ({ ...prev, operations: prev.operations + 1 }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleInsertAtEnd = async () => {
    if (!inputValue || isAnimating) return;
    
    const steps = generateAnimationSteps('insertEnd', parseInt(inputValue));
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.insertAtEnd(newList, parseInt(inputValue));
    setLinkedList(newList);
    setInputValue('');
    setCurrentOperation('insertEnd');
    setStats(prev => ({ ...prev, operations: prev.operations + 1 }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleSearch = async () => {
    if (!searchValue || isAnimating) return;
    
    const steps = generateAnimationSteps('search', parseInt(searchValue));
    setAnimationSteps(steps);
    setCurrentOperation('search');
    setSearchValue('');
    setStats(prev => ({ ...prev, comparisons: prev.comparisons + steps.filter(s => s.comparing).length }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleTraverse = () => {
    if (isAnimating) return;
    
    const steps = generateAnimationSteps('traverse');
    setAnimationSteps(steps);
    setCurrentOperation('traverse');
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleReverse = async () => {
    if (isAnimating) return;
    
    const steps = generateAnimationSteps('reverse');
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.reverse(newList);
    setLinkedList(newList);
    setCurrentOperation('reverse');
    setStats(prev => ({ ...prev, operations: prev.operations + 1 }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleReset = () => {
    handleStop();
    setLinkedList({ head: null, size: 0 });
    setCurrentOperation('none');
    setStats({ operations: 0, comparisons: 0 });
  };

  const nodes = getVisualizationArray();

  return (
    <div className="algorithm-container">
      {/* Header Section */}
      <div className="algorithm-header">
        <div className="header-content">
          <h1>Linked List Visualization</h1>
          <p className="algorithm-description">
            Interactive visualization of linked list operations including insertion, search, and traversal.
          </p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{linkedList.size}</span>
            <span className="stat-label">Nodes</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.operations}</span>
            <span className="stat-label">Operations</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.comparisons}</span>
            <span className="stat-label">Comparisons</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="control-section">
          <h3>Insert Operations</h3>
          <div className="control-group">
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isAnimating}
                className="control-input"
              />
            </div>
            <button onClick={handleInsertAtBeginning} disabled={isAnimating} className="control-btn primary">
              <Plus size={16} />
              Insert Beginning
            </button>
            <button onClick={handleInsertAtEnd} disabled={isAnimating} className="control-btn primary">
              <Plus size={16} />
              Insert End
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Search & Operations</h3>
          <div className="control-group">
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={isAnimating}
                className="control-input"
              />
            </div>
            <button onClick={handleSearch} disabled={isAnimating} className="control-btn secondary">
              <Search size={16} />
              Search
            </button>
            <button onClick={handleTraverse} disabled={isAnimating} className="control-btn accent">
              Traverse
            </button>
            <button onClick={handleReverse} disabled={isAnimating} className="control-btn warning">
              <RotateCcw size={16} />
              Reverse
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Animation Controls</h3>
          <div className="control-group">
            <button 
              onClick={isPaused ? handlePlay : isAnimating ? handlePause : handlePlay} 
              className={`control-btn ${isAnimating && !isPaused ? 'warning' : 'play'}`}
            >
              {isAnimating && !isPaused ? <Pause size={16} /> : <Play size={16} />}
              {isAnimating && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play'}
            </button>
            <button onClick={handleStop} className="control-btn danger">
              Stop
            </button>
            <button onClick={handleStepBack} disabled={isAnimating || currentStepIndex === 0} className="control-btn secondary">
              <StepBack size={16} />
            </button>
            <button onClick={handleStepForward} disabled={isAnimating || currentStepIndex >= animationSteps.length - 1} className="control-btn secondary">
              <StepForward size={16} />
            </button>
          </div>
          
          <div className="speed-control">
            <label>Speed:</label>
            <input
              type="range"
              min="200"
              max="2000"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              className="speed-slider"
            />
            <span>{animationSpeed}ms</span>
          </div>
        </div>

        <div className="control-section">
          <h3>Utilities</h3>
          <div className="control-group">
            <button onClick={handleReset} className="control-btn danger">
              <Trash2 size={16} />
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="visualization-container" ref={visualizationRef}>
        <div className="visualization-header">
          <h3>Current List Structure</h3>
          <div className="operation-status">
            {isAnimating && (
              <div className={`status-indicator ${isPaused ? 'paused' : 'animating'}`}>
                <div className="pulse-dot"></div>
                {isPaused ? 'Paused' : 'Animating...'}
              </div>
            )}
            {animationSteps.length > 0 && (
              <div className="step-info">
                Step {currentStepIndex + 1} of {animationSteps.length}
              </div>
            )}
          </div>
        </div>

        <div className="linked-list-display">
          <AnimatePresence>
            {nodes.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="empty-icon">🔗</div>
                <h4>Empty Linked List</h4>
                <p>Add some nodes to get started!</p>
              </motion.div>
            ) : (
              <div className="nodes-container">
                {nodes.map((node, index) => (
                  <LinkedListNode
                    key={node.id}
                    node={node}
                    position={index}
                    isHighlighted={highlightedNodeId === node.id}
                    isTarget={targetNodeId === node.id}
                    isVisited={visitedNodeIds.has(node.id)}
                    isAnimating={isAnimating}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Operation Info */}
        {animationSteps.length > 0 && currentStepIndex < animationSteps.length && (
          <div className="operation-info">
            <div className="step-description">
              {animationSteps[currentStepIndex]?.description}
            </div>
            <div className="step-progress">
              <div 
                className="progress-bar"
                style={{ width: `${((currentStepIndex + 1) / animationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;