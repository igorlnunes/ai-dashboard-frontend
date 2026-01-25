import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem, } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
const FilterBar = ({ sortBy, filterBy, onSortChange, onFilterChange, onReset, }) => {
    const handleReset = () => {
        onReset?.();
        onSortChange("ticker-asc");
        onFilterChange("all");
    };
    const isFiltered = sortBy !== "ticker-asc" || filterBy !== "all";
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-3 sm:p-4 flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 lg:items-center lg:justify-between", children: [_jsxs("div", { className: "flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 lg:items-center flex-1", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2", children: [_jsx("span", { className: "text-xs sm:text-sm text-muted-foreground whitespace-nowrap", children: "Ordenar por:" }), _jsxs(Select, { value: sortBy, onValueChange: (value) => onSortChange(value), children: [_jsx(SelectTrigger, { className: "w-full sm:w-56", children: _jsx(SelectValue, { placeholder: "Selecione" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "ticker-asc", children: "Ticker (A\u2013Z)" }), _jsx(SelectItem, { value: "ticker-desc", children: "Ticker (Z\u2013A)" }), _jsx(SelectItem, { value: "price-high", children: "Maior Pre\u00E7o" }), _jsx(SelectItem, { value: "price-low", children: "Menor Pre\u00E7o" }), _jsx(SelectItem, { value: "change-high", children: "Maior Alta" }), _jsx(SelectItem, { value: "change-low", children: "Maior Baixa" }), _jsx(SelectItem, { value: "confidence-high", children: "Maior Confian\u00E7a" }), _jsx(SelectItem, { value: "confidence-low", children: "Menor Confian\u00E7a" })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2", children: [_jsx("span", { className: "text-xs sm:text-sm text-muted-foreground whitespace-nowrap", children: "Filtrar por:" }), _jsxs(ToggleGroup, { type: "single", value: filterBy, onValueChange: (value) => value && onFilterChange(value), className: "flex gap-0.5 sm:gap-1 flex-wrap", children: [_jsx(ToggleGroupItem, { value: "all", children: "Todas" }), _jsx(ToggleGroupItem, { value: "buy", className: "data-[state=on]:bg-emerald-500 data-[state=on]:text-white", children: "BUY" }), _jsx(ToggleGroupItem, { value: "hold", className: "data-[state=on]:bg-yellow-500 data-[state=on]:text-white", children: "HOLD" }), _jsx(ToggleGroupItem, { value: "sell", className: "data-[state=on]:bg-red-500 data-[state=on]:text-white", children: "SELL" })] })] })] }), isFiltered && (_jsxs(Button, { onClick: handleReset, variant: "outline", size: "sm", className: "gap-2 whitespace-nowrap w-full sm:w-auto", "aria-label": "Resetar filtros", children: [_jsx(RotateCcw, { className: "h-4 w-4" }), "Resetar Filtros"] }))] }) }));
};
export default FilterBar;
