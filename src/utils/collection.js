// List of all collectable animals
export const ANIMALS = [
    {
        id: 1,
        name: "Red Panda",
        image: "/animals/redPanda.jpg",
        // Example: list of images to use as card faces for this animal.
        // Only include image files that exist in public/animals/.
        // For testing there are two available files: redPanda.jpg and redPanda-1.jpg
        images: [
            '/animals/redPanda-1.jpg',
            '/animals/redPanda-2.jpg',
            '/animals/redPanda-3.jpg',
            '/animals/redPanda-4.jpg',
            '/animals/redPanda-5.jpg',
            '/animals/redPanda-6.jpg'
        ],
        // Optional per-animal card back artwork
        backImage: '/animals/cardback.jpg',
        description: "The red panda is a small mammal native to the eastern Himalayas and southwestern China.",
        reason: "Habitat loss and poaching",
        funFact: "Red pandas use their bushy tails for balance and warmth.",
        status: "Endangered",
        // Example sentence-style fill-in-the-blank questions for this animal
        questions: [
            {
                key: 'range',
                before: 'The red panda is native to',
                after: '.',
                options: ['the eastern Himalayas and SW China', 'South America', 'Australia', 'Madagascar'],
                answer: 'the eastern Himalayas and SW China'
            },
            {
                key: 'diet',
                before: 'Its diet mainly includes',
                after: '.',
                options: ['bamboo and shoots', 'fish', 'insects only', 'fruit exclusively'],
                answer: 'bamboo and shoots'
            },
            {
                key: 'status',
                before: 'Conservation status:',
                after: '',
                options: ['Endangered', 'Least Concern', 'Vulnerable', 'Extinct'],
                answer: 'Endangered'
            }
        ]
    },
    {
        id: 2,
        name: "Orangutan",
        image: "/animals/orangutan.jpg",
        description: "The orangutan is a large primate found in the rainforests of Indonesia and Malaysia.",
        reason: "Deforestation and illegal pet trade",
        funFact: "Orangutans are highly intelligent and use tools to obtain food.",
        status: "Critically Endangered"
    },
    {
        id: 3,
        name: "Black Rhinoceros",
        image: "/animals/rhino.webp",
        description: "The black rhinoceros is a species of rhinoceros native to eastern and southern Africa.",
        reason: "Poaching for their horns",
        funFact: "Rhinos have poor eyesight but a strong sense of smell and hearing.",
        status: "Critically Endangered"
    },
    {
        id: 4,
        name: "African Penguin",
        image: "/animals/penguin.jpg",
        description: "The African penguin is a species of penguin found on the southwestern coast of Africa.",
        reason: "Oil spills and overfishing",
        funFact: "African penguins are also known as 'jackass penguins' because of their donkey-like bray.",
        status: "Endangered"
    },
    {
        id: 5,
        name: "Argentine Angelshark",
        image: "/animals/shark.jpg",
        description: "The Argentine angelshark is a species of angelshark found off the coast of Argentina.",
        reason: "Bycatch and habitat degradation",
        funFact: "Angelsharks can camouflage themselves on the ocean floor to ambush prey.",
        status: "Endangered"
    },
    {
        id: 6,
        name: "Amur Leopard",
        image: "/animals/leopard.jpg",
        description: "The Amur leopard is a subspecies of leopard found in the Russian Far East and northeastern China.",
        reason: "Poaching and habitat loss",
        funFact: "Amur leopards have the thickest fur of any leopard subspecies to survive cold climates.",
        status: "Critically Endangered"
    }
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