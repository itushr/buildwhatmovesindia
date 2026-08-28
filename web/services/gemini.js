import { GoogleGenAI } from "@google/genai";

const apiKeys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
].filter(Boolean);

if (apiKeys.length === 0) {
    throw new Error("No Gemini API keys configured");
}

const clients = apiKeys.map(
    (apiKey) => new GoogleGenAI({ apiKey })
);

const MODEL = "gemini-3-flash-preview";

let currentClient = 0;

export async function askGemini({
    systemPrompt,
    prompt,
}) {
    if (!prompt) {
        throw new Error("User prompt is required");
    }

    const clientIndex = currentClient;
    const ai = clients[clientIndex];

    // Round-robin
    currentClient = (currentClient + 1) % clients.length;

    console.log(
        `GEMINI_LOG : USING GEMINI_API_KEY_${clientIndex + 1}`
    );

    try {
        const interaction = await ai.interactions.create({
            model: MODEL,
            system_instruction: systemPrompt,
            input: prompt,
        });

        if (!interaction?.output_text) {
            throw new Error("Gemini returned an empty response");
        }

        return JSON.parse(interaction.output_text);

    } catch (error) {
        console.error(
            `GEMINI_ERROR : API_KEY_${clientIndex + 1}`,
            error
        );

        throw error;
    }
}