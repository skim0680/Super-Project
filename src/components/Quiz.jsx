import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Quiz({ animal }) {
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState({});
  const [showCollected, setShowCollected] = useState(false);

  // Function to shuffle array
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Quiz paragraph with blanks to fill
  const quizContent = {
    text: `The ${animal.name} is a fascinating animal. ${animal.description.split('.')[0]}. 
           These amazing creatures are currently threatened by _REASON_, 
           which is a serious concern for their survival. They are currently listed as _STATUS_. 
           Here's an interesting fact: _FACT_!`,
    blanks: {
      REASON: {
        options: shuffleArray([
          "Red Panda".reason,
          "Orangutan".reason,
          "Black Rhinoceros".reason,
          "African Penguin".reason,
          "Argentine Angelshark".reason,
          "Amur Leopard".reason
        ].filter(Boolean)),
        answer: animal.reason
      },
      STATUS: {
        options: shuffleArray([
          animal.status,
          'Vulnerable',
          'Critically Endangered',
          'Near Threatened'
        ].filter(Boolean)),
        answer: animal.status
      },
      FACT: {
        options: shuffleArray([
          animal.fact,
          'they are excellent swimmers',
          'they can camouflage their skin',
          'they communicate through ultrasonic sounds'
        ].filter(Boolean)),
        answer: animal.fact
      }
    }
  };

  function handleChange(blank, value) {
    setUserAnswers(prev => ({ ...prev, [blank]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allCorrect = Object.entries(quizContent.blanks).every(
      ([blank, { answer }]) => userAnswers[blank] === answer
    );

    if (allCorrect) {
      setShowCollected(true);
      // Save to collection
      const collectedAnimals = JSON.parse(localStorage.getItem('collectedAnimals') || '[]');
      const animalId = animal.id.toString(); // Convert ID to string for consistent storage
      if (!collectedAnimals.includes(animalId)) {
        collectedAnimals.push(animalId);
        localStorage.setItem('collectedAnimals', JSON.stringify(collectedAnimals));
      }
      // After showing collection popup, navigate to collection page
      setTimeout(() => {
        setShowCollected(false);
        navigate('/collection');
      }, 2000);
    }
  }

  // Split text into segments and create dropdowns for blanks
  const textSegments = quizContent.text.split(/(_[A-Z]+_)/).map((segment, index) => {
    if (segment.match(/_([A-Z]+)_/)) {
      const blank = segment.replace(/_/g, '');
      const { options } = quizContent.blanks[blank];
      return (
        <select
          key={index}
          value={userAnswers[blank] || ''}
          onChange={(e) => handleChange(blank, e.target.value)}
          className="quiz-select"
        >
          <option value="">Select...</option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    return <span key={index}>{segment}</span>;
  });

  return (
    <div className="quiz-container">
      <form onSubmit={handleSubmit}>
        <div className="quiz-paragraph">
          {textSegments}
        </div>
        <button 
          type="submit" 
          className="quiz-submit"
          disabled={Object.keys(userAnswers).length !== Object.keys(quizContent.blanks).length}
        >
          Submit
        </button>
      </form>

      {showCollected && (
        <>
          <div className="popup-overlay" />
          <div className="collection-popup">
            <h2>Congratulations!</h2>
                        <img src={animal.image} alt={animal.name} />
            <p>You've collected the {animal.name}!</p>
          </div>
        </>
      )}
    </div>
  );
}

Quiz.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    funFact: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};