import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchClick }) => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Q Search stocks by symbol or name..."
                    readOnly
                    onClick={onSearchClick}
                />
                <button className="search-button" onClick={onSearchClick}>
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

