from app.db.database import get_connection
from app.models.sentence_transformer import model


def generate_department_embeddings():
    with get_connection() as conn:
        with conn.cursor() as cur:

            cur.execute("""
                SELECT id, name, description
                FROM departments
                WHERE embedding IS NULL
            """)

            departments = cur.fetchall()

            for dept_id, name, description in departments:

                text = f"""
                Department: {name}

                Description:
                {description}
                """

                embedding = model.encode(text).tolist()

                cur.execute(
                    """
                    UPDATE departments
                    SET embedding = %s
                    WHERE id = %s
                    """,
                    (embedding, dept_id)
                )

        conn.commit()

    return len(departments)