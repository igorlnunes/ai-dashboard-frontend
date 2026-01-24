import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function SearchBar({ onSearchClick }) {
    return (_jsx("div", { className: "w-full flex justify-center px-4", children: _jsx("div", { className: "w-full max-w-3xl", children: _jsxs("div", { className: "flex items-center gap-2 rounded-xl border bg-background px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition", children: [_jsx(Search, { className: "h-4 w-4 text-muted-foreground" }), _jsx(Input, { readOnly: true, onClick: onSearchClick, placeholder: "Search stocks by symbol or name...", className: "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm" }), _jsx(Button, { onClick: onSearchClick, className: "shrink-0", children: "Buscar" })] }) }) }));
}
