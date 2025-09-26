import React, { useState, useEffect } from "react";
import { runAlgorithmAsync, getAlgorithmType } from "../algorithms/runner";

const UnifiedVisualizer = ({
  algorithmName,
  initialArray,
  target = null,
  onStatsUpdate = () => {},
}) => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeedMs, setAnimationSpeedMs] = useState(300);
  const [barMotion, setBarMotion] = useState(true);

  // Apply initialArray from props when provided/changed
  useEffect(() => {
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
      setSteps([]);
      setCurrentStep(0);
    }
  }, [initialArray]);

  // Run the algorithm and generate steps
  const runAlgorithm = async () => {
    const result = await runAlgorithmAsync(algorithmName, array, target);
    setSteps(result.steps || []);
    setCurrentStep(0);
    setIsAnimating(true);
    return result;
  };

  // Animate steps
  useEffect(() => {
    if (!isAnimating || steps.length === 0) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        const step = steps[next];
        if (step && step.type === "swap" && Array.isArray(step.array)) {
          setArray(step.array);
        } else if (step && step.type === "move" && Array.isArray(step.array)) {
          setArray(step.array);
        } else if (step && step.type === "cycle" && Array.isArray(step.array)) {
          setArray(step.array);
        } else if (step && step.type === "done" && Array.isArray(step.array)) {
          setArray(step.array);
        }
        if (next < steps.length - 1) return next;
        clearInterval(interval);
        setIsAnimating(false);
        return next;
      });
    }, Math.max(50, animationSpeedMs));
    return () => clearInterval(interval);
  }, [isAnimating, steps, animationSpeedMs]);

  const algoType = getAlgorithmType(algorithmName);

  const handleStart = async () => {
    await runAlgorithm();
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
    }
  };

  return (
    <div className="unified-visualizer">
      <div className="visualization-controls">
        <button onClick={handleStart} disabled={isAnimating}>
          {isAnimating ? "Running..." : "Start"}
        </button>
        <button onClick={() => setIsAnimating(false)} disabled={!isAnimating}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
        
        {algoType === "searching" && (
          <input
            type="number"
            value={target ?? ""}
            onChange={(e) => onStatsUpdate({ target: Number(e.target.value) })}
            placeholder="Target"
          />
        )}
        
        <div className="speed-control">
          <label>Speed: {animationSpeedMs}ms</label>
          <input
            type="range"
            min="60"
            max="1200"
            step="20"
            value={animationSpeedMs}
            onChange={(e) => setAnimationSpeedMs(Number(e.target.value))}
          />
        </div>
        
        <label>
          <input
            type="checkbox"
            checked={barMotion}
            onChange={(e) => setBarMotion(e.target.checked)}
          />
          Smooth animation
        </label>
      </div>

      {algoType === "searching" && target && (
        <p className="target-display">Target: {target}</p>
      )}

      <div className="visualization-container">
        {array.map((val, idx) => {
          let colorClass = "bar-default";
          let isHighlighted = false;
          const step = steps[currentStep];
          
          if (step) {
            if (step.type === "compare" && Array.isArray(step.indices)) {
              isHighlighted = step.indices.includes(idx);
              if (isHighlighted) colorClass = "bar-compare";
            } else if (step.type === "swap") {
              isHighlighted = step.indices && step.indices.includes(idx);
              if (isHighlighted) colorClass = "bar-swap";
            } else if (step.type === "move") {
              isHighlighted = step.indices && step.indices.includes(idx);
              if (isHighlighted) colorClass = "bar-move";
            } else if (step.type === "cycle") {
              isHighlighted = step.indices && step.indices.includes(idx);
              if (isHighlighted) colorClass = "bar-cycle";
            } else if (step.type === "probe") {
              isHighlighted = step.index === idx;
              if (isHighlighted) colorClass = "bar-probe";
            } else if (step.type === "done") {
              colorClass = "bar-done";
            }
          }

          return (
            <div
              key={idx}
              className={`visualization-bar ${colorClass}`}
              style={{
                height: `${Math.max(val, 2) * 2.2}px`,
                width: "26px",
                transition: barMotion
                  ? `height ${animationSpeedMs}ms cubic-bezier(.2,.8,.2,1), background-color 180ms ease`
                  : "none",
                transform: isHighlighted ? "scaleY(1.12)" : "scaleY(1)",
              }}
            >
              <span className="bar-value">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnifiedVisualizer;