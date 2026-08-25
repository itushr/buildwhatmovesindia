from fastapi import FastAPI

from app.db.database import get_connection
from app.routes.search_department import router as department_router

app = FastAPI()

app.include_router(department_router)

@app.get("/health")
def health():
    return {"status": "ok"}