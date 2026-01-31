import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { getPrediction } from "@/services/apiService";
import type { PredictionData } from "@/types/api";

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

interface RankingItem {
  ticker: string;
  displayTicker: string;
  prediction: "BUY" | "SELL" | "HOLD";
  confidence: number;
  trend: "up" | "down" | "neutral";
  sentiment: number;
  priceChange: string;
  rsi: string;
  companyName: string;
}

interface RankingListProps {
  title: string;
  emoji: string;
  subtitle: string;
  tickers: string[];
}

const getPredictionColor = (prediction: string) => {
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

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case "down":
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    default:
      return <Minus className="w-4 h-4 text-yellow-500" />;
  }
};

const SkeletonItem = () => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 dark:bg-slate-800/50 animate-pulse">
    <div className="w-6 h-6 bg-slate-300 dark:bg-slate-700 rounded"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-20"></div>
      <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
    </div>
  </div>
);

function RankingList({ title, emoji, subtitle, tickers }: RankingListProps) {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
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
          const data: PredictionData = await getPrediction(ticker);
          
          // Determinar tendência baseada nos indicadores
          let trend: "up" | "down" | "neutral" = "neutral";
          if (data.ai_logic?.technical_indicators) {
            const priceChangeStr = String(data.ai_logic.technical_indicators.price_change || "0");
            const priceChange = parseFloat(priceChangeStr.replace("%", ""));
            if (priceChange > 1) trend = "up";
            else if (priceChange < -1) trend = "down";
          }

          // Display ticker sem sufixo .SA
          const displayTicker = ticker.replace(".SA", "");

          return {
            ticker,
            displayTicker,
            prediction: data.prediction as "BUY" | "SELL" | "HOLD",
            confidence: data.confidence * 100,
            trend,
            sentiment: data.ai_logic?.sentiment_analysis?.average_sentiment || 0,
            priceChange: String(data.ai_logic?.technical_indicators?.price_change || "0%"),
            rsi: String(data.ai_logic?.technical_indicators?.rsi || "0"),
            companyName: data.ticker || displayTicker,
          };
        } catch (error) {
          console.error(`Erro ao carregar ${ticker}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      
      // Filtrar nulos e ordenar por confiança
      const validResults = results
        .filter((item): item is RankingItem => item !== null)
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
    } catch (error) {
      console.error("Erro ao carregar rankings:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000 / 60);
    if (diff < 1) return "Agora";
    if (diff === 1) return "há 1 minuto";
    return `há ${diff} minutos`;
  };

  return (
    <Card className="p-4 dark:bg-slate-900 dark:border-slate-800">
      {/* Header com botão de colapsar (mobile) */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
              <span>{emoji}</span>
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="xl:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label={isExpanded ? "Colapsar ranking" : "Expandir ranking"}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Lista - colapsável no mobile */}
      {isExpanded && (
        <div className="space-y-2">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 10 }).map((_, i) => <SkeletonItem key={i} />)
          ) : rankings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum dado disponível
            </p>
          ) : (
            rankings.map((item, index) => (
              <div
                key={item.ticker}
                className="group relative flex items-center gap-2 p-3 rounded-lg bg-muted/30 dark:bg-slate-800/30 hover:bg-muted/60 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
                title={item.companyName}
              >
                {/* Posição */}
                <span className="text-sm font-bold text-muted-foreground dark:text-slate-400 w-6">
                  {index + 1}
                </span>

                {/* Ticker */}
                <span className="font-mono font-semibold text-sm dark:text-white min-w-[60px]">
                  {item.displayTicker}
                </span>

                {/* Badge de predição */}
                <Badge className={`${getPredictionColor(item.prediction)} text-xs px-2 py-0`}>
                  {item.prediction}
                </Badge>

                {/* Ícone de tendência */}
                <div className="ml-auto">{getTrendIcon(item.trend)}</div>

                {/* Confiança */}
                <div className="flex flex-col items-end min-w-[60px]">
                  <span className="text-xs font-semibold dark:text-white">
                    {item.confidence.toFixed(0)}%
                  </span>
                  <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 border border-slate-700">
                  <p className="font-semibold mb-2">{item.companyName}</p>
                  <p>
                    <strong>Sentimento:</strong>{" "}
                    {(item.sentiment * 100).toFixed(1)}%
                  </p>
                  <p>
                    <strong>Var. Preço:</strong> {item.priceChange}
                  </p>
                  <p>
                    <strong>RSI:</strong> {item.rsi}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer com última atualização */}
      {isExpanded && !loading && rankings.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Atualizado {formatLastUpdate()}
          </p>
        </div>
      )}
    </Card>
  );
}

export { RankingList };

export default function TopRankings() {
  return (
    <div className="space-y-6">
      <RankingList
        title="TOP 10 BRASIL"
        emoji="🇧🇷"
        subtitle="Melhores oportunidades agora"
        tickers={BRASIL_TICKERS}
      />
      <RankingList
        title="TOP 10 INTERNACIONAL"
        emoji="🌍"
        subtitle="Mercados internacionais"
        tickers={INTERNATIONAL_TICKERS}
      />
    </div>
  );
}
