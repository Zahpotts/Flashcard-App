import Link from "next/link";
export default function Home() {
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Learning App</h1>
            <p className="mb-4">Generate study materials for any topic you want!</p>
            <Link href="/flashcards" className="text-blue-500 underline">Flashcards</Link>
            <Link href="/randomtest" className="text-blue-500 underline ml-4">Random Test</Link>
        </div>
    );
}