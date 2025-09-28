#!/usr/bin/env python3
import sys
try:
    import fastapi
    print("✓ FastAPI is available")
except ImportError:
    print("✗ FastAPI not installed")
    sys.exit(1)

try:
    import uvicorn
    print("✓ Uvicorn is available")
except ImportError:
    print("✗ Uvicorn not installed")
    sys.exit(1)

print("Python environment check passed!")