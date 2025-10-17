// Memory game component
import { useState, useEffect } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

export default function MemoryGame({ animal, onWin }) {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [lives, setLives] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize game with shuffled cards when the animal changes
  useEffect(() => {
    if (!animal) {
      setCards([]);
      return;
    }

    const images = Array.isArray(animal.images) ? animal.images : [];
    const cardPairs = [...images, ...images];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setLives(6);
    setIsGameOver(false);
  }, [animal]);

  // Handle card click
  const handleCardClick = (index) => {
    if (!cards[index] || flippedIndexes.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (flippedIndexes.length === 0) {
      setFlippedIndexes([index]);
      return;
    }

    const firstIndex = flippedIndexes[0];
    setFlippedIndexes([firstIndex, index]);

    // Check for match
    if (newCards[firstIndex].image === newCards[index].image) {
      const newMatchedPairs = [...matchedPairs, newCards[index].image];
      setMatchedPairs(newMatchedPairs);

      // Mark matched after brief delay
      setTimeout(() => {
        const updated = [...newCards];
        updated[firstIndex].isMatched = true;
        updated[index].isMatched = true;
        setCards(updated);
        setFlippedIndexes([]);
      }, 500);

      // Win condition: all pairs matched
      if (newMatchedPairs.length === (cards.length / 2)) {
        setTimeout(() => onWin && onWin(), 1000);
      }
      return;
    }

    // Not a match
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setIsGameOver(true);
      setTimeout(() => {
        const resetCards = cards.map(card => ({ ...card, isFlipped: false, isMatched: false }));
        setCards(resetCards);
        setLives(6);
        setFlippedIndexes([]);
        setMatchedPairs([]);
        setIsGameOver(false);
      }, 1500);
      return;
    }

    // Flip back after delay
    setTimeout(() => {
      const updated = [...newCards];
      if (updated[firstIndex]) updated[firstIndex].isFlipped = false;
      if (updated[index]) updated[index].isFlipped = false;
      setCards(updated);
      setFlippedIndexes([]);
    }, 1000);
  };

  return (
    <div className="memory-game">
      {!animal ? (
        <div className="no-animal">
          <p>No animal selected. Please go back to Play and choose an animal to begin.</p>
        </div>
      ) : (
        <>
          <div className="game-status">
            <div className="lives">Lives: {lives}</div>
            {isGameOver && <div className="game-over">Game Over! Resetting...</div>}
          </div>
          <div className="cards-grid">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                frontImage={card.image}
                onClick={() => handleCardClick(index)}
                animalName={animal.name}
                backImage={animal.backImage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

MemoryGame.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    backImage: PropTypes.string,
  }),
  onWin: PropTypes.func,
};