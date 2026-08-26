from fastapi import APIRouter, Response, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.pdf_generator import generate_rti_receipt_pdf

router = APIRouter()

class ReceiptRequestPayload(BaseModel):
    regNo: Optional[str] = "DOPT/R/2026/569651"
    dateStr: Optional[str] = "26 Aug 2026, 03:51 PM"
    targetDateStr: Optional[str] = "25 Sep 2026"
    name: Optional[str] = "Shivam Kumar"
    email: Optional[str] = "shivam.kumar@email.com"
    mobile: Optional[str] = "+91 98765 43210"
    address: Optional[str] = "123, Green Park, New Delhi - 110016"
    txnId: Optional[str] = "TXN51234567890"
    ministry: Optional[str] = "Ministry of Personnel, Public Grievances & Pensions"
    publicAuthority: Optional[str] = "Department of Personnel & Training"
    subject: Optional[str] = "Road repair budget in Ward 12"
    queryText: Optional[str] = "Requesting the detailed budget allocation, expenditure, and vendor details for road repair work in Ward 12 for the financial year 2025-26."
    amount: Optional[str] = "₹10.00"
    paymentMode: Optional[str] = "Online Payment (UPI)"

@router.post("/generate-receipt-pdf")
def create_receipt_pdf(payload: ReceiptRequestPayload):
    try:
        data = payload.dict()
        pdf_bytes = generate_rti_receipt_pdf(data)
        
        filename = f"RTI_Receipt_{data['regNo'].replace('/', '_')}.pdf"
        
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"inline; filename={filename}"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
