import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


const googleGenAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,});

export default googleGenAI;