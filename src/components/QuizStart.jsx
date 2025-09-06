import React, { useState } from 'react';
import { FaPlay, FaClock, FaInfinity } from 'react-icons/fa6';
import QuizTopicSelection from './QuizTopicSelection';

const QuizStart = ({ 
  topics, 
  selectedTopic, 
  setSelectedTopic, 
  selectedDifficulty, 
  setSelectedDifficulty, 
  onStartQuiz 
}) => {
  const [timedMode, setTimedMode] = useState(false);

  const difficulties = [
    { id: 'easy', name: 'Easy', description: 'Basic concepts and simple problems' },
    { id: 'medium', name: 'Medium', description: 'Intermediate level questions' },
    { id: 'hard', name: 'Hard', description: 'Advanced problems and edge cases' },
    { id: 'all', name: 'Mixed', description: 'Questions from all difficulty levels' }
  ];

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  const handleDifficultySelect = (difficultyId) => {
    setSelectedDifficulty(difficultyId);
  };

  const handleStartQuiz = () => {
    if (!selectedTopic || !selectedDifficulty) {
      alert('Please select both a topic and difficulty level to start the quiz.');
      return;
    }
    onStartQuiz(selectedTopic, selectedDifficulty, timedMode);
  };

  const canStart = selectedTopic && selectedDifficulty;

  return (
    <div className="theme-card">
      {/* Topic Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 className="theme-card-header" style={{ textAlign: 'center' }}>Choose Your Topic</h3>
        <QuizTopicSelection topics={topics} selectedTopic={selectedTopic} onTopicSelect={setSelectedTopic} />
        <div className="quiz-options-grid" style={{ marginTop: '1rem' }}>
          <div
            className={`quiz-option-card ${selectedTopic === 'all' ? 'selected' : ''}`}
            onClick={() => setSelectedTopic('all')}
          >
            <h4>All Topics</h4>
            <p>Mixed questions from all algorithm categories for a comprehensive challenge.</p>
          </div>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 className="theme-card-header" style={{ textAlign: 'center' }}>Quiz Mode</h3>
        <div className="quiz-options-grid">
          <label className={`quiz-option-card ${!timedMode ? 'selected' : ''}`}>
            <input type="radio" name="quizMode" checked={!timedMode} onChange={() => setTimedMode(false)} style={{ display: 'none' }} />
            <FaInfinity size={24} style={{ color: 'var(--theme-accent)', marginBottom: '0.5rem' }} />
            <h4>Practice Mode</h4>
            <p>Take your time, no time limit</p>
          </label>
          <label className={`quiz-option-card ${timedMode ? 'selected' : ''}`}>
            <input type="radio" name="quizMode" checked={timedMode} onChange={() => setTimedMode(true)} style={{ display: 'none' }}/>
            <FaClock size={24} style={{ color: 'var(--theme-accent)', marginBottom: '0.5rem' }} />
            <h4>Timed Mode</h4>
            <p>1 minute per question</p>
          </label>
        </div>
      </div>

      {/* Quiz Mode Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 className="theme-card-header" style={{ textAlign: 'center' }}>Quiz Mode</h3>
        <div className="quiz-options-grid">
          <label className={`quiz-option-card ${!timedMode ? 'selected' : ''}`}>
            <input type="radio" name="quizMode" checked={!timedMode} onChange={() => setTimedMode(false)} style={{ display: 'none' }} />
            <FaInfinity size={24} style={{ color: 'var(--theme-accent)', marginBottom: '0.5rem' }} />
            <h4>Practice Mode</h4>
            <p>Take your time, no time limit</p>
          </label>
          <label className={`quiz-option-card ${timedMode ? 'selected' : ''}`}>
            <input type="radio" name="quizMode" checked={timedMode} onChange={() => setTimedMode(true)} style={{ display: 'none' }}/>
            <FaClock size={24} style={{ color: 'var(--theme-accent)', marginBottom: '0.5rem' }} />
            <h4>Timed Mode</h4>
            <p>1 minute per question</p>
          </label>
        </div>
      </div>

      {/* Quiz Controls: Show info line or Start button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {canStart ? (
          <button 
            className="btn btn-primary"
            onClick={handleStartQuiz}
          >
            <FaPlay />
            Start Quiz
          </button>
        ) : (
          <p style={{ color: 'var(--theme-text-secondary)' }}>Select a Topic & Difficulty to begin.</p>
        )}
      </div>
    </div>
  );
};

export default QuizStart;
