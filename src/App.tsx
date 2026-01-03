import { useEffect, useState, useMemo } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar, {
  type SortOption,
  type FilterOption,
} from "./components/FilterBar";
import StockGrid from "./components/StockGrid";
import SearchModal from "./components/SearchModal";

import { useStockList } from "./hooks/useStockList";
import { sortStocks, filterStocks } from "./utils/sortAndFilter";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("ticker-asc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const {
    stocks,
    loading,
    error,
    addStockDirectly,
    loadDefaultStocks,
  } = useStockList();

  // Filtro + ordenação
  const filteredAndSortedStocks = useMemo(() => {
    const filtered = filterStocks(stocks, filterBy);
    return sortStocks(filtered, sortBy);
  }, [stocks, filterBy, sortBy]);

  useEffect(() => {
    loadDefaultStocks().catch((err) => {
      console.error("Erro ao carregar ações padrão:", err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Barra de busca */}
        <SearchBar onSearchClick={() => setIsModalOpen(true)} />

        {/* Filtros */}
        {stocks.length > 0 && (
          <FilterBar
            sortBy={sortBy}
            filterBy={filterBy}
            onSortChange={setSortBy}
            onFilterChange={setFilterBy}
          />
        )}

        {/* Erro */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao carregar ações: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Grid */}
        <Card className="p-4">
          <StockGrid
            stocks={filteredAndSortedStocks}
            loading={loading}
          />
        </Card>
      </main>

      {/* Modal */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStock={addStockDirectly}
      />
    </div>
  );
}

export default App;
