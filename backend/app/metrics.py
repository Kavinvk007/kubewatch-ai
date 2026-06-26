from prometheus_client import Counter, Histogram, Gauge

# Prometheus Metrics
REQUEST_COUNT = Counter(
    'http_requests_total', 'Total HTTP Requests',
    ['method', 'endpoint', 'http_status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds', 'HTTP Request Latency',
    ['method', 'endpoint']
)

ACTIVE_PODS = Gauge('k8s_active_pods', 'Number of active pods (mock)')
FAILED_PODS = Gauge('k8s_failed_pods', 'Number of failed pods (mock)')
