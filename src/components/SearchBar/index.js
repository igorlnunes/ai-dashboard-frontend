import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function SearchBar({ onSearchClick }) {
    return (_jsx("div", { className: "w-full flex justify-center px-3 sm:px-4 lg:px-6", children: _jsx("div", { className: "w-full max-w-3xl", children: _jsxs("div", { className: "flex items-center gap-2 rounded-lg sm:rounded-xl border bg-background px-3 sm:px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition", role: "search", children: [_jsx(Search, { className: "h-4 w-4 text-muted-foreground flex-shrink-0", "aria-hidden": "true" }), _jsx(Input, { readOnly: true, onClick: onSearchClick, placeholder: "Search stocks by symbol or name...", className: "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm min-w-0", "aria-label": "Procurar a\u00E7\u00F5es por s\u00EDmbolo ou nome. Clique para abrir busca avan\u00E7ada" }), _jsx(Button, { onClick: onSearchClick, className: "shrink-0 text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background", "aria-label": "Abrir modal de busca", children: "Buscar" })] }) }) }));
}
