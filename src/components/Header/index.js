import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TrendingUp, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
export default function Header() {
    // MOCK: futuramente você liga isso ao ThemeContext / hook
    const isLightMode = true;
    return (_jsx("header", { className: "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: _jsxs("div", { className: "flex h-16 items-center px-4 md:px-8 justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 font-bold text-xl tracking-tight", children: [_jsx(TrendingUp, { className: "h-6 w-6 text-primary" }), _jsx("span", { children: "StockDash" })] }), _jsxs("nav", { className: "flex items-center gap-6", children: [_jsx("a", { href: "#quem-somos", className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", children: "Quem somos" }), _jsx("a", { href: "#metodologia", className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", children: "Metodologia" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => { }, className: "flex items-center gap-2 cursor-not-allowed", title: "Toggle de tema (mock)", children: isLightMode ? (_jsxs(_Fragment, { children: [_jsx(Sun, { className: "h-4 w-4" }), "Dark Mode"] })) : (_jsxs(_Fragment, { children: [_jsx(Moon, { className: "h-4 w-4" }), "Light Mode"] })) })] })] }) }));
}
