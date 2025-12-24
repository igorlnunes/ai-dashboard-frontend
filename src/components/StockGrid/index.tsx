import React from 'react';
import StockCard from '../StockCard';
import type { PredictionData } from '../../types/api';
import './StockGrid.css';

interface StockGridProps {
    stocks: Array<{
        data: PredictionData;
        companyName?: string;
        peRatio?: number;
    }>;
    loading?: boolean;
}

const StockGrid: React.FC<StockGridProps> = ({ stocks, loading }) => {
    if (loading) {
        return (
            <div className="stock-grid-loading">
                <div className="loading-spinner">🔄 Carregando ações...</div>
            </div>
        );
    }

    if (stocks.length === 0 && !loading) {
        return (
            <div className="stock-grid-empty">
                <p>Nenhuma ação encontrada. Use a busca para adicionar ações.</p>
                <p style={{ fontSize: '14px', color: '#999', marginTop: '8px' }}>
                    Verifique se o backend está rodando em http://localhost:8000
                </p>
            </div>
        );
    }

    return (
        <div className="stock-grid">
            {stocks.map((stock, index) => (
                <StockCard
                    key={`${stock.data.ticker}-${index}`}
                    data={stock.data}
                    companyName={stock.companyName}
                    peRatio={stock.peRatio}
                />
            ))}
        </div>
    );
};

export default StockGrid;

