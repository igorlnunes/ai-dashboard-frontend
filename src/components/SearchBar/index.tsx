import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearchClick: () => void;
}

export default function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition">
          
          <Search className="h-4 w-4 text-muted-foreground" />

          <Input
            readOnly
            onClick={onSearchClick}
            placeholder="Search stocks by symbol or name..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          />

          <Button onClick={onSearchClick} className="shrink-0">
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}
