from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import datetime
import math
from sqlalchemy import select
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.db.sessions import get_db
from app.modals.user import User
from app.modals.item import Item
from app.core.security import decode_jwt
from app.core.gemini_client import create_embedding

router = APIRouter()
security = HTTPBearer()
# Filter out weak semantic relationships while still allowing exact text matches.
SEMANTIC_MATCH_THRESHOLD = 0.55
MAX_SEARCH_RESULTS = 50


def cosine_similarity(first: List[float], second: List[float]) -> float:
    """Return cosine similarity for two embeddings with matching dimensions."""
    if not first or not second or len(first) != len(second):
        return 0.0

    dot_product = sum(left * right for left, right in zip(first, second))
    first_norm = math.sqrt(sum(value * value for value in first))
    second_norm = math.sqrt(sum(value * value for value in second))
    if not first_norm or not second_norm:
        return 0.0
    return dot_product / (first_norm * second_norm)


def get_searchable_text(item: Item) -> str:
    metadata = item.ai_meta or {}
    tags = item.tags or metadata.get("tags") or []
    return " ".join(
        str(value)
        for value in (
            item.title,
            item.content,
            metadata.get("description"),
            *tags,
        )
        if value
    ).casefold()


def get_embedding(item: Item) -> Optional[List[float]]:
    embedding = (item.ai_meta or {}).get("embedding")
    if not isinstance(embedding, list):
        return None
    if not all(isinstance(value, (int, float)) for value in embedding):
        return None
    return [float(value) for value in embedding]


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = decode_jwt(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )

    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    return user


@router.get("/")
async def search_items(
    q: str = Query(..., description="Search query"),
    types: Optional[str] = Query(None, description="Comma-separated content types"),
    date_from: Optional[datetime] = Query(None, description="Filter by creation date from"),
    date_to: Optional[datetime] = Query(None, description="Filter by creation date to"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Search the user's items by semantic similarity with lexical fallback."""
    query = select(Item).filter(Item.user_id == current_user.id)

    if types:
        type_list = [t.strip() for t in types.split(",")]
        query = query.filter(Item.type.in_(type_list))

    # Filter by date range
    if date_from:
        query = query.filter(Item.created_at >= date_from)
    if date_to:
        query = query.filter(Item.created_at <= date_to)

    query = query.order_by(Item.created_at.desc())
    result = await db.execute(query)
    items = list(result.scalars().all())

    try:
        query_embedding = await create_embedding(q, task_type="retrieval_query")
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Semantic search is temporarily unavailable. Please try again.",
        ) from exc

    normalized_query = q.casefold().strip()
    ranked_items: List[tuple[float, datetime, Item]] = []
    for item in items:
        item_embedding = get_embedding(item)
        similarity = cosine_similarity(query_embedding, item_embedding) if item_embedding else 0.0
        lexical_match = normalized_query in get_searchable_text(item)

        # Keep exact text matches even when an older item has no embedding.
        if similarity >= SEMANTIC_MATCH_THRESHOLD or lexical_match:
            lexical_boost = 0.15 if lexical_match else 0.0
            ranked_items.append((similarity + lexical_boost, item.created_at, item))

    ranked_items.sort(key=lambda match: (match[0], match[1]), reverse=True)
    items = [item for _, _, item in ranked_items[:MAX_SEARCH_RESULTS]]

    # Format response
    result_items = []
    for item in items:
        item_dict = {
            "id": item.id,
            "type": item.type,
            "title": item.title,
            # Prefer AI description for search/result previews; fall back to title
            "description": (item.ai_meta.get("description") if item.ai_meta else item.title),
            # Keep original content (what user saved)
            "content": item.content,
            "url": item.url,
            "storage_path": item.storage_path,
            "mime_type": item.mime_type,
            # Merge tags from column or ai_meta
            "tags": item.tags if item.tags else (item.ai_meta.get("tags", []) if item.ai_meta else []),
            "category": item.ai_meta.get("category", "") if item.ai_meta else "",
            "created_at": item.created_at.isoformat(),
            "updated_at": item.updated_at.isoformat() if item.updated_at else item.created_at.isoformat(),
        }
        result_items.append(item_dict)

    return {
        "items": result_items,
        "count": len(result_items),
        "query": q,
        "search_mode": "semantic",
    }
