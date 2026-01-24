import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { getCacheItem, setCacheItem } from "../utils/cache";
// Configurar axios com timeout e headers padrão
const axiosInstance = axios.create({
    timeout: 30000, // 30 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});
// Função auxiliar para tratar erros do axios
const handleApiError = (error, defaultMessage) => {
    if (axios.isAxiosError(error)) {
        // Erro de resposta do servidor (4xx, 5xx)
        if (error.response) {
            const detail = error.response.data?.detail || error.response.statusText;
            const status = error.response.status;
            const message = detail || `${defaultMessage} (Status: ${status})`;
            console.error(`${defaultMessage}:`, message);
            return new Error(message);
        }
        // Erro de rede (sem resposta)
        if (error.request) {
            const message = 'Erro de conexão. Verifique se o backend está rodando em http://localhost:8000';
            console.error(message, error.message);
            return new Error(message);
        }
    }
    // Outros erros
    console.error(defaultMessage, error);
    return error instanceof Error ? error : new Error(defaultMessage);
};
// realiza a predição para um ticker (com cache)
export const getPrediction = async (ticker) => {
    // Check cache first
    const cacheKey = `prediction:${ticker.toUpperCase()}`;
    const cachedData = getCacheItem(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    try {
        const { data } = await axiosInstance.post(API_ENDPOINTS.predict(ticker));
        // Cache for 1 hour (3600 seconds)
        setCacheItem(cacheKey, data, 3600);
        return data;
    }
    catch (error) {
        throw handleApiError(error, 'Erro ao buscar predição');
    }
};
export const getTickerInfo = async (ticker) => {
    // Check cache first
    const cacheKey = `tickerInfo:${ticker.toUpperCase()}`;
    const cachedData = getCacheItem(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    try {
        const { data } = await axiosInstance.get(API_ENDPOINTS.tickerInfo(ticker));
        // Cache for 24 hours (86400 seconds) - ticker info changes less frequently
        setCacheItem(cacheKey, data, 86400);
        return data;
    }
    catch (error) {
        throw handleApiError(error, 'Erro ao buscar informações do ticker');
    }
};
export const checkHealth = async () => {
    try {
        const { data } = await axiosInstance.get(API_ENDPOINTS.health);
        return data;
    }
    catch (error) {
        throw handleApiError(error, 'Erro ao verificar saúde da API');
    }
};
