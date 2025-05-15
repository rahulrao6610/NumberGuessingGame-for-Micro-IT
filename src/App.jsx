import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [target, setTarget] = useState(generateRandomNumber());
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const number = parseInt(guess);
    if (isNaN(number)) return;

    if (number === target) {
      setMessage('🎉 Correct! You guessed the number!');
      setShowConfetti(true);
    } else {
      setMessage(number > target ? 'Too high!' : 'Too low!');
      setAttempts((prev) => prev - 1);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const restartGame = () => {
    setGuess('');
    setTarget(generateRandomNumber());
    setMessage('');
    setAttempts(6);
    setShowConfetti(false);
    setShake(false);
  };

  const getMessageClass = () => {
    if (message.includes('Correct')) return 'success';
    if (message.includes('Too')) return 'error';
    return '';
  };

  useEffect(() => {
    if (attempts <= 0 && !showConfetti) {
      setMessage(`😞 You lost! The number was ${target}.`);
    }
  }, [attempts, showConfetti]);

  return (
    <div className={`container ${shake ? 'shake' : ''}`}>
      {showConfetti && <Confetti />}
      <h1>Number Guessing Game</h1>
      <p>Guess a number between 1 and 100</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={attempts <= 0 || showConfetti}
      />
      <button onClick={handleGuess} disabled={attempts <= 0 || showConfetti}>
        Submit
      </button>
      <div className={`result-message ${getMessageClass()}`}>{message}</div>
      <p>Attempts left: {attempts}</p>

      {/* Restart button appears only when game ends */}
      {(attempts <= 0 || showConfetti) && (
        <button className="restart-button" onClick={restartGame}>
          🔁 Restart Game
        </button>
      )}
    </div>
  );
  return (
  <div className="container">
    <h1>Number Guessing Game</h1>
    <p>Guess a number between 1 and 100</p>
    {/* ...rest of your component... */}
  </div>
);
}

export default App;
