import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Tentar ler do localStorage
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;

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
    } else {
      root.classList.remove('dark');
    }

    // Persistir preferência
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
