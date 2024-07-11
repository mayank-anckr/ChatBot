import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_APIKEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

export async function aiResponseGenerator(message: string): Promise<string> {
  try {
    const result = await model.generateContent(message);
    if (!result || !result.response || !result.response.candidates) {
      throw new Error("No reply available");
    }

    const reply =
      result.response.candidates[0].content.parts[0].text?.replace(/\n/g, "") ||
      "No reply available";
    return reply;
  } catch (error) {
    throw error;
  }
}
