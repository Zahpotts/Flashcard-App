import Link from "next/link";


export default function Home() {
    return (
        <div className="p-6 max-w-xl mx-auto mt-10 bg-white shadow-md rounded-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Welcome to the Learning App
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Generate study materials for any topic you want!
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <Link href="/flashcards" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    Flashcards
                </Link>
                <Link href="/randomtest" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                    Random Test
                </Link>
                <Link href="/chatbot" className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
                    AI Chatbot
                </Link>
            </div>

            <p className="text-center text-gray-500">Select a feature to get started!</p>
        </div>
    );
}
