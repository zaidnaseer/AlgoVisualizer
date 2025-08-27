import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import "../styles/pages.css";
import {
  LinkedList,
  getLinkedListSteps,
  LINKED_LIST_PSEUDOCODE,
} from "../algorithms/linkedList";
import { Stack, getStackSteps, STACK_PSEUDOCODE } from "../algorithms/stack";
import { Queue, getQueueSteps, QUEUE_PSEUDOCODE } from "../algorithms/queue";
import {
  BinaryTree,
  getTreeSteps,
  BINARY_TREE_PSEUDOCODE,
} from "../algorithms/binaryTree";
import CodeExplanation from "../components/CodeExplanation";
import SimpleExportControls from "../components/SimpleExportControls";
import { useTheme } from "../ThemeContext";
import {
  BinarySearchTree,
  getBstSteps,
  BST_PSEUDOCODE,
} from "../algorithms/binarySearchTree";

function DataStructures() {
  const [selectedStructure, setSelectedStructure] = useState("linkedlist");
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState("");
  const [operation, setOperation] = useState("traverse");
  const [vizSize, setVizSize] = useState(56);
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  // guard against auto/double execution handled via explicit Execute click only

  // Instances (memoized to persist between renders)
  const listRef = useMemo(() => new LinkedList(), []);
  const stackRef = useMemo(() => new Stack(), []);
  const queueRef = useMemo(() => new Queue(), []);
  const treeRef = useMemo(() => new BinaryTree(), []);
  const bstRef = useMemo(() => new BinarySearchTree(), []);

  const dataStructures = {
    linkedlist: {
      title: "Linked List",
      description:
        "A linear data structure where elements are stored in nodes, and each node contains data and a reference to the next node.",
      timeComplexity: {
        insertion: "O(1)",
        deletion: "O(1)",
        search: "O(n)",
        access: "O(n)",
      },
      spaceComplexity: "O(n)",
      useCases: [
        "Dynamic memory allocation",
        "Implementation of other data structures",
        "Undo functionality in applications",
        "Music playlist management",
      ],
    },
    stack: {
      title: "Stack",
      description:
        "A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (top).",
      timeComplexity: {
        push: "O(1)",
        pop: "O(1)",
        peek: "O(1)",
        search: "O(n)",
      },
      spaceComplexity: "O(n)",
      useCases: [
        "Function call management",
        "Expression evaluation",
        "Browser history",
        "Undo/Redo operations",
      ],
    },
    queue: {
      title: "Queue",
      description:
        "A First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front.",
      timeComplexity: {
        enqueue: "O(1)",
        dequeue: "O(1)",
        front: "O(1)",
        search: "O(n)",
      },
      spaceComplexity: "O(n)",
      useCases: [
        "CPU scheduling",
        "Breadth-First Search",
        "Print queue management",
        "Buffer for data streams",
      ],
    },
    tree: {
      title: "Binary Tree",
      description:
        "A hierarchical data structure where each node has at most two children, referred to as left and right child.",
      timeComplexity: {
        insertion: "O(log n)",
        deletion: "O(log n)",
        search: "O(log n)",
        traversal: "O(n)",
      },
      spaceComplexity: "O(n)",
      useCases: [
        "Database indexing",
        "File system organization",
        "Expression parsing",
        "Decision making algorithms",
      ],
    },
    bst: {
      title: "Binary Search Tree",
      description:
        "A node-based binary tree data structure which has the property that the left subtree of a node contains only nodes with keys lesser than the node’s key, and the right subtree contains only nodes with keys greater than the node’s key.",
      timeComplexity: {
        insertion: "O(log n)",
        deletion: "O(log n)",
        search: "O(log n)",
      },
      spaceComplexity: "O(n)",
      useCases: [
        "Implementing map and set objects",
        "Database indexing",
        "File system organization",
      ],
    },
    avl: {
      title: "AVL Tree",
      description:
        "A self-balancing binary search tree where the heights of two child subtrees differ by at most one.",
      timeComplexity: {
        insertion: "O(log n)",
        deletion: "O(log n)",
        search: "O(log n)",
      },
      spaceComplexity: "O(n)",
      useCases: [
        "Ordered data indexing",
        "Databases and memory-resident indexes",
      ],
    },
    redblack: {
      title: "Red-Black Tree",
      description:
        "A balanced binary search tree with an extra color bit per node that ensures logarithmic height.",
      timeComplexity: {
        insertion: "O(log n)",
        deletion: "O(log n)",
        search: "O(log n)",
      },
      spaceComplexity: "O(n)",
      useCases: ["Language runtimes (maps/sets)", "Filesystem indexes"],
    },
    graph: {
      title: "Graph",
      description:
        "A collection of nodes (vertices) connected by edges; supports many algorithms like BFS/DFS, shortest paths.",
      timeComplexity: { traversal: "O(V + E)" },
      spaceComplexity: "O(V + E)",
      useCases: [
        "Navigation and routing",
        "Social networks",
        "Dependency analysis",
      ],
    },
  };

  const currentStructure = dataStructures[selectedStructure];

  const seedLinkedList = () => {
    if (listRef.size === 0 && !listRef.head) {
      [1, 2, 3].forEach((v) => listRef.insertTail(v));
    }
  };
  const seedStack = () => {
    if (stackRef.size === 0) {
      [4, 3, 2, 1].forEach((v) => stackRef.push(v)); // top = 1? getArray returns from top; push 4,3,2,1 -> top=1; To match image with 4 on top, push 1,2,3,4
      // adjust to match image: top 4
      stackRef.top = null;
      stackRef.size = 0;
      [1, 2, 3, 4].forEach((v) => stackRef.push(v));
    }
  };
  const seedQueue = () => {
    if (queueRef.size === 0) {
      [1, 2, 4].forEach((v) => queueRef.enqueue(v));
    }
  };
  const seedTree = () => {
    if (!treeRef.root) {
      [5, 3, 8, 1, 4, 7, 11].forEach((v) => treeRef.insert(v));
    }
  };
  const seedBst = () => {
    if (!bstRef.root) {
      [10, 5, 15, 3, 7, 18].forEach((v) => bstRef.insert(v));
    }
  };

  // Seed defaults so visualization is never empty and keep op controlled
  useEffect(() => {
    seedLinkedList();
    seedStack();
    seedQueue();
    seedTree();
    seedBst();

    // Set default operation per structure
    let defaultOp = "search";
    if (selectedStructure === "linkedlist") defaultOp = "traverse";
    else if (selectedStructure === "stack") defaultOp = "push";
    else if (selectedStructure === "queue") defaultOp = "enqueue";
    setOperation(defaultOp);
    setSteps([]);
    setCurrentStep(0);
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStructure]);

  const handleReset = () => {
    // 1. Clear the actual data structure instance based on the selection
    switch (selectedStructure) {
      case "linkedlist":
        listRef.head = null;
        listRef.size = 0;
        seedLinkedList();
        break;
      case "stack":
        stackRef.top = null;
        stackRef.size = 0;
        seedStack();
        break;
      case "queue":
        queueRef.front = null;
        queueRef.rear = null;
        queueRef.size = 0;
        seedQueue();
        break;
      case "tree":
        treeRef.root = null;
        seedTree();
        break;
      case "bst":
        bstRef.root = null;
        seedBst();
        break;
      default:
        break;
    }

    // 2. Reset the UI state
    setSteps([]);
    setCurrentStep(0);
    setMessage("Data structure has been reset.");
    setInputValue("");
    setIndexValue("");
  };

  const comingSoon =
    selectedStructure === "avl" ||
    selectedStructure === "redblack" ||
    selectedStructure === "graph";

  return (
    <div className="page-container">
      <h1 className="page-title">Data Structures Visualizer</h1>

      {/* 1) Select Data Structure */}
      <div
        className="controls-section"
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "8px",
        }}
      >
        <label className="label" htmlFor="dsSelect">
          Select Data Structure:
        </label>
        <select
          className="select"
          id="dsSelect"
          value={selectedStructure}
          onChange={(e) => {
            setSelectedStructure(e.target.value);
            setSteps([]);
            setCurrentStep(0);
            setMessage("");
          }}
        >
          <option value="linkedlist">Linked List</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="tree">Binary Tree</option>
          <option value="bst">Binary Search Tree</option>
          <option value="avl">AVL Tree (Coming Soon)</option>
          <option value="redblack">Red-Black Tree (Coming Soon)</option>
          <option value="graph">Graphs </option>
        </select>
      </div>

      {/* 2) Inputs + Operation + Execute/Reset */}
      <div
        className="controls-section"
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "8px",
        }}
      >
        {comingSoon ? (
          <div style={{ color: "#b8c5d1", fontWeight: 600 }}>
            This data structure is coming soon. Visualizations and operations
            are not yet available.
          </div>
        ) : (
          <>
            <input
              className="input"
              type="number"
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {selectedStructure === "linkedlist" && (
              <input
                className="input"
                type="number"
                placeholder="Index (optional)"
                value={indexValue}
                onChange={(e) => setIndexValue(e.target.value)}
              />
            )}
            <select
              id="operationSelect"
              className="select"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              {selectedStructure === "linkedlist" && (
                <>
                  <option value="insertHead">Insert Head</option>
                  <option value="insertTail">Insert Tail</option>
                  <option value="insertAt">Insert At</option>
                  <option value="deleteTail">Delete Tail</option>
                  <option value="deleteAt">Delete At</option>
                  <option value="search">Search</option>
                  <option value="traverse">Traverse</option>
                  <option value="reverse">Reverse</option>
                  <option value="sort">Sort</option>
                </>
              )}
              {selectedStructure === "stack" && (
                <>
                  <option value="push">Push</option>
                  <option value="pop">Pop</option>
                  <option value="search">Search</option>
                </>
              )}
              {selectedStructure === "queue" && (
                <>
                  <option value="enqueue">Enqueue</option>
                  <option value="dequeue">Dequeue</option>
                  <option value="search">Search</option>
                </>
              )}
              {selectedStructure === "tree" && (
                <>
                  <option value="insert">Insert</option>
                  <option value="search">Search</option>
                  <option value="delete">Delete</option>
                  <option value="inorder">Inorder Traversal</option>
                  <option value="preorder">Preorder Traversal</option>
                  <option value="postorder">Postorder Traversal</option>
                </>
              )}
              {selectedStructure === "bst" && (
                <>
                  <option value="insert">Insert</option>
                  <option value="search">Search</option>
                  <option value="delete">Delete</option>
                </>
              )}
            </select>
            <button
              className="btn"
              onClick={() =>
                executeOperation({
                  op: operation,
                  value: inputValue,
                  index: indexValue,
                  selectedStructure,
                  listRef,
                  stackRef,
                  queueRef,
                  treeRef,
                  bstRef,
                  setSteps,
                  setCurrentStep,
                  setMessage,
                  setInputValue,
                  setIndexValue,
                  title: currentStructure.title,
                })
              }
            >
              Execute
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </>
        )}
      </div>

      {/* 3) Visualization Controls (size only) + Export */}
      <div
        className="controls-section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            background: "rgba(15, 52, 96, 0.1)",
            borderRadius: "15px",
            border: "1px solid rgba(102,204,255,0.2)",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "#66ccff", marginBottom: "12px" }}>
            Visualization Controls
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <label
              className="label"
              htmlFor="sizeRange"
              style={{ minWidth: "110px" }}
            >
              Node Size:
            </label>
            <input
              id="sizeRange"
              type="range"
              min="40"
              max="80"
              value={vizSize}
              onChange={(e) => setVizSize(parseInt(e.target.value, 10))}
              className="input"
              style={{ width: "200px" }}
            />
            <div
              style={{
                color: "#66ccff",
                fontWeight: 600,
                minWidth: "140px",
                textAlign: "right",
              }}
            >
              {vizSize}px
            </div>
          </div>
        </div>
        <SimpleExportControls containerId="ds-visualization-container" />
      </div>

      {/* Status message line */}
      {message && (
        <div
          style={{
            textAlign: "right",
            color: "#66ccff",
            fontWeight: 600,
            margin: "8px 0 6px",
          }}
        >
          {message}
        </div>
      )}

      {/* Step navigation */}
      {!comingSoon && steps.length > 0 && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
          >
            Previous Step
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
            }
            disabled={currentStep >= steps.length - 1}
          >
            Next Step
          </button>
          <span style={{ color: "#66ccff", fontWeight: 600 }}>
            Step {currentStep + 1} / {steps.length}
          </span>
        </div>
      )}

      {/* 4) Visualization & Pseudocode (two-column like Searching) */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: "1 1 auto",
            minWidth: "300px",
            maxWidth: "100%",
            overflowX: "hidden",
          }}
        >
          <div
            id="ds-visualization-container"
            className="visualization-area"
            style={{
              minHeight: "400px",
              padding: "20px",
              background: "rgba(15, 52, 96, 0.1)",
              borderRadius: "15px",
              border: "1px solid rgba(102, 204, 255, 0.2)",
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {comingSoon && (
              <div
                style={{
                  textAlign: "center",
                  color: "#b8c5d1",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {currentStructure?.title || "This"} visualization is coming
                soon.
              </div>
            )}
            {selectedStructure === "linkedlist" &&
              (() => {
                const arr = steps[currentStep]?.list ?? listRef.toArray();
                const head = arr.length ? arr[0] : "∅";
                const tail = arr.length ? arr[arr.length - 1] : "∅";
                return <LinkedListHeaderBadge head={head} tail={tail} />;
              })()}
            {!comingSoon && selectedStructure === "linkedlist" && (
              <LinkedListViz
                state={steps[currentStep]}
                list={listRef}
                vizSize={vizSize}
              />
            )}
            {!comingSoon && selectedStructure === "stack" && (
              <StackViz
                state={steps[currentStep]}
                stack={stackRef}
                vizSize={vizSize}
              />
            )}
            {!comingSoon && selectedStructure === "queue" && (
              <QueueViz
                state={steps[currentStep]}
                queue={queueRef}
                vizSize={vizSize}
              />
            )}
            {!comingSoon && selectedStructure === "tree" && (
              <TreeViz
                state={steps[currentStep]}
                tree={treeRef}
                vizSize={vizSize}
              />
            )}
            {!comingSoon && selectedStructure === "bst" && (
              <TreeViz
                state={steps[currentStep]}
                tree={bstRef}
                vizSize={vizSize}
              />
            )}
          </div>
        </div>
        {!comingSoon && (
          <div style={{ flex: "0 0 420px", minWidth: "280px" }}>
            <PseudocodePanel
              setKey={selectedStructure}
              state={steps[currentStep]}
              map={
                {
                  linkedlist: LINKED_LIST_PSEUDOCODE,
                  stack: STACK_PSEUDOCODE,
                  queue: QUEUE_PSEUDOCODE,
                  tree: BINARY_TREE_PSEUDOCODE,
                  bst: BST_PSEUDOCODE,
                }[selectedStructure]
              }
            />
          </div>
        )}
      </div>

      {/* 5) Algorithm Details + View Code Explanation (format like Searching) */}
      <div className="algorithm-info" style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h3 style={{ margin: 0 }}>{currentStructure.title} - Details</h3>
          {!comingSoon && (
            <button
              className="btn btn-secondary"
              onClick={() => setShowCodeExplanation(true)}
            >
              View Code Explanation
            </button>
          )}
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(102, 204, 255, 0.08)",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(102, 204, 255, 0.2)",
              }}
            >
              <div
                style={{
                  color: "#66ccff",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                Time Complexity
              </div>
              <div style={{ color: "#e0e6ed" }}>
                {Object.entries(currentStructure.timeComplexity).map(
                  ([op, complexity]) => (
                    <div key={op}>
                      {op}: {complexity}
                    </div>
                  )
                )}
              </div>
            </div>
            <div
              style={{
                background: "rgba(102, 204, 255, 0.08)",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(102, 204, 255, 0.2)",
              }}
            >
              <div
                style={{
                  color: "#66ccff",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                Space Complexity
              </div>
              <div style={{ color: "#e0e6ed" }}>
                {currentStructure.spaceComplexity}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{ color: "#66ccff", fontWeight: 600, marginBottom: "6px" }}
            >
              Common Use Cases
            </div>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "#e0e6ed" }}>
              {currentStructure.useCases?.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            {comingSoon && (
              <div style={{ marginTop: 12, color: "#b8c5d1", fontWeight: 600 }}>
                Detailed visualization and operations are coming soon.
              </div>
            )}
          </div>
        </div>
      </div>

      {!comingSoon && (
        <CodeExplanation
          algorithm={selectedStructure}
          isVisible={showCodeExplanation}
          onClose={() => setShowCodeExplanation(false)}
        />
      )}

      {/* Removed the "coming soon" status; interactive implementations are live. */}
    </div>
  );
}

export default DataStructures;

// --- Visualization Components ---
function Badge({
  children,
  active,
  shape = "square",
  size = 48,
  animate = false,
}) {
  const { theme } = useTheme();
  const activeBg =
    theme === "light" ? "rgba(46, 204, 113, 0.18)" : "rgba(46, 204, 113, 0.28)"; // green, clearer in light mode
  const activeBorder =
    theme === "light" ? "rgba(46, 204, 113, 0.70)" : "rgba(46, 204, 113, 0.80)";
  const activeShadow =
    theme === "light"
      ? "0 0 0 2px rgba(46, 204, 113, 0.25) inset"
      : "0 0 0 2px rgba(46, 204, 113, 0.35) inset";
  const textColor = theme === "light" ? "#1a1a1a" : "#e0e6ed";
  const base = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    padding: 0,
    borderRadius: shape === "circle" ? "50%" : 12,
    background: active ? activeBg : "rgba(102,204,255,0.08)",
    border: active
      ? `1px solid ${activeBorder}`
      : "1px solid rgba(102,204,255,0.3)",
    color: textColor,
    textAlign: "center",
    fontWeight: 700,
    fontSize: size > 44 ? 20 : 16,
    boxShadow: active ? activeShadow : "none",
    transform: animate ? "scale(1.08)" : "scale(1.0)",
    transition:
      "transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease",
  };
  return <div style={base}>{children}</div>;
}

function LinkedListViz({ state, list: live, vizSize = 56 }) {
  const list = state?.list ?? live.toArray();
  const hi = state?.highlightIndex ?? -1;
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 20,
        minHeight: 120,
      }}
    >
      {list.map((v, i) => (
        <React.Fragment key={`${v}-${i}`}>
          <Badge
            active={i === hi}
            animate={i === hi}
            shape="circle"
            size={vizSize}
          >
            {v}
          </Badge>
          {i < list.length - 1 && (
            <span style={{ color: "#66ccff", fontSize: 22 }}>→</span>
          )}
        </React.Fragment>
      ))}
      {/* list always seeded; no empty message */}
      {state?.description && (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "#66ccff",
            marginTop: 8,
          }}
        >
          {state.description}
        </div>
      )}
    </div>
  );
}

function LinkedListHeaderBadge({ head, tail }) {
  const { theme } = useTheme();
  const border =
    theme === "light"
      ? "1px solid rgba(46, 204, 113, 0.6)"
      : "1px solid rgba(102,204,255,0.35)";
  const bg =
    theme === "light" ? "rgba(46, 204, 113, 0.12)" : "rgba(15, 52, 96, 0.25)";
  const color = theme === "light" ? "#1a1a1a" : "#e0e6ed";
  return (
    <div style={{ position: "absolute", right: 16, top: 16 }}>
      <div
        style={{
          display: "inline-flex",
          gap: 10,
          alignItems: "center",
          padding: "6px 12px",
          borderRadius: 14,
          border,
          background: bg,
          color,
          fontWeight: 700,
        }}
      >
        <span>
          Head: <span style={{ opacity: 0.9 }}>{head}</span>
        </span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span>
          Tail: <span style={{ opacity: 0.9 }}>{tail}</span>
        </span>
      </div>
    </div>
  );
}
LinkedListHeaderBadge.propTypes = {
  head: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function StackViz({ state, stack, vizSize = 56 }) {
  const arr = state?.stack ?? stack.getArray();
  const hi = state?.highlightIndex ?? -1;
  return (
    <div
      style={{
        display: "flex",
        gap: 30,
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* seeded; no empty message */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {arr.map((v, i) => (
          <Badge
            active={i === hi}
            animate={i === hi}
            key={`${v}-${i}`}
            shape="square"
            size={vizSize}
          >
            {v}
          </Badge>
        ))}
      </div>
      {state?.description && (
        <div style={{ color: "#66ccff" }}>{state.description}</div>
      )}
    </div>
  );
}

function QueueViz({ state, queue, vizSize = 56 }) {
  const arr = state?.queue ?? queue.getArray();
  const hi = state?.highlightIndex ?? -1;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ color: "#9bb3c7" }}>Front</div>
        {arr.map((v, i) => (
          <Badge
            active={i === hi}
            animate={i === hi}
            key={`${v}-${i}`}
            shape={"square"}
            size={vizSize}
          >
            {v}
          </Badge>
        ))}
        <div style={{ color: "#9bb3c7" }}>Back</div>
      </div>
      {/* seeded; no empty message */}
      {state?.description && (
        <div style={{ color: "#66ccff" }}>{state.description}</div>
      )}
    </div>
  );
}

function TreeViz({ state, tree, vizSize = 56 }) {
  const { theme } = useTheme();
  const displayTree = state?.tree ?? tree;

  const levels = [];
  const q = [{ node: displayTree.root, path: "0", depth: 0, pos: 0 }];
  while (q.length) {
    const { node, path, depth, pos } = q.shift();
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push({ data: node?.data ?? null, path, depth, pos });
    if (node) {
      q.push({
        node: node.left,
        path: `${path}0`,
        depth: depth + 1,
        pos: pos * 2,
      });
      q.push({
        node: node.right,
        path: `${path}1`,
        depth: depth + 1,
        pos: pos * 2 + 1,
      });
    }
  }
  const filtered = levels.filter(
    (lvl) => lvl?.some((n) => n.data !== null) ?? false
  );
  const width = 640;
  const levelHeight = 100;
  const height = Math.max(140, filtered.length * levelHeight + 40);
  const nodes = [];
  const edges = [];
  filtered.forEach((lvl, d) => {
    const count = lvl.length;
    lvl.forEach((n, i) => {
      const x = ((i + 1) / (count + 1)) * width;
      const y = 40 + d * levelHeight;
      nodes.push({ ...n, x, y });
    });
  });
  // Build edges from parent to children using path
  const nodeByPath = Object.fromEntries(nodes.map((n) => [n.path, n]));
  nodes.forEach((n) => {
    const left = nodeByPath[`${n.path}0`];
    const right = nodeByPath[`${n.path}1`];
    if (left && left.data !== null && n.data !== null)
      edges.push({ x1: n.x, y1: n.y, x2: left.x, y2: left.y });
    if (right && right.data !== null && n.data !== null)
      edges.push({ x1: n.x, y1: n.y, x2: right.x, y2: right.y });
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        width: "100%",
      }}
    >
      {/* seeded; no empty state */}
      {filtered.length > 0 && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", maxWidth: width, height }}
        >
          {/* edges */}
          {edges.map((e) => (
            <line
              key={`e-${e.x1}-${e.y1}-${e.x2}-${e.y2}`}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="#3d7bd9"
              strokeWidth="3"
            />
          ))}
          {/* nodes */}
          {nodes
            .filter((n) => n.data !== null)
            .map((n) => {
              const isActive = state?.node?.data === n.data;
              const r = vizSize / 2 - 2 + (isActive ? 3 : 0);
              const stroke = isActive ? "#2ecc71" : "rgba(102,204,255,0.4)"; // green when active
              let fill = "rgba(102,204,255,0.12)";
              if (isActive) {
                fill =
                  theme === "light"
                    ? "rgba(46, 204, 113, 0.18)"
                    : "rgba(46, 204, 113, 0.28)";
              }
              return (
                <g key={n.path}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="2"
                    style={{
                      transition:
                        "r 200ms ease, stroke 200ms ease, fill 200ms ease",
                    }}
                  />
                  <text
                    x={n.x}
                    y={n.y + 7}
                    textAnchor="middle"
                    fontWeight="700"
                    fontSize={Math.max(14, vizSize / 3)}
                    fill={theme === "light" ? "#1a1a1a" : "#e0e6ed"}
                  >
                    {n.data}
                  </text>
                </g>
              );
            })}
        </svg>
      )}
      {state?.description && (
        <div style={{ color: "#66ccff" }}>{state.description}</div>
      )}
    </div>
  );
}

function PseudocodePanel({ setKey, state, map }) {
  let keyCandidate = null;
  if (setKey === "tree") {
    if (state?.type === "insert") keyCandidate = "insert";
    else if (state?.type === "found") keyCandidate = "search";
  }
  keyCandidate =
    keyCandidate ||
    state?.operation ||
    state?.op ||
    inferPseudoKey(setKey, state);
  let fallback = "search";
  if (setKey === "linkedlist") fallback = "traverse";
  else if (setKey === "stack") fallback = "push";
  else if (setKey === "queue") fallback = "enqueue";
  const seq =
    map && keyCandidate && map[keyCandidate]
      ? map[keyCandidate]
      : map?.[fallback] || [];
  const lineIdx = state?.pseudoLine ?? null;
  return (
    <div
      style={{
        background: "rgba(102,204,255,0.07)",
        border: "1px solid rgba(102,204,255,0.15)",
        borderRadius: 12,
        padding: 14,
        marginTop: 12,
        width: "100%",
        maxWidth: 560,
      }}
    >
      <h4 style={{ color: "#66ccff", marginBottom: 8 }}>Pseudocode</h4>
      <pre
        style={{
          background: "rgba(26,26,46,0.95)",
          padding: 12,
          borderRadius: 8,
          color: "#e0e6ed",
          overflowX: "auto",
        }}
      >
        {seq.map((l, idx) => (
          <div
            key={l.code}
            style={{
              background:
                lineIdx !== null && idx === lineIdx
                  ? "rgba(102,204,255,0.25)"
                  : "none",
              color:
                lineIdx !== null && idx === lineIdx ? "#66ccff" : "#e0e6ed",
              borderRadius: 6,
              padding: "2px 6px",
              fontWeight: lineIdx !== null && idx === lineIdx ? 700 : 400,
            }}
          >
            {l.code}
          </div>
        ))}
      </pre>
      {state?.description && (
        <div style={{ color: "#b8c5d1" }}>{state.description}</div>
      )}
    </div>
  );
}

function inferPseudoKey(setKey, state) {
  const t = state?.type || "";
  if (setKey === "linkedlist") {
    if (!t) return "traverse";
    if (t.startsWith("insert")) return "insertTail";
    const map = {
      delete: "deleteHead",
      reversed: "reverse",
      sorted: "sort",
      traverse: "traverse",
      visit: "traverse",
      found: "search",
      notFound: "search",
    };
    return map[t] || "traverse";
  }
  if (setKey === "stack") {
    if (!t) return "push";
    const map = {
      insert: "push",
      delete: "pop",
      found: "push",
      notFound: "push",
      traverse: "push",
    };
    return map[t] || "push";
  }
  if (setKey === "queue") {
    if (!t) return "enqueue";
    const map = {
      insert: "enqueue",
      delete: "dequeue",
      found: "search",
      notFound: "search",
      traverse: "search",
    };
    return map[t] || "enqueue";
  }
  // tree
  if (!t) return "search";
  const map = {
    insert: "insert",
    found: "search",
    notFound: "search",
    traverse: "search",
    compare: "search",
  };
  return map[t] || "search";
}

// PropTypes for linter satisfaction
Badge.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  shape: PropTypes.oneOf(["square", "circle"]),
  size: PropTypes.number,
  animate: PropTypes.bool,
};
Badge.defaultProps = {
  active: false,
  shape: "square",
  size: 48,
  animate: false,
};
LinkedListViz.propTypes = {
  state: PropTypes.object,
  list: PropTypes.object,
  vizSize: PropTypes.number,
};
LinkedListViz.defaultProps = { vizSize: 56 };
StackViz.propTypes = {
  state: PropTypes.object,
  stack: PropTypes.object,
  vizSize: PropTypes.number,
};
StackViz.defaultProps = { vizSize: 56 };
QueueViz.propTypes = {
  state: PropTypes.object,
  queue: PropTypes.object,
  vizSize: PropTypes.number,
};
QueueViz.defaultProps = { vizSize: 56 };
TreeViz.propTypes = {
  state: PropTypes.object,
  tree: PropTypes.object,
  vizSize: PropTypes.number,
};
TreeViz.defaultProps = { vizSize: 56 };
PseudocodePanel.propTypes = {
  setKey: PropTypes.string,
  state: PropTypes.object,
  map: PropTypes.object,
};

// Choose which step to show first after executing an operation
function selectInitialStep(op, steps) {
  const nonMutating = new Set([
    "search",
    "traverse",
    "inorder",
    "preorder",
    "postorder",
  ]);
  const isNonMutating = nonMutating.has(op);
  return isNonMutating ? 0 : Math.max(0, steps.length - 1);
}

// Extracted execution logic to lower complexity
function executeOperation(ctx) {
  const { op, value, index, selectedStructure } = ctx;
  const val = value !== "" ? parseInt(value, 10) : undefined;
  const idx = index !== "" ? parseInt(index, 10) : undefined;
  const runners = {
    linkedlist: () => runLinkedList(ctx, op, val, idx),
    stack: () => runStack(ctx, op, val),
    queue: () => runQueue(ctx, op, val),
    tree: () => runTree(ctx, op, val),
    bst: () => runBst(ctx, op, val),
  };
  (runners[selectedStructure] || (() => {}))();
  // Clear inputs after any execution to prevent accidental repeats
  if (ctx.setInputValue) ctx.setInputValue("");
  if (ctx.setIndexValue) ctx.setIndexValue("");
}

function runLinkedList(
  { listRef, setSteps, setCurrentStep, setMessage, title },
  op,
  val,
  idx
) {
  const s = getLinkedListSteps(op, listRef, { data: val, index: idx });
  const mutate = {
    insertHead: () => val !== undefined && listRef.insertHead(val),
    insertTail: () => val !== undefined && listRef.insertTail(val),
    insertAt: () => val !== undefined && listRef.insertAt(idx || 0, val),
    deleteHead: () => listRef.deleteHead(),
    deleteTail: () => listRef.deleteTail(),
    deleteAt: () => listRef.deleteAt(idx || 0),
    reverse: () => listRef.reverse(),
    sort: () => listRef.sort(),
  };
  if (mutate[op]) mutate[op]();
  setSteps(s);
  setCurrentStep(selectInitialStep(op, s));
  setMessage(`${title} - ${op} executed.`);
}

function runStack(
  { stackRef, setSteps, setCurrentStep, setMessage, title },
  op,
  val
) {
  const s = getStackSteps(op, stackRef, { data: val });
  if (op === "push" && val !== undefined) stackRef.push(val);
  else if (op === "pop") stackRef.pop();
  setSteps(s);
  setCurrentStep(selectInitialStep(op, s));
  setMessage(`${title} - ${op} executed.`);
}

function runQueue(
  { queueRef, setSteps, setCurrentStep, setMessage, title },
  op,
  val
) {
  const s = getQueueSteps(op, queueRef, { data: val });
  if (op === "enqueue" && val !== undefined) queueRef.enqueue(val);
  else if (op === "dequeue") queueRef.dequeue();
  setSteps(s);
  setCurrentStep(selectInitialStep(op, s));
  setMessage(`${title} - ${op} executed.`);
}

function runTree(
  { treeRef, setSteps, setCurrentStep, setMessage, title },
  op,
  val
) {
  const s = getTreeSteps(op, treeRef, { data: val });
  if (op === "insert" && val !== undefined) treeRef.insert(val);
  else if (op === "delete" && val !== undefined) treeRef.delete(val);
  setSteps(s);
  setCurrentStep(selectInitialStep(op, s));
  setMessage(`${title} - ${op} executed.`);
}

function runBst(
  { bstRef, setSteps, setCurrentStep, setMessage, title },
  op,
  val
) {
  const s = getBstSteps(op, bstRef, { data: val });
  if (op === "insert" && val !== undefined) bstRef.insert(val);
  else if (op === "delete" && val !== undefined) bstRef.delete(val);
  setSteps(s);
  setCurrentStep(selectInitialStep(op, s));
  setMessage(`${title} - ${op} executed.`);
}
