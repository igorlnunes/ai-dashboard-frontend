import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import type { PredictionData, TickerInfo } from "../types/api";

// Configurar axios com timeout e headers padrão
const axiosInstance = axios.create({
    timeout: 30000, // 30 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});

// Re-exportar tipos para compatibilidade
export type { PredictionData, TickerInfo };

// Função auxiliar para tratar erros do axios
const handleApiError = (error: any, defaultMessage: string): Error => {
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

// realiza a predição para um ticker
export const getPrediction = async (ticker: string): Promise<PredictionData> => {
    try {
        const { data } = await axiosInstance.post<PredictionData>(API_ENDPOINTS.predict(ticker));
        return data;
    } catch (error) {
        throw handleApiError(error, 'Erro ao buscar predição');
    }
}

export const getTickerInfo = async (ticker: string): Promise<TickerInfo> => {
    try {
        const { data } = await axiosInstance.get<TickerInfo>(API_ENDPOINTS.tickerInfo(ticker));
        return data;
    } catch (error) {
        throw handleApiError(error, 'Erro ao buscar informações do ticker');
    }
}

export const checkHealth = async (): Promise<{ status: string }> => {
    try {
        const { data } = await axiosInstance.get<{ status: string}>(API_ENDPOINTS.health);
        return data;
    } catch (error) {
        throw handleApiError(error, 'Erro ao verificar saúde da API');
    }
}