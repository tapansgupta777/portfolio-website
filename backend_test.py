#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Website
Tests all endpoints including contact form, admin authentication, and CRUD operations.
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

# Test credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Tapan@777"

class PortfolioAPITester:
    def __init__(self):
        self.session = None
        self.admin_token = None
        self.test_contact_id = None
        self.results = {
            'total_tests': 0,
            'passed': 0,
            'failed': 0,
            'errors': []
        }
    
    async def setup(self):
        """Initialize HTTP session"""
        self.session = aiohttp.ClientSession()
    
    async def cleanup(self):
        """Close HTTP session"""
        if self.session:
            await self.session.close()
    
    def log_result(self, test_name, success, message=""):
        """Log test result"""
        self.results['total_tests'] += 1
        if success:
            self.results['passed'] += 1
            print(f"✅ {test_name}: PASSED {message}")
        else:
            self.results['failed'] += 1
            self.results['errors'].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED - {message}")
    
    async def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        test_name = "Contact Form Submission"
        try:
            contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "message": "This is a test message from the automated testing suite. Please ignore this message."
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/contact/submit",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success') and 'message' in data:
                        self.log_result(test_name, True, f"Status: {response.status}")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid response format: {data}")
                        return False
                else:
                    text = await response.text()
                    self.log_result(test_name, False, f"Status: {response.status}, Response: {text}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_contact_form_rate_limiting(self):
        """Test rate limiting on contact form"""
        test_name = "Contact Form Rate Limiting"
        try:
            contact_data = {
                "name": "Rate Test User",
                "email": "ratetest@example.com",
                "message": "First submission for rate limit test"
            }
            
            # First submission should succeed
            async with self.session.post(
                f"{API_BASE_URL}/contact/submit",
                json=contact_data
            ) as response:
                if response.status != 200:
                    self.log_result(test_name, False, f"First submission failed: {response.status}")
                    return False
            
            # Second submission should be rate limited
            contact_data["message"] = "Second submission - should be rate limited"
            async with self.session.post(
                f"{API_BASE_URL}/contact/submit",
                json=contact_data
            ) as response:
                if response.status == 429:
                    data = await response.json()
                    if "Too many submissions" in data.get('detail', ''):
                        self.log_result(test_name, True, "Rate limiting working correctly")
                        return True
                    else:
                        self.log_result(test_name, False, f"Wrong rate limit message: {data}")
                        return False
                else:
                    self.log_result(test_name, False, f"Expected 429, got {response.status}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_admin_login_success(self):
        """Test admin login with correct credentials"""
        test_name = "Admin Login (Valid Credentials)"
        try:
            login_data = {
                "username": ADMIN_USERNAME,
                "password": ADMIN_PASSWORD
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/admin/login",
                json=login_data
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if 'access_token' in data:
                        self.admin_token = data['access_token']
                        self.log_result(test_name, True, f"Token received")
                        return True
                    else:
                        self.log_result(test_name, False, f"No access_token in response: {data}")
                        return False
                else:
                    text = await response.text()
                    self.log_result(test_name, False, f"Status: {response.status}, Response: {text}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_admin_login_failure(self):
        """Test admin login with incorrect credentials"""
        test_name = "Admin Login (Invalid Credentials)"
        try:
            login_data = {
                "username": "wrong_user",
                "password": "wrong_password"
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/admin/login",
                json=login_data
            ) as response:
                if response.status == 401:
                    data = await response.json()
                    if "Invalid username or password" in data.get('detail', ''):
                        self.log_result(test_name, True, "Correctly rejected invalid credentials")
                        return True
                    else:
                        self.log_result(test_name, False, f"Wrong error message: {data}")
                        return False
                else:
                    self.log_result(test_name, False, f"Expected 401, got {response.status}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_get_contacts_with_token(self):
        """Test getting all contacts with valid token"""
        test_name = "Get All Contacts (With Token)"
        if not self.admin_token:
            self.log_result(test_name, False, "No admin token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            
            async with self.session.get(
                f"{API_BASE_URL}/admin/contacts",
                headers=headers
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success') and 'contacts' in data and 'total' in data:
                        contacts = data['contacts']
                        # Store a contact ID for later tests
                        if contacts and len(contacts) > 0:
                            self.test_contact_id = contacts[0].get('id')
                        self.log_result(test_name, True, f"Retrieved {len(contacts)} contacts")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid response format: {data}")
                        return False
                else:
                    text = await response.text()
                    self.log_result(test_name, False, f"Status: {response.status}, Response: {text}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_get_contacts_without_token(self):
        """Test getting contacts without token (should fail)"""
        test_name = "Get All Contacts (Without Token)"
        try:
            async with self.session.get(f"{API_BASE_URL}/admin/contacts") as response:
                if response.status == 401:
                    data = await response.json()
                    if "Authorization header missing" in data.get('detail', ''):
                        self.log_result(test_name, True, "Correctly rejected request without token")
                        return True
                    else:
                        self.log_result(test_name, False, f"Wrong error message: {data}")
                        return False
                else:
                    self.log_result(test_name, False, f"Expected 401, got {response.status}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_admin_stats(self):
        """Test admin stats endpoint"""
        test_name = "Admin Stats"
        if not self.admin_token:
            self.log_result(test_name, False, "No admin token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            
            async with self.session.get(
                f"{API_BASE_URL}/admin/stats",
                headers=headers
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if (data.get('success') and 'stats' in data and 
                        'total_contacts' in data['stats'] and 
                        'unread_contacts' in data['stats'] and 
                        'read_contacts' in data['stats']):
                        stats = data['stats']
                        self.log_result(test_name, True, 
                                      f"Total: {stats['total_contacts']}, "
                                      f"Unread: {stats['unread_contacts']}, "
                                      f"Read: {stats['read_contacts']}")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid response format: {data}")
                        return False
                else:
                    text = await response.text()
                    self.log_result(test_name, False, f"Status: {response.status}, Response: {text}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_mark_contact_as_read(self):
        """Test marking a contact as read"""
        test_name = "Mark Contact as Read"
        if not self.admin_token:
            self.log_result(test_name, False, "No admin token available")
            return False
        
        if not self.test_contact_id:
            self.log_result(test_name, False, "No contact ID available for testing")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            
            async with self.session.put(
                f"{API_BASE_URL}/admin/contacts/{self.test_contact_id}/read",
                headers=headers
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success'):
                        self.log_result(test_name, True, f"Contact {self.test_contact_id} marked as read")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid response: {data}")
                        return False
                elif response.status == 404:
                    self.log_result(test_name, False, f"Contact not found: {self.test_contact_id}")
                    return False
                else:
                    text = await response.text()
                    self.log_result(test_name, False, f"Status: {response.status}, Response: {text}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def test_delete_contact(self):
        """Test deleting a contact"""
        test_name = "Delete Contact"
        if not self.admin_token:
            self.log_result(test_name, False, "No admin token available")
            return False
        
        if not self.test_contact_id:
            self.log_result(test_name, False, "No contact ID available for testing")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            
            async with self.session.delete(
                f"{API_BASE_URL}/admin/contacts/{self.test_contact_id}",
                headers=headers
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('success'):
                        self.log_result(test_name, True, f"Contact {self.test_contact_id} deleted")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid response: {data}")
                        return False
                elif response.status == 404:
                    self.log_result(test_name, False, f"Contact not found: {self.test_contact_id}")
                    return False
                else:
                    text = await response.text()
                    self.log_result(test_name, False, f"Status: {response.status}, Response: {text}")
                    return False
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    async def run_all_tests(self):
        """Run all tests in sequence"""
        print(f"🚀 Starting Portfolio API Tests")
        print(f"📍 Backend URL: {API_BASE_URL}")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Test contact form functionality
            print("\n📝 Testing Contact Form...")
            await self.test_contact_form_submission()
            await self.test_contact_form_rate_limiting()
            
            # Test admin authentication
            print("\n🔐 Testing Admin Authentication...")
            await self.test_admin_login_success()
            await self.test_admin_login_failure()
            
            # Test admin endpoints
            print("\n👨‍💼 Testing Admin Endpoints...")
            await self.test_get_contacts_with_token()
            await self.test_get_contacts_without_token()
            await self.test_admin_stats()
            
            # Test contact management
            print("\n📊 Testing Contact Management...")
            await self.test_mark_contact_as_read()
            await self.test_delete_contact()
            
        finally:
            await self.cleanup()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        
        if self.results['errors']:
            print("\n🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  • {error}")
        
        success_rate = (self.results['passed'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        return self.results['failed'] == 0


async def main():
    """Main test runner"""
    tester = PortfolioAPITester()
    success = await tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        exit(0)
    else:
        print("\n💥 Some tests failed!")
        exit(1)


if __name__ == "__main__":
    asyncio.run(main())