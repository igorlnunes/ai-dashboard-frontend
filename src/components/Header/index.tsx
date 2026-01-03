import { TrendingUp, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  // MOCK: futuramente você liga isso ao ThemeContext / hook
  const isLightMode = true;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8 justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span>StockDash</span>
        </div>

        {/* Navegação + Toggle */}
        <nav className="flex items-center gap-6">

          <a
            href="#quem-somos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quem somos
          </a>

          <a
            href="#metodologia"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Metodologia
          </a>

          {/* Toggle de Tema (mockado) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="flex items-center gap-2 cursor-not-allowed"
            title="Toggle de tema (mock)"
          >
            {isLightMode ? (
              <>
                <Sun className="h-4 w-4" />
                Dark Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Light Mode
              </>
            )}
          </Button>

        </nav>
      </div>
    </header>
  );
}
