import { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterBar, {
  type SortOption,
  type FilterOption,
} from "./components/FilterBar";
import StockGrid from "./components/StockGrid";
import SearchModal from "./components/SearchModal";
import { WelcomeModal } from "./components/WelcomeModal";
import TopRankings, { RankingList, BRASIL_TICKERS, INTERNATIONAL_TICKERS } from "./components/TopRankings";
import Metodologia from "./pages/Metodologia";
import About from "./pages/About";

import { useStockList } from "./hooks/useStockList";
import { sortStocks, filterStocks } from "./utils/sortAndFilter";
import { ThemeProvider } from "./context/ThemeContext";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
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

    // Check if user has seen welcome modal
    const hasSeenWelcome = localStorage.getItem('stockdash_seen_welcome');
    if (!hasSeenWelcome) {
      setIsWelcomeOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300 flex flex-col">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Pular para conteúdo principal
      </a>

      <main
        id="main-content"
        className="flex-1 max-w-7xl mx-auto px-4 py-6 space-y-6 w-full"
      >
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
          <Alert variant="destructive" role="alert" aria-live="assertive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              Erro ao carregar ações: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Grid + Rankings (alinhados) */}
        <div className="flex gap-6 items-start">
          {/* Grid */}
          <Card className="p-4 dark:bg-slate-900 dark:border-slate-800 flex-1 min-w-0">
            <StockGrid stocks={filteredAndSortedStocks} loading={loading} />
          </Card>

          {/* Rankings na lateral direita - Desktop */}
          <aside className="hidden xl:block w-[350px] flex-shrink-0 sticky top-24 self-start">
            <TopRankings />
          </aside>
        </div>

        {/* Rankings abaixo do conteúdo - Tablet/Mobile */}
        <div className="xl:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RankingList
              title="TOP 10 BRASIL"
              emoji="🇧🇷"
              subtitle="Melhores oportunidades agora"
              tickers={BRASIL_TICKERS}
            />
            <RankingList
              title="TOP 10 INTERNACIONAL"
              emoji="🌍"
              subtitle="Mercados internacionais"
              tickers={INTERNATIONAL_TICKERS}
            />
          </div>
        </div>
      </main>

      {/* Modal */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStock={addStockDirectly}
      />

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/quem-somos" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
