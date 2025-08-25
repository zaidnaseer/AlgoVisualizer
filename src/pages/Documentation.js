import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Clock, Database, BookOpen, Zap, Users, Star } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import '../styles/Documentation.css';

// ============================================================================
// 1. STATIC DATA & HELPERS (DEFINED OUTSIDE THE COMPONENT)
// ============================================================================

// This static data is now defined only ONCE at the module level.
// It is not wrapped in useMemo because it never changes.
const algorithmDatabase = {
	sorting: {
        title: "Sorting Algorithms",
        icon: "🔄",
        color: "#66ccff",
        algorithms: [
            { name: "Bubble Sort", id: "bubbleSort", description: "Compares adjacent elements and swaps them if they are in wrong order.", timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, spaceComplexity: "O(1)", stability: "Stable", inPlace: true, implemented: true },
            { name: "Selection Sort", id: "selectionSort", description: "Finds the minimum element and places it at the beginning.", timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" }, spaceComplexity: "O(1)", stability: "Unstable", inPlace: true, implemented: true },
            { name: "Insertion Sort", id: "insertionSort", description: "Builds sorted array one element at a time.", timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, spaceComplexity: "O(1)", stability: "Stable", inPlace: true, implemented: true },
            { name: "Merge Sort", id: "mergeSort", description: "Divides array into halves, sorts them recursively, and merges back.", timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" }, spaceComplexity: "O(n)", stability: "Stable", inPlace: false, implemented: true },
            { name: "Quick Sort", id: "quickSort", description: "Selects a pivot and partitions array around it.", timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" }, spaceComplexity: "O(log n)", stability: "Unstable", inPlace: true, implemented: true }
        ]
    },
    searching: {
        title: "Search Algorithms",
        icon: "🔍",
        color: "#4ade80",
        algorithms: [
            { name: "Linear Search", id: "linearSearch", description: "Searches through array sequentially until target is found.", timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" }, spaceComplexity: "O(1)", dataRequirement: "None (works on unsorted data)", implemented: true },
            { name: "Binary Search", id: "binarySearch", description: "Searches sorted array by repeatedly dividing search interval in half.", timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" }, spaceComplexity: "O(1)", dataRequirement: "Sorted array", implemented: true },
        ]
    },
    dataStructures: {
        title: "Data Structures",
        icon: "🏗️",
        color: "#ffd93d",
        algorithms: [
            { name: "Linked List", id: "linkedList", description: "Linear data structure where elements are stored in nodes.", timeComplexity: { insertion: "O(1)", deletion: "O(1)", search: "O(n)", access: "O(n)" }, spaceComplexity: "O(n)", implemented: false },
            { name: "Stack", id: "stack", description: "Last-In-First-Out (LIFO) data structure.", timeComplexity: { push: "O(1)", pop: "O(1)", peek: "O(1)", search: "O(n)" }, spaceComplexity: "O(n)", implemented: false },
            { name: "Queue", id: "queue", description: "First-In-First-Out (FIFO) data structure.", timeComplexity: { enqueue: "O(1)", dequeue: "O(1)", front: "O(1)", search: "O(n)" }, spaceComplexity: "O(n)", implemented: false },
            { name: "Binary Tree", id: "binaryTree", description: "Hierarchical data structure where each node has at most two children.", timeComplexity: { insertion: "O(log n)", deletion: "O(log n)", search: "O(log n)", traversal: "O(n)" }, spaceComplexity: "O(n)", implemented: false }
        ]
    }
};

const getComplexityColor = (complexity) => {
    const colors = {
        'O(1)': '#4ade80',
        'O(log n)': '#66ccff',
        'O(n)': '#ffd93d',
        'O(n log n)': '#ff9500',
        'O(n²)': '#ff6b6b',
        'O(√n)': '#a78bfa'
    };
    return colors[complexity] || '#e0e6ed';
};

// ============================================================================
// 2. SUB-COMPONENTS (DEFINED OUTSIDE THE MAIN COMPONENT)
// ============================================================================

const AlgorithmCard = ({ algorithm, themeStyles }) => (
    <div 
        className="algorithm-card" // Use classes for styling
        title={algorithm.description}
    >
        <div className="card-header">
            <div>
                <div className="card-title-group">
                    <span className="card-icon">{algorithm.categoryIcon}</span>
                    <h3 style={{ color: algorithm.categoryColor }}>{algorithm.name}</h3>
                </div>
                <div className="card-category-badge" style={{ background: `${algorithm.categoryColor}15`}}>
                    {algorithm.categoryTitle}
                </div>
            </div>
            {algorithm.implemented ? (
                <div className="implemented-badge">
                    <Star size={12} /> Implemented
                </div>
            ) : (
                <div className="comingsoon-badge">
                    Coming Soon
                </div>
            )}
        </div>
        <p className="card-description">{algorithm.description}</p>
        {/* Other card content here, styled with classes from your CSS file */}
    </div>
);


// ============================================================================
// 3. MAIN COMPONENT DEFINITION
// ============================================================================

const AlgorithmDocumentation = () => {
	const { theme } = useTheme();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);
    
	// This helper function can be defined inside since it depends on `algorithmDatabase`
    // Or wrapped in useCallback if it were passed to a memoized child.
	const getAllAlgorithms = () => {
		return Object.values(algorithmDatabase).flatMap(category => 
			category.algorithms.map(algo => ({
				...algo,
				categoryTitle: category.title,
				categoryIcon: category.icon,
				categoryColor: category.color
			}))
		);
	};

	useEffect(() => {
		let allAlgorithms = getAllAlgorithms();

		if (selectedCategory !== 'all') {
			allAlgorithms = allAlgorithms.filter(algo => algo.id.toLowerCase().includes(selectedCategory.toLowerCase()));
		}

		if (searchTerm) {
			const lowercasedFilter = searchTerm.toLowerCase();
			allAlgorithms = allAlgorithms.filter(algo =>
				algo.name.toLowerCase().includes(lowercasedFilter) ||
				algo.description.toLowerCase().includes(lowercasedFilter)
			);
		}

		setFilteredAlgorithms(allAlgorithms);
	}, [searchTerm, selectedCategory]);

    const categories = useMemo(() => [
        { key: 'all', label: 'All', icon: BookOpen, count: getAllAlgorithms().length },
		{ key: 'sorting', label: 'Sorting', icon: Users, count: algorithmDatabase.sorting.algorithms.length },
		{ key: 'searching', label: 'Searching', icon: Search, count: algorithmDatabase.searching.algorithms.length },
		{ key: 'dataStructures', label: 'Data Structures', icon: Database, count: algorithmDatabase.dataStructures.algorithms.length }
    ], []); 
	return (
		<div className="documentation-container">
            <div className="header">
                {/* Header content like title, stats, etc. */}
                <h1>Algorithm Documentation</h1>
            </div>

            <div className="filters-section">
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search algorithms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filters">
                    {categories.map(category => {
                        const IconComponent = category.icon;
                        const isActive = selectedCategory === category.key;
                        return (
                            <button
                                key={category.key}
                                className={`category-chip ${isActive ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.key)}
                            >
                                <IconComponent size={16} />
                                {category.label}
                                <span className="count-badge">{category.count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="results-grid">
                {filteredAlgorithms.length > 0 ? (
                    filteredAlgorithms.map(algorithm => (
                        <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
                    ))
                ) : (
                    <div className="no-results">
                        <Search size={48} />
                        <h3>No algorithms found</h3>
                        <p>Try adjusting your search terms or filters.</p>
                    </div>
                )}
            </div>

            <footer className="documentation-footer">
                {/* Your legend and complexity guide JSX */}
            </footer>
		</div>
	);
};

export default AlgorithmDocumentation;