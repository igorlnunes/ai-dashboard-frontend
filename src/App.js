import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import StockGrid from "./components/StockGrid";
import SearchModal from "./components/SearchModal";
import { WelcomeModal } from "./components/WelcomeModal";
import { useStockList } from "./hooks/useStockList";
import { sortStocks, filterStocks } from "./utils/sortAndFilter";
import { ThemeProvider } from "./context/ThemeContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
function AppContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
    const [sortBy, setSortBy] = useState("ticker-asc");
    const [filterBy, setFilterBy] = useState("all");
    const { stocks, loading, error, addStockDirectly, loadDefaultStocks, } = useStockList();
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
    return (_jsxs("div", { className: "min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300 flex flex-col", children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md", children: "Pular para conte\u00FAdo principal" }), _jsx(Header, {}), _jsxs("main", { id: "main-content", className: "flex-1 max-w-7xl mx-auto px-4 py-6 space-y-6 w-full", children: [_jsx(SearchBar, { onSearchClick: () => setIsModalOpen(true) }), stocks.length > 0 && (_jsx(FilterBar, { sortBy: sortBy, filterBy: filterBy, onSortChange: setSortBy, onFilterChange: setFilterBy })), error && (_jsxs(Alert, { variant: "destructive", role: "alert", "aria-live": "assertive", children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), _jsxs(AlertDescription, { children: ["Erro ao carregar a\u00E7\u00F5es: ", error] })] })), _jsx(Card, { className: "p-4 dark:bg-slate-900 dark:border-slate-800", children: _jsx(StockGrid, { stocks: filteredAndSortedStocks, loading: loading }) })] }), _jsx(SearchModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onAddStock: addStockDirectly }), _jsx(WelcomeModal, { isOpen: isWelcomeOpen, onClose: () => setIsWelcomeOpen(false) })] }));
}
export default function App() {
    return (_jsx(ThemeProvider, { children: _jsx(AppContent, {}) }));
}
