import { GoogleGenAI } from "@google/genai";

const googleGenAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,});

export default googleGenAI;