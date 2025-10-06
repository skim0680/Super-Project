import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ANIMALS, collectAnimal, isCollected } from '../utils/collection';
import Quiz from '../components/Quiz';

export default function AnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animalId = Number(id);

  const animal = useMemo(() => ANIMALS.find(a => a.id === animalId), [animalId]);
  if (!animal) return <div>Animal not found.</div>;

  function handleQuizComplete() {
    collectAnimal(animal.id);
    alert(`${animal.name} caught! It was added to your collection.`);
    navigate('/collection');
  }

  return (
    <div className="animal-page">
      <h1>{animal.name}</h1>
      <img src={animal.image} alt={animal.name} style={{maxWidth:300}} />
      <p><strong>Status:</strong> {animal.status}</p>
      <p>{animal.description}</p>

      {isCollected(animal.id) ? (
        <p>This animal is already in your collection.</p>
      ) : (
        <Quiz animal={animal} onComplete={handleQuizComplete} />
      )}
    </div>
  );
}
