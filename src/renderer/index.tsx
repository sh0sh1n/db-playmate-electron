import { createRoot } from 'react-dom/client';
import App from './App';

// const container = document.documentElement;
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
