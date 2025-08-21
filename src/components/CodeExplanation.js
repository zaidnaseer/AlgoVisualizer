import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import "../styles/codeExplanation.css";

const LANGS = [
  { key: "js", label: "JavaScript" },
  { key: "java", label: "Java" },
  { key: "cpp", label: "C++" },
  { key: "py", label: "Python" },
];

// highlight helper
function computeHighlightLine(codeString, highlightSnippet) {
  if (!codeString || !highlightSnippet) return null;
  const lines = codeString.split("\n");
  const normalized = highlightSnippet.trim();
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(normalized)) return i + 1;
  }
  return null;
}

const ALGO = {
  bubbleSort: {
    title: "Bubble Sort Algorithm",
    description:
      "Repeatedly compares adjacent elements and swaps them if out of order. Largest items “bubble” to the end each pass.",
    code: {
      js: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      java: `public static int[] bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}`,
      cpp: `#include <vector>
using namespace std;

vector<int> bubbleSort(vector<int> arr) {
  int n = (int)arr.size();
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
  return arr;
}`,
      py: `def bubble_sort(arr):
  n = len(arr)
  for i in range(n - 1):
    for j in range(0, n - i - 1):
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
  return arr`,
    },
    steps: [
      {
        explanation: "Loop passes; after each pass, the largest element settles at the end.",
        highlight: {
          js: "for (let i = 0; i < n - 1; i++) {",
          java: "for (int i = 0; i < n - 1; i++) {",
          cpp: "for (int i = 0; i < n - 1; i++) {",
          py: "for i in range(n - 1):",
        },
      },
      {
        explanation: "Compare adjacent elements and swap when out of order.",
        highlight: {
          js: "if (arr[j] > arr[j + 1]) {",
          java: "if (arr[j] > arr[j + 1]) {",
          cpp: "if (arr[j] > arr[j + 1]) {",
          py: "if arr[j] > arr[j + 1]:",
        },
      },
      {
        explanation: "Swap the pair.",
        highlight: {
          js: "[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
          java: "int tmp = arr[j];",
          cpp: "swap(arr[j], arr[j + 1]);",
          py: "arr[j], arr[j + 1] = arr[j + 1], arr[j]",
        },
      },
      { explanation: "Return the sorted array." },
    ],
  },

  selectionSort: {
    title: "Selection Sort Algorithm",
    description:
      "Select the minimum from the unsorted part and place it at the beginning each iteration.",
    code: {
      js: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
      java: `public static int[] selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx != i) {
      int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;
    }
  }
  return arr;
}`,
      cpp: `#include <vector>
using namespace std;

vector<int> selectionSort(vector<int> arr) {
  int n = (int)arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[minIdx]) minIdx = j;
    if (minIdx != i) swap(arr[i], arr[minIdx]);
  }
  return arr;
}`,
      py: `def selection_sort(arr):
  n = len(arr)
  for i in range(n - 1):
    min_idx = i
    for j in range(i + 1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    if min_idx != i:
      arr[i], arr[min_idx] = arr[min_idx], arr[i]
  return arr`,
    },
    steps: [
      { explanation: "Assume current index holds the minimum." },
      { explanation: "Scan the rest to find a smaller element." },
      { explanation: "Swap the found minimum with current index." },
    ],
  },

  insertionSort: {
    title: "Insertion Sort Algorithm",
    description:
      "Builds the sorted array one item at a time by inserting the current element into the already-sorted left part.",
    code: {
      js: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      java: `public static int[] insertionSort(int[] arr) {
  int n = arr.length;
  for (int i = 1; i < n; i++) {
    int key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      cpp: `#include <vector>
using namespace std;

vector<int> insertionSort(vector<int> arr) {
  int n = (int)arr.size();
  for (int i = 1; i < n; i++) {
    int key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
    arr[j + 1] = key;
  }
  return arr;
}`,
      py: `def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key
  return arr`,
    },
    steps: [
      { explanation: "Pick key at i and compare leftwards." },
      { explanation: "Shift larger elements to the right." },
      { explanation: "Insert key at the hole." },
    ],
  },

  mergeSort: {
    title: "Merge Sort Algorithm",
    description:
      "Divide the array, sort each half, then merge the two sorted halves.",
    code: {
      js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
}`,
      java: `import java.util.*;
public static int[] mergeSort(int[] arr) {
  if (arr.length <= 1) return arr;
  int mid = arr.length / 2;
  int[] left = Arrays.copyOfRange(arr, 0, mid);
  int[] right = Arrays.copyOfRange(arr, mid, arr.length);
  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right);
}
private static int[] merge(int[] L, int[] R) {
  int[] res = new int[L.length + R.length];
  int i = 0, j = 0, k = 0;
  while (i < L.length && j < R.length)
    res[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
  while (i < L.length) res[k++] = L[i++];
  while (j < R.length) res[k++] = R[j++];
  return res;
}`,
      cpp: `#include <vector>
using namespace std;

static vector<int> mergeVec(const vector<int>& L, const vector<int>& R) {
  vector<int> res; res.reserve(L.size()+R.size());
  size_t i=0, j=0;
  while (i<L.size() && j<R.size()) {
    if (L[i] <= R[j]) res.push_back(L[i++]);
    else res.push_back(R[j++]);
  }
  while (i<L.size()) res.push_back(L[i++]);
  while (j<R.size()) res.push_back(R[j++]);
  return res;
}
vector<int> mergeSort(vector<int> a) {
  if (a.size() <= 1) return a;
  size_t mid = a.size()/2;
  vector<int> left(a.begin(), a.begin()+mid);
  vector<int> right(a.begin()+mid, a.end());
  left = mergeSort(left);
  right = mergeSort(right);
  return mergeVec(left, right);
}`,
      py: `def merge_sort(arr):
  if len(arr) <= 1:
    return arr
  mid = len(arr) // 2
  left = merge_sort(arr[:mid])
  right = merge_sort(arr[mid:])
  return merge(left, right)

def merge(left, right):
  res = []
  i = j = 0
  while i < len(left) and j < len(right):
    if left[i] <= right[j]:
      res.append(left[i]); i += 1
    else:
      res.append(right[j]); j += 1
  return res + left[i:] + right[j:]`,
    },
    steps: [
      { explanation: "Split array into halves until size 1." },
      { explanation: "Merge two sorted halves into one." },
    ],
  },

  quickSort: {
  title: "Quick Sort Algorithm",
  description:
    "Pick a pivot, partition the array into smaller and larger elements, then recursively sort the partitions.",
  code: {
    js: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,

    java: `public static int[] quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
private static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
  }
  int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;
  return i + 1;
}`,

    cpp: `#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i+1], arr[high]);
  return i + 1;
}
void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,

    py: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[-1]
  left = [x for x in arr[:-1] if x <= pivot]
  right = [x for x in arr[:-1] if x > pivot]
  return quick_sort(left) + [pivot] + quick_sort(right)`
  },

  steps: [
    { explanation: "Choose a pivot (commonly last element)." },
    { explanation: "Partition array: smaller on left, larger on right." },
    { explanation: "Recursively apply Quick Sort on partitions." },
  ],
},


  binarySearch: {
    title: "Binary Search Algorithm",
    description:
      "Search in a sorted array by repeatedly halving the search space.",
    code: {
      js: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
  int l = 0, r = arr.length - 1;
  while (l <= r) {
    int m = (l + r) >>> 1;
    if (arr[m] == target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
  int l = 0, r = (int)arr.size() - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      py: `def binary_search(arr, target):
  l, r = 0, len(arr) - 1
  while l <= r:
    m = (l + r) // 2
    if arr[m] == target: return m
    if arr[m] < target: l = m + 1
    else: r = m - 1
  return -1`,
    },
    steps: [
      { explanation: "Compute middle index." },
      { explanation: "If middle < target, shift left bound up; else shift right bound down." },
    ],
  },

  linearSearch: {
    title: "Linear Search Algorithm",
    description:
      "Scan each element from left to right until you find the target.",
    code: {
      js: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i] === target) return i;
  return -1;
}`,
      java: `public static int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
  for (int i = 0; i < (int)arr.size(); i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      py: `def linear_search(arr, target):
  for i, x in enumerate(arr):
    if x == target: return i
  return -1`,
    },
    steps: [{ explanation: "Compare target with each element; return index on match." }],
  },

  jumpSearch: {
    title: "Jump Search Algorithm (sorted array)",
    description:
      "Jump by √n blocks to find a candidate range, then linearly scan within it.",
    code: {
      js: `function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (prev < n && arr[Math.min(step, n) - 1] < target) {
    prev = step; step += Math.floor(Math.sqrt(n));
  }
  for (let i = prev; i < Math.min(step, n); i++)
    if (arr[i] === target) return i;
  return -1;
}`,
      java: `public static int jumpSearch(int[] arr, int target) {
  int n = arr.length;
  int step = (int)Math.floor(Math.sqrt(n));
  int prev = 0;
  while (prev < n && arr[Math.min(step, n) - 1] < target) {
    prev = step; step += (int)Math.floor(Math.sqrt(n));
  }
  for (int i = prev; i < Math.min(step, n); i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      cpp: `#include <cmath>
#include <vector>
using namespace std;

int jumpSearch(const vector<int>& arr, int target) {
  int n = (int)arr.size();
  int step = (int)floor(sqrt(n));
  int prev = 0;
  while (prev < n && arr[min(step, n) - 1] < target) {
    prev = step; step += (int)floor(sqrt(n));
  }
  for (int i = prev; i < min(step, n); i++)
    if (arr[i] == target) return i;
  return -1;
}`,
      py: `import math
def jump_search(arr, target):
  n = len(arr)
  step = int(math.sqrt(n))
  prev = 0
  while prev < n and arr[min(step, n) - 1] < target:
    prev = step; step += int(math.sqrt(n))
  for i in range(prev, min(step, n)):
    if arr[i] == target: return i
  return -1`,
    },
    steps: [
      { explanation: "Jump ahead by √n until you pass or reach the target." },
      { explanation: "Linear scan within the identified block." },
    ],
  },

  exponentialSearch: {
    title: "Exponential Search Algorithm (sorted array)",
    description:
      "Find a range by growing the index exponentially, then binary-search within that range.",
    code: {
      js: `function exponentialSearch(arr, target) {
  if (arr.length === 0) return -1;
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) i *= 2;
  return binarySearchBounded(arr, target, Math.floor(i/2), Math.min(i, arr.length-1));
}
function binarySearchBounded(arr, target, l, r) {
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      java: `public static int exponentialSearch(int[] arr, int target) {
  if (arr.length == 0) return -1;
  if (arr[0] == target) return 0;
  int i = 1;
  while (i < arr.length && arr[i] <= target) i *= 2;
  return binarySearchBounded(arr, target, i/2, Math.min(i, arr.length - 1));
}
private static int binarySearchBounded(int[] arr, int target, int l, int r) {
  while (l <= r) {
    int m = (l + r) >>> 1;
    if (arr[m] == target) return m;
    if (arr[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

int binarySearchBounded(const vector<int>& a, int x, int l, int r) {
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    if (a[m] < x) l = m + 1; else r = m - 1;
  }
  return -1;
}
int exponentialSearch(const vector<int>& a, int x) {
  if (a.empty()) return -1;
  if (a[0] == x) return 0;
  int i = 1;
  while (i < (int)a.size() && a[i] <= x) i *= 2;
  return binarySearchBounded(a, x, i/2, min(i, (int)a.size()-1));
}`,
      py: `def exponential_search(arr, target):
  if not arr: return -1
  if arr[0] == target: return 0
  i = 1
  while i < len(arr) and arr[i] <= target:
    i *= 2
  return binary_search_bounded(arr, target, i//2, min(i, len(arr)-1))

def binary_search_bounded(arr, target, l, r):
  while l <= r:
    m = (l + r) // 2
    if arr[m] == target: return m
    if arr[m] < target: l = m + 1
    else: r = m - 1
  return -1`,
    },
    steps: [
      { explanation: "Grow index exponentially to bracket the target." },
      { explanation: "Binary search inside that bracket." },
    ],
  },
};

const CodeExplanation = ({ algorithm, isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [lang, setLang] = useState("js");
  const intervalRef = useRef(null);

  const currentAlgorithm = ALGO[algorithm];
  const codeForLang = currentAlgorithm?.code?.[lang] || "";
  const steps = currentAlgorithm?.steps || [];
  const totalSteps = steps.length;

  // derive highlight line
  const highlightLine = useMemo(() => {
    const snippet = steps[currentStep]?.highlight?.[lang];
    return computeHighlightLine(codeForLang, snippet);
  }, [codeForLang, currentStep, lang, steps]);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setIsPlaying(true);
    let step = currentStep;
    intervalRef.current = setInterval(() => {
      if (step < totalSteps - 1) {
        step++;
        setCurrentStep(step);
      } else {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
      }
    }, playbackSpeed);
  }, [isPlaying, currentStep, totalSteps, playbackSpeed]);

  // stop autoplay if lang changes
  useEffect(() => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [lang]);

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isVisible) return;
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prevStep();
          break;
        case "ArrowRight":
          nextStep();
          break;
        case " ":
          e.preventDefault();
          togglePlayback();
          break;
        case "r":
        case "R":
          resetSteps();
          break;
        default:
          break;
      }
    };
    if (isVisible) document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, onClose, prevStep, nextStep, togglePlayback, resetSteps]);

  if (!isVisible || !currentAlgorithm) return null;

  return (
    <div className="code-explanation-overlay">
      <div className="code-explanation-modal">
        {/* Header */}
        <div className="code-explanation-header">
          <h2>{currentAlgorithm.title}</h2>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="code-explanation-content">
          {/* Description */}
          <div className="algorithm-description">
            <p>{currentAlgorithm.description}</p>
          </div>

          {/* Language Tabs */}
          <div className="lang-tabs">
            {LANGS.map((L) => (
              <button
                key={L.key}
                onClick={() => setLang(L.key)}
                className={`lang-tab ${lang === L.key ? "active" : ""}`}
              >
                {L.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="code-section">
            <h3>Algorithm Code</h3>
            <div className="code-block">
              <pre>
                <code>
                  {codeForLang.split("\n").map((line, idx) => {
                    const lineNumber = idx + 1;
                    const isCurrentLine = highlightLine === lineNumber;
                    return (
                      <div
                        key={idx}
                        className={`code-line ${isCurrentLine ? "current-line" : ""}`}
                      >
                        <span className="line-number">{lineNumber}</span>
                        <span className="line-text">{line}</span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>
          </div>

          {/* Step Explanation */}
          <div className="step-explanation-section">
            <h3>Step-by-Step Explanation</h3>

            <div className="step-controls">
              <button onClick={prevStep} disabled={currentStep === 0}>
                ⏮ Prev
              </button>
              <button onClick={togglePlayback}>
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
              <button onClick={nextStep} disabled={currentStep === totalSteps - 1}>
                Next ⏭
              </button>
              <button onClick={resetSteps}>🔄 Reset</button>
            </div>

            {/* Playback Speed */}
            <div className="playback-speed">
              <label>Speed:</label>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
              />
              <span>{playbackSpeed} ms</span>
            </div>

            {/* Progress */}
            <div className="step-progress">
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: totalSteps
                      ? `${((currentStep + 1) / totalSteps) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

            {/* Current Step Box */}
            {steps[currentStep] && (
              <div className="current-step">
                <div className="step-header">
                  <span className="step-explanation">
                    {steps[currentStep].explanation}
                  </span>
                </div>
                {steps[currentStep]?.highlight?.[lang] && (
                  <div className="step-code">
                    <pre>
                      <code>{steps[currentStep].highlight[lang]}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="keyboard-shortcuts">
              ⌨️ <b>Shortcuts:</b> ← → Navigate | Space Play/Pause | R Reset | Esc Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExplanation;
