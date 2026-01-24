# AI Stock Project - Front-End

Este é o front-end do **AI Stock Project**, uma aplicação desenvolvida para prever o comportamento de ações utilizando inteligência artificial. Este projeto visa fornecer uma interface intuitiva para visualizar previsões de ações e interagir com o sistema de IA.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática com `strict: true`.
- **Vite**: Ferramenta de build frontend que oferece uma experiência de desenvolvimento rápida.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições a APIs.
- **Tailwind CSS**: Framework de estilo utilitário para design responsivo.

## Estrutura do Projeto

- `src/components`: Componentes React reutilizáveis, como `Header`, `StockCard`, `FilterBar`.
- `src/hooks`: Hooks personalizados para lógica de componentes, como `usePrediction`, `useStockList`.
- `src/services`: Módulos para interação com a API de backend, como `apiService.ts`.
- `src/config`: Configurações da aplicação, como a URL da API em `api.ts`.
- `src/utils`: Funções utilitárias, incluindo cache com `cache.ts`.
- `src/types`: Tipos e interfaces TypeScript centralizados.

## Cache de Dados

O aplicativo implementa cache automático com TTL (Time To Live) para otimizar requisições:

- **Previsões (Predictions)**: Cache por 1 hora (3600 segundos)
- **Informações de Ticker**: Cache por 24 horas (86400 segundos)

O cache usa `localStorage` e é transparente ao componente. Dados expirados são automaticamente descartados.

### Configurar Tempo de Cache

Adicione as variáveis ao arquivo `.env`:

```env
VITE_APP_CACHE_TTL_PREDICTION=3600
VITE_APP_CACHE_TTL_TICKER=86400
```

### Limpar Cache Manualmente

No console do navegador:
```javascript
localStorage.clear(); // Limpa todo o cache
// ou
localStorage.removeItem('prediction:AAPL'); // Remove cache específico
```

## Como Executar o Projeto

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd ai-stock-project/front-end
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    ```bash
    cp .env.example .env
    # Edite .env com a URL da sua API
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se indicado pelo Vite).

5.  **Compile para produção:**
    ```bash
    npm run build
    ```

    Os arquivos otimizados para produção serão gerados na pasta `dist/`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload.
- `npm run build`: Compila o projeto para produção (com verificação TypeScript).
- `npm run lint`: Executa o linter para verificar problemas de código.
- `npm run preview`: Serve a build de produção localmente para pré-visualização.

## Troubleshooting

### API está retornando erros
- Verifique se o backend está rodando em `http://localhost:8000` (ou a URL configurada em `.env`)
- Teste a saúde da API: `curl http://localhost:8000/api/v1/health`

### Cache não está funcionando
- Abra as ferramentas de desenvolvedor (F12 → Application → Local Storage)
- Procure por chaves começando com `prediction:` ou `tickerInfo:`
- Para limpar: `localStorage.clear()` no console

### TypeScript ou build falhando
- Rode `npm install` para garantir que dependências estão atualizadas
- Delete `node_modules` e `.vite` cache: `rm -rf node_modules dist .vite`

## Type Safety

Este projeto usa TypeScript com `strict: true`. Alguns padrões importantes:

- Sem uso de `any` - use tipos explícitos
- Erros são do tipo `unknown` e requerem type guards
- Previsões usam o tipo `PredictionSignal` (BUY | SELL | HOLD)