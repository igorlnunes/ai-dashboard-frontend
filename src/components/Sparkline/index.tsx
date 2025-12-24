import React from 'react';
import './Sparkline.css';

interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ 
    data, 
    width = 120, 
    height = 40 
}) => {
    if (!data || data.length === 0) {
        return <div className="sparkline-empty">Sem dados</div>;
    }

    // Normalizar dados para o gráfico
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Evitar divisão por zero

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    // Determinar cor baseada na tendência
    const firstValue = data[0];
    const lastValue = data[data.length - 1];
    const trendColor = lastValue >= firstValue ? '#4CAF50' : '#f44336';

    return (
        <div className="sparkline-container">
            <svg 
                width={width} 
                height={height} 
                className="sparkline-svg"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
            >
                <polyline
                    points={points}
                    fill="none"
                    stroke={trendColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Área preenchida abaixo da linha */}
                <polygon
                    points={`0,${height} ${points} ${width},${height}`}
                    fill={trendColor}
                    fillOpacity="0.1"
                />
            </svg>
        </div>
    );
};

export default Sparkline;

