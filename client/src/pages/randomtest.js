import { useState } from "react";

export default function RandomTest() {
    const [randomTest, setRandomTest] = useState([]);
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);

    const generateRandomTest = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/randomtest/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, count }),
        });
        const data = await response.json();
        setRandomTest(data.randomTest);
        setLoading(false);
    };
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className=" text-xl font-bold mb-4">Random Test</h1>
            <input
                className="border p-2  w-full mb-4"
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <input
                className="border p-2  w-full mb-4"
                type="number"
                placeholder="Number of questions"
                value={count}
                onChange={(e) => setCount(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={generateRandomTest}
            >
                {loading ? 'Generating...' : 'Generate Random Test'}
            </button>
            <ul className="mt-6 space-y-4">
                {randomTest.map((question, index) => (
                    <li key={index} className="border p-4 rounded shadow">
                        <p><strong>Q:</strong>{question.question}</p>
                        <ul className="mt-2">
                            {question.options.map((option, i) => (
                                <li key={i} className="ml-4">{option}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}