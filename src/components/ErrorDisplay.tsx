import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error | string;
  onRetry?: () => void;
  onBack?: () => void;
  showDetails?: boolean;
}

/**
 * Error Display Component
 * Shows error messages with retry and back buttons
 * Used when data loading fails
 */
export function ErrorDisplay({
  title = '⚠️ Erro ao Carregar',
  message = 'Ocorreu um problema ao carregar os dados. Verifique sua conexão ou tente novamente.',
  error,
  onRetry,
  onBack,
  showDetails = false,
}: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div
      className="rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-6 max-w-md mx-auto"
      role="alert"
      aria-live="assertive"
    >
      {/* Error Icon and Title */}
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h2 className="font-bold text-red-700 dark:text-red-300 text-lg">
            {title}
          </h2>
        </div>
      </div>

      {/* Main Error Message */}
      <p className="text-red-600 dark:text-red-400 mb-4">
        {message}
      </p>

      {/* Technical Details (Optional) */}
      {showDetails && errorMessage && (
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium">
            Detalhes técnicos
          </summary>
          <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/50 p-2 rounded border border-red-200 dark:border-red-700 overflow-auto text-red-700 dark:text-red-300">
            {errorMessage}
          </pre>
        </details>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white gap-2"
            aria-label="Tentar novamente"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
          </Button>
        )}
        {onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 gap-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Error Boundary Component
 * Catches errors in child components and displays error UI
 */
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <ErrorDisplay
            title="⚠️ Algo Deu Errado"
            message="Desculpe, ocorreu um erro inesperado na aplicação."
            error={this.state.error || undefined}
            showDetails={true}
            onRetry={() => {
              this.setState({ hasError: false, error: null });
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorDisplay;
