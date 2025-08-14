import React, { useState, useEffect } from 'react';
import { binarySearch } from '../algorithms/binarySearch';
import { exponentialSearch } from '../algorithms/exponentialSearch';
import { linearSearch } from '../algorithms/linearSearch';
import { jumpSearch } from '../algorithms/jumpSearch';
import SimpleExportControls from '../components/SimpleExportControls';
import '../styles/App.css'; // Import the merged CSS file

const Searching = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('Generate an array to start searching!');
    const [delay] = useState(500);
    const [algorithm, setAlgorithm] = useState('binarySearch');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 99) + 1);
        const sortedArray = randomArray.sort((a, b) => a - b);
        console.log('Generated array:', sortedArray); // Debug log
        setArray(sortedArray);
        setColorArray(new Array(20).fill('#66ccff'));
        setMessage(`New array generated with ${sortedArray.length} numbers. Ready to search!`);
    };

    const handleSearch = async () => {
        const targetValue = parseInt(target, 10);
        if (isNaN(targetValue)) {
            setMessage('Please enter a valid number');
            return;
        }

        setIsSearching(true);
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
        setIsSearching(false);
    };

    return (
        <div className="page-container" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh'
        }}>
            <h1 className="page-title" style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: '3em',
                fontFamily: 'Dancing Script, cursive',
                color: '#66ccff'
            }}>
                Searching Algorithms Visualizer
            </h1>
            
            {/* Main Controls */}
            <div style={{ 
                display: 'flex', 
                gap: '20px', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ color: '#66ccff', fontWeight: '600' }}>
                        Target Value:
                    </label>
                    <input
                        type="number"
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                        style={{
                            padding: '10px 15px',
                            borderRadius: '20px',
                            border: '1px solid #66ccff',
                            background: 'rgba(102, 204, 255, 0.1)',
                            color: '#ffffff',
                            fontSize: '14px',
                            outline: 'none',
                            width: '120px'
                        }}
                        placeholder="Enter number"
                    />
                </div>
                
                <button 
                    onClick={handleSearch} 
                    disabled={isSearching}
                    style={{
                        background: 'linear-gradient(45deg, #66ccff, #4da6ff)',
                        color: '#1a1a2e',
                        fontWeight: 'bold',
                        padding: '14px 32px',
                        fontSize: '14px',
                        borderRadius: '25px',
                        border: 'none',
                        cursor: isSearching ? 'not-allowed' : 'pointer',
                        opacity: isSearching ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '140px',
                        justifyContent: 'center'
                    }}
                >
                    {isSearching ? '🔍 Searching...' : '🔍 Search'}
                </button>
                
                <button 
                    onClick={generateArray} 
                    disabled={isSearching}
                    style={{
                        background: 'rgba(102, 204, 255, 0.2)',
                        color: '#66ccff',
                        border: '1px solid #66ccff',
                        fontWeight: 'bold',
                        padding: '14px 32px',
                        fontSize: '14px',
                        borderRadius: '25px',
                        cursor: isSearching ? 'not-allowed' : 'pointer',
                        opacity: isSearching ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '170px',
                        justifyContent: 'center'
                    }}
                >
                    🔄 Generate Array
                </button>
            </div>
            
            {/* Export Controls */}
            <SimpleExportControls />
            
            {/* Algorithm Selection */}
            <div style={{ 
                width: '100%', 
                maxWidth: '900px',
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <h3 style={{ 
                    color: '#66ccff', 
                    marginBottom: '20px', 
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px'
                }}>
                    Select Algorithm:
                </h3>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '15px',
                    justifyContent: 'center',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    {[
                        { key: 'binarySearch', name: 'Binary Search' },
                        { key: 'linearSearch', name: 'Linear Search' },
                        { key: 'jumpSearch', name: 'Jump Search' },
                        { key: 'exponentialSearch', name: 'Exponential Search' }
                    ].map((algo) => (
                        <button
                            key={algo.key}
                            onClick={() => setAlgorithm(algo.key)}
                            disabled={isSearching}
                            style={{
                                background: algorithm === algo.key ? 
                                    'linear-gradient(45deg, #66ccff, #4da6ff)' : 
                                    'rgba(255, 255, 255, 0.1)',
                                color: algorithm === algo.key ? '#1a1a2e' : '#e0e6ed',
                                border: algorithm === algo.key ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                                padding: '12px 20px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: isSearching ? 'not-allowed' : 'pointer',
                                opacity: isSearching ? 0.7 : 1,
                                transition: 'all 0.3s ease',
                                minWidth: '160px',
                                height: '45px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}
                        >
                            {algo.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Message */}
            {message && (
                <div style={{ 
                    padding: '15px 30px', 
                    background: 'rgba(102, 204, 255, 0.1)', 
                    borderRadius: '15px',
                    border: '1px solid rgba(102, 204, 255, 0.3)',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#66ccff',
                    margin: '0 0 30px 0',
                    maxWidth: '600px',
                    width: '100%'
                }}>
                    {message}
                </div>
            )}

            {/* Visualization Area */}
            <div id="search-visualization-container" style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(15, 52, 96, 0.1)',
                borderRadius: '15px',
                border: '1px solid rgba(102, 204, 255, 0.2)',
                minHeight: '80px',
                flexWrap: 'wrap'
            }}>
                {array.length === 0 ? (
                    <div style={{ 
                        color: '#66ccff', 
                        fontSize: '16px',
                        textAlign: 'center',
                        width: '100%',
                        padding: '20px'
                    }}>
                        Click "Generate Array" to create numbers for searching
                    </div>
                ) : (
                    array.map((num, idx) => (
                        <div
                            key={idx}
                            style={{ 
                                backgroundColor: colorArray[idx] || '#66ccff',
                                color: '#000000',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                minWidth: '60px',
                                textAlign: 'center',
                                border: '2px solid #4da6ff',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {num}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Searching;