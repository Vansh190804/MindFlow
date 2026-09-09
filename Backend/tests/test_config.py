from app.core.config import Settings


def test_settings_normalize_postgres_url():
    settings = Settings(DATABASE_URL="postgres://user:pass@db.example/mindflow")

    assert settings.DATABASE_URL == "postgresql+asyncpg://user:pass@db.example/mindflow"
