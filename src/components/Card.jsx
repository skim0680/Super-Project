// Card component removed — stub to satisfy any imports.
import PropTypes from 'prop-types';

export default function Card({ isFlipped, frontImage, onClick, isMatched, animalName, backImage }) {
  const cardBackImage = backImage || '/animals/cardback.jpg';

  return (
    <div 
      className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={!isMatched ? onClick : undefined}
    >
      <div className="card-inner">
        <div className="card-front">
          <img 
            src={frontImage} 
            alt={`${animalName} card`}
            onError={(e) => {
              console.error(`Failed to load image: ${frontImage}`);
              e.target.src = cardBackImage;
            }}
          />
        </div>
        <div className="card-back">
          <img src={cardBackImage} alt="Card back" />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  isFlipped: PropTypes.bool.isRequired,
  frontImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isMatched: PropTypes.bool.isRequired,
  animalName: PropTypes.string.isRequired,
  backImage: PropTypes.string
};
