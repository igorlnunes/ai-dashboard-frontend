import { TrendingUp, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 dark:bg-slate-950/98 dark:border-slate-800/80 dark:shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-slate-950/80 transition-colors duration-300" role="banner">
      <div className="flex h-14 sm:h-16 items-center px-3 sm:px-6 lg:px-8 justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-primary rounded-md dark:text-slate-50" aria-label="StockDash - Voltar para início">
          <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">StockDash</span>
        </Link>

        {/* Navegação + Toggle */}
        <nav className="flex items-center gap-2 sm:gap-4 lg:gap-6" aria-label="Navegação principal">

          <Link
            to="/quem-somos"
            className="hidden sm:inline text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950 rounded-md px-2 py-1"
          >
            Quem somos
          </Link>

          <Link
            to="/metodologia"
            className="hidden sm:inline text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950 rounded-md px-2 py-1"
          >
            Metodologia
          </Link>

          {/* Toggle de Tema - AGORA FUNCIONAL */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2 transition-all duration-300 dark:border-slate-700/50 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:hover:border-slate-600 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            title={`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`}
            aria-label={`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Escuro</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Claro</span>
              </>
            )}
          </Button>

        </nav>
      </div>
    </header>
  );
}
