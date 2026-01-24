import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { usePrediction } from "../../hooks/usePrediction";
import { getTickerInfo } from "../../services/apiService";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Search, Loader2, AlertCircle, Plus } from "lucide-react";
import { StockCard } from "../StockCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (data: any) => void;
}

export default function SearchModal({ isOpen, onClose, onAddStock }: SearchModalProps) {
  const [ticker, setTicker] = useState("GOOGL");
  const [searchTicker, setSearchTicker] = useState("");

  const { data, loading, error, refetch } = usePrediction(ticker);

  useEffect(() => {
    if (ticker) {
      refetch();
    }
  }, [ticker, refetch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTicker.trim()) {
      setTicker(searchTicker.toUpperCase());
    }
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
      <DialogContent className="max-w-3xl bg-background text-foreground z-50 pointer-events-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
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
            className="flex-1"
          />

          <Select onValueChange={handleDropdownChange}>
            <SelectTrigger className="w-[150px]">
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
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Buscando
              </>
            ) : (
              "Buscar"
            )}
          </Button>
        </form>

        {/* Erro */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao buscar ticker: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-10 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Carregando predição...
          </div>
        )}

        {/* Resultado */}
        {data && !loading && (
          <div className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-4">
                <StockCard
                  data={data}
                  companyName={undefined}
                  peRatio={undefined}
                />
              </CardContent>
            </Card>

            <Button onClick={handleAddStock} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Adicionar à Lista
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
