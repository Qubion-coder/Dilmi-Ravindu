import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Admin from './Admin.tsx';
import './index.css';

const root = document.getElementById('root')!;

if (window.location.pathname === '/admin') {
  createRoot(root).render(<Admin />);
} else {
  createRoot(root).render(<App />);
}
