export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} AI Learning App. All rights reserved.</p>
                <p className="text-sm">Built with Next.js and Google AI API</p>
            </div>
        </footer>
    );
}