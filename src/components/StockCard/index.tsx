import React from 'react';
import type { PredictionData } from '../../types/api';
import Sparkline from '../Sparkline';
import './StockCard.css';

interface StockCardProps {
    data: PredictionData;
    companyName?: string;
    peRatio?: number;
}

const StockCard: React.FC<StockCardProps> = ({ data, companyName, peRatio }) => {
    // TODOS OS DADOS VÊM DA API (PredictionData):
    // - Preço atual: calculado de price_data (último close)
    // - Variação: calculada comparando últimos 2 preços
    // - Volume: do último registro de price_data
    // - Predição: data.prediction (BUY/SELL/HOLD)
    // - Confiança: data.confidence
    
    const latestPrice = data.price_data && data.price_data.length > 0 
        ? data.price_data[data.price_data.length - 1].close 
        : 0;
    
    const previousPrice = data.price_data && data.price_data.length > 1
        ? data.price_data[data.price_data.length - 2].close
        : latestPrice;
    
    const priceChange = latestPrice - previousPrice;
    const priceChangePercent = previousPrice !== 0 
        ? ((priceChange / previousPrice) * 100).toFixed(2)
        : '0.00';
    
    const isPositive = priceChange >= 0;
    
    // Volume real da API
    const totalVolume = data.price_data && data.price_data.length > 0
        ? data.price_data[data.price_data.length - 1].volume
        : 0;
    
    const volumeFormatted = totalVolume >= 1000000 
        ? `${(totalVolume / 1000000).toFixed(1)}M`
        : totalVolume >= 1000
        ? `${(totalVolume / 1000).toFixed(1)}K`
        : totalVolume.toFixed(0);
    
    // Dados para Sparkline (últimos 20 pontos ou todos se tiver menos)
    const sparklineData = data.price_data && data.price_data.length > 0
        ? data.price_data.slice(-20).map(p => p.close)
        : [];
    
    // Calcular volatilidade (desvio padrão dos últimos preços)
    const calculateVolatility = (prices: number[]): 'Baixa' | 'Média' | 'Alta' => {
        if (prices.length < 2) return 'Média';
        const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const stdDev = Math.sqrt(variance);
        const volatilityPercent = (stdDev / mean) * 100;
        
        if (volatilityPercent < 2) return 'Baixa';
        if (volatilityPercent < 5) return 'Média';
        return 'Alta';
    };
    
    const volatility = sparklineData.length > 0 ? calculateVolatility(sparklineData) : 'Média';
    
    // Calcular posição da predição na barra (0-100)
    const confidenceValue = data.confidence * 100;
    let predictionPosition = 0;
    let predictionSegment = data.prediction.toLowerCase();
    
    // Posição baseada na predição e confiança
    // A confiança já indica a força da predição (0-100)
    if (data.prediction === 'BUY') {
        // BUY: 60-100, mapear confiança para esse range
        // Se confidence é alta (ex: 80%), fica mais à direita (ex: 80%)
        predictionPosition = 60 + (confidenceValue / 100) * 40;
        predictionPosition = Math.max(60, Math.min(100, predictionPosition));
    } else if (data.prediction === 'HOLD') {
        // HOLD: 40-60, mapear confiança para o meio
        // Se confidence é 50%, fica no meio (50%)
        predictionPosition = 40 + (confidenceValue / 100) * 20;
        predictionPosition = Math.max(40, Math.min(60, predictionPosition));
    } else {
        // SELL: 0-40, mapear confiança para a esquerda
        // Se confidence é alta (ex: 80%), fica mais à esquerda (ex: 32%)
        predictionPosition = (confidenceValue / 100) * 40;
        predictionPosition = Math.max(0, Math.min(40, predictionPosition));
    }

    return (
        <div className="stock-card">
            <div className="stock-card-header">
                <div className="stock-info">
                    <h3 className="stock-ticker">{data.ticker}</h3>
                    {companyName && <p className="stock-name">{companyName}</p>}
                </div>
                <span className="live-badge">Live</span>
            </div>
            
            <div className="stock-price-section">
                <div className="stock-price">${latestPrice.toFixed(2)}</div>
                <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}${priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent}%)
                </div>
                {sparklineData.length > 0 && (
                    <div className="sparkline-wrapper">
                        <Sparkline data={sparklineData} width={200} height={50} />
                    </div>
                )}
            </div>
            
            <div className="ai-prediction-section">
                <div className="prediction-label">AI Prediction</div>
                <div className="prediction-bar-container">
                    <div className="prediction-bar">
                        <div className="prediction-segment sell-segment" style={{ width: '40%' }}></div>
                        <div className="prediction-segment hold-segment" style={{ width: '20%' }}></div>
                        <div className="prediction-segment buy-segment" style={{ width: '40%' }}></div>
                        <div 
                            className={`prediction-indicator ${predictionSegment}`}
                            style={{ left: `${predictionPosition}%` }}
                        >
                            <div className="prediction-arrow"></div>
                            <div className="prediction-button">{data.prediction}</div>
                        </div>
                    </div>
                    <div className="prediction-labels">
                        <span>SELL</span>
                        <span>HOLD</span>
                        <span>BUY</span>
                    </div>
                    <div className="prediction-ranges">
                        <span>0-40</span>
                        <span>40-60</span>
                        <span>60-100</span>
                    </div>
                </div>
                <div className="confidence-section">
                    <div className="confidence-value">
                        <span className="confidence-icon">🛡️</span>
                        {confidenceValue.toFixed(2)}% confidence
                    </div>
                    <div className="prediction-context">
                        Previsão para as próximas 24h
                    </div>
                </div>
            </div>
            
            <div className="stock-metrics">
                <div className="metric-item">
                    <span className="metric-label">Volume:</span>
                    <span className="metric-value">{volumeFormatted}</span>
                </div>
                {peRatio && (
                    <div className="metric-item">
                        <span className="metric-label">P/E:</span>
                        <span className="metric-value">{peRatio.toFixed(1)}</span>
                    </div>
                )}
                <div className="metric-item">
                    <span className="metric-label">Volatilidade:</span>
                    <span className={`metric-value volatility-${volatility.toLowerCase()}`}>
                        {volatility}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StockCard;

