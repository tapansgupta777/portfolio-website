import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = os.environ.get('GMAIL_USER')
        self.sender_password = os.environ.get('GMAIL_APP_PASSWORD')
        
    async def send_contact_notification(self, name: str, email: str, message: str, timestamp: datetime):
        """Send email notification when contact form is submitted"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'New Contact Form Submission - Portfolio'
            msg['From'] = self.sender_email
            msg['To'] = self.sender_email
            
            # Create email body
            text = f"""
            New Contact Form Submission
            
            You have received a new message from your portfolio website:
            
            Name: {name}
            Email: {email}
            
            Message:
            {message}
            
            Submitted at: {timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}
            """
            
            html = f"""
            <html>
              <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <h2 style="color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">New Contact Form Submission</h2>
                  
                  <p style="color: #333; line-height: 1.6;">You have received a new message from your portfolio website:</p>
                  
                  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong style="color: #00d4ff;">Name:</strong> {name}</p>
                    <p style="margin: 10px 0;"><strong style="color: #00d4ff;">Email:</strong> <a href="mailto:{email}" style="color: #0066cc;">{email}</a></p>
                  </div>
                  
                  <div style="background-color: #fff; border-left: 4px solid #00d4ff; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><strong style="color: #00d4ff;">Message:</strong></p>
                    <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">{message}</p>
                  </div>
                  
                  <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
                    Submitted at: {timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}
                  </p>
                </div>
              </body>
            </html>
            """
            
            # Attach parts
            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')
            msg.attach(part1)
            msg.attach(part2)
            
            # Send email
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                start_tls=True,
                username=self.sender_email,
                password=self.sender_password,
            )
            
            logger.info(f"Email notification sent successfully for contact from {email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False


# Global instance
email_service = EmailService()
