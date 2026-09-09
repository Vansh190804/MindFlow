import os


os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+asyncpg://mindflow:mindflow@localhost:5432/mindflow",
)
os.environ.setdefault("JWT_SECRET", "ci-test-secret")
os.environ.setdefault("SUPABASE_URL", "https://ci-test.supabase.co")
os.environ.setdefault(
    "SUPABASE_SERVICE_ROLE_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.c2lnbmF0dXJl",
)
