import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from app.routers import recommendations, products, feedback

# Initialize FastAPI app
app = FastAPI(
    title="AI Shopping Recommendation API",
    description="智能购物推荐系统后端API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recommendations.router, prefix="/api/v1", tags=["recommendations"])
app.include_router(products.router, prefix="/api/v1", tags=["products"])
app.include_router(feedback.router, prefix="/api/v1", tags=["feedback"])

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "AI Shopping Recommendation API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["app"]
    )