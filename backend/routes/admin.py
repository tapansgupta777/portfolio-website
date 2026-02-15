from fastapi import APIRouter, HTTPException, Depends, Header, Request
from typing import Optional, List
from models import AdminLogin, AdminToken, ContactSubmission
from auth import auth_service
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])


def verify_admin_token(authorization: Optional[str] = Header(None)):
    """Verify admin JWT token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    username = auth_service.verify_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return username


@router.post("/login", response_model=AdminToken)
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    if not auth_service.verify_credentials(credentials.username, credentials.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )
    
    access_token = auth_service.create_access_token(credentials.username)
    logger.info(f"Admin login successful: {credentials.username}")
    
    return AdminToken(access_token=access_token)


@router.get("/contacts")
async def get_all_contacts(
    request: Request,
    username: str = Depends(verify_admin_token)
):
    """Get all contact submissions"""
    try:
        db = request.app.state.db
        
        # Fetch all contacts, sorted by timestamp (newest first)
        contacts = await db.contact_submissions.find().sort("timestamp", -1).to_list(1000)
        
        # Convert ObjectId to string and format
        for contact in contacts:
            if '_id' in contact:
                del contact['_id']
        
        return {
            "success": True,
            "contacts": contacts,
            "total": len(contacts)
        }
        
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")


@router.put("/contacts/{contact_id}/read")
async def mark_contact_as_read(
    contact_id: str,
    request: Request,
    username: str = Depends(verify_admin_token)
):
    """Mark contact submission as read"""
    try:
        db = request.app.state.db
        
        result = await db.contact_submissions.update_one(
            {"id": contact_id},
            {"$set": {"read": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        logger.info(f"Contact marked as read: {contact_id}")
        return {"success": True}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking contact as read: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update contact")


@router.delete("/contacts/{contact_id}")
async def delete_contact(
    contact_id: str,
    request: Request,
    username: str = Depends(verify_admin_token)
):
    """Delete contact submission"""
    try:
        db = request.app.state.db
        
        result = await db.contact_submissions.delete_one({"id": contact_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        logger.info(f"Contact deleted: {contact_id}")
        return {"success": True}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete contact")


@router.get("/stats")
async def get_admin_stats(
    request: Request,
    username: str = Depends(verify_admin_token)
):
    """Get admin dashboard statistics"""
    try:
        db = request.app.state.db
        
        total_contacts = await db.contact_submissions.count_documents({})
        unread_contacts = await db.contact_submissions.count_documents({"read": False})
        
        return {
            "success": True,
            "stats": {
                "total_contacts": total_contacts,
                "unread_contacts": unread_contacts,
                "read_contacts": total_contacts - unread_contacts
            }
        }
        
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")
