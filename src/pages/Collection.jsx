import { useState, useEffect } from 'react';
import { ANIMALS } from '../utils/collection';

export default function Collection() {
    const [collection, setCollection] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const TOTAL_ANIMALS = ANIMALS.length;

    useEffect(() => {
        loadCollection();
    }, []);

    function loadCollection() {
        // Load collected animals from localStorage
        const collectedIds = JSON.parse(localStorage.getItem('collectedAnimals') || '[]');
        // Get full animal details for each collected ID
        const collectedAnimals = ANIMALS.filter(animal => 
            collectedIds.includes(animal.id.toString()) || // Check string version of ID
            collectedIds.includes(animal.id) // Check number version of ID
        );
        setCollection(collectedAnimals);
    }

    function handleResetProgress() {
        if (window.confirm('Are you sure you want to reset your progress? This will delete all collected animals.')) {
            localStorage.removeItem('collectedAnimals');
            localStorage.removeItem('animalCollection');
            setCollection([]);
            setSelectedAnimal(null);
        }
    }

    return (
        <div className="collection-page">
            <div className="collection-header">
                <h1>My Collection</h1>
                <p className="collection-count">Collected: {collection.length}/{TOTAL_ANIMALS}</p>
                {collection.length > 0 && (
                    <button className="reset-button" onClick={handleResetProgress}>
                        Reset Progress
                    </button>
                )}
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
                        <img src={animal.image} alt={animal.name} />
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
                    <div className="collection-popup detailed">
                        <button className="close-button" onClick={() => setSelectedAnimal(null)}>✕</button>
                        <h2>{selectedAnimal.name}</h2>
                        <img src={selectedAnimal.image} alt={selectedAnimal.name} />
                        {selectedAnimal.youtubeId && (
                            <div className="video-container">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${selectedAnimal.youtubeId}`}
                                    title={`${selectedAnimal.name} video`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                        <div className="animal-details">
                            <div className="detail-section">
                                <h3>About</h3>
                                <p>{selectedAnimal.description}</p>
                            </div>
                            <div className="detail-section">
                                <h3>Conservation Status</h3>
                                <p className={`status status-${selectedAnimal.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {selectedAnimal.status}
                                </p>
                                <h3>Threats</h3>
                                <p>{selectedAnimal.reason}</p>
                            </div>
                            <div className="detail-section">
                                <h3>Fun Fact</h3>
                                <p>{selectedAnimal.funFact}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}