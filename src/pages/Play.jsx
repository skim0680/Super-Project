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
    // Build list of eligible animals: at least 6 images and not already collected
    // Merge both possible storage keys so we don't miss previously stored values
    const collectedA = JSON.parse(localStorage.getItem('collectedAnimals') || '[]');
    const collectedB = JSON.parse(localStorage.getItem('animalCollection') || '[]');
    console.log('collectedAnimals:', collectedA, 'animalCollection:', collectedB);
    const collectedSet = new Set([...
      (Array.isArray(collectedA) ? collectedA.map(String) : []),
      (Array.isArray(collectedB) ? collectedB.map(String) : [])
    ].flat());

    const eligible = ANIMALS.filter(animal => {
      // defensive checks
      if (!animal) return false;
      if (!Array.isArray(animal.images)) return false;
      if (animal.images.length < 6) return false;
      if (collectedSet.has(String(animal.id))) return false;
      return true;
    });

    if (eligible.length === 0) {
      console.log('Eligible animals:', eligible);
      setStartBlockedMessage('No eligible animals are available to play — either none have enough images or you have already collected them. Check your collection or add more animals.');
      setSelectedAnimal(null);
      setGameStarted(false);
      setShowQuiz(false);
      return;
    }

  console.log('Eligible for play:', eligible.map(a => a.name));
  // Pick a random eligible animal
    const picked = eligible[Math.floor(Math.random() * eligible.length)];
    setStartBlockedMessage('');
    setSelectedAnimal(picked);
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