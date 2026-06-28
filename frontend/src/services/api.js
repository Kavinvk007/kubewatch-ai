import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api');

if (!API_URL.endsWith('/api') && !API_URL.endsWith('/api/')) {
    API_URL = `${API_URL.replace(/\/+$/, '')}/api`;
}
API_URL = API_URL.replace(/\/+$/, '');

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (import.meta.env.DEV && error.config) {
            const failedUrl = `${error.config.baseURL || ''}${error.config.url || ''}`;
            const status = error.response ? error.response.status : 'Network Error';
            console.error(`[API Error] ${status} at ${failedUrl}`, error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
