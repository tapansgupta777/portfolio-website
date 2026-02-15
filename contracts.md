# Backend Integration Contracts

## Overview
Adding backend functionality for contact form submissions, email notifications, and simple admin panel.

## Database Schema

### ContactSubmission Model
```python
{
    "id": "uuid",
    "name": "string",
    "email": "string",
    "message": "string",
    "timestamp": "datetime",
    "read": "boolean",
    "ip_address": "string (optional)"
}
```

### AdminUser Model (hardcoded credentials)
```python
{
    "username": "admin",
    "password": "hashed_password"
}
```

## API Endpoints

### 1. Contact Form Submission
- **Endpoint**: `POST /api/contact/submit`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Thank you! Your message has been sent."
  }
  ```
- **Actions**:
  1. Validate input
  2. Store in MongoDB
  3. Send email notification to admin
  4. Return success response

### 2. Admin Login
- **Endpoint**: `POST /api/admin/login`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token"
  }
  ```

### 3. Get All Contact Submissions (Admin)
- **Endpoint**: `GET /api/admin/contacts`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "contacts": [
      {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "message": "string",
        "timestamp": "datetime",
        "read": false
      }
    ]
  }
  ```

### 4. Mark Contact as Read (Admin)
- **Endpoint**: `PUT /api/admin/contacts/{id}/read`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "success": true
  }
  ```

### 5. Delete Contact (Admin)
- **Endpoint**: `DELETE /api/admin/contacts/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "success": true
  }
  ```

## Email Configuration

### Gmail SMTP Settings
- Host: smtp.gmail.com
- Port: 587
- TLS: Enabled
- Email: tapansgupta777@gmail.com
- App Password: cszk udwm vrki nnev

### Email Template (Contact Form Notification)
```
Subject: New Contact Form Submission - Portfolio

You have received a new message from your portfolio website:

Name: {name}
Email: {email}

Message:
{message}

Submitted at: {timestamp}
```

## Frontend Integration

### Contact Form Component (/app/frontend/src/components/Contact.jsx)
- Replace mock alert with API call to `/api/contact/submit`
- Show success/error toast notification
- Clear form on successful submission

### Admin Panel (New Component)
- **Route**: `/admin` (new page)
- **Features**:
  1. Login page
  2. Dashboard showing all contact submissions
  3. Mark as read functionality
  4. Delete functionality
  5. Simple, clean UI matching portfolio theme

### Frontend Routes
```javascript
/admin - Admin login page
/admin/dashboard - Contact submissions list
```

## Security

1. Admin password hashed with bcrypt
2. JWT tokens for admin authentication
3. CORS configured for frontend domain
4. Input validation on all endpoints
5. Rate limiting on contact form (1 submission per IP per 5 minutes)

## Mock Data Removal

Remove from mockData.js:
- None (all mock data stays for portfolio content)

Add to frontend:
- Admin login page
- Admin dashboard page
- API integration for contact form

## Environment Variables

### Backend (.env)
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH={bcrypt_hash}
JWT_SECRET={random_secret}
GMAIL_USER=tapansgupta777@gmail.com
GMAIL_APP_PASSWORD=cszk udwm vrki nnev
```

## Implementation Steps

1. Install Python dependencies: bcrypt, pyjwt, aiosmtplib
2. Create backend models and endpoints
3. Implement email service
4. Create admin login component
5. Create admin dashboard component
6. Update Contact.jsx with API integration
7. Test all functionality
