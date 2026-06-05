"""Auth router - admin login, forgot password, reset password."""

import logging
import smtplib
import threading
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import APIRouter, HTTPException, Request, status

from app.auth import create_access_token
from app.config import (
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    ADMIN_USERNAME,
    FRONTEND_URL,
    SECRET_KEY,
    ALGORITHM,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_PASS,
    SMTP_USER,
)
from app.schemas import ForgotPasswordRequest, ResetPasswordRequest, TokenResponse

from jose import JWTError, jwt

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["Auth"])

RESET_TOKEN_EXPIRE_MINUTES = 30


def _create_reset_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": username, "exp": expire, "type": "reset"}, SECRET_KEY, algorithm=ALGORITHM)


def _send_reset_email(to_email: str, reset_link: str):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Admin Password Reset – Izone Technologies"
        msg["From"] = SMTP_USER
        msg["To"] = to_email

        html = f"""
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:8px">
          <h2 style="margin-bottom:8px">Password Reset Request</h2>
          <p style="color:#6b7280">Click the button below to reset your admin password. This link expires in {RESET_TOKEN_EXPIRE_MINUTES} minutes.</p>
          <a href="{reset_link}" style="display:inline-block;margin:24px 0;padding:12px 24px;background:#111827;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">Reset Password</a>
          <p style="color:#9ca3af;font-size:12px">If you didn't request this, ignore this email.</p>
          <p style="color:#9ca3af;font-size:12px">Link: {reset_link}</p>
        </div>
        """
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
        logger.info(f"Password reset email sent to {to_email}")
    except Exception as e:
        logger.error(f"Failed to send reset email: {e}")


@router.post("/login", response_model=TokenResponse)
async def admin_login(request: Request):
    try:
        content_type = request.headers.get("content-type", "").lower()

        if "application/json" in content_type:
            payload = await request.json()
            username = payload.get("username", "")
            password = payload.get("password", "")
        else:
            form = await request.form()
            username = str(form.get("username", ""))
            password = str(form.get("password", ""))

        if username != ADMIN_USERNAME or password != ADMIN_PASSWORD:
            logger.warning(f"Failed login attempt for username: {username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        token = create_access_token(data={"sub": username})
        logger.info(f"Successful login for username: {username}")
        return TokenResponse(access_token=token)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during login: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login",
        )


@router.post("/forgot-password")
async def forgot_password(body: ForgotPasswordRequest):
    identifier = body.identifier.strip()
    is_admin = identifier == ADMIN_USERNAME or (ADMIN_EMAIL and identifier == ADMIN_EMAIL)

    # Always return success to avoid username/email enumeration
    if not is_admin or not ADMIN_EMAIL or not SMTP_USER or not SMTP_PASS:
        return {"message": "If that account exists, a reset email has been sent."}

    token = _create_reset_token(ADMIN_USERNAME)
    reset_link = f"{FRONTEND_URL}/admin/reset-password?token={token}"
    threading.Thread(target=_send_reset_email, args=(ADMIN_EMAIL, reset_link), daemon=True).start()
    return {"message": "If that account exists, a reset email has been sent."}


@router.post("/reset-password")
async def reset_password(body: ResetPasswordRequest):
    credentials_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired reset link.",
    )
    try:
        payload = jwt.decode(body.token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "reset":
            raise credentials_exception
        username: str = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Persist new password to .env file
    import os
    from pathlib import Path
    env_path = Path(__file__).resolve().parent.parent.parent / ".env"
    lines = env_path.read_text().splitlines()
    new_lines = []
    for line in lines:
        if line.startswith("ADMIN_PASSWORD="):
            new_lines.append(f"ADMIN_PASSWORD={body.new_password}")
        else:
            new_lines.append(line)
    env_path.write_text("\n".join(new_lines) + "\n")

    # Reload config in memory
    import app.config as cfg
    cfg.ADMIN_PASSWORD = body.new_password
    os.environ["ADMIN_PASSWORD"] = body.new_password

    logger.info("Admin password reset successfully.")
    return {"message": "Password reset successfully. You can now log in."}
