import Link from "next/link";
export default function Home() {
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Flashcards App</h1>
            <p className="mb-4">Generate flashcards for any topic you want!</p>
            <Link href="/flashcards" className="text-blue-500 underline">Get Started</Link>
        </div>
    );
}