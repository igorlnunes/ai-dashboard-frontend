import { useCallback, useEffect, useState } from "react";
import { getPrediction } from "../services/apiService";
// Hook realiza chamada API
export const usePrediction = (ticker) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchPrediction = useCallback(async () => {
        if (!ticker)
            return;
        setLoading(true);
        setError(null);
        try {
            const result = await getPrediction(ticker);
            setData(result);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(errorMessage);
            console.error("Erro na API:", err);
        }
        finally {
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
