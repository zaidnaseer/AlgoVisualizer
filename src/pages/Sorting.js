import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { insertionSort } from '../algorithms/insertionSort';
import '../styles/App.css'; // Import the merged CSS file

const Sorting = () => {
    const [array, setArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('');
    const [delay, setDelay] = useState(100); // Reduced delay to increase speed
    const [algorithm, setAlgorithm] = useState('bubbleSort');
    const [isSorting, setIsSorting] = useState(false); // New state to manage sorting process

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
        setArray(randomArray);
        setColorArray(new Array(20).fill('lightgrey'));
        setMessage('');
        setIsSorting(false); // Reset sorting state
    };

    const handleSort = async () => {
        setIsSorting(true); // Set sorting state to true
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
            setMessage('Sorting failed');
        } else {
            setMessage('Sorting completed');
        }
        setIsSorting(false); // Reset sorting state
    };

    const handleStop = () => {
        setIsSorting(false); // Stop the sorting process
        setMessage('Sorting stopped');
    };

    return (
        <div className="sorting-container">
            <h2>Sorting Algorithms</h2>
            <div className="sorting-controls">
                <button className="sorting-button" onClick={handleSort} disabled={isSorting}>Sort</button>
                <button className="sorting-button" onClick={generateArray} disabled={isSorting}>Generate New Array</button>
                <button className="sorting-button" onClick={handleStop} disabled={!isSorting}>Stop</button>
            </div>
            <div className="sorting-algorithm-selection">
                <button
                    className="sorting-button"
                    onClick={() => setAlgorithm('bubbleSort')}
                    style={{
                        backgroundColor: algorithm === 'bubbleSort' ? 'lightblue' : 'white',
                    }}
                    disabled={isSorting}
                >
                    Bubble Sort
                </button>
                <button
                    className="sorting-button"
                    onClick={() => setAlgorithm('selectionSort')}
                    style={{
                        backgroundColor: algorithm === 'selectionSort' ? 'lightblue' : 'white',
                    }}
                    disabled={isSorting}
                >
                    Selection Sort
                </button>
                <button
                    className="sorting-button"
                    onClick={() => setAlgorithm('mergeSort')}
                    style={{
                        backgroundColor: algorithm === 'mergeSort' ? 'lightblue' : 'white',
                    }}
                    disabled={isSorting}
                >
                    Merge Sort
                </button>
                <button
                    className="sorting-button"
                    onClick={() => setAlgorithm('insertionSort')}
                    style={{
                        backgroundColor: algorithm === 'insertionSort' ? 'lightblue' : 'white',
                    }}
                    disabled={isSorting}
                >
                    Insertion Sort
                </button>
            </div>
            <div className="sorting-array-container">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className="sorting-array-bar"
                        style={{
                            height: `${num}px`,
                            backgroundColor: colorArray[idx],
                        }}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Sorting;