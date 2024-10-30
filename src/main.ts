import { renderApp } from './views/app';
import './styles/main.scss';
import './styles/grid.scss';
import './styles/form.scss';
import './styles/notifications.scss';
import './style.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

const root = document.getElementById('app');

renderApp().then((appElement) => {
    if (root) {
        root.appendChild(appElement);
    }
});