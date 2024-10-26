import { renderApp } from './views/app';
import './styles/main.scss';
import './style.css';

const root = document.getElementById('app');

renderApp().then((appElement) => {
    if (root) {
        root.appendChild(appElement);
    }
});