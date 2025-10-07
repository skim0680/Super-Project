// Memory game completely removed per user request. Keep a tiny harmless stub so imports don't break.
import { useState, useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MemoryGame({ animal, onWin }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [lives, setLives] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize game with shuffled cards
  useEffect(() => {
    // Use the predefined images for the animal
    const images = animal.images;
    // Create pairs for all 6 images (total 12 cards)
    const cardPairs = [...images, ...images];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
  }, [animal]);

  // Handle card click
  const handleCardClick = (index) => {
    if (flippedIndexes.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (flippedIndexes.length === 0) {
      setFlippedIndexes([index]);
    } else {
      setFlippedIndexes([flippedIndexes[0], index]);
      
      // Check for match
      if (cards[flippedIndexes[0]].image === cards[index].image) {
        // Match found
        const newMatchedPairs = [...matchedPairs, cards[index].image];
        setMatchedPairs(newMatchedPairs);
        
        // Check for game win
        if (newMatchedPairs.length === 6) {
          // All pairs matched - win!
          setTimeout(() => {
            onWin();
          }, 1000);
        }
        
        // Reset flipped cards
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[flippedIndexes[0]].isMatched = true;
          updatedCards[index].isMatched = true;
          setCards(updatedCards);
          setFlippedIndexes([]);
        }, 500);
      } else {
        // No match
        const newLives = lives - 1;
        setLives(newLives);
        
        if (newLives === 0) {
          setIsGameOver(true);
          setTimeout(() => {
            // Reset game on game over
            const resetCards = cards.map(card => ({
              ...card,
              isFlipped: false,
              isMatched: false
            }));
            setCards(resetCards);
            setLives(6); // Reset to 6 lives
            setFlippedIndexes([]);
            setMatchedPairs([]);
            setIsGameOver(false);
          }, 1500);
        } else {
          // Flip cards back
          setTimeout(() => {
            const updatedCards = [...newCards];
            updatedCards[flippedIndexes[0]].isFlipped = false;
            updatedCards[index].isFlipped = false;
            setCards(updatedCards);
            setFlippedIndexes([]);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="memory-game">
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
    </div>
  );
}

MemoryGame.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    backImage: PropTypes.string,
  }).isRequired,
  onWin: PropTypes.func.isRequired,
};