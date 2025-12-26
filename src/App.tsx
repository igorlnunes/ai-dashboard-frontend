import { useState } from "react";
import { StockDisplay } from "./components/StockDisplay";
import Header from "./components/Header";
import { usePrediction } from "./hooks/usePrediction";

export default function App() {
  
  const [activeTicker, setActiveTicker] = useState<string>("");
   const { data, loading, error, refetch } = usePrediction(activeTicker);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={(ticker: any) => setActiveTicker(ticker)} />
      
      <main className="container mx-auto">
        <StockDisplay
          data={data} 
          loading={loading} 
          error={error} 
          onRetry={refetch}
        />
      </main>
    </div>
  );
}