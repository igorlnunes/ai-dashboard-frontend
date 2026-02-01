import { Card, CardContent } from "@/components/ui/card";
import { StockCardSkeleton } from "@/components/ui/skeleton";
import { RefreshCw, TrendingUp } from "lucide-react";
import type { PredictionData } from "../../types/api";
import { StockCard } from "../StockCard";

interface StockGridProps {
  stocks: Array<{
    data: PredictionData;
    companyName?: string;
    peRatio?: number;
  }>;
  loading?: boolean;
}

export default function StockGrid({ stocks, loading }: StockGridProps) {
  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StockCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  /* ---------------- Empty State ---------------- */
  if (!loading && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center p-12">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-10 space-y-4">
            <div className="mx-auto w-fit rounded-full bg-muted p-4">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Nenhuma ação encontrada
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Seu painel está vazio
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-2 text-left">
              <p className="text-xs font-semibold text-muted-foreground">
                💡 Como começar:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use a busca (🔍) para procurar por tickers</li>
                <li>• Escolha entre ações populares (AAPL, TSLA, etc)</li>
                <li>• Clique em "Adicionar à Lista"</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Verifique se o backend está rodando em
              <br />
              <span className="font-mono text-primary">
                http://localhost:8000
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ---------------- Grid ---------------- */
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {stocks.map((stock, index) => (
          <StockCard
            key={`${stock.data.ticker}-${index}`}
            data={stock.data}
            companyName={stock.companyName}
            peRatio={stock.peRatio}
          />
        ))}
      </div>
    </div>
  );
}
