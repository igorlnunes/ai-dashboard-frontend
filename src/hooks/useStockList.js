import { useState, useCallback } from 'react';
import { getPrediction, getTickerInfo } from '../services/apiService';
export const useStockList = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const addStock = useCallback(async (ticker) => {
        // Verificar se já existe
        if (stocks.some(s => s.data.ticker.toUpperCase() === ticker.toUpperCase())) {
            setError(`Ação ${ticker} já está na lista`);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Buscar predição e informações do ticker em paralelo
            const [predictionData, tickerInfo] = await Promise.all([
                getPrediction(ticker),
                getTickerInfo(ticker).catch(() => null), // Se falhar, continua sem info
            ]);
            const newStock = {
                data: predictionData,
                // API-first: use only if API provides, otherwise undefined
                companyName: tickerInfo?.name,
                peRatio: tickerInfo?.pe_ratio,
            };
            setStocks(prev => [...prev, newStock]);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar ação';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }, [stocks]);
    const removeStock = useCallback((ticker) => {
        setStocks(prev => prev.filter(s => s.data.ticker.toUpperCase() !== ticker.toUpperCase()));
    }, []);
    const addStockDirectly = useCallback((stock) => {
        // Verificar se já existe
        if (stocks.some(s => s.data.ticker.toUpperCase() === stock.data.ticker.toUpperCase())) {
            setError(`Ação ${stock.data.ticker} já está na lista`);
            return;
        }
        setStocks(prev => [...prev, stock]);
    }, [stocks]);
    const loadDefaultStocks = useCallback(async () => {
        const defaultTickers = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];
        setLoading(true);
        setError(null);
        try {
            const stockPromises = defaultTickers.map(async (ticker) => {
                try {
                    const [predictionData, tickerInfo] = await Promise.all([
                        getPrediction(ticker),
                        getTickerInfo(ticker).catch(() => null),
                    ]);
                    const stock = {
                        data: predictionData,
                        // API-first: use only if API provides, otherwise undefined
                        companyName: tickerInfo?.name,
                        peRatio: tickerInfo?.pe_ratio,
                    };
                    return stock;
                }
                catch (err) {
                    console.error(`Erro ao carregar ${ticker}:`, err);
                    return null;
                }
            });
            const results = await Promise.all(stockPromises);
            const validStocks = results.filter((stock) => stock !== null);
            setStocks(validStocks);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar ações padrão';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }, []);
    return {
        stocks,
        loading,
        error,
        addStock,
        removeStock,
        addStockDirectly,
        loadDefaultStocks,
    };
};
