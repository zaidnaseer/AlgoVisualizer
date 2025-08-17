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
        padding: '25px',
        margin: '20px auto',
        textAlign: 'center',
        maxWidth: '550px' 
    }}>
        <h3 style={{ color: '#66ccff', marginBottom: '10px', fontSize: '20px' }}>
            🎬 Export Visualization
        </h3>
        
        <p style={{ color: '#b8c5d1', fontSize: '14px', marginBottom: '25px' }}>
            {message}
        </p>

        {/* --- Main Controls Area --- */}
        <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '25px'
        }}>
            {/* START/STOP BUTTON (conditionally rendered) */}
            {!isRecording ? (
                <button
                    onClick={handleStartRecording}
                    className="btn" 
                    style={{ background: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    📹 Start Recording
                </button>
            ) : (
                <button
                    onClick={handleStopRecording}
                    className="btn"
                    style={{ background: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🛑 Stop Recording
                </button>
            )}

            {/* NESTED DIV FOR EXPORT BUTTONS */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleExportGIF}
                    disabled={frameCount === 0 || isRecording}
                    className="btn btn-secondary" // Assuming base classes
                    style={{ padding: '10px 20px', background: frameCount > 0 && !isRecording ? '#6c757d' : '#343a40', color: 'white', border: 'none', borderRadius: '8px', cursor: frameCount > 0 && !isRecording ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
                >
                    🎞️ Export GIF
                </button>

                <button
                    onClick={handleExportVideo}
                    disabled={frameCount === 0 || isRecording}
                    className="btn btn-secondary"
                    style={{ padding: '10px 20px', background: frameCount > 0 && !isRecording ? '#6c757d' : '#343a40', color: 'white', border: 'none', borderRadius: '8px', cursor: frameCount > 0 && !isRecording ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
                >
                    🎥 Export Video
                </button>
            </div>
        </div>

        {/* --- Instructions --- */}
        <div style={{ color: '#b8c5d1', fontSize: '13px', textAlign: 'left', maxWidth: '380px', margin: '0 auto' }}>
            <p style={{fontWeight: 'bold'}}>📝 Instructions:</p>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.6', margin: '5px 0 0 0' }}>
                <li>Click "Start Recording" before running your algorithm.</li>
                <li>Run the sorting/searching algorithm.</li>
                <li>Click "Stop Recording" when done.</li>
                <li>Export as GIF or Video format.</li>
            </ol>
        </div>
    </div>
);
};

export default SimpleExportControls;
