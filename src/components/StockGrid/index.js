import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { StockCardSkeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { StockCard } from "../StockCard";
export default function StockGrid({ stocks, loading }) {
    /* ---------------- Loading ---------------- */
    if (loading) {
        return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6", children: Array.from({ length: 6 }).map((_, i) => (_jsx(StockCardSkeleton, {}, i))) }));
    }
    /* ---------------- Empty State ---------------- */
    if (!loading && stocks.length === 0) {
        return (_jsx("div", { className: "flex justify-center items-center p-12", children: _jsx(Card, { className: "max-w-md w-full text-center", children: _jsxs(CardContent, { className: "p-10 space-y-4", children: [_jsx("div", { className: "mx-auto w-fit rounded-full bg-muted p-4", children: _jsx(TrendingUp, { className: "h-8 w-8 text-muted-foreground" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold", children: "Nenhuma a\u00E7\u00E3o encontrada" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Seu painel est\u00E1 vazio" })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-2 text-left", children: [_jsx("p", { className: "text-xs font-semibold text-muted-foreground", children: "\uD83D\uDCA1 Como come\u00E7ar:" }), _jsxs("ul", { className: "text-xs text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 Use a busca (\uD83D\uDD0D) para procurar por tickers" }), _jsx("li", { children: "\u2022 Escolha entre a\u00E7\u00F5es populares (AAPL, TSLA, etc)" }), _jsx("li", { children: "\u2022 Clique em \"Adicionar \u00E0 Lista\"" })] })] }), _jsxs("p", { className: "text-xs text-muted-foreground italic", children: ["Verifique se o backend est\u00E1 rodando em", _jsx("br", {}), _jsx("span", { className: "font-mono text-primary", children: "http://localhost:8000" })] })] }) }) }));
    }
    /* ---------------- Grid ---------------- */
    return (_jsx("div", { className: "p-3 sm:p-4 lg:p-6", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6", children: stocks.map((stock, index) => (_jsx(StockCard, { data: stock.data, companyName: stock.companyName, peRatio: stock.peRatio }, `${stock.data.ticker}-${index}`))) }) }));
}
