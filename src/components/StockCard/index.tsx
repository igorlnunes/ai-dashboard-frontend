import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Shield, Clock } from "lucide-react";
import Tooltip from "@/components/ui/tooltip";
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

  // Função para renderizar badge de previsão com ícone
  const getPredictionBadgeContent = () => {
    switch (data.prediction) {
      case 'BUY':
        return {
          icon: <TrendingUp className="h-4 w-4" />,
          color: 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700',
          textColor: 'text-white',
          label: 'COMPRAR',
          tooltip: 'Modelo prevê alta de preço nos próximos dias'
        };
      case 'SELL':
        return {
          icon: <TrendingDown className="h-4 w-4" />,
          color: 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800',
          textColor: 'text-white',
          label: 'VENDER',
          tooltip: 'Modelo prevê queda de preço nos próximos dias'
        };
      default:
        return {
          icon: <Activity className="h-4 w-4" />,
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
    if (confidenceValue >= 80) return 'bg-green-500 dark:bg-green-600';
    if (confidenceValue >= 60) return 'bg-amber-500 dark:bg-amber-600';
    return 'bg-red-500 dark:bg-red-600';
  };

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
    <Card className="rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex-1">
          <CardTitle className="text-2xl font-bold">
            {data.ticker}
          </CardTitle>
          {companyName && (
            <p className="text-sm text-muted-foreground">
              {companyName}
            </p>
          )}
        </div>

        {/* Badge de previsão com tooltip */}
        <Tooltip text={predictionContent.tooltip} position="left">
          <Badge 
            className={`${predictionContent.color} ${predictionContent.textColor} gap-2 px-3 py-2 uppercase font-bold text-xs cursor-help`}
          >
            {predictionContent.icon}
            {predictionContent.label}
          </Badge>
        </Tooltip>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Preço */}
        <div>
          <div className="text-4xl font-extrabold">
            ${latestPrice.toFixed(2)}
          </div>

          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {isPositive ? "+" : ""}
            ${priceChange.toFixed(2)} ({priceChangePercent}%)
          </div>

          {sparklineData.length > 0 && (
            <div className="mt-3 bg-muted/30 dark:bg-slate-800/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground mb-1">
                Últimos {sparklineData.length} dias
              </div>
              <Sparkline data={sparklineData} width={200} height={50} />
            </div>
          )}
        </div>

        {/* Barra de Confiança */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Tooltip text={`Nível de certeza: ${confidenceValue >= 80 ? 'Alto' : confidenceValue >= 60 ? 'Médio' : 'Baixo'}`}>
              <p className="text-sm font-semibold text-muted-foreground cursor-help">
                Confiança
              </p>
            </Tooltip>
            <span className="text-sm font-bold">{confidenceValue.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-secondary dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${getConfidenceColor()} transition-all duration-500`}
              style={{ width: `${confidenceValue}%` }}
            />
          </div>
        </div>

        {/* Predição IA */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Posicionamento no Modelo
          </p>

          <div className="relative h-12 rounded-lg overflow-hidden bg-muted dark:bg-slate-700 flex">
            <div className="w-[40%] bg-rose-500/30 dark:bg-rose-500/40" />
            <div className="w-[20%] bg-amber-500/30 dark:bg-amber-500/40" />
            <div className="w-[40%] bg-emerald-500/30 dark:bg-emerald-500/40" />

            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${predictionPosition}%` }}
            >
              <div className="flex flex-col items-center -translate-x-1/2">
                <div
                  className={`w-0 h-0 border-l-8 border-r-8 border-b-[10px] border-l-transparent border-r-transparent ${
                    data.prediction === "BUY"
                      ? "border-b-emerald-500 dark:border-b-emerald-400"
                      : data.prediction === "HOLD"
                      ? "border-b-amber-500 dark:border-b-amber-400"
                      : "border-b-rose-500 dark:border-b-rose-400"
                  }`}
                />
                <Badge variant="outline" className="font-bold dark:border-slate-600">
                  {data.prediction}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
            <span>VENDER (0–40)</span>
            <span>MANTER (40–60)</span>
            <span>COMPRAR (60–100)</span>
          </div>
        </div>

        {/* Volatilidade */}
        <div className="pt-2">
          <Tooltip text="Medida de flutuação de preço. Alta = mais arriscado. Calculada com base nos últimos 20 dias.">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-muted-foreground cursor-help">
                Volatilidade
              </p>
              <span
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  volatility === "Baixa"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : volatility === "Média"
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                {volatility}
              </span>
            </div>
          </Tooltip>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t dark:border-slate-700">
          <div>
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="text-lg font-bold">{volumeFormatted}</p>
          </div>

          {peRatio && (
            <Tooltip text="Relação Preço-Lucro. Indica quanto investidores pagam por unidade de lucro.">
              <div className="cursor-help">
                <p className="text-xs text-muted-foreground">P/E</p>
                <p className="text-lg font-bold">{peRatio.toFixed(1)}</p>
              </div>
            </Tooltip>
          )}

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Cache</p>
            </div>
            <Tooltip text="Dados carregados do cache local. Use 'Atualizar' para versão em tempo real.">
              <Badge variant="secondary" className="text-xs cursor-help">
                Cacheado
              </Badge>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
