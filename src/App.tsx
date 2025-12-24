import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar, { type SortOption, type FilterOption } from './components/FilterBar';
import StockGrid from './components/StockGrid';
import SearchModal from './components/SearchModal';
import { useStockList } from './hooks/useStockList';
import { sortStocks, filterStocks } from './utils/sortAndFilter';

function App() {
  console.log('App renderizando...');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('ticker-asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const { stocks, loading, error, addStockDirectly, loadDefaultStocks } = useStockList();

  console.log('Estado do App:', { stocks: stocks.length, loading, error });

  // Aplicar filtro e ordenação
  const filteredAndSortedStocks = useMemo(() => {
    const filtered = filterStocks(stocks, filterBy);
    return sortStocks(filtered, sortBy);
  }, [stocks, filterBy, sortBy]);

  useEffect(() => {
    // Carregar ações padrão ao montar o componente
    console.log('useEffect executado, carregando ações padrão...');
    loadDefaultStocks().catch((err) => {
      console.error('Erro ao carregar ações padrão:', err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Carregar apenas uma vez ao montar

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStock = (stock: any) => {
    addStockDirectly(stock);
  };

  return (
    <div className='screen-w'>
      <Header />
      <SearchBar onSearchClick={handleSearchClick} />
      {stocks.length > 0 && (
        <FilterBar 
          sortBy={sortBy}
          filterBy={filterBy}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
        />
      )}
      {error && (
        <div style={{ 
          padding: '16px', 
          margin: '16px', 
          background: '#ffebee', 
          color: '#c62828', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          ⚠️ Erro: {error}
        </div>
      )}
      <StockGrid stocks={filteredAndSortedStocks} loading={loading} />
      <SearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddStock={handleAddStock}
      />
    </div>
  );
}

export default App;
