import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { insertionSort } from '../algorithms/insertionSort';
import '../styles/pages.css';

const Sorting = () => {
    const [array, setArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('Ready to sort!');
    const [delay, setDelay] = useState(100);
    const [algorithm, setAlgorithm] = useState('bubbleSort');
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(20);

    useEffect(() => {
        const generateNewArray = () => {
            const randomArray = Array.from({ length: arraySize }, () => 
                Math.floor(Math.random() * 300) + 10
            );
            setArray(randomArray);
            setColorArray(new Array(arraySize).fill('#66ccff'));
            setMessage('New array generated. Ready to sort!');
            setIsSorting(false);
        };
        generateNewArray();
    }, [arraySize]);

    const generateArray = () => {
        const randomArray = Array.from({ length: arraySize }, () => 
            Math.floor(Math.random() * 300) + 10
        );
        setArray(randomArray);
        setColorArray(new Array(arraySize).fill('#66ccff'));
        setMessage('New array generated. Ready to sort!');
        setIsSorting(false);
    };

    const handleSort = async () => {
        setIsSorting(true);
        setMessage(`Sorting with ${getAlgorithmName()} algorithm...`);
        
        let result = -1;
        switch (algorithm) {
            case 'selectionSort':
                result = await selectionSort(array, setColorArray, delay);
                break;
            case 'mergeSort':
                result = await mergeSort(array, setColorArray, delay);
                break;
            case 'insertionSort':
                result = await insertionSort(array, setColorArray, delay);
                break;
            default:
                result = await bubbleSort(array, setColorArray, delay);
                break;
        }

        if (result === -1) {
            setMessage('Sorting failed or was interrupted');
        } else {
            setMessage('🎉 Sorting completed successfully!');
            // Highlight all bars as sorted
            setColorArray(new Array(arraySize).fill('#4ade80'));
        }
        setIsSorting(false);
    };

    const handleStop = () => {
        setIsSorting(false);
        setMessage('Sorting stopped');
        setColorArray(new Array(arraySize).fill('#66ccff'));
    };

    const getAlgorithmName = () => {
        const names = {
            'bubbleSort': 'Bubble Sort',
            'selectionSort': 'Selection Sort',
            'mergeSort': 'Merge Sort',
            'insertionSort': 'Insertion Sort'
        };
        return names[algorithm];
    };

    const getAlgorithmInfo = () => {
        const info = {
            'bubbleSort': {
                description: 'Compares adjacent elements and swaps them if they are in wrong order.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n)',
                stable: 'Yes'
            },
            'selectionSort': {
                description: 'Finds the minimum element and places it at the beginning.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n²)',
                stable: 'No'
            },
            'mergeSort': {
                description: 'Divides array into halves, sorts them and merges back.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                bestCase: 'O(n log n)',
                stable: 'Yes'
            },
            'insertionSort': {
                description: 'Builds sorted array one element at a time.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n)',
                stable: 'Yes'
            }
        };
        return info[algorithm];
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Sorting Algorithms Visualizer</h1>
            
            {/* Controls Section */}
            <div className="controls-section">
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="btn" onClick={handleSort} disabled={isSorting}>
                        {isSorting ? 'Sorting...' : 'Start Sort'}
                    </button>
                    <button className="btn btn-secondary" onClick={generateArray} disabled={isSorting}>
                        Generate Array
                    </button>
                    <button className="btn btn-secondary" onClick={handleStop} disabled={!isSorting}>
                        Stop
                    </button>
                </div>
                
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', marginTop: '15px' }}>
                    <label className="label">Array Size:</label>
                    <input 
                        type="range" 
                        min="10" 
                        max="50" 
                        value={arraySize}
                        onChange={(e) => setArraySize(parseInt(e.target.value))}
                        disabled={isSorting}
                        className="input"
                        style={{ width: '150px' }}
                    />
                    <span style={{ color: '#66ccff', fontWeight: '600' }}>{arraySize}</span>
                    
                    <label className="label" style={{ marginLeft: '20px' }}>Speed:</label>
                    <input 
                        type="range" 
                        min="10" 
                        max="500" 
                        value={delay}
                        onChange={(e) => setDelay(parseInt(e.target.value))}
                        disabled={isSorting}
                        className="input"
                        style={{ width: '150px' }}
                    />
                    <span style={{ color: '#66ccff', fontWeight: '600' }}>{delay}ms</span>
                </div>
            </div>

            {/* Algorithm Selection */}
            <div className="controls-section">
                <h3 style={{ color: '#66ccff', marginBottom: '15px', fontFamily: 'Poppins, sans-serif' }}>
                    Select Algorithm:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {['bubbleSort', 'selectionSort', 'mergeSort', 'insertionSort'].map((algo) => (
                        <button
                            key={algo}
                            className={algorithm === algo ? 'btn' : 'btn btn-secondary'}
                            onClick={() => setAlgorithm(algo)}
                            disabled={isSorting}
                            style={{
                                background: algorithm === algo ? 
                                    'linear-gradient(45deg, #66ccff, #4da6ff)' : 
                                    'rgba(255, 255, 255, 0.1)',
                                color: algorithm === algo ? '#1a1a2e' : '#e0e6ed'
                            }}
                        >
                            {getAlgorithmName()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Message */}
            <div className="status-message">
                {message}
            </div>

            {/* Visualization Area */}
            <div className="visualization-area" style={{ minHeight: '400px', padding: '20px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-end', 
                    height: '350px',
                    gap: '2px',
                    overflowX: 'auto',
                    padding: '10px'
                }}>
                    {array.map((num, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: `${num}px`,
                                width: `${Math.max(20, 400 / arraySize)}px`,
                                backgroundColor: colorArray[idx],
                                border: `1px solid ${colorArray[idx]}`,
                                borderRadius: '4px 4px 0 0',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                color: '#1a1a2e',
                                fontWeight: 'bold',
                                fontSize: arraySize > 30 ? '10px' : '12px',
                                padding: '2px',
                                transition: 'all 0.3s ease',
                                boxShadow: `0 2px 8px ${colorArray[idx]}40`,
                                position: 'relative'
                            }}
                        >
                            {arraySize <= 25 ? num : ''}
                            {arraySize <= 25 && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    fontSize: '10px',
                                    color: '#b8c5d1'
                                }}>
                                    {idx}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Algorithm Information */}
            <div className="algorithm-info">
                <h3>{getAlgorithmName()} - Algorithm Details</h3>
                <p>{getAlgorithmInfo().description}</p>
                
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Time Complexity:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().timeComplexity}</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Space Complexity:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().spaceComplexity}</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Best Case:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().bestCase}</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Stable:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().stable}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sorting;