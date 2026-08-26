import { askLLM } from "@/services/llm";

export async function GET() {
  console.log("1. Route started");

  try {
    console.log("2. Calling Gemini");

    const response = await askLLM({
      prompt: "What is LLM?",
    });

    console.log("3. Gemini responded");

    return Response.json({
      response,
    });
  } catch (error) {
    console.error("4. Gemini error:", error);

    return Response.json(
      {
        error: "Failed to get response from Gemini",
      },
      {
        status: 500,
      }
    );
  }
}