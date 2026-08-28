import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const state = searchParams.get("state");

        // Validate required parameters
        if (!from || !to || !state) {
            return NextResponse.json(
                { error: "from, to and state are required" },
                { status: 400 }
            );
        }

        // Validate MMYYYY format
        const monthYearRegex = /^(0[1-9]|1[0-2])\d{4}$/;

        if (!monthYearRegex.test(from) || !monthYearRegex.test(to)) {
            return NextResponse.json(
                { error: "from and to must be in MMYYYY format" },
                { status: 400 }
            );
        }

        // Convert MMYYYY → YYYY-MM-15
        const fromDate = `${from.slice(2)}-${from.slice(0, 2)}-15`;
        const toDate = `${to.slice(2)}-${to.slice(0, 2)}-15`;

        const query = `
            SELECT
                amount,
                date,
                state
            FROM income_tax_collection
            WHERE date >= $1
              AND date <= $2
              ${state.toLowerCase() === "all" ? "" : "AND state = $3"}
            ORDER BY date ASC, state ASC
        `;

        const values =
            state.toLowerCase() === "all"
                ? [fromDate, toDate]
                : [fromDate, toDate, state];

        const result = await pool.query(query, values);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Income tax API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch income tax data" },
            { status: 500 }
        );
    }
}