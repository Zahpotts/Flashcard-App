import { useState } from "react";

export default function Flashcards() {
    const [flashcards, setFlashcards] = useState([]);
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [flippedStates, setFlippedStates] = useState({});


    const generateFlashcards = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, count }),
        });
        const data = await response.json();
        setFlashcards(data.flashcards);
        setFlippedStates(new Array(data.flashcards.length).fill(false)); // Initialize flipped states
        setLoading(false);
    };
    const toggleFlip = (index) => {
        setFlippedStates(prev => {
            const newFlippedStates = [...prev];
            newFlippedStates[index] = !newFlippedStates[index];
            return newFlippedStates;
        });
    };
    return (
        <div className="p-4 max-w-xl mx-auto">
            
            <h1 className=" text-2xl font-bold mb-6 text-center text-gray-800">Flashcards</h1>
            <input
                className="border p-3  w-full mb-4 rounded-lg"
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <input
                className="border p-3  w-full mb-4 rounded-lg"
                type="number"
                placeholder="Number of flashcards"
                value={count}
                onChange={(e) => setCount(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-600 transition"
                onClick={generateFlashcards}
            >
                {loading ? 'Generating...' : 'Generate Flashcards'}
            </button>
            <ul className="mt-8 grid grid-cols-1 gap-6">
                {flashcards.map((card, index) => (
                    <li key={index}
                        className="w-full h-48 perspective"
                        onClick={() => toggleFlip(index)} >
                        <div className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${flippedStates[index] ? 'rotate-y-180' : ''}`}>
                            {/* Front side */}
                            <div className="absolute inset-0 bg-white border p-4 rounded-lg shadow-lg backface-hidden flex items-center justify-center">
                                <p className="text-lg front-medium text-gray-800 text-center"><strong>Q:</strong>{card.question}</p>
                            </div>
                            {/* Back side */}
                            <div className="absolute inset-0 bg-blue-100 border p-4 rounded-lg shadow-lg rotate-y-180 backface-hidden flex items-center justify-center">
                                <p className="text-lg font-medium text-gray-800 text-center"><strong>A:</strong> {card.answer}</p>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );
}