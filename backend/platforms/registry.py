from typing import Dict, Type
from platforms.base import PlatformConnector
from platforms.telegram import TelegramConnector
from platforms.instagram import InstagramConnector
from platforms.whatsapp import WhatsAppConnector
from platforms.shopee import ShopeeConnector


PLATFORM_REGISTRY: Dict[str, Type[PlatformConnector]] = {
    "telegram": TelegramConnector,
    "instagram": InstagramConnector,
    "whatsapp": WhatsAppConnector,
    "shopee": ShopeeConnector,
}


def get_connector(platform: str, credentials: dict, settings: dict = None) -> PlatformConnector:
    connector_class = PLATFORM_REGISTRY.get(platform)
    if not connector_class:
        raise ValueError(f"Unsupported platform: {platform}")
    return connector_class(credentials=credentials, settings=settings or {})


def list_supported_platforms() -> list:
    return list(PLATFORM_REGISTRY.keys())
