import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Tapan@777"  # Will be hashed

# JWT settings
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production-12345')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24


class AuthService:
    def __init__(self):
        # Hash the admin password on initialization
        self.password_hash = bcrypt.hashpw(ADMIN_PASSWORD.encode('utf-8'), bcrypt.gensalt())
        
    def verify_credentials(self, username: str, password: str) -> bool:
        """Verify admin credentials"""
        if username != ADMIN_USERNAME:
            return False
        
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash)
    
    def create_access_token(self, username: str) -> str:
        """Create JWT access token"""
        expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
        payload = {
            "sub": username,
            "exp": expire,
            "iat": datetime.utcnow()
        }
        return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    def verify_token(self, token: str) -> Optional[str]:
        """Verify JWT token and return username"""
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            username = payload.get("sub")
            return username
        except jwt.ExpiredSignatureError:
            logger.warning("Token has expired")
            return None
        except jwt.InvalidTokenError:
            logger.warning("Invalid token")
            return None


# Global instance
auth_service = AuthService()
