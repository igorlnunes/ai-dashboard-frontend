import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import "./index.css";
import App from './App';
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Elemento root não encontrado!');
}
createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(ErrorBoundary, { children: _jsx(App, {}) }) }));
