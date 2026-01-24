import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { StockCard } from "../StockCard";
export default function StockGrid({ stocks, loading }) {
    /* ---------------- Loading ---------------- */
    if (loading) {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6", children: Array.from({ length: 6 }).map((_, i) => (_jsxs(Card, { className: "p-6 space-y-4", children: [_jsx(Skeleton, { className: "h-6 w-24" }), _jsx(Skeleton, { className: "h-10 w-32" }), _jsx(Skeleton, { className: "h-20 w-full" }), _jsx(Skeleton, { className: "h-8 w-1/2" })] }, i))) }));
    }
    /* ---------------- Empty State ---------------- */
    if (!loading && stocks.length === 0) {
        return (_jsx("div", { className: "flex justify-center items-center p-12", children: _jsx(Card, { className: "max-w-md w-full text-center", children: _jsxs(CardContent, { className: "p-10 space-y-4", children: [_jsx("div", { className: "mx-auto w-fit rounded-full bg-muted p-4", children: _jsx(TrendingUp, { className: "h-8 w-8 text-muted-foreground" }) }), _jsx("h3", { className: "text-lg font-bold", children: "Nenhuma a\u00E7\u00E3o encontrada" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Use a busca para adicionar a\u00E7\u00F5es ao painel." }), _jsxs("p", { className: "text-xs text-muted-foreground italic", children: ["Verifique se o backend est\u00E1 rodando em", _jsx("br", {}), _jsx("span", { className: "font-mono text-primary", children: "http://localhost:8000" })] })] }) }) }));
    }
    /* ---------------- Grid ---------------- */
    return (_jsx("div", { className: "p-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: stocks.map((stock, index) => (_jsx(StockCard, { data: stock.data, companyName: stock.companyName, peRatio: stock.peRatio }, `${stock.data.ticker}-${index}`))) }) }));
}
