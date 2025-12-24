// Tipos da API
export interface PredictionData {
    ticker: string;
    prediction: string; // "BUY", "SELL", "HOLD"
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

