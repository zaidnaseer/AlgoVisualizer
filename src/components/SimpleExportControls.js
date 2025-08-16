import React, { useState } from 'react';
import SimpleVisualizationExporter from '../utils/simpleExporter';

const SimpleExportControls = () => {
    const [exporter] = useState(() => new SimpleVisualizationExporter());
    const [isRecording, setIsRecording] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [message, setMessage] = useState('Ready to record');

    const handleStartRecording = () => {
        setMessage('Recording started...');
        setIsRecording(true);
        setFrameCount(0);

        exporter.startRecording(500); // Capture every 500ms

        // Update frame count periodically
        const updateInterval = setInterval(() => {
            setFrameCount(exporter.frames.length);
        }, 500);

        // Store interval for cleanup
        exporter.updateInterval = updateInterval;
    };

    const handleStopRecording = () => {
        if (exporter.updateInterval) {
            clearInterval(exporter.updateInterval);
        }

        const totalFrames = exporter.stopRecording();
        setIsRecording(false);
        setFrameCount(totalFrames);
        setMessage(`Recording stopped. ${totalFrames} frames captured.`);
    };

    const handleExportGIF = () => {
        setMessage('Creating GIF...');
        exporter.exportAsGIF();
        setMessage('GIF exported successfully!');
    };

    const handleExportVideo = () => {
        setMessage('Creating Video...');
        exporter.exportAsVideo();
        setMessage('Video exported successfully!');
    };

    return (
        <div style={{
            background: 'rgba(15, 52, 96, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 204, 255, 0.2)',
            padding: '20px',
            margin: '20px 0',
            textAlign: 'center'
        }}>
            <h3 style={{ color: '#66ccff', marginBottom: '20px' }}>
                Export Visualization
            </h3>

            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#ffffff', margin: '10px 0' }}>
                    {message}
                </p>
                {frameCount > 0 && (
                    <p style={{ color: '#66ccff', fontSize: '14px' }}>
                        Frames captured: {frameCount}
                    </p>
                )}
            </div>

            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {!isRecording ? (
                    <button
                        onClick={handleStartRecording}
                        style={{
                            padding: '12px 24px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"></path></svg>
                        Start Recording
                    </button>
                ) : (
                    <button
                        onClick={handleStopRecording}
                        style={{
                            padding: '12px 24px',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path></svg>
                        Stop Recording
                    </button>
                )}

                <button
                    onClick={handleExportGIF}
                    disabled={frameCount === 0}
                    style={{
                        padding: '12px 24px',
                        background: frameCount > 0 ? '#66ccff' : '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M16 2L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44749 2 3.9985 2H16ZM15 4H5V20H19V8H15V4ZM13 10V15H12V10H13ZM11 10V11H9C8.44772 11 8 11.4477 8 12V13C8 13.5523 8.44772 14 9 14H10V13H9V12H11V14C11 14.5523 10.5523 15 10 15H9C7.89543 15 7 14.1046 7 13V12C7 10.8954 7.89543 10 9 10H11ZM17 10V11H15V12H17V13H15V15H14V10H17Z"></path></svg>
                    Export GIF
                </button>

                <button
                    onClick={handleExportVideo}
                    disabled={frameCount === 0}
                    style={{
                        padding: '12px 24px',
                        background: frameCount > 0 ? '#8e44ad' : '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M15 4V8H19V20H5V4H15ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM15.0008 11.667L10.1219 8.41435C10.0562 8.37054 9.979 8.34717 9.9 8.34717C9.6791 8.34717 9.5 8.52625 9.5 8.74717V15.2524C9.5 15.3314 9.5234 15.4086 9.5672 15.4743C9.6897 15.6581 9.9381 15.7078 10.1219 15.5852L15.0008 12.3326C15.0447 12.3033 15.0824 12.2656 15.1117 12.2217C15.2343 12.0379 15.1846 11.7895 15.0008 11.667Z"></path></svg>
                    Export Video
                </button>
            </div>

            <div style={{
                marginTop: '15px',
                fontSize: '12px',
                color: '#aaa',
                lineHeight: '1.4'
            }}>
                <p>📝 Instructions:</p>
                <p>1. Click "Start Recording" before running your algorithm</p>
                <p>2. Run the sorting/searching algorithm</p>
                <p>3. Click "Stop Recording" when done</p>
                <p>4. Export as GIF or Video format</p>
            </div>
        </div>
    );
};

export default SimpleExportControls;
