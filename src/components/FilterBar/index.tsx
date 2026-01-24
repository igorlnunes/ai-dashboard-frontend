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
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Ordenação */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Ordenar por:
          </span>

          <Select
            value={sortBy}
            onValueChange={(value) =>
              onSortChange(value as SortOption)
            }
          >
            <SelectTrigger className="w-56">
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Filtrar por:
          </span>

          <ToggleGroup
            type="single"
            value={filterBy}
            onValueChange={(value) =>
              value && onFilterChange(value as FilterOption)
            }
            className="flex gap-1"
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
      </CardContent>
    </Card>
  );
};

export default FilterBar;
