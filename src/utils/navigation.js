// Unified navigation structure for the entire application
export const headerNavigationItems = [
  { path: '/', label: 'Home', icon: null, group: 'main' },
  { path: '/sorting', label: 'Sorting', icon: 'FaCode', group: 'learn' },
  { path: '/searching', label: 'Searching', icon: 'FaSearch', group: 'learn' },
  { path: '/data-structures', label: 'Data Structures', icon: 'FaDatabase', group: 'learn' },
  { path: '/graph', label: 'Graph', icon: 'FaProjectDiagram', group: 'learn' },
  { path: '/quiz', label: 'Quiz', icon: 'FaBrain', group: 'test' },
  { path: '/contributors', label: 'Contributors', icon: 'FaUsers', group: 'community' },
  { path: '/documentation', label: 'Documentation', icon: 'FaBook', group: 'help' }
];

export const navbarNavigationItems = [
  { path: "/", label: "Home", icon: "Home" },
  {
    label: "Sorting",
    icon: "BarChart3",
    dropdown: [
      { path: "/sorting", label: "Overview" },
      { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
    ],
  },
  {
    label: "Searching",
    icon: "Search",
    dropdown: [
      { path: "/searchingOverview", label: "Overview" },
      { path: "/searching", label: "Searching Algorithm" },
    ],
  },
  {
    label: "Data Structures",
    icon: "Database",
    dropdown: [
      { path: "/data-structures", label: "Overview" },
      { path: "/data-structures/linked-list", label: "Linked List" },
      { path: "/data-structures/queue", label: "Queue visualization" },
      { path: "/data-structures/stack", label: "Stack visualization" },
      { path: "/binary-tree", label: "Binary Tree visualization" },
    ],
  },
  {
    label: "Graph",
    icon: "GitBranch",
    dropdown: [
      { path: "/graph", label: "Overview" },
      { path: "/graph/bfs", label: "BFS" },
      { path: "/graph/dfs", label: "DFS" },
      { path: "/graph/dijkstra", label: "Dijkstra" },
      { path: "/graph/comparison", label: "Graph Comparison" },
    ],
  },
  {
    label: "Backtracking",
    icon: "BookOpen",
    dropdown: [
      { path: "/backtracking-overview", label: "Overview" },
      { path: "/backtracking", label: "Algorithms" },
    ],
  },
  {
    label: "Dynamic Programming",
    icon: "Cpu",
    dropdown: [
      { path: "/dp-overview", label: "Overview" },
      { path: "/dp", label: "Algorithms" },
    ],
  },
  {
    label: "Hashing",
    icon: "Hash",
    dropdown: [
      { path: "/hashing-overview", label: "Overview" },
      { path: "/hashing", label: "Algorithms" },
    ],
  },
  {
    label: "Greedy Algorithms",
    icon: "Zap",
    dropdown: [
      { path: "/greedy-overview", label: "Overview" },
      { path: "/greedy", label: "Algorithms" },
    ],
  },
  {
    label: "Divide & Conquer",
    icon: "Code",
    dropdown: [
      { path: "/dc-overview", label: "Overview" },
      { path: "/dc", label: "Algorithms" },
    ],
  },
  {
    label: "Trees",
    icon: "TreeDeciduous",
    dropdown: [
      { path: "/tree-overview", label: "Overview" },
      { path: "/tree", label: "Algorithms" },
    ],
  },
  {
    label: "Game Search",
    icon: "Gamepad",
    dropdown: [
      { path: "/game-search-overview", label: "Overview" },
      { path: "/game-search", label: "Algorithms" },
    ],
  },
  {
    label: "Branch & Bound",
    icon: "BookOpen",
    dropdown: [
      { path: "/branchbound-overview", label: "Overview" },
      { path: "/branchbound", label: "Algorithms" },
    ],
  },
  {
    label: "Strings",
    icon: "Type",
    dropdown: [
      { path: "/string-overview", label: "Overview" },
      { path: "/string", label: "Algorithms" },
    ],
  },
  { path: "/quiz", label: "Quiz", icon: "Trophy" },
  { path: "/settings", label: "Settings", icon: "Settings" },
];

// Helper function to get icon component names
export const getHeaderIconName = (icon) => icon;
export const getNavbarIconName = (icon) => icon;