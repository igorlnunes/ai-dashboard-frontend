import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { getPrediction } from "@/services/apiService";
// Tickers brasileiros
export const BRASIL_TICKERS = [
    "PETR4.SA",
    "VALE3.SA",
    "ITUB4.SA",
    "BBAS3.SA",
    "BBDC4.SA",
    "WEGE3.SA",
    "SUZB3.SA",
    "B3SA3.SA",
    "RDOR3.SA",
    "MGLU3.SA",
];
// Tickers internacionais
export const INTERNATIONAL_TICKERS = [
    "AAPL",
    "NVDA",
    "MSFT",
    "GOOGL",
    "TSLA",
    "AMZN",
    "META",
    "JPM",
    "V",
    "TSM",
];
const getPredictionColor = (prediction) => {
    switch (prediction) {
        case "BUY":
            return "bg-green-500 text-white hover:bg-green-600";
        case "SELL":
            return "bg-red-500 text-white hover:bg-red-600";
        case "HOLD":
            return "bg-yellow-500 text-white hover:bg-yellow-600";
        default:
            return "bg-gray-500 text-white";
    }
};
const getTrendIcon = (trend) => {
    switch (trend) {
        case "up":
            return _jsx(TrendingUp, { className: "w-4 h-4 text-green-500" });
        case "down":
            return _jsx(TrendingDown, { className: "w-4 h-4 text-red-500" });
        default:
            return _jsx(Minus, { className: "w-4 h-4 text-yellow-500" });
    }
};
const SkeletonItem = () => (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-muted/50 dark:bg-slate-800/50 animate-pulse", children: [_jsx("div", { className: "w-6 h-6 bg-slate-300 dark:bg-slate-700 rounded" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-slate-300 dark:bg-slate-700 rounded w-20" }), _jsx("div", { className: "h-2 bg-slate-300 dark:bg-slate-700 rounded w-full" })] })] }));
function RankingList({ title, emoji, subtitle, tickers }) {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(true);
    useEffect(() => {
        loadRankings();
    }, [tickers]);
    const loadRankings = async () => {
        setLoading(true);
        try {
            // Fazer todas as requisições em paralelo
            const promises = tickers.map(async (ticker) => {
                try {
                    const data = await getPrediction(ticker);
                    // Determinar tendência baseada nos indicadores
                    let trend = "neutral";
                    if (data.ai_logic?.technical_indicators) {
                        const priceChangeStr = String(data.ai_logic.technical_indicators.price_change || "0");
                        const priceChange = parseFloat(priceChangeStr.replace("%", ""));
                        if (priceChange > 1)
                            trend = "up";
                        else if (priceChange < -1)
                            trend = "down";
                    }
                    // Display ticker sem sufixo .SA
                    const displayTicker = ticker.replace(".SA", "");
                    return {
                        ticker,
                        displayTicker,
                        prediction: data.prediction,
                        confidence: data.confidence * 100,
                        trend,
                        sentiment: data.ai_logic?.sentiment_analysis?.average_sentiment || 0,
                        priceChange: String(data.ai_logic?.technical_indicators?.price_change || "0%"),
                        rsi: String(data.ai_logic?.technical_indicators?.rsi || "0"),
                        companyName: data.ticker || displayTicker,
                    };
                }
                catch (error) {
                    console.error(`Erro ao carregar ${ticker}:`, error);
                    return null;
                }
            });
            const results = await Promise.all(promises);
            // Filtrar nulos e ordenar por confiança
            const validResults = results
                .filter((item) => item !== null)
                .sort((a, b) => {
                // Primeiro por confiança
                if (b.confidence !== a.confidence) {
                    return b.confidence - a.confidence;
                }
                // Em caso de empate, BUY > HOLD > SELL
                const predictionOrder = { BUY: 3, HOLD: 2, SELL: 1 };
                return predictionOrder[b.prediction] - predictionOrder[a.prediction];
            })
                .slice(0, 10); // Top 10
            setRankings(validResults);
            setLastUpdate(new Date());
        }
        catch (error) {
            console.error("Erro ao carregar rankings:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const formatLastUpdate = () => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000 / 60);
        if (diff < 1)
            return "Agora";
        if (diff === 1)
            return "há 1 minuto";
        return `há ${diff} minutos`;
    };
    return (_jsxs(Card, { className: "p-4 dark:bg-slate-900 dark:border-slate-800", children: [_jsx("div", { className: "mb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("h3", { className: "text-lg font-bold dark:text-white flex items-center gap-2", children: [_jsx("span", { children: emoji }), title] }), _jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })] }), _jsx("button", { onClick: () => setIsExpanded(!isExpanded), className: "xl:hidden p-2 hover:bg-muted rounded-lg transition-colors", "aria-label": isExpanded ? "Colapsar ranking" : "Expandir ranking", children: isExpanded ? (_jsx(ChevronUp, { className: "w-5 h-5" })) : (_jsx(ChevronDown, { className: "w-5 h-5" })) })] }) }), isExpanded && (_jsx("div", { className: "space-y-2", children: loading ? (
                // Skeleton loading
                Array.from({ length: 10 }).map((_, i) => _jsx(SkeletonItem, {}, i))) : rankings.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Nenhum dado dispon\u00EDvel" })) : (rankings.map((item, index) => (_jsxs("div", { className: "group relative flex items-center gap-2 p-3 rounded-lg bg-muted/30 dark:bg-slate-800/30 hover:bg-muted/60 dark:hover:bg-slate-800/60 transition-all cursor-pointer", title: item.companyName, children: [_jsx("span", { className: "text-sm font-bold text-muted-foreground dark:text-slate-400 w-6", children: index + 1 }), _jsx("span", { className: "font-mono font-semibold text-sm dark:text-white min-w-[60px]", children: item.displayTicker }), _jsx(Badge, { className: `${getPredictionColor(item.prediction)} text-xs px-2 py-0`, children: item.prediction }), _jsx("div", { className: "ml-auto", children: getTrendIcon(item.trend) }), _jsxs("div", { className: "flex flex-col items-end min-w-[60px]", children: [_jsxs("span", { className: "text-xs font-semibold dark:text-white", children: [item.confidence.toFixed(0), "%"] }), _jsx("div", { className: "w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-primary rounded-full transition-all", style: { width: `${item.confidence}%` } }) })] }), _jsxs("div", { className: "absolute left-0 top-full mt-2 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 border border-slate-700", children: [_jsx("p", { className: "font-semibold mb-2", children: item.companyName }), _jsxs("p", { children: [_jsx("strong", { children: "Sentimento:" }), " ", (item.sentiment * 100).toFixed(1), "%"] }), _jsxs("p", { children: [_jsx("strong", { children: "Var. Pre\u00E7o:" }), " ", item.priceChange] }), _jsxs("p", { children: [_jsx("strong", { children: "RSI:" }), " ", item.rsi] })] })] }, item.ticker)))) })), isExpanded && !loading && rankings.length > 0 && (_jsx("div", { className: "mt-4 pt-3 border-t border-slate-200 dark:border-slate-700", children: _jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), "Atualizado ", formatLastUpdate()] }) }))] }));
}
export { RankingList };
export default function TopRankings() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(RankingList, { title: "TOP 10 BRASIL", emoji: "\uD83C\uDDE7\uD83C\uDDF7", subtitle: "Melhores oportunidades agora", tickers: BRASIL_TICKERS }), _jsx(RankingList, { title: "TOP 10 INTERNACIONAL", emoji: "\uD83C\uDF0D", subtitle: "Mercados internacionais", tickers: INTERNATIONAL_TICKERS })] }));
}
