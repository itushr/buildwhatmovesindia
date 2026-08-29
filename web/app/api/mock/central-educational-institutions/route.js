import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const query = `
            SELECT
                id,
                institution_name,
                institution_type,
                state,
                city,
                established_year,
                student_capacity
            FROM central_educational_institutions
            ORDER BY id ASC
        `;

        const result = await pool.query(query);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Central educational institutions API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch central educational institutions data" },
            { status: 500 }
        );
    }
}