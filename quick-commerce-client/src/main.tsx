import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import BreadcrumbProvider from './context/BreadcrumbProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <BreadcrumbProvider>
                    <App />
                </BreadcrumbProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
