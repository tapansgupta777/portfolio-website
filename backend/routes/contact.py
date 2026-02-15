from fastapi import APIRouter, HTTPException, Request
from models import ContactSubmissionCreate, ContactSubmission
from motor.motor_asyncio import AsyncIOMotorDatabase
from email_service import email_service
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])

# Rate limiting storage (in-memory, simple approach)
rate_limit_storage = {}


def check_rate_limit(ip_address: str) -> bool:
    """Check if IP has exceeded rate limit (1 submission per 5 minutes)"""
    now = datetime.utcnow()
    
    # Clean old entries
    expired_ips = [ip for ip, timestamp in rate_limit_storage.items() 
                   if now - timestamp > timedelta(minutes=5)]
    for ip in expired_ips:
        del rate_limit_storage[ip]
    
    # Check if IP is rate limited
    if ip_address in rate_limit_storage:
        return False
    
    rate_limit_storage[ip_address] = now
    return True


@router.post("/submit")
async def submit_contact_form(
    contact_data: ContactSubmissionCreate,
    request: Request
):
    """Submit contact form"""
    try:
        # Get IP address
        ip_address = request.client.host
        
        # Check rate limit
        if not check_rate_limit(ip_address):
            raise HTTPException(
                status_code=429,
                detail="Too many submissions. Please try again in 5 minutes."
            )
        
        # Get database from request state
        db = request.app.state.db
        
        # Create contact submission
        contact = ContactSubmission(
            **contact_data.dict(),
            ip_address=ip_address
        )
        
        # Store in database
        await db.contact_submissions.insert_one(contact.dict())
        logger.info(f"Contact submission stored: {contact.email}")
        
        # Send email notification (async, don't wait)
        await email_service.send_contact_notification(
            name=contact.name,
            email=contact.email,
            message=contact.message,
            timestamp=contact.timestamp
        )
        
        return {
            "success": True,
            "message": "Thank you! Your message has been sent successfully. I'll get back to you soon!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to submit contact form. Please try again later."
        )
