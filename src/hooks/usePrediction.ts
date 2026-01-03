<<<<<<< HEAD
import { useCallback, useState, useEffect } from "react"; // Adicione useEffect
import { getPrediction, type PredictionData } from "../services/apiService";
=======
import { useCallback, useState } from "react";
import { getPrediction } from "../services/apiService";
import type { PredictionData } from "../types/api";
>>>>>>> feature/dashboard-com-filtros-sparklines


// Hook realiza chamada API
export const usePrediction = (ticker: string) => {
    const [data, setData] = useState<PredictionData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPrediction = useCallback(async () => {
        if(!ticker) return;

        setLoading(true);
        setError(null);
        console.log("📡 Hook: Iniciando chamada para", ticker);

        try {
            const result = await getPrediction(ticker);
            setData(result);
            console.log("✅ Hook: Dados recebidos", result);
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
            console.error("❌ Hook: Erro na API", err);
        } finally {
            setLoading(false);
        }
    }, [ticker]);

    // Fetch do ticker
    useEffect(() => {
        if (ticker) {
            fetchPrediction();
        }
    }, [ticker, fetchPrediction]); 

    return {
        data, 
        loading,
        error,
        refetch: fetchPrediction
    };
};