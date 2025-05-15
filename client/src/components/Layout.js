export default function Layout({ children }) {
    return (
        <div>
            <header>
                <h1>Flashcards App</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2023 Flashcards App</p>
            </footer>
        </div>
    );
}