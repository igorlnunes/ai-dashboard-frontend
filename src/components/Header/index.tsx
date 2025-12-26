import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Header({ onSearch }: any) {
    const [ inputValue, setInputValue ] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(inputValue.toString().trim()) {
            onSearch(inputValue.toUpperCase());
        }
        console.log(inputValue);
    };
    return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8 justify-between">
        
        {/* Lado Esquerdo: Logo e Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>StockDash</span>
          </div>
        </div>

        {/* Centro: Barra de Busca */}
<div className="flex-1 max-w-md px-4 hidden sm:block">
    <form onSubmit={handleSearch} className="flex items-center gap-2">


  <div className="flex items-center gap-2">    
    {/* Este container cuida apenas do Input + Ícone de lupa */}
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
        type="search"
        placeholder="Buscar ativos (ex: AAPL)..."
        className="pl-9 bg-muted/50 focus-visible:ring-primary h-9"
      />
    </div>
    {/* O botão agora está fora da div relative, mas dentro da div flex */}
        <Button type="submit" size="sm" className="h-9 px-4">
        Buscar
        </Button>
  </div>
    </form>
</div>
      </div>
    </header>
  );
}