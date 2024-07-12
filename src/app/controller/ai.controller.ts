import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import dotenv from "dotenv";
import Chat from "../../models/chat.model";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_APIKEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

export const chatfn = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const offset = (page - 1) * 10;
    const limit = 10;
    const { count, rows } = await Chat.findAndCountAll({
      where: { userId },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    const reversedRows = rows.reverse();
    return res.status(200).json(reversedRows);
  } catch (error) {
    return res.status(500).json(error);
  }
};
