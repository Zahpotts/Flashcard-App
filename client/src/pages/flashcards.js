import { useState } from "react";

export default function Flashcards() {
    const [flashcards, setFlashcards] = useState([]);
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);

    const generateFlashcards = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/flashcards/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, count }),
        });
        const data = await response.json();
        setFlashcards(data.flashcards);
        setLoading(false);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className=" text-xl font-bold mb-4">Flashcards</h1>
            <input 
                className = "border p-2  w-full mb-4"
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <input
                className = "border p-2  w-full mb-4"
                type="number"
                placeholder="Number of flashcards"
                value={count}
                onChange={(e) => setCount(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={generateFlashcards}
                >
                    {loading ? 'Generating...' : 'Generate Flashcards'}
                </button>
            <ul className="mt-6 space-y-4">
            {flashcards.map((card, index) => (
                <li key={index} className="border p-4 rounded shadow">
                    <p><strong>Q:</strong>{card.question}</p>
                    <p className="mt-2"><strong>A:</strong> {card.answer}</p>
                </li>
            
            ))}
            </ul>
        </div>
        );
    }