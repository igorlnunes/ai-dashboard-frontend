import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // 1. Tentar ler do localStorage
        const saved = localStorage.getItem('theme');
        if (saved)
            return saved;
        // 2. Tentar detectar preferência do sistema
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        // 3. Default: light
        return 'light';
    });
    // Atualizar classes e localStorage quando tema mudar
    useEffect(() => {
        const root = document.documentElement;
        // Atualizar classe no HTML
        if (theme === 'dark') {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }
        // Persistir preferência
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children }));
}
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
