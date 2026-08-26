import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3-flash-preview";

export async function askGemini({
    systemPrompt,
    prompt,
}) {
    if (!prompt) {
        throw new Error("Gemini prompt is required");
    }

    const interaction = await ai.interactions.create({
        model: MODEL,

        system_instruction: systemPrompt,

        input: prompt,
    });

    return interaction.output_text;
}