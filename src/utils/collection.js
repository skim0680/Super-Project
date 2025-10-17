// List of all collectable animals
export const ANIMALS = [
    {
        id: 1,
        name: "Red Panda",
        image: "/animals/redPanda.jpg",
        images: [
            '/animals/redPanda-1.jpg',
            '/animals/redPanda-2.jpg',
            '/animals/redPanda-3.jpg',
            '/animals/redPanda-4.jpg',
            '/animals/redPanda-5.jpg',
            '/animals/redPanda-6.jpg'
        ],
        backImage: '/animals/cardback.jpg',
        description: "The red panda is a small mammal native to the eastern Himalayas and southwestern China.",
        reason: "habitat loss and poaching",
        funFact: "they use their bushy tails for balance and warmth.",
        status: "Endangered",
        quiz: {
            reasons: [
                "competition from invasive species",
                "climate change affecting bamboo growth",
                "disease from domestic animals"
            ],
            facts: [
                "they can lower their metabolic rate like a bear",
                "they are excellent swimmers",
                "they only eat eucalyptus leaves"
            ],
            statuses: [
                "Vulnerable",
                "Near Threatened",
                "Critically Endangered"
            ]
        }
    },
    {
        id: 2,
        name: "Orangutan",
        image: "/animals/orangutan.jpg",
        description: "The orangutan is a large primate found in the rainforests of Indonesia and Malaysia.",
        reason: "deforestation and illegal pet trade",
        funFact: "they are highly intelligent and use tools to obtain food.",
        status: "Critically Endangered",
        quiz: {
            reasons: [
                "competition with local farmers",
                "hunting for traditional medicine",
                "habitat fragmentation by highways"
            ],
            facts: [
                "they migrate long distances each year",
                "they can hold their breath for 30 minutes",
                "they have venomous claws"
            ],
            statuses: [
                "Vulnerable",
                "Endangered",
                "Near Threatened"
            ]
        }
    },
    {
        id: 3,
        name: "Black Rhinoceros",
        image: "/animals/rhino.webp",
        description: "The black rhinoceros is a species of rhinoceros native to eastern and southern Africa.",
        reason: "poaching for their horns",
        funFact: "they have poor eyesight but a strong sense of smell and hearing.",
        status: "Critically Endangered",
        quiz: {
            reasons: [
                "habitat loss due to agriculture",
                "disease from livestock",
                "competition for water resources"
            ],
            facts: [
                "they can regrow their horns if broken",
                "they are excellent swimmers",
                "they are primarily nocturnal"
            ],
            statuses: [
                "Vulnerable",
                "Endangered",
                "Near Threatened"
            ]
        }
    },
    {
        id: 4,
        name: "African Penguin",
        image: "/animals/penguin.jpg",
        description: "The African penguin is a species of penguin found on the southwestern coast of Africa.",
        reason: "oil spills and overfishing",
        funFact: "they are also known as 'jackass penguins' because of their donkey-like bray.",
        status: "Endangered",
        quiz: {
            reasons: [
                "plastic pollution in nesting sites",
                "predation by introduced species",
                "coastal development"
            ],
            facts: [
                "they can fly short distances",
                "they change color in summer",
                "they hibernate during winter"
            ],
            statuses: [
                "Vulnerable",
                "Critically Endangered",
                "Near Threatened"
            ]
        }
    },
    {
        id: 5,
        name: "Argentine Angelshark",
        image: "/animals/shark.jpg",
        description: "The Argentine angelshark is a species of angelshark found off the coast of Argentina.",
        reason: "bycatch and habitat degradation",
        funFact: "they can camouflage themselves on the ocean floor to ambush prey.",
        status: "Endangered",
        quiz: {
            reasons: [
                "ocean acidification",
                "competition from invasive species",
                "plastic pollution"
            ],
            facts: [
                "they can walk on land briefly",
                "they hunt in coordinated groups",
                "they migrate to warm waters annually"
            ],
            statuses: [
                "Vulnerable",
                "Critically Endangered",
                "Near Threatened"
            ]
        }
    },
    {
        id: 6,
        name: "Amur Leopard",
        image: "/animals/leopard.jpg",
        description: "The Amur leopard is a subspecies of leopard found in the Russian Far East and northeastern China.",
        reason: "poaching and habitat loss",
        funFact: "they have the thickest fur of any leopard subspecies to survive cold climates.",
        status: "Critically Endangered",
        quiz: {
            reasons: [
                "disease from domestic cats",
                "climate change affecting prey",
                "competition with tigers"
            ],
            facts: [
                "they can't retract their claws",
                "they are excellent swimmers",
                "they only hunt at night"
            ],
            statuses: [
                "Vulnerable",
                "Endangered",
                "Near Threatened"
            ]
        }
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