# AI Stock Project - Front-End

Este é o front-end do **AI Stock Project**, uma aplicação desenvolvida para prever o comportamento de ações utilizando inteligência artificial. Este projeto visa fornecer uma interface intuitiva para visualizar previsões de ações e interagir com o sistema de IA.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build frontend que oferece uma experiência de desenvolvimento rápida.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições a APIs.

## Estrutura do Projeto

- `src/components`: Componentes React reutilizáveis, como `Header` e `StockPrediction`.
- `src/hooks`: Hooks personalizados para lógica de componentes, como `usePrediction`.
- `src/services`: Módulos para interação com a API de backend, como `apiService.ts`.
- `src/config`: Configurações da aplicação, como a URL da API em `api.ts`.

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

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se indicado pelo Vite).

4.  **Compile para produção:**
    ```bash
    npm run build
    ```

    Os arquivos otimizados para produção serão gerados na pasta `dist/`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o linter para verificar problemas de código.
- `npm run preview`: Serve a build de produção localmente para pré-visualização.