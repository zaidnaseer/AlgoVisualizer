// src/components/TreeVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const TreeVisualizer = ({
  defaultAlgorithm = "InorderTraversal",
  autoLoadExample = false
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  // ================= Helpers =================
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Tree Algorithms =================

  // Sample tree:
  //        1
  //       / \
  //      2   3
  //     / \   \
  //    4   5   6
  const createSampleTree = () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
  };

  // 1️⃣ Inorder Traversal
  const inorderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      stepsArr.push({ board: copySteps(result), message: `Visited node ${node.val}` });
      traverse(node.right);
    };
    traverse(root);
    stepsArr.push({ board: copySteps(result), message: `Inorder traversal complete: [${result.join(", ")}]` });
    return stepsArr;
  };

  // 2️⃣ Preorder Traversal
  const preorderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push(node.val);
      stepsArr.push({ board: copySteps(result), message: `Visited node ${node.val}` });
      traverse(node.left);
      traverse(node.right);
    };
    traverse(root);
    stepsArr.push({ board: copySteps(result), message: `Preorder traversal complete: [${result.join(", ")}]` });
    return stepsArr;
  };

  // 3️⃣ Postorder Traversal
  const postorderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
      stepsArr.push({ board: copySteps(result), message: `Visited node ${node.val}` });
    };
    traverse(root);
    stepsArr.push({ board: copySteps(result), message: `Postorder traversal complete: [${result.join(", ")}]` });
    return stepsArr;
  };

  // 4️⃣ Level Order Traversal
  const levelOrderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const queue = root ? [root] : [];
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      stepsArr.push({ board: copySteps(result), message: `Visited node ${node.val}` });
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    stepsArr.push({ board: copySteps(result), message: `Level order traversal complete: [${result.join(", ")}]` });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    const tree = createSampleTree();
    let generatedSteps = [];
    switch (algorithm) {
      case "InorderTraversal":
        generatedSteps = inorderTraversal(tree);
        break;
      case "PreorderTraversal":
        generatedSteps = preorderTraversal(tree);
        break;
      case "PostorderTraversal":
        generatedSteps = postorderTraversal(tree);
        break;
      case "LevelOrderTraversal":
        generatedSteps = levelOrderTraversal(tree);
        break;
      default:
        setMessage("Algorithm not implemented!");
        return;
    }

    if (generatedSteps.length === 0) {
      setMessage("No steps generated. Check input.");
      return;
    }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) {
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        return;
      }
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  // ================= Controls =================
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const resetVisualizer = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setMessage("Select an algorithm and run.");
  };

  // ================= Render =================
  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard)) {
      return (
        <div className="list-visualizer">
          {stepBoard.map((val, i) => (
            <span key={i} className="list-item">{val}</span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="tree-visualizer">
      <h2>Tree Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="InorderTraversal">Inorder Traversal</option>
          <option value="PreorderTraversal">Preorder Traversal</option>
          <option value="PostorderTraversal">Postorder Traversal</option>
          <option value="LevelOrderTraversal">Level Order Traversal</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default TreeVisualizer;
