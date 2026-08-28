import { NextResponse } from "next/server";
import { integrated_module } from "@/modules/integrated_module";

export async function POST(request) {
    try {
        const body = await request.json();

        const { query } = body;

        if (!query || typeof query !== "string" || !query.trim()) {
            return NextResponse.json(
                {
                    status: "error",
                    error: "query is required"
                },
                { status: 400 }
            );
        }

        const result = await integrated_module(query.trim());

        return NextResponse.json({
            status: "success",
            data: result
        });

    } catch (error) {
        console.error("Query processing error:", error);

        return NextResponse.json(
            {
                status: "error",
                error: "Error occured while agents working"
            },
            { status: 500 }
        );
    }
}