import { renderDocumentList } from '../components/documentList';
import { renderDocumentForm } from '../components/documentForm';
import { fetchDocuments } from '../services/api';
import { useWebSocket } from '../utils/useWebSocket';
import { showNotification } from '../components/notification';

export async function renderApp(): Promise<HTMLElement> {
    const documents = await fetchDocuments();

    const appDiv = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = 'Documents List';

    appDiv.appendChild(title);
    
    const form = renderDocumentForm((newDocs) => {
        const existingList = appDiv.querySelector('ul');
        if (existingList) {
            appDiv.replaceChild(renderDocumentList(newDocs), existingList);
        }
    });
    
    appDiv.appendChild(form);
    appDiv.appendChild(renderDocumentList(documents));

    const closeWebSocket = useWebSocket('ws://localhost:8080/notifications', (data) => {
        const message = `New document created: ${data.DocumentTitle} by ${data.UserName}`;
        showNotification(message, 'info');
    });

    return appDiv;
}
