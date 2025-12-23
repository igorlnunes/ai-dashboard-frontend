import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { usePrediction } from '../../hooks/usePrediction';

const StockPrediction: React.FC = () => {
    // estado inicial com ticker da APPLE
    const [ticker, setTicker] = useState<string>('AAPL');

    const { data, loading, error, refetch } = usePrediction(ticker);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        refetch();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTicker(e.target.value.toUpperCase());
    };

    if (loading) {
        return (
            <div className='prediction-container'>
                <div className='loading'>🔄 Carregando predição...</div>
            </div>
        );        
    }

    if (error) {
        return (
            <div className='prediction-container'>
                <div className='error'>❌ Erro: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className='prediction-container'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={ticker}
                        onChange={handleInputChange}
                        placeholder='Digite o ticker (ex: AAPL)'    
                    />
                    <button type='submit'>Buscar Predição</button>
                </form>
            </div>
        )
    }

    const { prediction, confidence, ai_logic, price_data, top_news_analyzed } = data;

    return (
        <div className='prediction-container'>
            <form onSubmit={handleSubmit} className='ticker-form'>
                <input type="text" value={ticker} onChange={handleInputChange}
                placeholder='Digite o ticker (ex: AAPL)' />
                <button type="submit">Buscar</button>
            </form>

            <div className='prediction-result'>
                <h2>{data.ticker}</h2>

                <div className={`prediction-badge ${prediction.toString().toLowerCase()}`}>
                    <span className="prediction-label">{prediction}</span>
                    <span className="confidence">{(confidence * 100).toFixed(2)}</span>
                </div>
                <div className="metric">
                    <label>Variação de Preço</label>
                    <span>{ai_logic.technical_indicators.price_change}</span>
                </div>
                <div className="metric">
                    <label>RSI</label>
                    <span>{ai_logic.technical_indicators.rsi}</span>
                </div>
            </div>

            <div className="news-section">
                <h3>Notícias Analisadas</h3>
                {top_news_analyzed.map((news, index) => (
                    <div key={index} className='news-item'>
                        <div className="news-header">
                            <span className='news-title'>{news.title}</span>
                            <span className={`sentiment ${news.sentiment_score > 0.1 ? 'positive' : news.sentiment_score < -0.1 ? 'negative' : 'neutral'}`}>
                            {news.sentiment_score > 0.1 ? '😊' : news.sentiment_score < -0.1 ? '😟' : '😐'}
                            {news.sentiment_score.toFixed(2)}
                            </span>
                        </div>
                        <div className="news-meta">
                            <span>{news.source}</span>
                            <span>{ new Date(news.published_at).toLocaleDateString() }</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="price-chart">
                <h3>Últimos Preços</h3>
                <div className="price-list">
                    {price_data.slice(-10).map((price, index) => (
                        <div key={index} className='price-item'>
                            <span>{price.date}</span>
                            <span>US${price.close.toFixed(2)}</span>
                            <span className="volume">{price.volume.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default StockPrediction;