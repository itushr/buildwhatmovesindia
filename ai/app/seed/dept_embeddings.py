from app.services.department import generate_department_embeddings

count = generate_department_embeddings()

print(f"Generated embeddings for {count} departments.")