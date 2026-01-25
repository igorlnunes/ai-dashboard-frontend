import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import Tooltip from "@/components/ui/tooltip";
import Sparkline from "../Sparkline";
export function StockCard({ data, companyName, peRatio }) {
    const latestPrice = data.price_data?.at(-1)?.close ?? 0;
    const previousPrice = data.price_data?.at(-2)?.close ?? latestPrice;
    const priceChange = latestPrice - previousPrice;
    const priceChangePercent = previousPrice !== 0
        ? ((priceChange / previousPrice) * 100).toFixed(2)
        : "0.00";
    const isPositive = priceChange >= 0;
    const totalVolume = data.price_data?.at(-1)?.volume ?? 0;
    const volumeFormatted = totalVolume >= 1_000_000
        ? `${(totalVolume / 1_000_000).toFixed(1)}M`
        : totalVolume >= 1_000
            ? `${(totalVolume / 1_000).toFixed(1)}K`
            : totalVolume.toFixed(0);
    const sparklineData = data.price_data?.slice(-20).map(p => p.close) ?? [];
    const calculateVolatility = (prices) => {
        if (prices.length < 2)
            return "Média";
        const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
        const variance = prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) /
            prices.length;
        const stdDev = Math.sqrt(variance);
        const percent = (stdDev / mean) * 100;
        if (percent < 2)
            return "Baixa";
        if (percent < 5)
            return "Média";
        return "Alta";
    };
    const volatility = sparklineData.length > 0
        ? calculateVolatility(sparklineData)
        : "Média";
    const confidenceValue = data.confidence * 100;
    // Função para renderizar badge de previsão com ícone
    const getPredictionBadgeContent = () => {
        switch (data.prediction) {
            case 'BUY':
                return {
                    icon: _jsx(TrendingUp, { className: "h-4 w-4" }),
                    color: 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700',
                    textColor: 'text-white',
                    label: 'COMPRAR',
                    tooltip: 'Modelo prevê alta de preço nos próximos dias'
                };
            case 'SELL':
                return {
                    icon: _jsx(TrendingDown, { className: "h-4 w-4" }),
                    color: 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800',
                    textColor: 'text-white',
                    label: 'VENDER',
                    tooltip: 'Modelo prevê queda de preço nos próximos dias'
                };
            default:
                return {
                    icon: _jsx(Activity, { className: "h-4 w-4" }),
                    color: 'bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700',
                    textColor: 'text-white',
                    label: 'MANTER',
                    tooltip: 'Modelo prevê estabilidade de preço nos próximos dias'
                };
        }
    };
    const predictionContent = getPredictionBadgeContent();
    // Cor da barra de confiança
    const getConfidenceColor = () => {
        if (confidenceValue >= 80)
            return 'bg-green-500 dark:bg-green-600';
        if (confidenceValue >= 60)
            return 'bg-amber-500 dark:bg-amber-600';
        return 'bg-red-500 dark:bg-red-600';
    };
    let predictionPosition = 0;
    if (data.prediction === "BUY") {
        predictionPosition = 60 + (confidenceValue / 100) * 40;
    }
    else if (data.prediction === "HOLD") {
        predictionPosition = 40 + (confidenceValue / 100) * 20;
    }
    else {
        predictionPosition = (confidenceValue / 100) * 40;
    }
    predictionPosition = Math.min(100, Math.max(0, predictionPosition));
    return (_jsxs(Card, { className: "rounded-lg sm:rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800", children: [_jsxs(CardHeader, { className: "flex flex-col sm:flex-row items-start justify-between pb-2 sm:pb-3 gap-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx(CardTitle, { className: "text-xl sm:text-2xl font-bold truncate", children: data.ticker }), companyName && (_jsx("p", { className: "text-xs sm:text-sm text-muted-foreground truncate", children: companyName }))] }), _jsx(Tooltip, { text: predictionContent.tooltip, position: "left", children: _jsxs(Badge, { className: `${predictionContent.color} ${predictionContent.textColor} gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 uppercase font-bold text-[10px] sm:text-xs cursor-help flex-shrink-0`, children: [predictionContent.icon, _jsx("span", { className: "hidden sm:inline", children: predictionContent.label }), _jsx("span", { className: "sm:hidden", children: data.prediction })] }) })] }), _jsxs(CardContent, { className: "space-y-3 sm:space-y-5", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-3xl sm:text-4xl font-extrabold", children: ["$", latestPrice.toFixed(2)] }), _jsxs("div", { className: `flex items-center gap-1 text-xs sm:text-sm font-semibold ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`, children: [isPositive ? _jsx(TrendingUp, { size: 14 }) : _jsx(TrendingDown, { size: 14 }), isPositive ? "+" : "", "$", priceChange.toFixed(2), " (", priceChangePercent, "%)"] }), sparklineData.length > 0 && (_jsxs("div", { className: "mt-2 sm:mt-3 bg-muted/30 dark:bg-slate-800/50 rounded-lg p-2", children: [_jsxs("div", { className: "text-[11px] sm:text-xs text-muted-foreground mb-1", children: ["\u00DAltimos ", sparklineData.length, " dias"] }), _jsx(Sparkline, { data: sparklineData, width: 200, height: 40 })] }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex justify-between items-center gap-2", children: [_jsx(Tooltip, { text: `Nível de certeza: ${confidenceValue >= 80 ? 'Alto' : confidenceValue >= 60 ? 'Médio' : 'Baixo'}`, children: _jsx("p", { className: "text-xs sm:text-sm font-semibold text-muted-foreground cursor-help", children: "Confian\u00E7a" }) }), _jsxs("span", { className: "text-xs sm:text-sm font-bold", children: [confidenceValue.toFixed(1), "%"] })] }), _jsx("div", { className: "w-full bg-secondary dark:bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden", children: _jsx("div", { className: `h-full ${getConfidenceColor()} transition-all duration-500`, style: { width: `${confidenceValue}%` } }) })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("p", { className: "text-[10px] sm:text-xs font-semibold uppercase text-muted-foreground", children: "Posicionamento" }), _jsxs("div", { className: "relative h-10 sm:h-12 rounded-lg overflow-hidden bg-muted dark:bg-slate-700 flex", children: [_jsx("div", { className: "w-[40%] bg-rose-500/30 dark:bg-rose-500/40" }), _jsx("div", { className: "w-[20%] bg-amber-500/30 dark:bg-amber-500/40" }), _jsx("div", { className: "w-[40%] bg-emerald-500/30 dark:bg-emerald-500/40" }), _jsx("div", { className: "absolute top-1/2 -translate-y-1/2 transition-all duration-300", style: { left: `${predictionPosition}%` }, children: _jsxs("div", { className: "flex flex-col items-center -translate-x-1/2", children: [_jsx("div", { className: `w-0 h-0 border-l-6 sm:border-l-8 border-r-6 sm:border-r-8 border-b-[8px] sm:border-b-[10px] border-l-transparent border-r-transparent ${data.prediction === "BUY"
                                                        ? "border-b-emerald-500 dark:border-b-emerald-400"
                                                        : data.prediction === "HOLD"
                                                            ? "border-b-amber-500 dark:border-b-amber-400"
                                                            : "border-b-rose-500 dark:border-b-rose-400"}` }), _jsx(Badge, { variant: "outline", className: "font-bold text-[10px] sm:text-xs dark:border-slate-600", children: data.prediction })] }) })] }), _jsxs("div", { className: "flex justify-between text-[9px] sm:text-[10px] text-muted-foreground font-semibold", children: [_jsx("span", { children: "VENDER" }), _jsx("span", { children: "MANTER" }), _jsx("span", { children: "COMPRAR" })] })] }), _jsx("div", { className: "pt-1 sm:pt-2", children: _jsx(Tooltip, { text: "Medida de flutua\u00E7\u00E3o de pre\u00E7o. Alta = mais arriscado. Calculada com base nos \u00FAltimos 20 dias.", children: _jsxs("div", { className: "flex justify-between items-center gap-2", children: [_jsx("p", { className: "text-xs sm:text-sm font-semibold text-muted-foreground cursor-help", children: "Volatilidade" }), _jsx("span", { className: `text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full ${volatility === "Baixa"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                            : volatility === "Média"
                                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`, children: volatility })] }) }) }), _jsxs("div", { className: "grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t dark:border-slate-700", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[10px] sm:text-xs text-muted-foreground", children: "Volume" }), _jsx("p", { className: "text-base sm:text-lg font-bold", children: volumeFormatted })] }), peRatio && (_jsx(Tooltip, { text: "Rela\u00E7\u00E3o Pre\u00E7o-Lucro. Indica quanto investidores pagam por unidade de lucro.", children: _jsxs("div", { className: "cursor-help", children: [_jsx("p", { className: "text-[10px] sm:text-xs text-muted-foreground", children: "P/E" }), _jsx("p", { className: "text-base sm:text-lg font-bold", children: peRatio.toFixed(1) })] }) })), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center justify-end gap-1 mb-1", children: [_jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }), _jsx("p", { className: "text-[10px] sm:text-xs text-muted-foreground", children: "Cache" })] }), _jsx(Tooltip, { text: "Dados carregados do cache local. Use 'Atualizar' para vers\u00E3o em tempo real.", children: _jsx(Badge, { variant: "secondary", className: "text-[10px] sm:text-xs cursor-help", children: "Cacheado" }) })] })] })] })] }));
}
