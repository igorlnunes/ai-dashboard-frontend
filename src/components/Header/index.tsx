import { TrendingUp, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 dark:bg-slate-900/95 dark:border-slate-800 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
      <div className="flex h-16 items-center px-4 md:px-8 justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">StockDash</span>
        </div>

        {/* Navegação + Toggle */}
        <nav className="flex items-center gap-6">

          <a
            href="#quem-somos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-slate-200 transition-colors"
          >
            Quem somos
          </a>

          <a
            href="#metodologia"
            className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-slate-200 transition-colors"
          >
            Metodologia
          </a>

          {/* Toggle de Tema - AGORA FUNCIONAL */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2 transition-all duration-300 dark:border-slate-700 dark:hover:bg-slate-800"
            title={`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`}
            aria-label={`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`}
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
