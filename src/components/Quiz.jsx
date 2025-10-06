import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Quiz({ animal }) {
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState({});
  const [showCollected, setShowCollected] = useState(false);

  // Quiz paragraph with blanks to fill
  const quizContent = {
    text: `The ${animal.name} is a fascinating animal that lives in _HABITAT_. 
           These amazing creatures are currently threatened by _THREAT_, 
           which is a serious concern for their survival. 
           Here's an interesting fact: _FACT_!`,
    blanks: {
      HABITAT: {
        options: ['the eastern Himalayas', 'the African savanna', 'the Amazon rainforest', 'the Arctic tundra'],
        answer: animal.habitat || 'the eastern Himalayas'
      },
      THREAT: {
        options: ['habitat loss', 'climate change', 'predation', 'disease'],
        answer: animal.threat || 'habitat loss'
      },
      FACT: {
        options: ['they spend most of their time in trees', 'they can swim underwater', 'they glow in the dark', 'they hibernate in winter'],
        answer: animal.fact || 'they spend most of their time in trees'
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
      if (!collectedAnimals.includes(animal.id)) {
        collectedAnimals.push(animal.id);
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
            <img src={`/animals/${animal.id}.jpg`} alt={animal.name} />
            <p>You've collected the {animal.name}!</p>
          </div>
        </>
      )}
    </div>
  );
}

Quiz.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    habitat: PropTypes.string,
    threat: PropTypes.string,
    fact: PropTypes.string,
  }).isRequired,
};