import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const query = `
            SELECT
                id,
                project_name,
                highway_number,
                expense_category,
                amount
            FROM national_highway_expenses
            ORDER BY id ASC
        `;

        const result = await pool.query(query);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("National highway expenses API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch national highway expenses data" },
            { status: 500 }
        );
    }
}