const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL || 'https://ai-learning-app-api.onrender.com'
  : 'http://localhost:5000';

export { API_BASE_URL };