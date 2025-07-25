import React, { useState } from 'react';
import '../styles/pages.css';

function DataStructures() {
    const [selectedStructure, setSelectedStructure] = useState('linkedlist');

    const dataStructures = {
        linkedlist: {
            title: 'Linked List',
            description: 'A linear data structure where elements are stored in nodes, and each node contains data and a reference to the next node.',
            timeComplexity: {
                insertion: 'O(1)',
                deletion: 'O(1)',
                search: 'O(n)',
                access: 'O(n)'
            },
            spaceComplexity: 'O(n)',
            useCases: [
                'Dynamic memory allocation',
                'Implementation of other data structures',
                'Undo functionality in applications',
                'Music playlist management'
            ]
        },
        stack: {
            title: 'Stack',
            description: 'A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (top).',
            timeComplexity: {
                push: 'O(1)',
                pop: 'O(1)',
                peek: 'O(1)',
                search: 'O(n)'
            },
            spaceComplexity: 'O(n)',
            useCases: [
                'Function call management',
                'Expression evaluation',
                'Browser history',
                'Undo/Redo operations'
            ]
        },
        queue: {
            title: 'Queue',
            description: 'A First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front.',
            timeComplexity: {
                enqueue: 'O(1)',
                dequeue: 'O(1)',
                front: 'O(1)',
                search: 'O(n)'
            },
            spaceComplexity: 'O(n)',
            useCases: [
                'CPU scheduling',
                'Breadth-First Search',
                'Print queue management',
                'Buffer for data streams'
            ]
        },
        tree: {
            title: 'Binary Tree',
            description: 'A hierarchical data structure where each node has at most two children, referred to as left and right child.',
            timeComplexity: {
                insertion: 'O(log n)',
                deletion: 'O(log n)',
                search: 'O(log n)',
                traversal: 'O(n)'
            },
            spaceComplexity: 'O(n)',
            useCases: [
                'Database indexing',
                'File system organization',
                'Expression parsing',
                'Decision making algorithms'
            ]
        }
    };

    const currentStructure = dataStructures[selectedStructure];

    return (
        <div className="page-container">
            <h1 className="page-title">Data Structures Visualizer</h1>
            
            <div className="controls-section">
                <label className="label">Select Data Structure:</label>
                <select 
                    className="select" 
                    value={selectedStructure} 
                    onChange={(e) => setSelectedStructure(e.target.value)}
                >
                    <option value="linkedlist">Linked List</option>
                    <option value="stack">Stack</option>
                    <option value="queue">Queue</option>
                    <option value="tree">Binary Tree</option>
                </select>
                <button className="btn">Visualize</button>
                <button className="btn btn-secondary">Reset</button>
            </div>

            <div className="visualization-area">
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    fontSize: '4em',
                    color: '#66ccff'
                }}>
                    🏗️
                </div>
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: '20px',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#b8c5d1'
                }}>
                    <p>Data Structure visualization will appear here</p>
                    <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
                        Coming Soon - Interactive {currentStructure.title} visualization
                    </p>
                </div>
            </div>

            <div className="algorithm-info">
                <h3>{currentStructure.title}</h3>
                <p>{currentStructure.description}</p>
                
                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#66ccff', marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}>
                        Time Complexity:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {Object.entries(currentStructure.timeComplexity).map(([operation, complexity]) => (
                            <span key={operation} className="complexity-badge">
                                {operation}: {complexity}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#66ccff', marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}>
                        Space Complexity:
                    </h4>
                    <span className="complexity-badge">{currentStructure.spaceComplexity}</span>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#66ccff', marginBottom: '15px', fontFamily: 'Poppins, sans-serif' }}>
                        Common Use Cases:
                    </h4>
                    <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '10px'
                    }}>
                        {currentStructure.useCases.map((useCase, index) => (
                            <li key={index} style={{ 
                                padding: '10px 15px',
                                background: 'rgba(102, 204, 255, 0.1)',
                                borderRadius: '8px',
                                border: '1px solid rgba(102, 204, 255, 0.2)',
                                fontFamily: 'Poppins, sans-serif',
                                color: '#e0e6ed',
                                position: 'relative',
                                paddingLeft: '30px'
                            }}>
                                <span style={{ 
                                    position: 'absolute',
                                    left: '10px',
                                    color: '#66ccff'
                                }}>•</span>
                                {useCase}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="status-message" style={{ 
                background: 'rgba(255, 193, 7, 0.1)',
                borderColor: 'rgba(255, 193, 7, 0.3)',
                color: '#ffc107'
            }}>
                🚧 Data Structure visualizations are coming soon! Stay tuned for interactive implementations.
            </div>
        </div>
    );
}

export default DataStructures;
