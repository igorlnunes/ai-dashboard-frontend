import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
        className
      )}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite',
      }}
      {...props}
    />
  )
}

/**
 * Stock Card Skeleton
 * Mimics the structure of a StockCard while loading
 */
function StockCardSkeleton() {
  return (
    <div className="rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-6 space-y-4 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-32 rounded" />
        <Skeleton className="h-4 w-28 rounded" />
      </div>

      {/* Sparkline */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 rounded text-xs" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Confidence Bar */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <Skeleton className="h-3 w-full rounded-full" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Skeleton className="h-12 rounded" />
        <Skeleton className="h-12 rounded" />
        <Skeleton className="h-12 rounded" />
      </div>
    </div>
  );
}

export { Skeleton, StockCardSkeleton }
