import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePrediction } from "../../hooks/usePrediction";
import { getTickerInfo } from "../../services/apiService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, Loader2, AlertCircle, Plus, Clock } from "lucide-react";
import { StockCard } from "../StockCard";
const SEARCH_HISTORY_KEY = "stockdash_search_history";
const MAX_HISTORY = 5;
export default function SearchModal({ isOpen, onClose, onAddStock }) {
    const [ticker, setTicker] = useState("GOOGL");
    const [searchTicker, setSearchTicker] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const { data, loading, error, refetch } = usePrediction(ticker);
    // Load search history from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
        if (stored) {
            try {
                setSearchHistory(JSON.parse(stored));
            }
            catch {
                setSearchHistory([]);
            }
        }
    }, []);
    useEffect(() => {
        if (ticker) {
            refetch();
        }
    }, [ticker, refetch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTicker.trim()) {
            const upperTicker = searchTicker.toUpperCase();
            setTicker(upperTicker);
            // Add to search history
            const updated = [
                upperTicker,
                ...searchHistory.filter((t) => t !== upperTicker),
            ].slice(0, MAX_HISTORY);
            setSearchHistory(updated);
            localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
        }
    };
    const handleHistoryClick = (historyTicker) => {
        setSearchTicker(historyTicker);
        setTicker(historyTicker);
    };
    const clearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem(SEARCH_HISTORY_KEY);
    };
    const handleInputChange = (e) => {
        setSearchTicker(e.target.value.toUpperCase());
    };
    const handleDropdownChange = (value) => {
        setTicker(value);
        setSearchTicker(value);
    };
    const handleAddStock = async () => {
        if (!data)
            return;
        try {
            let tickerInfo = null;
            try {
                tickerInfo = await getTickerInfo(data.ticker);
            }
            catch {
                // fallback silencioso
            }
            onAddStock({
                data,
                companyName: tickerInfo?.name,
                peRatio: tickerInfo?.pe_ratio,
            });
            setSearchTicker("");
            setTicker("AAPL");
            onClose();
        }
        catch (err) {
            console.error("Erro ao adicionar ação:", err);
        }
    };
    const handleClose = () => {
        setSearchTicker("");
        setTicker("TSLA");
        onClose();
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "max-w-3xl bg-background text-foreground z-50 pointer-events-auto", role: "dialog", "aria-labelledby": "search-modal-title", "aria-describedby": "search-modal-description", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { id: "search-modal-title", className: "flex items-center gap-2", children: [_jsx(Search, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }), "Buscar A\u00E7\u00E3o"] }) }), _jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 items-center", children: [_jsx(Input, { autoFocus: true, value: searchTicker, onChange: handleInputChange, placeholder: "Digite o ticker (ex: AAPL, TSLA, GOOGL)", className: "flex-1 focus:outline-none focus:ring-2 focus:ring-primary", "aria-label": "Insira o s\u00EDmbolo do ticker da a\u00E7\u00E3o que deseja pesquisar" }), _jsxs(Select, { onValueChange: handleDropdownChange, children: [_jsx(SelectTrigger, { className: "w-[150px]", "aria-label": "Selecione uma a\u00E7\u00E3o popular", children: _jsx(SelectValue, { placeholder: "Populares" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "AAPL", children: "Apple (AAPL)" }), _jsx(SelectItem, { value: "TSLA", children: "Tesla (TSLA)" }), _jsx(SelectItem, { value: "GOOGL", children: "Google (GOOGL)" }), _jsx(SelectItem, { value: "MSFT", children: "Microsoft (MSFT)" }), _jsx(SelectItem, { value: "AMZN", children: "Amazon (AMZN)" }), _jsx(SelectItem, { value: "NVDA", children: "NVIDIA (NVDA)" })] })] }), _jsx(Button, { type: "submit", disabled: loading || !searchTicker.trim(), className: "gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background", "aria-label": loading ? "Buscando informações" : "Buscar previsão da ação", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin", "aria-hidden": "true" }), "Buscando"] })) : ("Buscar") })] }), searchHistory.length > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800", role: "region", "aria-label": "Hist\u00F3rico de buscas recentes", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-xs font-semibold text-muted-foreground flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3", "aria-hidden": "true" }), "Buscas Recentes"] }), _jsx("button", { onClick: clearHistory, className: "text-xs text-muted-foreground hover:text-foreground transition focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1", "aria-label": "Limpar hist\u00F3rico de buscas", children: "Limpar" })] }), _jsx("div", { className: "flex gap-2 flex-wrap", children: searchHistory.map((historyTicker) => (_jsx("button", { onClick: () => handleHistoryClick(historyTicker), className: "px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-foreground", children: historyTicker }, historyTicker))) })] })), error && (_jsxs(Alert, { variant: "destructive", className: "mt-4", role: "alert", "aria-live": "assertive", children: [_jsx(AlertCircle, { className: "h-4 w-4", "aria-hidden": "true" }), _jsxs(AlertDescription, { children: ["Erro ao buscar ticker: ", error] })] })), loading && (_jsxs("div", { className: "flex items-center justify-center py-10 text-muted-foreground gap-2", role: "status", "aria-live": "polite", children: [_jsx(Loader2, { className: "h-5 w-5 animate-spin", "aria-hidden": "true" }), "Carregando predi\u00E7\u00E3o..."] })), data && !loading && (_jsxs("div", { className: "space-y-4 pt-4 animate-in fade-in duration-300", children: [_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsx(StockCard, { data: data, companyName: undefined, peRatio: undefined }) }) }), _jsxs(Button, { onClick: handleAddStock, className: "w-full gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background", "aria-label": `Adicionar ${data?.ticker || 'ação'} à sua lista`, children: [_jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }), "Adicionar \u00E0 Lista"] })] }))] }) }));
}
