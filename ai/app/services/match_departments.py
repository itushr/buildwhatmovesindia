from app.db.database import get_connection
from app.models.sentence_transformer import model


def search_departments(query: str, limit: int = 5):

    # Convert user query into a 384-dimensional vector
    query_embedding = model.encode(query).tolist()

    with get_connection() as conn:
        with conn.cursor() as cur:

            cur.execute(
                """
                SELECT
                    id,
                    name,
                    description,
                    1 - (embedding <=> %s::vector) AS similarity
                FROM departments
                WHERE embedding IS NOT NULL
                ORDER BY embedding <=> %s::vector
                LIMIT %s
                """,
                (
                    query_embedding,
                    query_embedding,
                    limit
                )
            )

            rows = cur.fetchall()

    return [
        {
            "dept_id": row[0],
            "dept": row[1],
            "description": row[2],
            "similarity": float(row[3])
        }
        for row in rows
    ]