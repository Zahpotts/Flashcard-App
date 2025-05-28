import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-bold">
                    AI Learning App
                </Link>
                <div className="space-x-4">
                    <Link href="/flashcards" className="text-white hover:text-gray-300">
                        Flashcards
                    </Link>
                    <Link href="/randomtest" className="text-white hover:text-gray-300">
                        Random Test
                    </Link>
                    <Link href="/chatbot" className="text-white hover:text-gray-300">
                        AI Chatbot
                    </Link>
                </div>
            </div>
        </nav>
    );
}