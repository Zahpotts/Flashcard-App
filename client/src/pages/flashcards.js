import { useEffect, useState } from "react";

export default function Flashcards() {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/flashcards/js')
        .then(res => res.json())
        .then(data => setFlashcards(data.flashcards));
    }
    , []);
    return (
        <div>
            <h1>Flashcards</h1>
            {flashcards.map((card, index) => (
                <div key={index}>
                    <h2>{card.question}</h2>
                    <p>{card.answer}</p>
                </div>
            ))}
        </div>
        );
    }