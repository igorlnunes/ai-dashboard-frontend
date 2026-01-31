import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, BarChart3 } from "lucide-react";

export default function Metodologia() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Pular para conteúdo principal
      </a>

      <div id="main-content" className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 dark:text-slate-50">
            Como Funcionam Nossas Recomendações
          </h1>
          <p className="text-lg text-muted-foreground dark:text-slate-400 max-w-2xl mx-auto">
            Entenda o processo por trás das análises de BUY, SELL e HOLD
          </p>
        </section>

        {/* Intro Card */}
        <Card className="p-6 sm:p-8 mb-12 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-start gap-4 mb-4">
            <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-3 dark:text-slate-50">
                Um Modelo Inteligente em 3 Pilares
              </h2>
              <p className="text-muted-foreground dark:text-slate-400 mb-3">
                Nossa plataforma combina três abordagens complementares para gerar recomendações de investimento:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span className="text-muted-foreground dark:text-slate-400">
                    <strong>Machine Learning</strong> — Algoritmo treinado para identificar padrões históricos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span className="text-muted-foreground dark:text-slate-400">
                    <strong>Indicadores Técnicos</strong> — Análise de preço, momentum e volume
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span className="text-muted-foreground dark:text-slate-400">
                    <strong>Análise de Sentimento</strong> — Processamento de notícias e redes sociais
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pilar 1: ML */}
        <Card className="p-6 sm:p-8 mb-8 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-start gap-4 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 dark:text-slate-50">
                1. Machine Learning
              </h3>
              <Badge className="mb-4">Padrões Históricos</Badge>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground dark:text-slate-400">
            <p>
              Nosso algoritmo aprende com dados históricos de preços e volumes para identificar padrões que antecederam movimentos significativos. O modelo é treinado continuamente com novas informações de mercado.
            </p>

            <div className="bg-muted dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold mb-2 text-foreground dark:text-slate-100">
                O que o modelo analisa:
              </p>
              <ul className="space-y-1 text-sm">
                <li>• Tendências de preço (uptrend, downtrend, consolidação)</li>
                <li>• Padrões de volume e volatilidade</li>
                <li>• Correlações com índices de mercado</li>
                <li>• Ciclos históricos da ação</li>
              </ul>
            </div>

            <p className="text-sm italic">
              ℹ️ O ML é particularmente útil para detectar mudanças de tendência que números isolados não capturam.
            </p>
          </div>
        </Card>

        {/* Pilar 2: Technical Indicators */}
        <Card className="p-6 sm:p-8 mb-8 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-start gap-4 mb-4">
            <BarChart3 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 dark:text-slate-50">
                2. Indicadores Técnicos
              </h3>
              <Badge className="mb-4">Análise de Preço & Momentum</Badge>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground dark:text-slate-400">
            <p>
              Utilizamos indicadores técnicos consagrados para medir o momento atual de uma ação e identificar condições de sobrecompra e sobrevenda.
            </p>

            <div className="space-y-4">
              <div className="bg-muted dark:bg-slate-800 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-foreground dark:text-slate-100">
                  RSI (Relative Strength Index)
                </p>
                <p className="text-sm mb-2">
                  Mede o momentum do preço em uma escala de 0-100.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>RSI &gt; 70:</strong> Ação pode estar sobrecomprada (sinal de SELL potencial)</li>
                  <li>• <strong>RSI &lt; 30:</strong> Ação pode estar sobrevendida (sinal de BUY potencial)</li>
                  <li>• <strong>30-70:</strong> Zona neutra, sem extremos</li>
                </ul>
              </div>

              <div className="bg-muted dark:bg-slate-800 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-foreground dark:text-slate-100">
                  Análise de Preço & Volume
                </p>
                <p className="text-sm mb-2">
                  Observamos se o preço está em alta ou queda, e se essa movimento é confirmado por alto volume.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Preço em alta + volume alto:</strong> Movimento forte, pode indicar BUY</li>
                  <li>• <strong>Preço em queda + volume alto:</strong> Pressão vendedora real, pode indicar SELL</li>
                  <li>• <strong>Movimento com baixo volume:</strong> Desconfiança, sinal HOLD</li>
                </ul>
              </div>
            </div>

            <p className="text-sm italic">
              ℹ️ Os indicadores técnicos são ferramentas objetivas, mas sempre devem ser considerados no contexto geral do mercado.
            </p>
          </div>
        </Card>

        {/* Pilar 3: Sentiment Analysis */}
        <Card className="p-6 sm:p-8 mb-8 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-start gap-4 mb-4">
            <Brain className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 dark:text-slate-50">
                3. Análise de Sentimento
              </h3>
              <Badge className="mb-4">Notícias & Percepção de Mercado</Badge>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground dark:text-slate-400">
            <p>
              Processamos notícias, comunicados e redes sociais para medir o sentimento geral do mercado sobre uma ação. Um sentimento positivo frequentemente antecede movimentos de alta.
            </p>

            <div className="bg-muted dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold mb-2 text-foreground dark:text-slate-100">
                Como interpretamos o sentimento:
              </p>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Sentimento Positivo (+):</strong> Notícias favoráveis, analistas otimistas → Favorável para BUY</li>
                <li>• <strong>Sentimento Negativo (-):</strong> Notícias ruins, preocupações de mercado → Favorável para SELL</li>
                <li>• <strong>Sentimento Neutro (0):</strong> Falta de catalisadores → Favorável para HOLD</li>
              </ul>
            </div>

            <p className="text-sm italic">
              ℹ️ O sentimento é especialmente útil porque muitas vezes antecipa movimentos de preço. Investidores reagem ao que ouvem.
            </p>
          </div>
        </Card>

        {/* Como Combinamos */}
        <Card className="p-6 sm:p-8 mb-8 dark:bg-slate-900 dark:border-slate-800 border-primary/50">
          <h3 className="text-2xl font-bold mb-4 dark:text-slate-50">
            Como Combinamos os 3 Pilares?
          </h3>

          <div className="space-y-4 text-muted-foreground dark:text-slate-400">
            <p>
              Cada pilar tem um peso na decisão final. Quando os três estão alinhados (ex: ML prevê alta, técnicos mostram momentum, sentimento é positivo), a confiança na recomendação é máxima.
            </p>

            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground dark:text-slate-100 mb-1">
                  Recomendação BUY
                </p>
                <p className="text-sm">
                  Quando o algoritmo ML detecta padrão bullish, o RSI está abaixo de 70, e as notícias são positivas. Significa: preço deve subir.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold text-foreground dark:text-slate-100 mb-1">
                  Recomendação SELL
                </p>
                <p className="text-sm">
                  Quando sinais técnicos mostram sobrevenda com notícias negativas, e o padrão histórico sugere esgotamento. Significa: preço deve cair.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-semibold text-foreground dark:text-slate-100 mb-1">
                  Recomendação HOLD
                </p>
                <p className="text-sm">
                  Quando os sinais são contraditórios ou não há confiança o suficiente. Significa: não há urgência — espere mais informações.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Confiança */}
        <Card className="p-6 sm:p-8 mb-12 dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-2xl font-bold mb-4 dark:text-slate-50">
            O Score de Confiança
          </h3>

          <div className="space-y-4 text-muted-foreground dark:text-slate-400">
            <p>
              Cada recomendação vem acompanhada de um score de confiança (0-100%). Quanto maior o score, mais alinhados estão os três pilares.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-lg">
                <p className="font-bold text-green-700 dark:text-green-400 mb-2">80-100%</p>
                <p className="text-sm">Sinais muito alinhados. Maior chance de acerto.</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 p-4 rounded-lg">
                <p className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">50-79%</p>
                <p className="text-sm">Sinais moderados. Considere junto a sua análise pessoal.</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-4 rounded-lg">
                <p className="font-bold text-red-700 dark:text-red-400 mb-2">&lt;50%</p>
                <p className="text-sm">Baixa confiança. Espere mais sinais de confirmação.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referências */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-slate-50">
            Referências Bibliográficas
          </h2>

          <Card className="p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground dark:text-slate-100 mb-2">
                  RSI (Relative Strength Index)
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-slate-400">
                  <li>
                    • Wilder, J. W. (1978). <em>New Concepts in Technical Trading Systems</em>. McLeanville, NC.
                  </li>
                  <li>
                    • <strong>Conceito:</strong> O RSI mede a magnitude das mudanças de preço para avaliar as condições de sobrecompra ou sobrevenda. Valores acima de 70 indicam sobrecompra, abaixo de 30 indicam sobrevenda.
                  </li>
                </ul>
              </div>

              <div className="border-t border-muted pt-6 dark:border-slate-800">
                <h4 className="font-semibold text-foreground dark:text-slate-100 mb-2">
                  Análise Técnica e Volume
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-slate-400">
                  <li>
                    • Murphy, J. J. (1999). <em>Technical Analysis of the Financial Markets</em>. New York Institute of Finance.
                  </li>
                  <li>
                    • <strong>Conceito:</strong> A confirmação de movimentos de preço por volume é fundamental na análise técnica. Movimentos com baixo volume são considerados menos confiáveis.
                  </li>
                </ul>
              </div>

              <div className="border-t border-muted pt-6 dark:border-slate-800">
                <h4 className="font-semibold text-foreground dark:text-slate-100 mb-2">
                  Análise de Sentimento em Mercados Financeiros
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-slate-400">
                  <li>
                    • Tetlock, P. C. (2007). "Giving Content to Investor Sentiment: The Role of Media in the Stock Market". <em>Journal of Finance</em>, 62(3), 1139-1168.
                  </li>
                  <li>
                    • <strong>Conceito:</strong> Estudos mostram que o sentimento expresso na mídia tem correlação com retornos de ações nos dias seguintes.
                  </li>
                </ul>
              </div>

              <div className="border-t border-muted pt-6 dark:border-slate-800">
                <h4 className="font-semibold text-foreground dark:text-slate-100 mb-2">
                  Machine Learning em Finanças
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-slate-400">
                  <li>
                    • Atsalakis, G. S., & Valavanis, K. P. (2009). "Surveying Stock Market Forecasting Techniques". <em>Expert Systems with Applications</em>, 36(3), 5932-5941.
                  </li>
                  <li>
                    • <strong>Conceito:</strong> Algoritmos de aprendizado de máquina podem identificar padrões não-lineares em dados históricos de mercado.
                  </li>
                </ul>
              </div>

              <div className="border-t border-muted pt-6 dark:border-slate-800">
                <h4 className="font-semibold text-foreground dark:text-slate-100 mb-2">
                  Teoria Geral de Investimentos
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-slate-400">
                  <li>
                    • Graham, B., & Dodd, D. L. (1934). <em>Security Analysis</em>. McGraw-Hill. (Clássico da análise fundamentalista)
                  </li>
                  <li>
                    • Markowitz, H. (1952). "Portfolio Selection". <em>Journal of Finance</em>, 7(1), 77-91. (Teoria moderna de portfólio)
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <Card className="p-6 sm:p-8 border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 dark:bg-slate-900 dark:border-slate-800">
          <h4 className="font-semibold text-foreground dark:text-slate-100 mb-3 flex items-center gap-2">
            ⚠️ Importante: Aviso Legal
          </h4>
          <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3">
            As recomendações da StockDash são <strong>indicativas</strong> e baseadas em análise técnica e dados históricos. Elas <strong>não constituem aconselhamento financeiro profissional</strong>.
          </p>
          <ul className="text-sm text-muted-foreground dark:text-slate-400 space-y-1">
            <li>✓ Use como ferramenta de pesquisa complementar</li>
            <li>✓ Sempre faça sua própria análise fundamental</li>
            <li>✓ Considere seu perfil de risco e objetivo</li>
            <li>✓ Consulte um assessor financeiro antes de decisões maiores</li>
            <li>✓ Lembre-se: passado não garante futuro</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
