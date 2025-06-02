import { useState } from "react";

export default function RandomTest() {
    const [randomTest, setRandomTest] = useState([]);
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    // Array of labels for options
    const optionLabels = ['A', 'B', 'C', 'D'];

    const generateRandomTest = async () => {

        setLoading(true);
        setError(null);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(null);
        try {
            console.log("Sending request to:", "http://localhost:5000/api/randomtest/generate");
            console.log("Request payload:", { topic, count });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, count }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            // Process the randomTest data to add correct answers
            const processedTest = data.randomTest || [];
            setRandomTest(processedTest);
        } catch (err) {
            console.error("Error generating random test:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionIndex, optionIndex) => {
        if (isSubmitted) return; // Prevent changes after submission

        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: optionIndex
        }));
    };

    const handleSubmitTest = () => {
        // Calculate score
        let correctCount = 0;
        randomTest.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswerIndex) {
                correctCount++;
            }
        });

        const percentage = Math.round((correctCount / randomTest.length) * 100);
        setScore({ correct: correctCount, total: randomTest.length, percentage });
        setIsSubmitted(true);
    };

    const getOptionClass = (questionIndex, optionIndex) => {
        if (!isSubmitted) {
            // Before submission, just highlight selected answer
            return selectedAnswers[questionIndex] === optionIndex
                ? "bg-blue-100 border-blue-300"
                : "hover:bg-gray-50";
        } else {
            // After submission, show correct/incorrect
            const isSelected = selectedAnswers[questionIndex] === optionIndex;
            const isCorrect = randomTest[questionIndex].correctAnswerIndex === optionIndex;

            if (isCorrect) {
                return "bg-green-100 border-green-300"; // Correct answer
            } else if (isSelected) {
                return "bg-red-100 border-red-300"; // Incorrect selection
            } else {
                return "opacity-70"; // Unselected options
            }
        }
    };

    const restartTest = () => {
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(null);
    };


    return (
        <div className="p-6 max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl">

            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Random Test</h1>


            {!randomTest.length || isSubmitted ? (
                <div className="mb-6">
                    <input
                        className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                        type="text"
                        placeholder="Enter topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                        type="number"
                        placeholder="Number of questions"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        disabled={loading}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full font-semibold transition"
                        onClick={generateRandomTest}
                        disabled={loading || !topic}
                    >
                        {loading ? 'Generating...' : 'Generate New Test'}
                    </button>
                </div>
            ) : null}

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {score && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded">
                    <h2 className="text-xl font-semibold text-green-700">Your Score</h2>
                    <p className="text-3xl font-bold text-green-900">{score.percentage}%</p>
                    <p className="text-sm text-gray-600">{score.correct} correct out of {score.total} questions</p>
                </div>
            )}

            {randomTest.length > 0 && (
                <>
                    <ul className="mt-6 space-y-6">
                        {randomTest.map((question, questionIndex) => (
                            <li key={questionIndex} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                                <p className="font-medium text-gray-800 mb-3">
                                    <strong className="text-blue-600">Question {questionIndex + 1}:</strong> {question.question}
                                </p>
                                <ul className="mt-2 space-y-2">
                                    {question.options && question.options.map((option, optionIndex) => (
                                        <li
                                            key={optionIndex}
                                            className={`ml-4 p-2 border rounded cursor-pointer transition-colors
                                                ${getOptionClass(questionIndex, optionIndex)}`}
                                            onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                                        >
                                            <span className="font-bold mr-2">{optionLabels[optionIndex]}.</span>
                                            {option}
                                            {isSubmitted && randomTest[questionIndex].correctAnswerIndex === optionIndex && (
                                                <span className="ml-2 text-green-600">✓</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {isSubmitted && selectedAnswers[questionIndex] !== randomTest[questionIndex].correctAnswerIndex && (
                                    <p className="mt-2 text-sm text-red-600">
                                        Correct answer: {optionLabels[randomTest[questionIndex].correctAnswerIndex]}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>

                    {!isSubmitted && (
                        <div className="mt-6">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg w-full font-semibold transition"
                                onClick={handleSubmitTest}
                                disabled={Object.keys(selectedAnswers).length !== randomTest.length}
                            >
                                Submit Test
                            </button>
                            {Object.keys(selectedAnswers).length !== randomTest.length && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Please answer all {randomTest.length} questions before submitting.
                                </p>
                            )}
                        </div>
                    )}

                    {isSubmitted && (
                        <div className="mt-6">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full font-semibold transition"
                                onClick={restartTest}
                            >
                                Take Another Test
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}