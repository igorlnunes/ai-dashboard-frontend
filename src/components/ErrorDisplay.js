import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
/**
 * Error Display Component
 * Shows error messages with retry and back buttons
 * Used when data loading fails
 */
export function ErrorDisplay({ title = '⚠️ Erro ao Carregar', message = 'Ocorreu um problema ao carregar os dados. Verifique sua conexão ou tente novamente.', error, onRetry, onBack, showDetails = false, }) {
    const errorMessage = typeof error === 'string' ? error : error?.message;
    return (_jsxs("div", { className: "rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-6 max-w-md mx-auto", role: "alert", "aria-live": "assertive", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsx(AlertCircle, { className: "h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" }), _jsx("div", { className: "flex-1", children: _jsx("h2", { className: "font-bold text-red-700 dark:text-red-300 text-lg", children: title }) })] }), _jsx("p", { className: "text-red-600 dark:text-red-400 mb-4", children: message }), showDetails && errorMessage && (_jsxs("details", { className: "mb-4", children: [_jsx("summary", { className: "cursor-pointer text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium", children: "Detalhes t\u00E9cnicos" }), _jsx("pre", { className: "mt-2 text-xs bg-red-100 dark:bg-red-900/50 p-2 rounded border border-red-200 dark:border-red-700 overflow-auto text-red-700 dark:text-red-300", children: errorMessage })] })), _jsxs("div", { className: "flex gap-2", children: [onRetry && (_jsxs(Button, { onClick: onRetry, className: "flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white gap-2", "aria-label": "Tentar novamente", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Tentar Novamente"] })), onBack && (_jsxs(Button, { onClick: onBack, variant: "outline", className: "flex-1 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 gap-2", "aria-label": "Voltar", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Voltar"] }))] })] }));
}
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "flex items-center justify-center min-h-screen p-4", children: _jsx(ErrorDisplay, { title: "\u26A0\uFE0F Algo Deu Errado", message: "Desculpe, ocorreu um erro inesperado na aplica\u00E7\u00E3o.", error: this.state.error || undefined, showDetails: true, onRetry: () => {
                        this.setState({ hasError: false, error: null });
                    } }) }));
        }
        return this.props.children;
    }
}
export default ErrorDisplay;
