import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  WifiOff, 
  AlertCircle, 
  RefreshCw, 
  TrendingUp, 
  Newspaper, 
  Activity 
} from "lucide-react";

// Importamos a tipagem do seu service para garantir consistência
import { type PredictionData } from "../../services/apiService";

interface StockDisplayProps {
  data: PredictionData | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void; // Função para disparar o refetch do hook
}

export function StockDisplay({ data, loading, error, onRetry }: StockDisplayProps) {
  
  // 1. Estado de Carregamento
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4 text-muted-foreground">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <p className="animate-pulse font-medium">Consultando IA e analisando mercado...</p>
      </div>
    );
  }

  // 2. Branch de Erro (API Desconectada ou Ticker Inválido)
  if (error) {
    const isNetworkError = error.toLowerCase().includes("fetch") || 
                          error.toLowerCase().includes("network") ||
                          error.toLowerCase().includes("failed");

    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-destructive/10 p-4">
          {isNetworkError ? (
            <WifiOff className="h-10 w-10 text-destructive" />
          ) : (
            <AlertCircle className="h-10 w-10 text-destructive" />
          )}
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          {isNetworkError ? "Servidor Indisponível" : "Erro na Busca"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          {isNetworkError 
            ? "Não foi possível conectar à API de predição. Verifique se o servidor está rodando." 
            : error}
        </p>
        <Button onClick={onRetry} variant="outline" className="mt-6 gap-2">
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  // 3. Estado Inicial (Sem dados)
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-muted-foreground border-2 border-dashed rounded-lg m-8">
        <TrendingUp className="h-10 w-10 mb-4 opacity-20" />
        <p>Aguardando entrada de um ticker para análise...</p>
      </div>
    );
  }

  // 4. Renderização do Sucesso
  const { prediction, confidence, ai_logic, top_news_analyzed, ticker } = data;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Cabeçalho de Resultados */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resultado para</p>
          <h1 className="text-4xl font-extrabold tracking-tight">{ticker}</h1>
        </div>
        
        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border">
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-semibold">RECOMENDAÇÃO IA</p>
            <p className="text-sm font-bold">{(confidence * 100).toFixed(1)}% de confiança</p>
          </div>
          <Badge 
            className="text-lg py-2 px-6 h-fit uppercase" 
            variant={prediction.toString().toLowerCase() === "buy" ? "default" : "destructive"}
          >
            {prediction}
          </Badge>
        </div>
      </div>

      {/* Grid de Métricas Técnicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">RSI (14)</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{ai_logic.technical_indicators.rsi}</p>
            <p className="text-xs text-muted-foreground mt-1">Indicador de Força Relativa</p>
          </CardContent>
        </Card>
        {/* Adicione outros cards seguindo o mesmo padrão */}
      </div>

      {/* Seção de Notícias */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/20">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <CardTitle>Sentimento das Notícias Recentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {top_news_analyzed.map((news, i) => (
            <div key={i} className="flex items-start justify-between p-4 hover:bg-muted/10 transition-colors">
              <div className="space-y-1">
                <p className="font-semibold text-sm leading-tight">{news.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-primary">{news.source}</span>
                  <span>•</span>
                  <span>{new Date(news.published_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className={`ml-4 flex items-center gap-1 font-mono text-sm px-2 py-1 rounded ${
                news.sentiment_score > 0.1 ? 'text-emerald-600 bg-emerald-50' : 
                news.sentiment_score < -0.1 ? 'text-rose-600 bg-rose-50' : 'text-slate-500 bg-slate-50'
              }`}>
                {news.sentiment_score > 0.1 ? '😊' : news.sentiment_score < -0.1 ? '😟' : '😐'}
                {news.sentiment_score.toFixed(2)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}