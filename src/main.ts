import { renderApp } from './views/app';
import './styles/main.scss';
import './styles/grid.scss';
import './styles/form.scss';
import './styles/notifications.scss';
import './style.css';

const root = document.getElementById('app');

renderApp().then((appElement) => {
    if (root) {
        root.appendChild(appElement);
    }
});