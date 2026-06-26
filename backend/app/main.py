from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
import time

from . import models, database, metrics
from .routes import auth_routes, dashboard_routes, incident_routes, ai_routes

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="KubeWatch AI API")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
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

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
