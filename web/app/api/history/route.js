import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const result = await pool.query(
                "SELECT id, query, data, created_at FROM user_history WHERE id = $1",
                [parseInt(id, 10)]
            );
            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: "History session not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json(result.rows[0]);
        } else {
            const result = await pool.query(
                "SELECT id, query, created_at FROM user_history ORDER BY created_at DESC LIMIT 100"
            );
            return NextResponse.json(result.rows);
        }
    } catch (error) {
        console.error("Error fetching user history from database:", error);
        return NextResponse.json(
            { error: "Failed to retrieve history" },
            { status: 500 }
        );
    }
}
