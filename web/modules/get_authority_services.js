import pool from "@/lib/db";

export async function getAuthorityServices(authority_id) {
    const result = await pool.query(
        `
        SELECT
            id,
            name,
            description,
            endpoint,
            method,
            documentation
        FROM authority_services
        WHERE authority_id = $1
        ORDER BY id
        `,
        [authority_id]
    );

    return result.rows;
}