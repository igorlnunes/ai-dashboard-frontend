import { useState, useCallback } from 'react';
import { getPrediction, getTickerInfo } from '../services/apiService';
import type { PredictionData } from '../types/api';
import { getPERatio, getCompanyName } from '../utils/stockData';

interface StockItem {
    data: PredictionData;
    companyName?: string;
    peRatio?: number;
}

export const useStockList = () => {
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const addStock = useCallback(async (ticker: string) => {
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

            const newStock: StockItem = {
                data: predictionData,
                // Priorizar dados da API, usar fallback apenas se necessário
                companyName: tickerInfo?.name || getCompanyName(ticker) || undefined,
                // P/E ratio: usar apenas se a API fornecer, caso contrário undefined
                peRatio: tickerInfo && 'pe_ratio' in tickerInfo 
                    ? (tickerInfo as any).pe_ratio 
                    : getPERatio(ticker) || undefined,
            };

            setStocks(prev => [...prev, newStock]);
        } catch (err: any) {
            setError(err.message || 'Erro ao adicionar ação');
        } finally {
            setLoading(false);
        }
    }, [stocks]);

    const removeStock = useCallback((ticker: string) => {
        setStocks(prev => prev.filter(s => s.data.ticker.toUpperCase() !== ticker.toUpperCase()));
    }, []);

    const addStockDirectly = useCallback((stock: StockItem) => {
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

                    const stock: StockItem = {
                        data: predictionData,
                        // Priorizar dados da API, usar fallback apenas se necessário
                        companyName: tickerInfo?.name || getCompanyName(ticker) || undefined,
                        // P/E ratio: usar apenas se a API fornecer, caso contrário undefined
                        peRatio: tickerInfo && 'pe_ratio' in tickerInfo 
                            ? (tickerInfo as any).pe_ratio 
                            : getPERatio(ticker) || undefined,
                    };
                    return stock;
                } catch (err) {
                    console.error(`Erro ao carregar ${ticker}:`, err);
                    return null;
                }
            });

            const results = await Promise.all(stockPromises);
            const validStocks = results.filter((stock): stock is StockItem => stock !== null);
            setStocks(validStocks);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar ações padrão');
        } finally {
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

