import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Shield } from "lucide-react";
import Sparkline from "../Sparkline";
import type { PredictionData } from "../../types/api";

interface StockCardProps {
  data: PredictionData;
  companyName?: string;
  peRatio?: number;
}

export function StockCard({ data, companyName, peRatio }: StockCardProps) {
  const latestPrice =
    data.price_data?.at(-1)?.close ?? 0;

  const previousPrice =
    data.price_data?.at(-2)?.close ?? latestPrice;

  const priceChange = latestPrice - previousPrice;
  const priceChangePercent =
    previousPrice !== 0
      ? ((priceChange / previousPrice) * 100).toFixed(2)
      : "0.00";

  const isPositive = priceChange >= 0;

  const totalVolume = data.price_data?.at(-1)?.volume ?? 0;

  const volumeFormatted =
    totalVolume >= 1_000_000
      ? `${(totalVolume / 1_000_000).toFixed(1)}M`
      : totalVolume >= 1_000
      ? `${(totalVolume / 1_000).toFixed(1)}K`
      : totalVolume.toFixed(0);

  const sparklineData =
    data.price_data?.slice(-20).map(p => p.close) ?? [];

  const calculateVolatility = (prices: number[]) => {
    if (prices.length < 2) return "Média";
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance =
      prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) /
      prices.length;
    const stdDev = Math.sqrt(variance);
    const percent = (stdDev / mean) * 100;

    if (percent < 2) return "Baixa";
    if (percent < 5) return "Média";
    return "Alta";
  };

  const volatility =
    sparklineData.length > 0
      ? calculateVolatility(sparklineData)
      : "Média";

  const confidenceValue = data.confidence * 100;

  let predictionPosition = 0;

  if (data.prediction === "BUY") {
    predictionPosition = 60 + (confidenceValue / 100) * 40;
  } else if (data.prediction === "HOLD") {
    predictionPosition = 40 + (confidenceValue / 100) * 20;
  } else {
    predictionPosition = (confidenceValue / 100) * 40;
  }

  predictionPosition = Math.min(100, Math.max(0, predictionPosition));

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">
            {data.ticker}
          </CardTitle>
          {companyName && (
            <p className="text-sm text-muted-foreground">
              {companyName}
            </p>
          )}
        </div>

        <Badge className="uppercase">Live</Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Preço */}
        <div>
          <div className="text-4xl font-extrabold">
            ${latestPrice.toFixed(2)}
          </div>

          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {isPositive ? "+" : ""}
            ${priceChange.toFixed(2)} ({priceChangePercent}%)
          </div>

          {sparklineData.length > 0 && (
            <div className="mt-3 bg-muted/30 rounded-lg p-2">
              <Sparkline data={sparklineData} width={200} height={50} />
            </div>
          )}
        </div>

        {/* Predição IA */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            AI Prediction
          </p>

          <div className="relative h-12 rounded-lg overflow-hidden bg-muted flex">
            <div className="w-[40%] bg-rose-500" />
            <div className="w-[20%] bg-amber-500" />
            <div className="w-[40%] bg-emerald-500" />

            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${predictionPosition}%` }}
            >
              <div className="flex flex-col items-center -translate-x-1/2">
                <div
                  className={`w-0 h-0 border-l-8 border-r-8 border-b-[10px] border-l-transparent border-r-transparent ${
                    data.prediction === "BUY"
                      ? "border-b-emerald-500"
                      : data.prediction === "HOLD"
                      ? "border-b-amber-500"
                      : "border-b-rose-500"
                  }`}
                />
                <Badge variant="outline" className="font-bold">
                  {data.prediction}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
            <span>SELL (0–40)</span>
            <span>HOLD (40–60)</span>
            <span>BUY (60–100)</span>
          </div>
        </div>

        {/* Confiança */}
        <div className="text-center space-y-1">
          <div className="flex justify-center items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Shield size={16} />
            {confidenceValue.toFixed(2)}% confidence
          </div>
          <p className="text-xs italic text-muted-foreground">
            Previsão para as próximas 24h
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="text-lg font-bold">{volumeFormatted}</p>
          </div>

          {peRatio && (
            <div>
              <p className="text-xs text-muted-foreground">P/E</p>
              <p className="text-lg font-bold">{peRatio.toFixed(1)}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-muted-foreground">Volatilidade</p>
            <p
              className={`text-lg font-bold ${
                volatility === "Baixa"
                  ? "text-emerald-600"
                  : volatility === "Média"
                  ? "text-amber-500"
                  : "text-rose-600"
              }`}
            >
              {volatility}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
