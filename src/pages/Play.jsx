import { useState } from 'react';
import { ANIMALS } from '../utils/collection';
import MemoryGame from '../components/memoryGame';
import Quiz from '../components/Quiz';

export default function Play() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [startBlockedMessage, setStartBlockedMessage] = useState('');

  function startPlay() {
    // Use Red Panda for testing
    const redPanda = ANIMALS.find(animal => animal.name === "Red Panda");
    if (!redPanda) return;

    const collected = JSON.parse(localStorage.getItem('collectedAnimals') || '[]');
    const strIds = collected.map(String);
    const isCollected = strIds.includes(String(redPanda.id));

    if (isCollected) {
      setStartBlockedMessage(`You already collected ${redPanda.name}. Check your collection to learn more.`);
      setSelectedAnimal(null);
      setGameStarted(false);
      setShowQuiz(false);
      return;
    }

    setStartBlockedMessage('');
    setSelectedAnimal(redPanda);
    setGameStarted(true);
    setShowQuiz(false);
  }

  function handleGameWin() {
    setShowQuiz(true);
  }

  return (
    <div className="play-page">
      {!gameStarted ? (
        <div className="play-start">
          <h1>Play: Find the animal!</h1>
          <p className="lead">Match the cards to discover an animal! You have 6 lives - use them wisely!</p>
          <button className="btn-play" onClick={startPlay} aria-label="Start Play">
            Start Memory Game
          </button>
          {startBlockedMessage && (
            <div className="start-blocked">
              <p>{startBlockedMessage}</p>
              <a href="/collection" className="cta-button">Go to Collection</a>
            </div>
          )}
        </div>
      ) : showQuiz ? (
        <Quiz animal={selectedAnimal} />
      ) : (
        <MemoryGame animal={selectedAnimal} onWin={handleGameWin} />
      )}
    </div>
  );
}