import { useState } from 'react';
import { ANIMALS } from '../utils/collection';
import MemoryGame from '../components/memoryGame';
import Quiz from '../components/Quiz';

export default function Play() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  function startPlay() {
    // Use Red Panda for testing
    const redPanda = ANIMALS.find(animal => animal.name === "Red Panda");
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
        </div>
      ) : showQuiz ? (
        <Quiz animal={selectedAnimal} />
      ) : (
        <MemoryGame animal={selectedAnimal} onWin={handleGameWin} />
      )}
    </div>
  );
}