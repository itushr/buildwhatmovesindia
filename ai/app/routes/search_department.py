from fastapi import APIRouter
from pydantic import BaseModel

from app.services.match_departments import search_departments

router = APIRouter()

class DepartmentSearchRequest(BaseModel):
    text: str

@router.post("/search-department")
def identify_department(request: DepartmentSearchRequest):
    results = search_departments(request.text)
    
    return {
        "query": request.text,
        "results": results
    }