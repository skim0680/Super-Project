// List of all collectable animals
export const ANIMALS = [
    {
        id: 1,
        name: "Black Rhino",
        image: "/animals/rhino.jpg",
        description: "The black rhinoceros is a species of rhinoceros native to eastern and southern Africa.",
        status: "Critically Endangered"
    },
    {
        id: 2,
        name: "Mountain Gorilla",
        image: "/animals/gorilla.jpg",
        description: "The mountain gorilla is one of the two subspecies of the eastern gorilla.",
        status: "Endangered"
    },
    // Add more animals here
]

// Function to add an animal to collection
export function collectAnimal(animalId) {
    const currentCollection = JSON.parse(localStorage.getItem('animalCollection') || '[]')
    
    // Check if animal is already collected
    if (!currentCollection.includes(animalId)) {
        const newCollection = [...currentCollection, animalId]
        localStorage.setItem('animalCollection', JSON.stringify(newCollection))
        return true
    }
    return false
}

// Function to get collected animals' details
export function getCollectedAnimals() {
    const collectedIds = JSON.parse(localStorage.getItem('animalCollection') || '[]')
    return ANIMALS.filter(animal => collectedIds.includes(animal.id))
}

// Function to check if an animal is collected
export function isCollected(animalId) {
    const collection = JSON.parse(localStorage.getItem('animalCollection') || '[]')
    return collection.includes(animalId)
}