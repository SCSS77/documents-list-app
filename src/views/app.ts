import { renderDocumentList } from '../components/documentList';
import { renderDocumentForm } from '../components/documentForm';
import { fetchDocuments } from '../services/api';
import { useWebSocket } from '../utils/useWebSocket';
import { showNotification } from '../components/notification';
import { Document } from '../models/document';
import { saveDocumentsToLocalStorage, getDocumentsFromLocalStorage } from '../utils/localStorage';

export async function renderApp(): Promise<HTMLElement> {
    let documents: Document[] = await fetchDocuments();

    const appDiv = document.createElement('div');
    const title = document.createElement('h1');
    title.classList.add('page-title');
    title.textContent = 'Documents';
    appDiv.appendChild(title);

    const sortDocuments = (criteria: 'Title' | 'Version' | 'CreatedAt') => {
        documents = documents.slice().sort((a, b) => {
            if (criteria === 'Title') return a.Title.localeCompare(b.Title);
            if (criteria === 'Version') return parseFloat(a.Version) - parseFloat(b.Version);
            if (criteria === 'CreatedAt') return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime();
            return 0;
        });

        const newList = renderDocumentList(documents, sortDocuments);
        appDiv.replaceChild(newList, list);
        list = newList;
    };

    let list = renderDocumentList(documents, sortDocuments);
    appDiv.appendChild(list);

    const form = renderDocumentForm((updateFunc) => {
        const newDocument = updateFunc(documents);
        documents = newDocument;

        const newList = renderDocumentList(documents, sortDocuments);
        appDiv.replaceChild(newList, list);
        list = newList;

        showNotification(`Document added: <br>${documents[documents.length - 1].Title} by Current User`, 'success');
    }, 'Current User');
    appDiv.appendChild(form);

    const closeWebSocket = useWebSocket('ws://localhost:8080/notifications', (data) => {
        const message = `New document created: <br>${data.DocumentTitle} by ${data.UserName}`;
        showNotification(message, 'info');
    });

    return appDiv;
}