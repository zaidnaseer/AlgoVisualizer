import React, { useState, useEffect } from 'react';
import '../styles/Sorting.css'; // Corrected path
import { bubbleSort } from '../algorithms/bubbleSort';
import { mergeSort } from '../algorithms/mergeSort';
import { selectionSort } from '../algorithms/selectionSort';
import { insertionSort } from '../algorithms/insertionSort';

const Sorting = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const delay = 100; // Delay for sorting visualization

    // Function to generate a random array
    const generateArray = (length, min, max) => {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };

    // Function to create a new array when component mounts
    useEffect(() => {
        setArray(generateArray(15, 5, 50));
    }, []);

    // Function to reset the array
    const resetArray = () => {
        setArray(generateArray(15, 5, 50));
    };

    // Start sorting based on algorithm selected
    const startSorting = async (algorithm) => {
        if (isSorting) return; // Prevent starting multiple sorts at once
        setIsSorting(true);
        switch (algorithm) {
            case 'bubble':
                await bubbleSort(array, setArray, delay);
                break;
            case 'merge':
                await mergeSort(array, setArray, delay);
                break;
            case 'selection':
                await selectionSort(array, setArray, delay);
                break;
            case 'insertion':
                await insertionSort(array, setArray, delay);
                break;
            default:
                break;
        }
        setIsSorting(false);
    };

    return (
        <div className="container">
            <h1>Sorting Algorithm Visualization</h1>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{ height: `${value * 5}px` }}
                    ></div>
                ))}
            </div>
            <div className="controls">
                <button onClick={() => startSorting('bubble')} disabled={isSorting}>
                    Bubble Sort
                </button>
                <button onClick={() => startSorting('merge')} disabled={isSorting}>
                    Merge Sort
                </button>
                <button onClick={() => startSorting('selection')} disabled={isSorting}>
                    Selection Sort
                </button>
                <button onClick={() => startSorting('insertion')} disabled={isSorting}>
                    Insertion Sort
                </button>
                <button onClick={resetArray} disabled={isSorting}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Sorting;
