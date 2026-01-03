// URL base da API - usa variável de ambiente ou valor padrão
export const API_BASE_URL: string = 
    import.meta.env.VITE_APP_API_URL || "http://localhost:8000/api/v1";

interface ApiEndpoints {
    predict: (ticker: string) => string;
    tickerInfo: (ticker: string) => string;
    health: string;
}

export const API_ENDPOINTS: ApiEndpoints = {
    predict: (ticker: string): string => `${API_BASE_URL}/predict/${ticker}`,
    tickerInfo: (ticker: string): string => `${API_BASE_URL}/tickers/info/${ticker}`,
    health: `${API_BASE_URL}/health`,
};
