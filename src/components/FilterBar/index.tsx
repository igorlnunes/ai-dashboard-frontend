import React from "react";
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
  const handleReset = () => {
    onReset?.();
    onSortChange("ticker-asc");
    onFilterChange("all");
  };

  const isFiltered = sortBy !== "ticker-asc" || filterBy !== "all";

  return (
    <Card>
      <CardContent className="p-3 sm:p-4 flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 lg:items-center lg:justify-between">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 lg:items-center flex-1">
          {/* Ordenação */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              Ordenar por:
            </span>

            <Select
              value={sortBy}
              onValueChange={(value) =>
                onSortChange(value as SortOption)
              }
            >
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
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
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              Filtrar por:
            </span>

            <ToggleGroup
              type="single"
              value={filterBy}
              onValueChange={(value) =>
                value && onFilterChange(value as FilterOption)
              }
              className="flex gap-0.5 sm:gap-1 flex-wrap"
            >
              <ToggleGroupItem value="all">
                Todas
              </ToggleGroupItem>

              <ToggleGroupItem
                value="buy"
                className="data-[state=on]:bg-emerald-500 data-[state=on]:text-white"
              >
                BUY
              </ToggleGroupItem>

              <ToggleGroupItem
                value="hold"
                className="data-[state=on]:bg-yellow-500 data-[state=on]:text-white"
              >
                HOLD
              </ToggleGroupItem>

              <ToggleGroupItem
                value="sell"
                className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
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
            className="gap-2 whitespace-nowrap w-full sm:w-auto"
            aria-label="Resetar filtros"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar Filtros
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterBar;
