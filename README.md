# AI Learning App

A comprehensive learning platform that leverages Google's Gemini AI to create interactive educational content. Generate flashcards, take random tests, and chat with an AI tutor on any topic.

## 🌟 Features

- **📚 AI-Generated Flashcards**: Create interactive flip cards for any topic
- **🎯 Random Tests**: Generate multiple-choice quizzes with instant scoring
- **🤖 AI Chatbot**: Get personalized tutoring and explanations
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **⚡ Real-time Generation**: Fast content creation powered by Gemini AI

## 🚀 Live Demo

- **Frontend**: [https://flashcard-app-sandy-pi.vercel.app](https://flashcard-app-sandy-pi.vercel.app)
- **Backend API**: [https://ai-learning-app-api.onrender.com](https://ai-learning-app-api.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - ES6+ features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini AI** - AI content generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
ai-learning-app/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Footer.js
│   │   │   ├── Layout.js
│   │   │   └── Navbar.js
│   │   ├── pages/          # Next.js pages
│   │   │   ├── chatbot.js
│   │   │   ├── flashcards.js
│   │   │   ├── randomtest.js
│   │   │   └── index.js
│   │   └── styles/         # Global styles
│   └── package.json
├── server/                 # Express.js backend
│   ├── config/             # Configuration files
│   │   └── googleai.js
│   ├── data/               # Static data files
│   │   └── js.json
│   ├── routes/             # API route handlers
│   │   ├── chatbot.js
│   │   ├── flashcards.js
│   │   └── randomtest.js
│   ├── index.js            # Server entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-learning-app.git
   cd ai-learning-app
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in server directory
   touch .env
   ```
   
   Add your environment variables:
   ```env
   GOOGLE_API_KEY=your_google_ai_api_key_here
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Create frontend environment file**
   ```bash
   # Create .env.local file in client directory
   touch .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server will run on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## 🔧 API Endpoints

### Flashcards
- `GET /api/flashcards/:topic` - Get existing flashcards for a topic
- `POST /api/flashcards/generate` - Generate new flashcards

### Random Tests
- `GET /api/randomtest/:topic` - Get existing test questions for a topic
- `POST /api/randomtest/generate` - Generate new test questions

### Chatbot
- `POST /api/chatbot/chat` - Send message to AI chatbot

## 📋 API Request Examples

### Generate Flashcards
```javascript
POST /api/flashcards/generate
Content-Type: application/json

{
  "topic": "JavaScript Arrays",
  "count": 5
}
```

### Generate Random Test
```javascript
POST /api/randomtest/generate
Content-Type: application/json

{
  "topic": "React Hooks",
  "count": 10
}
```

### Chat with AI
```javascript
POST /api/chatbot/chat
Content-Type: application/json

{
  "message": "Explain closures in JavaScript",
  "history": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant", 
      "content": "Previous response"
    }
  ]
}
```

## 🌐 Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables:
   - `GOOGLE_API_KEY`
   - `FRONTEND_URL` (your Vercel domain)

### Frontend (Vercel)
1. Import your GitHub repository to Vercel
2. Set build settings:
   - Framework Preset: Next.js
   - Root Directory: `client`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` (your Render backend URL)

## 🔑 Environment Variables

### Server (.env)
```env
GOOGLE_API_KEY=your_google_ai_api_key
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=5000
```

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
```

## 🎨 Features in Detail

### Flashcards
- Interactive flip animations
- Customizable number of cards (1-20)
- Topic-based generation
- Clean, intuitive interface

### Random Tests
- Multiple choice questions (A, B, C, D)
- Instant scoring and feedback
- Correct answer highlighting
- Progress tracking

### AI Chatbot
- Conversational learning assistant
- Context-aware responses
- Educational focus with study tips
- Message history preservation



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

**Built with ❤️ using Google Gemini AI**