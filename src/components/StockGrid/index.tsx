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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
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

            <h3 className="text-lg font-bold">
              Nenhuma ação encontrada
            </h3>

            <p className="text-sm text-muted-foreground">
              Use a busca para adicionar ações ao painel.
            </p>

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
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
