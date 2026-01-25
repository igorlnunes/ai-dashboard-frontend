import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { usePrediction } from "../../hooks/usePrediction";
import { getTickerInfo } from "../../services/apiService";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Search, Loader2, AlertCircle, Plus, Clock, X } from "lucide-react";
import { StockCard } from "../StockCard";

const SEARCH_HISTORY_KEY = "stockdash_search_history";
const MAX_HISTORY = 5;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (data: any) => void;
}

export default function SearchModal({ isOpen, onClose, onAddStock }: SearchModalProps) {
  const [ticker, setTicker] = useState("GOOGL");
  const [searchTicker, setSearchTicker] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { data, loading, error, refetch } = usePrediction(ticker);

  // Load search history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    if (ticker) {
      refetch();
    }
  }, [ticker, refetch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTicker.trim()) {
      const upperTicker = searchTicker.toUpperCase();
      setTicker(upperTicker);
      
      // Add to search history
      const updated = [
        upperTicker,
        ...searchHistory.filter((t) => t !== upperTicker),
      ].slice(0, MAX_HISTORY);
      setSearchHistory(updated);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    }
  };

  const handleHistoryClick = (historyTicker: string) => {
    setSearchTicker(historyTicker);
    setTicker(historyTicker);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTicker(e.target.value.toUpperCase());
  };

  const handleDropdownChange = (value: string) => {
    setTicker(value);
    setSearchTicker(value);
  };

  const handleAddStock = async () => {
    if (!data) return;

    try {
      let tickerInfo = null;

      try {
        tickerInfo = await getTickerInfo(data.ticker);
      } catch {
        // fallback silencioso
      }

      onAddStock({
        data,
        companyName: tickerInfo?.name,
        peRatio: tickerInfo?.pe_ratio,
      });

      setSearchTicker("");
      setTicker("AAPL");
      onClose();
    } catch (err) {
      console.error("Erro ao adicionar ação:", err);
    }
  };

  const handleClose = () => {
    setSearchTicker("");
    setTicker("TSLA");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl bg-background text-foreground z-50 pointer-events-auto" role="dialog" aria-labelledby="search-modal-title" aria-describedby="search-modal-description">
        <DialogHeader>
          <DialogTitle id="search-modal-title" className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" aria-hidden="true" />
            Buscar Ação
          </DialogTitle>
        </DialogHeader>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <Input
            autoFocus
            value={searchTicker}
            onChange={handleInputChange}
            placeholder="Digite o ticker (ex: AAPL, TSLA, GOOGL)"
            className="flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Insira o símbolo do ticker da ação que deseja pesquisar"
          />

          <Select onValueChange={handleDropdownChange}>
            <SelectTrigger className="w-[150px]" aria-label="Selecione uma ação popular">
              <SelectValue placeholder="Populares" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
              <SelectItem value="TSLA">Tesla (TSLA)</SelectItem>
              <SelectItem value="GOOGL">Google (GOOGL)</SelectItem>
              <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
              <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
              <SelectItem value="NVDA">NVIDIA (NVDA)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            disabled={loading || !searchTicker.trim()}
            className="gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
            aria-label={loading ? "Buscando informações" : "Buscar previsão da ação"}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Buscando
              </>
            ) : (
              "Buscar"
            )}
          </Button>
        </form>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800" role="region" aria-label="Histórico de buscas recentes">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                Buscas Recentes
              </p>
              <button
                onClick={clearHistory}
                className="text-xs text-muted-foreground hover:text-foreground transition focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                aria-label="Limpar histórico de buscas"
              >
                Limpar
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {searchHistory.map((historyTicker) => (
                <button
                  key={historyTicker}
                  onClick={() => handleHistoryClick(historyTicker)}
                  className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-foreground"
                >
                  {historyTicker}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="mt-4" role="alert" aria-live="assertive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              Erro ao buscar ticker: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-10 text-muted-foreground gap-2" role="status" aria-live="polite">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Carregando predição...
          </div>
        )}

        {/* Resultado */}
        {data && !loading && (
          <div className="space-y-4 pt-4 animate-in fade-in duration-300">
            <Card>
              <CardContent className="p-4">
                <StockCard
                  data={data}
                  companyName={undefined}
                  peRatio={undefined}
                />
              </CardContent>
            </Card>

            <Button onClick={handleAddStock} className="w-full gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background" aria-label={`Adicionar ${data?.ticker || 'ação'} à sua lista`}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Adicionar à Lista
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
