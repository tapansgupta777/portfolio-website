#!/usr/bin/env python3
"""
Specific test for rate limiting functionality
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://techfoliogupta.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

async def test_rate_limiting():
    """Test rate limiting with detailed logging"""
    print(f"Testing rate limiting at: {API_BASE_URL}/contact/submit")
    
    async with aiohttp.ClientSession() as session:
        contact_data = {
            "name": "Rate Limit Test",
            "email": "ratelimit@test.com",
            "message": "Testing rate limiting functionality"
        }
        
        print("\n1. First submission (should succeed):")
        async with session.post(
            f"{API_BASE_URL}/contact/submit",
            json=contact_data
        ) as response:
            print(f"   Status: {response.status}")
            data = await response.json()
            print(f"   Response: {data}")
        
        print("\n2. Immediate second submission (should be rate limited):")
        contact_data["message"] = "Second submission - should be blocked"
        async with session.post(
            f"{API_BASE_URL}/contact/submit",
            json=contact_data
        ) as response:
            print(f"   Status: {response.status}")
            data = await response.json()
            print(f"   Response: {data}")
        
        print("\n3. Third submission (should also be rate limited):")
        contact_data["message"] = "Third submission - should also be blocked"
        async with session.post(
            f"{API_BASE_URL}/contact/submit",
            json=contact_data
        ) as response:
            print(f"   Status: {response.status}")
            data = await response.json()
            print(f"   Response: {data}")

if __name__ == "__main__":
    asyncio.run(test_rate_limiting())