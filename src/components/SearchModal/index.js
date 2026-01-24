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
import { Search, Loader2, AlertCircle, Plus } from "lucide-react";
import { StockCard } from "../StockCard";
export default function SearchModal({ isOpen, onClose, onAddStock }) {
    const [ticker, setTicker] = useState("GOOGL");
    const [searchTicker, setSearchTicker] = useState("");
    const { data, loading, error, refetch } = usePrediction(ticker);
    useEffect(() => {
        if (ticker) {
            refetch();
        }
    }, [ticker, refetch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTicker.trim()) {
            setTicker(searchTicker.toUpperCase());
        }
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
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "max-w-3xl bg-background text-foreground z-50 pointer-events-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Search, { className: "h-5 w-5 text-primary" }), "Buscar A\u00E7\u00E3o"] }) }), _jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 items-center", children: [_jsx(Input, { autoFocus: true, value: searchTicker, onChange: handleInputChange, placeholder: "Digite o ticker (ex: AAPL, TSLA, GOOGL)", className: "flex-1" }), _jsxs(Select, { onValueChange: handleDropdownChange, children: [_jsx(SelectTrigger, { className: "w-[150px]", children: _jsx(SelectValue, { placeholder: "Populares" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "AAPL", children: "Apple (AAPL)" }), _jsx(SelectItem, { value: "TSLA", children: "Tesla (TSLA)" }), _jsx(SelectItem, { value: "GOOGL", children: "Google (GOOGL)" }), _jsx(SelectItem, { value: "MSFT", children: "Microsoft (MSFT)" }), _jsx(SelectItem, { value: "AMZN", children: "Amazon (AMZN)" }), _jsx(SelectItem, { value: "NVDA", children: "NVIDIA (NVDA)" })] })] }), _jsx(Button, { type: "submit", disabled: loading || !searchTicker.trim(), className: "gap-2", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Buscando"] })) : ("Buscar") })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mt-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsxs(AlertDescription, { children: ["Erro ao buscar ticker: ", error] })] })), loading && (_jsxs("div", { className: "flex items-center justify-center py-10 text-muted-foreground gap-2", children: [_jsx(Loader2, { className: "h-5 w-5 animate-spin" }), "Carregando predi\u00E7\u00E3o..."] })), data && !loading && (_jsxs("div", { className: "space-y-4 pt-4", children: [_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsx(StockCard, { data: data, companyName: undefined, peRatio: undefined }) }) }), _jsxs(Button, { onClick: handleAddStock, className: "w-full gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Adicionar \u00E0 Lista"] })] }))] }) }));
}
