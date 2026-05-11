from typing import Dict, Any, Callable, Optional
from collections import deque
import asyncio


class MessageQueue:
    """In-memory message queue for processing incoming messages."""

    def __init__(self, max_size: int = 10000):
        self._queue = deque(maxlen=max_size)
        self._processors = []
        self._running = False

    def enqueue(self, message: Dict[str, Any]):
        """Add a message to the queue."""
        self._queue.append(message)

    def register_processor(self, processor: Callable):
        """Register a message processor."""
        self._processors.append(processor)

    async def start(self):
        """Start processing the queue."""
        self._running = True
        while self._running:
            if self._queue:
                message = self._queue.popleft()
                for processor in self._processors:
                    try:
                        await processor(message)
                    except Exception as e:
                        print(f"Processor error: {e}")
            else:
                await asyncio.sleep(0.1)

    def stop(self):
        """Stop processing."""
        self._running = False

    @property
    def size(self) -> int:
        return len(self._queue)
