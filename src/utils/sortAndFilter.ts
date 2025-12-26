import type { PredictionData } from '../types/api';
import type { SortOption, FilterOption } from '../components/FilterBar';

export interface StockItem {
    data: PredictionData;
    companyName?: string;
    peRatio?: number;
}

// Função para calcular o preço atual
const getCurrentPrice = (stock: StockItem): number => {
    const priceData = stock.data.price_data;
    if (!priceData || priceData.length === 0) return 0;
    return priceData[priceData.length - 1].close;
};

// Função para calcular a variação percentual
const getPriceChange = (stock: StockItem): number => {
    const priceData = stock.data.price_data;
    if (!priceData || priceData.length < 2) return 0;
    const latest = priceData[priceData.length - 1].close;
    const previous = priceData[priceData.length - 2].close;
    if (previous === 0) return 0;
    return ((latest - previous) / previous) * 100;
};

// Função de ordenação
export const sortStocks = (stocks: StockItem[], sortBy: SortOption): StockItem[] => {
    const sorted = [...stocks];
    
    switch (sortBy) {
        case 'ticker-asc':
            return sorted.sort((a, b) => a.data.ticker.localeCompare(b.data.ticker));
        
        case 'ticker-desc':
            return sorted.sort((a, b) => b.data.ticker.localeCompare(a.data.ticker));
        
        case 'price-high':
            return sorted.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a));
        
        case 'price-low':
            return sorted.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b));
        
        case 'change-high':
            return sorted.sort((a, b) => getPriceChange(b) - getPriceChange(a));
        
        case 'change-low':
            return sorted.sort((a, b) => getPriceChange(a) - getPriceChange(b));
        
        case 'confidence-high':
            return sorted.sort((a, b) => b.data.confidence - a.data.confidence);
        
        case 'confidence-low':
            return sorted.sort((a, b) => a.data.confidence - b.data.confidence);
        
        default:
            return sorted;
    }
};

// Função de filtro
export const filterStocks = (stocks: StockItem[], filterBy: FilterOption): StockItem[] => {
    if (filterBy === 'all') {
        return stocks;
    }
    
    return stocks.filter(stock => 
        stock.data.prediction.toUpperCase() === filterBy.toUpperCase()
    );
};


