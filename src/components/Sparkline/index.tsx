import React, { useMemo, memo } from "react";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

function SparklineComponent({
  data,
  width = 120,
  height = 40,
  className,
}: SparklineProps) {
  // Memoize SVG path calculations
  const { points, isPositive, min, max } = useMemo(() => {
    if (!data || data.length === 0) {
      return { points: "", isPositive: false, min: 0, max: 0 };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    const firstValue = data[0];
    const lastValue = data[data.length - 1];
    const isPositive = lastValue >= firstValue;

    return { points, isPositive, min, max };
  }, [data, width, height]);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-10 items-center justify-center text-xs text-muted-foreground">
        Sem dados
      </div>
    );
  }

  const polygonPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className={cn("flex items-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Área preenchida */}
        <polygon
          points={polygonPoints}
          className={cn(
            "transition-colors",
            isPositive
              ? "fill-emerald-500/15"
              : "fill-red-500/15"
          )}
        />

        {/* Linha */}
        <polyline
          points={points}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-colors",
            isPositive
              ? "stroke-emerald-500"
              : "stroke-red-500"
          )}
        />
      </svg>
    </div>
  );
}

// Memoize the component
export default memo(SparklineComponent);
