import React, { useState, useEffect } from 'react';
import { binarySearch } from '../algorithms/binarySearch';
import { exponentialSearch } from '../algorithms/exponentialSearch';
import { linearSearch } from '../algorithms/linearSearch';
import { jumpSearch } from '../algorithms/jumpSearch';
import '../styles/App.css';

const Searching = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('');
    const [delay] = useState(500);
    const [algorithm, setAlgorithm] = useState('binarySearch');

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
        setArray(randomArray.sort((a, b) => a - b));
        setColorArray(new Array(20).fill('lightgrey'));
    };

    const handleSearch = async () => {
        const targetValue = parseInt(target, 10);
        if (isNaN(targetValue)) {
            setMessage('Please enter a valid number');
            return;
        }

        let result = -1;
        switch (algorithm) {
            case 'linearSearch':
                result = await linearSearch(array, targetValue, setColorArray, delay);
                break;
            case 'jumpSearch':
                result = await jumpSearch(array, targetValue, setColorArray, delay);
                break;
            case 'exponentialSearch':
                result = await exponentialSearch(array, targetValue, setColorArray, delay);
                break;
            default:
                result = await binarySearch(array, targetValue, setColorArray, delay);
                break;
        }

        if (result === -1) {
            setMessage('Value not found');
        } else {
            setMessage(`Value found at index ${result}`);
        }
    };

    return (
        <div className="searching-container">
            <h2>Searching Algorithms</h2>
            <div className="controls">
                <label htmlFor="target">Enter target value: </label>
                <input
                    type="number"
                    id="target"
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={generateArray}>Generate New Array</button>
            </div>
            <div className="algorithms">
                <label>
                    <input
                        type="radio"
                        value="binarySearch"
                        checked={algorithm === 'binarySearch'}
                        onChange={() => setAlgorithm('binarySearch')}
                    />
                    Binary Search
                </label>
                <label>
                    <input
                        type="radio"
                        value="linearSearch"
                        checked={algorithm === 'linearSearch'}
                        onChange={() => setAlgorithm('linearSearch')}
                    />
                    Linear Search
                </label>
                <label>
                    <input
                        type="radio"
                        value="jumpSearch"
                        checked={algorithm === 'jumpSearch'}
                        onChange={() => setAlgorithm('jumpSearch')}
                    />
                    Jump Search
                </label>
                <label>
                    <input
                        type="radio"
                        value="exponentialSearch"
                        checked={algorithm === 'exponentialSearch'}
                        onChange={() => setAlgorithm('exponentialSearch')}
                    />
                    Exponential Search
                </label>
            </div>
            <div className="array-container">
                {array.map((num, idx) => (
                    <div
                        key={idx}
                        className="array-bar"
                        style={{ backgroundColor: colorArray[idx] }}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Searching;
