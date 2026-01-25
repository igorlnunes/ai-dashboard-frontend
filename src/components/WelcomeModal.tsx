import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, SkipForward, Zap } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '📊 Bem-vindo ao StockDash',
      subtitle: 'Seu dashboard de previsões de ações com IA',
      content: (
        <div className="space-y-4">
          <p className="text-foreground">
            StockDash usa modelos de machine learning para prever movimentos de ações em tempo real.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">O que você pode fazer:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Buscar qualquer ação (ticker symbol)</li>
              <li>✓ Ver previsões: BUY, HOLD, SELL</li>
              <li>✓ Acompanhar confiança das previsões</li>
              <li>✓ Monitorar múltiplas ações simultaneamente</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '🔍 Buscar & Filtrar',
      subtitle: 'Encontre as ações que você procura',
      content: (
        <div className="space-y-4">
          <p className="text-foreground">
            Use a barra de busca para procurar por tickers de ações.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">💡 Dicas:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Digite AAPL, TSLA, GOOGL, etc.</li>
                <li>• Buscas recentes aparecem abaixo</li>
                <li>• Use filtros para organizar por previsão</li>
              </ul>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded p-2 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                ✨ Seu histórico é salvo! Volte e você verá suas últimas buscas.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '📈 Entendendo as Previsões',
      subtitle: 'O que significam BUY, HOLD e SELL',
      content: (
        <div className="space-y-3">
          <div className="space-y-3">
            <div className="border-l-4 border-emerald-500 pl-3 py-2">
              <p className="font-semibold text-emerald-700 dark:text-emerald-400">BUY</p>
              <p className="text-sm text-foreground">Modelo prevê alta de preço. Bom momento para comprar.</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-3 py-2">
              <p className="font-semibold text-amber-700 dark:text-amber-400">HOLD</p>
              <p className="text-sm text-foreground">Preço deve estabilizar. Mantenha suas posições.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-3 py-2">
              <p className="font-semibold text-red-700 dark:text-red-400">SELL</p>
              <p className="text-sm text-foreground">Modelo prevê queda de preço. Considere vender.</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 border border-blue-200 dark:border-blue-800 mt-4">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">⚡ Importante:</p>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              Estas são previsões algorítmicas. Sempre faça sua própria pesquisa antes de investir!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '🚀 Como Usar o Dashboard',
      subtitle: 'Seu primeiro passo',
      content: (
        <div className="space-y-4">
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="font-semibold text-foreground">Procure uma ação</p>
                <p className="text-sm text-muted-foreground">Use o botão 🔍 para procurar por ticker</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="font-semibold text-foreground">Veja a previsão</p>
                <p className="text-sm text-muted-foreground">Analise BUY/HOLD/SELL e a confiança</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <p className="font-semibold text-foreground">Clique "Adicionar"</p>
                <p className="text-sm text-muted-foreground">A ação aparecerá no seu painel</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">4</span>
              <div>
                <p className="font-semibold text-foreground">Acompanhe</p>
                <p className="text-sm text-muted-foreground">Filtre, ordene e monitore suas ações</p>
              </div>
            </li>
          </ol>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded p-3 border border-amber-200 dark:border-amber-800 mt-4">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              💡 Você pode revisar este tutorial a qualquer momento!
            </p>
          </div>
        </div>
      ),
    },
  ];

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const isFirstSlide = currentSlide === 0;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstSlide) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('stockdash_seen_welcome', 'true');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleFinish()}>
      <DialogContent className="max-w-2xl bg-background text-foreground" role="dialog" aria-labelledby="welcome-title" aria-label={`Tutorial do StockDash - Slide ${currentSlide + 1} de ${slides.length}`}>
        <DialogHeader>
          <DialogTitle id="welcome-title" className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
            {slide.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">{slide.subtitle}</p>
        </DialogHeader>

        {/* Slide Content */}
        <div className="py-6 min-h-[300px]" role="region" aria-live="polite" aria-label={`Conteúdo do slide ${currentSlide + 1}`}>
          {slide.content}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 justify-center my-4" role="tablist" aria-label="Indicador de progresso dos slides">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background ${
                i === currentSlide
                  ? 'bg-primary w-8'
                  : 'bg-slate-300 dark:bg-slate-700 w-2 hover:w-3'
              }`}
              aria-label={`Ir para slide ${i + 1}`}
              aria-selected={i === currentSlide}
              role="tab"
            />
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mb-4">
          Slide {currentSlide + 1} de {slides.length}
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            {!isFirstSlide && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
                aria-label="Voltar para slide anterior"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Anterior
              </Button>
            )}
            <Button
              onClick={() => handleFinish()}
              variant="ghost"
              size="sm"
              className="gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
              aria-label="Pular o tutorial"
            >
              <SkipForward className="h-4 w-4" aria-hidden="true" />
              Pular
            </Button>
          </div>

          {isLastSlide ? (
            <Button
              onClick={handleFinish}
              size="sm"
              className="gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
              aria-label="Finalizar tutorial e começar a usar o dashboard"
            >
              <Zap className="h-4 w-4" aria-hidden="true" />
              Começar
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              size="sm"
              className="gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
              aria-label="Ir para próximo slide"
            >
              Próximo
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
