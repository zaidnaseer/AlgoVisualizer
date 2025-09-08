// src/components/AlgorithmVisualizer.jsx
import React, { useState, useEffect } from "react";
import algorithmsData from "../algorithms/algorithms.json";

// Import all your algorithm functions here
import { runAlgorithmAsync, getAlgorithmType } from "../algorithms/runner";

export default function AlgorithmVisualizer({ algorithmName, initialArray, visualOnly = false, hideTitle = false }) {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [target, setTarget] = useState(null); // For searching
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeedMs, setAnimationSpeedMs] = useState(300); // configurable speed
  const [barMotion, setBarMotion] = useState(true); // enable/disable smooth bar animation

  // Determine algorithm type using centralized runner
  const resolveAlgoType = (name) => getAlgorithmType(name);

  // Generate new array
  const generateArray = () => {
    const newArr = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 50) + 5
    );
    setArray(newArr);
    setSteps([]);
    setCurrentStep(0);

    // For searching, pick a random target
    const algoType = algorithmsData.find((a) => a.name === algorithmName)?.type;
    if (algoType === "searching") {
      setTarget(newArr[Math.floor(Math.random() * newArr.length)]);
    } else {
      setTarget(null);
    }
  };

  // Apply initialArray from props when provided/changed
  useEffect(() => {
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setArray([...initialArray]);
      setSteps([]);
      setCurrentStep(0);
      const algoType = algorithmsData.find((a) => a.name === algorithmName)?.type;
      if (algoType === "searching") {
        setTarget(initialArray[Math.floor(Math.random() * initialArray.length)]);
      } else {
        setTarget(null);
      }
    }
  }, [initialArray, algorithmName]);

  // If no initialArray provided, generate a default once on mount
  useEffect(() => {
    if (!initialArray || initialArray.length === 0) {
      generateArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run the algorithm and generate steps
  useEffect(() => {
    if (visualOnly) {
      setSteps([]);
      setCurrentStep(0);
      return;
    }
    // Do not auto-run; wait for Start
  }, [visualOnly]);

  // Simple built-in bubble sort steps generator
  // Delegate to centralized runner

  const handleStart = () => {
    if (visualOnly) return; // nothing to animate in visual-only
    (async () => {
      const result = await runAlgorithmAsync(algorithmName, array, target);
      setSteps(result.steps || []);
      setCurrentStep(0);
      setIsAnimating(true);
    })();
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
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

  const algoType = resolveAlgoType(algorithmName);

  return (
    <div
      className="p-6 border rounded-2xl shadow-lg"
      style={{ backgroundColor: "#0b1220", borderColor: "#1f2937" }}
    >
      {!hideTitle && (
        <h2 className="text-xl font-bold mb-2 text-center text-white">{algorithmName}</h2>
      )}
      {!visualOnly && (
        <button
          onClick={generateArray}
          className="mb-4 px-3 py-2 bg-blue-500 text-white rounded"
        >
          Generate Array
        </button>
      )}
      {!visualOnly && (
        <div className="flex items-center justify-center gap-3 mb-3">
          <button onClick={handleStart} disabled={isAnimating} className={`px-3 py-2 text-white rounded ${isAnimating ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600'}`}>Start</button>
          <button onClick={() => setIsAnimating(false)} disabled={!isAnimating} className={`px-3 py-2 text-white rounded ${!isAnimating ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600'}`}>Stop</button>
          <button onClick={handleReset} className="px-3 py-2 bg-gray-500 text-white rounded">Reset</button>
          {algorithmsData.find((a) => a.name === algorithmName)?.type === "searching" && (
            <input
              type="number"
              value={target ?? ''}
              onChange={(e) => setTarget(Number(e.target.value))}
              placeholder="Target"
              className="px-2 py-1 border rounded"
              style={{ width: 100 }}
            />
          )}
        </div>
      )}
      {!visualOnly && (
        <div className="flex items-center justify-center gap-4 mb-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-80">Speed</span>
            <input
              type="range"
              min="60"
              max="1200"
              step="20"
              value={animationSpeedMs}
              onChange={(e) => setAnimationSpeedMs(Number(e.target.value))}
            />
            <span className="text-xs opacity-60" style={{ width: 40, textAlign: 'right' }}>{animationSpeedMs}ms</span>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={barMotion}
              onChange={(e) => setBarMotion(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span className="text-xs opacity-80">Smooth bar animation</span>
          </label>
        </div>
      )}

      {algoType === "searching" && <p className="text-center mb-2">Target: {target}</p>}

      <div
        className="px-2 py-4 overflow-x-auto"
        style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 12, flexWrap: "nowrap" }}
      >
        {array.map((val, idx) => {
          let colorClass = "bg-blue-500"; // default visible blue
          let isHighlighted = false;
          const step = steps[currentStep];
          if (!visualOnly && step) {
            if (step.type === "compare" && Array.isArray(step.indices)) {
              isHighlighted = step.indices.includes(idx);
              if (isHighlighted) colorClass = "bg-amber-400"; // compare highlight
            } else if (step.type === "swap") {
              isHighlighted = true;
              colorClass = "bg-rose-500"; // swap pulse
            } else if (step.type === "probe") {
              isHighlighted = step.index === idx;
              if (isHighlighted) colorClass = "bg-amber-400";
            } else if (step.type === "done") {
              colorClass = "bg-emerald-500"; // finished
            }
          }

          return (
            <div
              key={idx}
              style={{
                height: `${Math.max(val, 2) * 2.2}px`,
                width: 26,
                transition: barMotion
                  ? `height ${animationSpeedMs}ms cubic-bezier(.2,.8,.2,1), background-color 180ms ease, transform 180ms ease, box-shadow 220ms ease, filter 180ms ease, border-color 180ms ease`
                  : "none",
                boxShadow: isHighlighted
                  ? "0 12px 26px rgba(245,158,11,0.65), 0 0 24px rgba(245,158,11,0.6)"
                  : "0 10px 24px rgba(59,130,246,0.45)",
                border: isHighlighted
                  ? "2px solid rgba(245,158,11,0.85)"
                  : "1px solid rgba(59,130,246,0.35)",
                filter: isHighlighted ? "saturate(1.25) brightness(1.08)" : "none",
                transform: isHighlighted ? "scaleY(1.12)" : "scaleY(1)",
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
              className={`rounded ${colorClass}`}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                  userSelect: "none"
                }}
              >
                {val}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
