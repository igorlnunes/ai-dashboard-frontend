import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearchClick: () => void;
}

export default function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <div className="w-full flex justify-center px-3 sm:px-4 lg:px-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 rounded-lg sm:rounded-xl border bg-background dark:bg-slate-900/50 dark:border-slate-700/50 px-3 sm:px-4 py-2 shadow-sm dark:shadow-md focus-within:ring-2 focus-within:ring-primary/50 dark:focus-within:ring-primary/40 transition" role="search">
          
          <Search className="h-4 w-4 text-muted-foreground dark:text-slate-400 flex-shrink-0" aria-hidden="true" />

          <Input
            readOnly
            onClick={onSearchClick}
            placeholder="Search stocks by symbol or name..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm min-w-0 dark:bg-transparent dark:text-slate-50 dark:placeholder-slate-500"
            aria-label="Procurar ações por símbolo ou nome. Clique para abrir busca avançada"
          />

          <Button onClick={onSearchClick} className="shrink-0 text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900" aria-label="Abrir modal de busca">
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}
