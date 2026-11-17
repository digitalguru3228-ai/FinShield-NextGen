// FinShield Next-Gen - Centralized API Configuration
// Reads VITE_API_URL from environment variables (e.g. on Vercel deployment)
// Falls back to local FastAPI server (http://127.0.0.1:8000) during local development

const rawUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const API_BASE_URL = rawUrl.replace(/\/+$/, '');
