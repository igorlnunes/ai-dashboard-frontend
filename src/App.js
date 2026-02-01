import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
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
    return (_jsxs("div", { className: "min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300 flex flex-col", children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md", children: "Pular para conte\u00FAdo principal" }), _jsxs("main", { id: "main-content", className: "flex-1 max-w-7xl mx-auto px-4 py-6 space-y-6 w-full", children: [_jsx(SearchBar, { onSearchClick: () => setIsModalOpen(true) }), stocks.length > 0 && (_jsx(FilterBar, { sortBy: sortBy, filterBy: filterBy, onSortChange: setSortBy, onFilterChange: setFilterBy })), error && (_jsxs(Alert, { variant: "destructive", role: "alert", "aria-live": "assertive", children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), _jsxs(AlertDescription, { children: ["Erro ao carregar a\u00E7\u00F5es: ", error] })] })), _jsxs("div", { className: "flex gap-6 items-start", children: [_jsx(Card, { className: "p-4 dark:bg-slate-900 dark:border-slate-800 flex-1 min-w-0", children: _jsx(StockGrid, { stocks: filteredAndSortedStocks, loading: loading }) }), _jsx("aside", { className: "hidden xl:block w-[350px] flex-shrink-0 sticky top-24 self-start", children: _jsx(TopRankings, {}) })] }), _jsx("div", { className: "xl:hidden", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(RankingList, { title: "TOP 10 BRASIL", emoji: "\uD83C\uDDE7\uD83C\uDDF7", subtitle: "Melhores oportunidades agora", tickers: BRASIL_TICKERS }), _jsx(RankingList, { title: "TOP 10 INTERNACIONAL", emoji: "\uD83C\uDF0D", subtitle: "Mercados internacionais", tickers: INTERNATIONAL_TICKERS })] }) })] }), _jsx(SearchModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onAddStock: addStockDirectly }), _jsx(WelcomeModal, { isOpen: isWelcomeOpen, onClose: () => setIsWelcomeOpen(false) })] }));
}
export default function App() {
    return (_jsx(ThemeProvider, { children: _jsxs(BrowserRouter, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/metodologia", element: _jsx(Metodologia, {}) }), _jsx(Route, { path: "/quem-somos", element: _jsx(About, {}) })] })] }) }));
}
