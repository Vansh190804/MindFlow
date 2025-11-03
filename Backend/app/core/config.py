from pydantic import BaseModel, model_validator
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", os.getenv("SUPABASE_KEY", ""))
    SUPABASE_BUCKET: str = os.getenv("SUPABASE_BUCKET", "mindflow-storage")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "2525"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASS: str = os.getenv("SMTP_PASS", "")
    SMTP_FROM: str = os.getenv("SMTP_FROM", "no-reply@mindflow.app")
    # Optional: enable SMTP debug logs and configure envelope sender
    SMTP_DEBUG: bool = os.getenv("SMTP_DEBUG", "0") in ("1", "true", "True")
    SMTP_ENVELOPE_FROM: str = os.getenv("SMTP_ENVELOPE_FROM", "")

    @model_validator(mode="after")
    def _normalize_database_url(self) -> "Settings":
        db_url = self.DATABASE_URL or ""

        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)

        if db_url.startswith("postgresql://") and "+" not in db_url.split("://", 1)[0]:
            db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

        object.__setattr__(self, "DATABASE_URL", db_url)
        return self

settings = Settings()
