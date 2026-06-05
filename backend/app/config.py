import os
from pathlib import Path

from dotenv import load_dotenv

# Load the backend-local .env even when the process starts from another directory.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env", override=True)

DATABASE_URL: str = os.environ["DATABASE_URL"]
SECRET_KEY: str = os.environ["SECRET_KEY"]  # MUST be set in production (32+ chars)
ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
ADMIN_USERNAME: str = os.environ["ADMIN_USERNAME"]  # MUST be set in production
ADMIN_PASSWORD: str = os.environ["ADMIN_PASSWORD"]  # MUST be set in production
ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "")  # Email address of the admin
ALLOWED_ORIGINS: str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")
DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

# SMTP for password reset emails
SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER: str = os.getenv("SMTP_USER", "")
SMTP_PASS: str = os.getenv("SMTP_PASS", "")
FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
