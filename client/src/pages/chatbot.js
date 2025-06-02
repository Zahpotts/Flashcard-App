import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm your AI learning assistant. Ask me anything about any topic you'd like to learn" }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const newMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chatbot/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input, history: messages }),
            });
            const data = await response.json();
            console.log("Response from server:", data);
            if (response.ok) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error while processing your request." }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again" }]);

        } finally {
            setLoading(false);

        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    const clearChat = () => {
        setMessages([{ role: 'assistant', content: "Hello! I'm your AI learning assistant. Ask me anything about any topic you'd like to learn" }]);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto h-screen flex flex-col dark:bg-gray-900 bg-white text-gray-800 dark:text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">AI Learning Chatbot</h1>
                <button onClick={clearChat} className="bg-red-500 text-white px-4 py-2 rounded">Clear Chat</button>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-3xl p-3 rounded-lg ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white border shadow-sm'
                                    }`}
                            >
                                <div className="text-sm font-medium mb-1">
                                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                                </div>
                                <div className="whitespace-pre-wrap">{message.content}</div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white border shadow-sm p-3 rounded-lg">
                                <div className="text-sm font-medium mb-1">AI Assistant</div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
                <textarea
                    className="flex-1 border p-3 rounded-lg resize-none"
                    rows="3"
                    placeholder="Ask me anything about learning topics, concepts, or request study materials..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                />
                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );

}