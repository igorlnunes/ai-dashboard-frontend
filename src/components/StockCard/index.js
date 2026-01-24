import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Shield } from "lucide-react";
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
    return (_jsxs(Card, { className: "rounded-2xl shadow-md hover:shadow-xl transition-all", children: [_jsxs(CardHeader, { className: "flex flex-row items-start justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: data.ticker }), companyName && (_jsx("p", { className: "text-sm text-muted-foreground", children: companyName }))] }), _jsx(Badge, { className: "uppercase", children: "Live" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-4xl font-extrabold", children: ["$", latestPrice.toFixed(2)] }), _jsxs("div", { className: `flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-rose-600"}`, children: [isPositive ? _jsx(TrendingUp, { size: 16 }) : _jsx(TrendingDown, { size: 16 }), isPositive ? "+" : "", "$", priceChange.toFixed(2), " (", priceChangePercent, "%)"] }), sparklineData.length > 0 && (_jsx("div", { className: "mt-3 bg-muted/30 rounded-lg p-2", children: _jsx(Sparkline, { data: sparklineData, width: 200, height: 50 }) }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xs font-semibold uppercase text-muted-foreground", children: "AI Prediction" }), _jsxs("div", { className: "relative h-12 rounded-lg overflow-hidden bg-muted flex", children: [_jsx("div", { className: "w-[40%] bg-rose-500" }), _jsx("div", { className: "w-[20%] bg-amber-500" }), _jsx("div", { className: "w-[40%] bg-emerald-500" }), _jsx("div", { className: "absolute top-1/2 -translate-y-1/2", style: { left: `${predictionPosition}%` }, children: _jsxs("div", { className: "flex flex-col items-center -translate-x-1/2", children: [_jsx("div", { className: `w-0 h-0 border-l-8 border-r-8 border-b-[10px] border-l-transparent border-r-transparent ${data.prediction === "BUY"
                                                        ? "border-b-emerald-500"
                                                        : data.prediction === "HOLD"
                                                            ? "border-b-amber-500"
                                                            : "border-b-rose-500"}` }), _jsx(Badge, { variant: "outline", className: "font-bold", children: data.prediction })] }) })] }), _jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground font-semibold", children: [_jsx("span", { children: "SELL (0\u201340)" }), _jsx("span", { children: "HOLD (40\u201360)" }), _jsx("span", { children: "BUY (60\u2013100)" })] })] }), _jsxs("div", { className: "text-center space-y-1", children: [_jsxs("div", { className: "flex justify-center items-center gap-2 text-sm font-semibold text-muted-foreground", children: [_jsx(Shield, { size: 16 }), confidenceValue.toFixed(2), "% confidence"] }), _jsx("p", { className: "text-xs italic text-muted-foreground", children: "Previs\u00E3o para as pr\u00F3ximas 24h" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 pt-4 border-t", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Volume" }), _jsx("p", { className: "text-lg font-bold", children: volumeFormatted })] }), peRatio && (_jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "P/E" }), _jsx("p", { className: "text-lg font-bold", children: peRatio.toFixed(1) })] })), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Volatilidade" }), _jsx("p", { className: `text-lg font-bold ${volatility === "Baixa"
                                            ? "text-emerald-600"
                                            : volatility === "Média"
                                                ? "text-amber-500"
                                                : "text-rose-600"}`, children: volatility })] })] })] })] }));
}
