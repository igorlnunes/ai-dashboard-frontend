import React, { useCallback } from "react";
import type { PredictionSignal } from "../../types/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export type SortOption =
  | "price-high"
  | "price-low"
  | "change-high"
  | "change-low"
  | "confidence-high"
  | "confidence-low"
  | "ticker-asc"
  | "ticker-desc";

export type FilterOption = "all" | Lowercase<PredictionSignal>;

interface FilterBarProps {
  sortBy: SortOption;
  filterBy: FilterOption;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  onReset?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
  onReset,
}) => {
  const handleReset = useCallback(() => {
    onReset?.();
    onSortChange("ticker-asc");
    onFilterChange("all");
  }, [onReset, onSortChange, onFilterChange]);

  const isFiltered = sortBy !== "ticker-asc" || filterBy !== "all";

  return (
    <Card className="dark:bg-slate-900 dark:border-slate-800">
      <CardContent className="p-3 sm:p-4 flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 lg:items-center lg:justify-between" role="group" aria-label="Filtros e ordenação">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 lg:items-center flex-1">
          {/* Ordenação */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="sort-select" className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 whitespace-nowrap font-medium">
              Ordenar por:
            </label>

            <Select
              value={sortBy}
              onValueChange={(value) =>
                onSortChange(value as SortOption)
              }
            >
              <SelectTrigger id="sort-select" className="w-full sm:w-56 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" aria-label="Selecione a opção de ordenação">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="ticker-asc">
                  Ticker (A–Z)
                </SelectItem>
                <SelectItem value="ticker-desc">
                  Ticker (Z–A)
                </SelectItem>
                <SelectItem value="price-high">
                  Maior Preço
                </SelectItem>
                <SelectItem value="price-low">
                  Menor Preço
                </SelectItem>
                <SelectItem value="change-high">
                  Maior Alta
                </SelectItem>
                <SelectItem value="change-low">
                  Maior Baixa
                </SelectItem>
                <SelectItem value="confidence-high">
                  Maior Confiança
                </SelectItem>
                <SelectItem value="confidence-low">
                  Menor Confiança
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span id="filter-legend" className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 whitespace-nowrap font-medium">
              Filtrar por:
            </span>

            <ToggleGroup
              type="single"
              value={filterBy}
              onValueChange={(value) =>
                value && onFilterChange(value as FilterOption)
              }
              className="flex gap-0.5 sm:gap-1 flex-wrap"
              aria-labelledby="filter-legend"
            >
              <ToggleGroupItem value="all" aria-label="Mostrar todas as previsões" className="dark:border-slate-700 dark:text-slate-400 dark:data-[state=on]:bg-slate-800 dark:data-[state=on]:text-slate-100">
                Todas
              </ToggleGroupItem>

              <ToggleGroupItem
                value="buy"
                aria-label="Mostrar apenas previsões de compra (BUY)"
                className="data-[state=on]:bg-emerald-500 data-[state=on]:text-white dark:border-slate-700 dark:text-slate-400 dark:data-[state=on]:bg-emerald-600"
              >
                BUY
              </ToggleGroupItem>

              <ToggleGroupItem
                value="hold"
                aria-label="Mostrar apenas previsões de manutenção (HOLD)"
                className="data-[state=on]:bg-yellow-500 data-[state=on]:text-white dark:border-slate-700 dark:text-slate-400 dark:data-[state=on]:bg-yellow-600"
              >
                HOLD
              </ToggleGroupItem>

              <ToggleGroupItem
                value="sell"
                aria-label="Mostrar apenas previsões de venda (SELL)"
                className="data-[state=on]:bg-red-500 data-[state=on]:text-white dark:border-slate-700 dark:text-slate-400 dark:data-[state=on]:bg-red-600"
              >
                SELL
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="gap-2 whitespace-nowrap w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Resetar filtros para padrão (Ticker A–Z, Todas as previsões)"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Resetar Filtros
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterBar;
