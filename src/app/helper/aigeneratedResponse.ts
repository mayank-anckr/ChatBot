import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Chat from "../../models/chat.model";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_APIKEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

export async function aiResponseGenerator(request: {
  userId: string;
  message: string;
}): Promise<string> {
  try {
    const result = await model.generateContent(request.message);
    if (!result || !result.response || !result.response.candidates) {
      throw new Error("No reply available");
    }

    const reply =
      result.response.candidates[0].content.parts[0].text?.replace(/\n/g, "") ||
      "No reply available";

    await Chat.create({
      userId: request.userId,
      request: request.message,
      response: reply,
    });
    console.log("insertion completed");
    return reply;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
