import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children, title = 'AI Learning App' }) {
    return (
        <div className=" bg-transparent flex flex-col min-h-screen">
            <Head>
                <title>{title}</title>
                <meta name="description" content="AI Learning App - Flashcards, Chatbot, and Random Tests" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}