import { useCallback, useState } from "react";
import { getPrediction } from "../services/apiService";
import type { PredictionData } from "../types/api";

export const usePrediction = (ticker: string) => {
    const [data, setData] = useState<PredictionData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPrediction = useCallback(async () => {
        if(!ticker) return;

        setLoading(true);
        setError(null);

        try {
            const result = await getPrediction(ticker);
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, [ticker]);

    return {
        data, 
        loading,
        error,
        refetch: fetchPrediction
    };
};