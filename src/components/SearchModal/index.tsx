import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { usePrediction } from '../../hooks/usePrediction';
import { getTickerInfo } from '../../services/apiService';
import { getPERatio, getCompanyName } from '../../utils/stockData';
import StockCard from '../StockCard';
import './SearchModal.css';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddStock: (data: any) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onAddStock }) => {
    const [ticker, setTicker] = useState<string>('AAPL');
    const [searchTicker, setSearchTicker] = useState<string>('');
    const { data, loading, error, refetch } = usePrediction(ticker);

    useEffect(() => {
        if (ticker && ticker !== 'AAPL') {
            refetch();
        }
    }, [ticker, refetch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (searchTicker.trim()) {
            setTicker(searchTicker.toUpperCase());
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTicker(e.target.value.toUpperCase());
    };

    const handleAddStock = async (): Promise<void> => {
        if (data) {
            try {
                // Tentar buscar informações do ticker
                let tickerInfo = null;
                try {
                    tickerInfo = await getTickerInfo(data.ticker);
                } catch (err) {
                    // Se falhar, usar dados locais
                }
            
                onAddStock({
                    data,
                    // Priorizar dados da API
                    companyName: tickerInfo?.name || getCompanyName(data.ticker) || undefined,
                    // P/E ratio: usar apenas se a API fornecer
                    peRatio: tickerInfo && 'pe_ratio' in tickerInfo 
                        ? (tickerInfo as any).pe_ratio 
                        : getPERatio(data.ticker) || undefined,
                });
                setSearchTicker('');
                setTicker('AAPL');
                onClose();
            } catch (err) {
                console.error('Erro ao adicionar ação:', err);
            }
        }
    };

    const handleClose = (): void => {
        setSearchTicker('');
        setTicker('AAPL');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Buscar Ação</h2>
                    <button className="modal-close" onClick={handleClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        value={searchTicker}
                        onChange={handleInputChange}
                        placeholder="Digite o ticker (ex: AAPL, TSLA, GOOGL)"
                        className="modal-input"
                        autoFocus
                    />
                    <button type="submit" className="modal-submit" disabled={loading || !searchTicker.trim()}>
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                </form>

                {error && (
                    <div className="modal-error">
                        ❌ Erro: {error}
                    </div>
                )}

                {loading && (
                    <div className="modal-loading">
                        🔄 Carregando predição...
                    </div>
                )}

                {data && !loading && (
                    <div className="modal-result">
                        <StockCard
                            data={data}
                            companyName={undefined}
                            peRatio={undefined}
                        />
                        <button className="modal-add-button" onClick={handleAddStock}>
                            Adicionar à Lista
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;

