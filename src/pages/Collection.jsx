import { useState, useEffect } from 'react'
import { ANIMALS, getCollectedAnimals } from '../utils/collection'

export default function Collection() {
    const [collection, setCollection] = useState([])
    const TOTAL_ANIMALS = ANIMALS.length

    useEffect(() => {
        // Load collected animals with their details
        const collectedAnimals = getCollectedAnimals()
        setCollection(collectedAnimals)
    }, [])

    return (
        <div className="collection-page">
            <h1>Collection: {collection.length}/{TOTAL_ANIMALS}</h1>
            <div className="collection-grid">
                {collection.map((animal, index) => (
                    <div key={index} className="animal-card">
                        <img src={animal.image} alt={animal.name} />
                        <h3>{animal.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}