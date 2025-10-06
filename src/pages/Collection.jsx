import { useState, useEffect } from 'react';
import { ANIMALS } from '../utils/collection';

export default function Collection() {
    const [collection, setCollection] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const TOTAL_ANIMALS = ANIMALS.length;

    useEffect(() => {
        // Load collected animals from localStorage
        const collectedIds = JSON.parse(localStorage.getItem('collectedAnimals') || '[]');
        // Get full animal details for each collected ID
        const collectedAnimals = ANIMALS.filter(animal => collectedIds.includes(animal.id));
        setCollection(collectedAnimals);
    }, []);

    return (
        <div className="collection-page">
            <div className="collection-header">
                <h1>My Collection</h1>
                <p className="collection-count">Collected: {collection.length}/{TOTAL_ANIMALS}</p>
            </div>
            <div className="collection-grid">
                {collection.length === 0 ? (
                    <div className="empty-collection">
                        <h2>No animals collected yet!</h2>
                        <p>Play the memory game to collect animals.</p>
                    </div>
                ) : collection.map((animal, index) => (
                    <div key={index} 
                         className="collection-card" 
                         onClick={() => setSelectedAnimal(animal)}
                    >
                        <img src={`/animals/${animal.id}.jpg`} alt={animal.name} />
                        <div className="collection-card-content">
                            <h3>{animal.name}</h3>
                            <p>Click to learn more</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedAnimal && (
                <>
                    <div className="popup-overlay" onClick={() => setSelectedAnimal(null)} />
                    <div className="collection-popup">
                        <h2>{selectedAnimal.name}</h2>
                        <img src={`/animals/${selectedAnimal.id}.jpg`} alt={selectedAnimal.name} />
                        <p>{selectedAnimal.description || 'No description available.'}</p>
                        <button onClick={() => setSelectedAnimal(null)}>Close</button>
                    </div>
                </>
            )}
        </div>
    )
}