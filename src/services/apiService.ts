import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export interface PredictionData {
    ticker: string;
    prediction: number;
    confidence: number;
    ai_logic: {
        sentiment_analysis: { average_sentiment: number };
        technical_indicators: { price_change: string | number; rsi: string | number };
    };
    price_data: Array<{date: string; close: number; volume: number}>;
    top_news_analyzed: Array<{title: string; sentiment_score: number; source: string; published_at: string}>;
}

export interface TickerInfo {
    symbol: string;
    name: string;
    sector?: string;
    industry?: string;
}

// realiza a predição para um ticker
export const getPrediction = async (ticker: string): Promise<PredictionData> => {
    try {
        const { data } = await axios.post<PredictionData>(API_ENDPOINTS.predict(ticker));
        return data;
    } catch (error) {
        debugError(error, 'Erro ao buscar informações');
        throw error;
    }
}

export const getTickerInfo = async (ticker: string): Promise<TickerInfo> => {
    try {
        const { data } = await axios.get<TickerInfo>(API_ENDPOINTS.tickerInfo(ticker));
        return data;
    } catch (error) {
        debugError(error, 'Erro ao buscar informações');
        throw error;
    }
}

export const checkHealth = async (): Promise<{ status: string }> => {
    try {
        const { data } = await axios.get<{ status: string}>(API_ENDPOINTS.health);
        return data;
    } catch (error) {
        console.error("API Offline: ", error);
        throw error;
    }
}


const debugError = (error: any, stdMessage: string) => {
    if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail || error.message;
        console.error(`${stdMessage}:`, detail);
        throw new Error(detail);
    }
    console.error(stdMessage, error);
}