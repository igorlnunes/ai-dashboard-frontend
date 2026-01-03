import { useState, type ChangeEvent, type FormEvent } from "react";
import { usePrediction } from "../../hooks/usePrediction";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import {
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Newspaper,
} from "lucide-react";

const StockPrediction = () => {
  const [ticker, setTicker] = useState("AAPL");

  const { data, loading, error, refetch } = usePrediction(ticker);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase());
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Predição de Ações</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={ticker}
            onChange={handleInputChange}
            placeholder="Digite o ticker (ex: AAPL)"
          />
          <Button type="submit" disabled={loading}>
            Buscar
          </Button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Carregando predição...
          </div>
        )}

        {/* Erro */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Erro: {error}</AlertDescription>
          </Alert>
        )}

        {/* Resultado */}
        {data && !loading && (
          <div className="space-y-8">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{data.ticker}</h2>

              <Badge
                className={
                  data.prediction === "BUY"
                    ? "bg-emerald-500"
                    : data.prediction === "SELL"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }
              >
                {data.prediction} • {(data.confidence * 100).toFixed(2)}%
              </Badge>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 space-y-1">
                  <span className="text-sm text-muted-foreground">
                    Variação de Preço
                  </span>
                  <span className="text-lg font-medium">
                    {data.ai_logic.technical_indicators.price_change}
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-1">
                  <span className="text-sm text-muted-foreground">RSI</span>
                  <span className="text-lg font-medium">
                    {data.ai_logic.technical_indicators.rsi}
                  </span>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Notícias */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Newspaper className="h-5 w-5" />
                Notícias Analisadas
              </h3>

              {data.top_news_analyzed.map((news, index) => {
                const sentiment =
                  news.sentiment_score > 0.1
                    ? "positive"
                    : news.sentiment_score < -0.1
                    ? "negative"
                    : "neutral";

                return (
                  <Card key={index}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-medium">{news.title}</span>

                        <Badge
                          variant="outline"
                          className={
                            sentiment === "positive"
                              ? "text-emerald-600"
                              : sentiment === "negative"
                              ? "text-red-600"
                              : "text-muted-foreground"
                          }
                        >
                          {sentiment === "positive" && (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          )}
                          {sentiment === "negative" && (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {sentiment === "neutral" && (
                            <Minus className="h-3 w-3 mr-1" />
                          )}
                          {news.sentiment_score.toFixed(2)}
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>{news.source}</span>
                        <span>
                          {new Date(
                            news.published_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Separator />

            {/* Preços */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Últimos Preços</h3>

              <div className="space-y-2">
                {data.price_data.slice(-10).map((price, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm border-b pb-1 last:border-none"
                  >
                    <span>{price.date}</span>
                    <span>US${price.close.toFixed(2)}</span>
                    <span className="text-muted-foreground">
                      {price.volume.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockPrediction;
