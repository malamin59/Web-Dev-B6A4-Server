import { Request, Response } from "express";
import { ai } from "./openai.js";
import { systemPrompt } from "./prompt.js";
import { skillBridgeKnowledge } from "./skillBridgeKnowledge .js";

export const chat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    console.log("user message -->", message);
    const prompt = `${systemPrompt} ${skillBridgeKnowledge} User Question: ${message}`;

    const response = await ai.models.generateContent({
      model: "models/gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
};
