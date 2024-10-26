import { renderDocumentList } from '../components/documentList';
import { renderDocumentForm } from '../components/documentForm';
import { fetchDocuments } from '../services/api';
import { useWebSocket } from '../utils/useWebSocket';
import { showNotification } from '../components/notification';

export async function renderApp(): Promise<HTMLElement> {
    const documents = await fetchDocuments();

    const appDiv = document.createElement('div');
    const title = document.createElement('h1');
    title.classList.add('page-title');
    title.textContent = 'Documents';

    appDiv.appendChild(title);
    
    const list = renderDocumentList(documents);
    appDiv.appendChild(list);

    const form = renderDocumentForm((newDocs) => {
        appDiv.replaceChild(renderDocumentList(newDocs), list);
    });

    appDiv.appendChild(form);

    const closeWebSocket = useWebSocket('ws://localhost:8080/notifications', (data) => {
        const message = `New document created: ${data.DocumentTitle} by ${data.UserName}`;
        showNotification(message, 'info');
    });

    return appDiv;
}