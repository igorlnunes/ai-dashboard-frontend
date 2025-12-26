import React from 'react';
import './FilterBar.css';

export type SortOption = 'price-high' | 'price-low' | 'change-high' | 'change-low' | 'confidence-high' | 'confidence-low' | 'ticker-asc' | 'ticker-desc';
export type FilterOption = 'all' | 'buy' | 'hold' | 'sell';

interface FilterBarProps {
    sortBy: SortOption;
    filterBy: FilterOption;
    onSortChange: (sort: SortOption) => void;
    onFilterChange: (filter: FilterOption) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ sortBy, filterBy, onSortChange, onFilterChange }) => {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label className="filter-label">Ordenar por:</label>
                <select 
                    className="filter-select" 
                    value={sortBy} 
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                >
                    <option value="ticker-asc">Ticker (A-Z)</option>
                    <option value="ticker-desc">Ticker (Z-A)</option>
                    <option value="price-high">Maior Preço</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="change-high">Maior Alta</option>
                    <option value="change-low">Maior Baixa</option>
                    <option value="confidence-high">Maior Confiança</option>
                    <option value="confidence-low">Menor Confiança</option>
                </select>
            </div>
            
            <div className="filter-group">
                <label className="filter-label">Filtrar por:</label>
                <div className="filter-buttons">
                    <button 
                        className={`filter-button ${filterBy === 'all' ? 'active' : ''}`}
                        onClick={() => onFilterChange('all')}
                    >
                        Todas
                    </button>
                    <button 
                        className={`filter-button filter-buy ${filterBy === 'buy' ? 'active' : ''}`}
                        onClick={() => onFilterChange('buy')}
                    >
                        BUY
                    </button>
                    <button 
                        className={`filter-button filter-hold ${filterBy === 'hold' ? 'active' : ''}`}
                        onClick={() => onFilterChange('hold')}
                    >
                        HOLD
                    </button>
                    <button 
                        className={`filter-button filter-sell ${filterBy === 'sell' ? 'active' : ''}`}
                        onClick={() => onFilterChange('sell')}
                    >
                        SELL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;


