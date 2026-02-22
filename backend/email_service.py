import os
import logging
import httpx
from datetime import datetime

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.api_key = os.environ.get("RESEND_API_KEY")
        self.api_url = "https://api.resend.com/emails"
        self.to_email = "tapansgupta777@gmail.com"  # change this

    async def send_contact_notification(
        self, name: str, email: str, message: str, timestamp: datetime
    ):
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }

            html_content = f"""
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color:#00d4ff;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong></p>
                <div style="white-space: pre-wrap;">{message}</div>
                <hr/>
                <p style="font-size:12px;color:#888;">
                    Submitted at: {timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}
                </p>
            </div>
            """

            payload = {
                "from": "Portfolio <onboarding@resend.dev>",
                "to": [self.to_email],
                "subject": "New Contact Form Submission - Portfolio",
                "html": html_content,
            }

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=payload,
                )

            if response.status_code == 200:
                logger.info(f"Email sent successfully for contact from {email}")
                return True
            else:
                logger.error(f"Resend error: {response.text}")
                return False

        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False


email_service = EmailService()