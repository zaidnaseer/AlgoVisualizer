import React, { useState } from 'react';
import SimpleVisualizationExporter from '../utils/simpleExporter';

const SimpleExportControls = () => {
  const [exporter] = useState(() => new SimpleVisualizationExporter());
  const [isRecording, setIsRecording] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [message, setMessage] = useState('Ready to record');

  const handleStartRecording = () => {
    setMessage('Recording...');
    setIsRecording(true);
    setFrameCount(0);

    exporter.startRecording(500); // Capture every 500ms

    const updateInterval = setInterval(() => {
      setFrameCount(exporter.frames.length);
    }, 500);
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
    setMessage('Creating video...');
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
      <h3 style={{ color: '#66ccff', marginBottom: '10px' }}>Export Visualization</h3>
      <p style={{ color: '#e0e6ed', margin: '6px 0 14px 0' }}>{message}</p>
      {frameCount > 0 && (
        <p style={{ color: '#66ccff', fontSize: '14px', marginTop: 0 }}>Frames captured: {frameCount}</p>
      )}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px' }}>
        {!isRecording ? (
          <button
            className="btn"
            onClick={handleStartRecording}
            style={{ background: '#28a745', color: '#fff' }}
          >
            Start Recording
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={handleStopRecording}
            style={{ background: '#dc3545', color: '#fff' }}
          >
            Stop Recording
          </button>
        )}

        <button
          className="btn btn-secondary"
          onClick={handleExportGIF}
          disabled={frameCount === 0}
          aria-disabled={frameCount === 0}
        >
          Export GIF
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleExportVideo}
          disabled={frameCount === 0}
          aria-disabled={frameCount === 0}
        >
          Export Video
        </button>
      </div>

      <div style={{ marginTop: '14px', fontSize: '12px', color: '#aaa', lineHeight: 1.4 }}>
        <div>Instructions:</div>
        <div>1. Click "Start Recording" before running your algorithm</div>
        <div>2. Run the sorting/searching algorithm</div>
        <div>3. Click "Stop Recording" when done</div>
        <div>4. Export as GIF or Video format</div>
      </div>
    </div>
  );
};

export default SimpleExportControls;
