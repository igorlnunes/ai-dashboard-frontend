import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function Skeleton({ className, ...props }) {
    return (_jsx("div", { className: cn("animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800", className), style: {
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
        }, ...props }));
}
/**
 * Stock Card Skeleton
 * Mimics the structure of a StockCard while loading
 */
function StockCardSkeleton() {
    return (_jsxs("div", { className: "rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-2 flex-1", children: [_jsx(Skeleton, { className: "h-8 w-24 rounded" }), _jsx(Skeleton, { className: "h-4 w-40 rounded" })] }), _jsx(Skeleton, { className: "h-8 w-20 rounded-lg" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-10 w-32 rounded" }), _jsx(Skeleton, { className: "h-4 w-28 rounded" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-20 rounded text-xs" }), _jsx(Skeleton, { className: "h-12 w-full rounded-lg" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(Skeleton, { className: "h-4 w-20 rounded" }), _jsx(Skeleton, { className: "h-4 w-12 rounded" })] }), _jsx(Skeleton, { className: "h-3 w-full rounded-full" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800", children: [_jsx(Skeleton, { className: "h-12 rounded" }), _jsx(Skeleton, { className: "h-12 rounded" }), _jsx(Skeleton, { className: "h-12 rounded" })] })] }));
}
export { Skeleton, StockCardSkeleton };
