// URL base da API - usa variável de ambiente ou valor padrão
export const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8000/api/v1";
export const API_ENDPOINTS = {
    predict: (ticker) => `${API_BASE_URL}/predict/${ticker}`,
    tickerInfo: (ticker) => `${API_BASE_URL}/tickers/info/${ticker}`,
    health: `${API_BASE_URL}/health`,
};
