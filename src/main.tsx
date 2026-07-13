import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 1. Função que lida com os erros
const errorHandler = (event: ErrorEvent) => {
  try {
    console.error('Erro não capturado:', event.error);
    // Aqui você pode adicionar lógica para enviar o erro para um serviço (ex: Sentry, Datadog)
  } catch (err) {
    // Caso a própria função de log falhe
    console.error('Falha ao processar o erro original', err);
  }
};

// 2. Registrando os ouvintes de erro globais do navegador
window.addEventListener('error', errorHandler);

window.onerror = function(msg) { 
  alert("Erro: " + msg); 
};

// 3. Renderização do App React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);