from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
import time

from . import models, database, metrics
from .routes import auth_routes, dashboard_routes, incident_routes, ai_routes

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="KubeWatch AI API")

import os

# CORS config
origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:5173",
    "http://localhost:3000",
]

# Read single frontend URL
if os.getenv("FRONTEND_URL"):
    origins.append(os.getenv("FRONTEND_URL"))

# Read multiple frontend URLs
frontend_urls = os.getenv("FRONTEND_URLS")
if frontend_urls:
    origins.extend([url.strip() for url in frontend_urls.split(",") if url.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus middleware
@app.middleware("http")
async def prometheus_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    metrics.REQUEST_COUNT.labels(
        method=request.method, 
        endpoint=request.url.path, 
        http_status=response.status_code
    ).inc()
    
    metrics.REQUEST_LATENCY.labels(
        method=request.method, 
        endpoint=request.url.path
    ).observe(process_time)
    
    return response

# Prometheus endpoint
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# Include Routers
app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(dashboard_routes.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(incident_routes.router, prefix="/api/incidents", tags=["incidents"])
app.include_router(ai_routes.router, prefix="/api/ai", tags=["ai"])

@app.get("/")
@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "KubeWatch AI Backend"}
