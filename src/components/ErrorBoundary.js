import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { style: {
                    padding: '20px',
                    textAlign: 'center',
                    color: '#c62828'
                }, children: [_jsx("h2", { children: "Algo deu errado" }), _jsx("p", { children: this.state.error?.message }), _jsx("button", { onClick: () => window.location.reload(), children: "Recarregar p\u00E1gina" })] }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
