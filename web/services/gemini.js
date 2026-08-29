import { GoogleGenAI } from "@google/genai";

const apiKeys = [];

for (let i = 1; ; i++) {
    const key = process.env[`GEMINI_API_KEY_${i}`];
    if (!key) break;
    apiKeys.push(key);
}

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

        const data = JSON.parse(interaction.output_text);
        console.log(
            `GEMINI_LOG : response = ${JSON.stringify(data, null, 2)}`
        );
        return data;

    } catch (error) {
        console.error(
            `GEMINI_ERROR : API_KEY_${clientIndex + 1}`,
            error
        );

        throw error;
    }
}