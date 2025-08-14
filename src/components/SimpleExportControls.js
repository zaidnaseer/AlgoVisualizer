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
            background: 'rgba(15, 52, 96, 0.2)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 204, 255, 0.3)',
            padding: '25px',
            margin: '20px 0',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
        }}>
            <h3 style={{ 
                color: '#66ccff', 
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                🎬 Export Visualization
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ 
                    color: '#ffffff', 
                    margin: '10px 0',
                    fontSize: '14px'
                }}>
                    {message}
                </p>
                {frameCount > 0 && (
                    <p style={{ color: '#66ccff', fontSize: '12px' }}>
                        Frames captured: {frameCount}
                    </p>
                )}
            </div>

            <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '20px'
            }}>
                {!isRecording ? (
                    <button
                        onClick={handleStartRecording}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(102, 204, 255, 0.2)',
                            color: '#66ccff',
                            border: '1px solid #66ccff',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            minWidth: '140px',
                            justifyContent: 'center'
                        }}
                    >
                        🎬 Start Recording
                    </button>
                ) : (
                    <button
                        onClick={handleStopRecording}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(255, 107, 107, 0.2)',
                            color: '#ff6b6b',
                            border: '1px solid #ff6b6b',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            minWidth: '140px',
                            justifyContent: 'center'
                        }}
                    >
                        🛑 Stop Recording
                    </button>
                )}

                <button
                    onClick={handleExportGIF}
                    disabled={frameCount === 0}
                    style={{
                        padding: '10px 20px',
                        background: frameCount > 0 ? 'rgba(102, 204, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: frameCount > 0 ? '#66ccff' : '#888',
                        border: `1px solid ${frameCount > 0 ? '#66ccff' : '#888'}`,
                        borderRadius: '20px',
                        cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: '600',
                        fontSize: '12px',
                        opacity: frameCount > 0 ? 1 : 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        minWidth: '110px',
                        justifyContent: 'center'
                    }}
                >
                    📱 Export GIF
                </button>

                <button
                    onClick={handleExportVideo}
                    disabled={frameCount === 0}
                    style={{
                        padding: '10px 20px',
                        background: frameCount > 0 ? 'rgba(102, 204, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: frameCount > 0 ? '#66ccff' : '#888',
                        border: `1px solid ${frameCount > 0 ? '#66ccff' : '#888'}`,
                        borderRadius: '20px',
                        cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: '600',
                        fontSize: '12px',
                        opacity: frameCount > 0 ? 1 : 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        minWidth: '120px',
                        justifyContent: 'center'
                    }}
                >
                    🎥 Export Video
                </button>
            </div>

            <div style={{ 
                fontSize: '11px', 
                color: '#aaa',
                lineHeight: '1.4',
                textAlign: 'left'
            }}>
                <p style={{ margin: '0 0 5px 0', color: '#66ccff', textAlign: 'center' }}>📝 Instructions:</p>
                <p style={{ margin: '2px 0' }}>1. Click "Start Recording" before running your algorithm</p>
                <p style={{ margin: '2px 0' }}>2. Run the sorting/searching algorithm</p>
                <p style={{ margin: '2px 0' }}>3. Click "Stop Recording" when done</p>
                <p style={{ margin: '2px 0' }}>4. Export as GIF or Video format</p>
            </div>
        </div>
    );
};

export default SimpleExportControls;
