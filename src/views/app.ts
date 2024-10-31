import { renderDocumentList } from '../components/documentList';
import { renderDocumentForm } from '../components/documentForm';
import { fetchDocuments } from '../services/api';
import { useWebSocket } from '../utils/useWebSocket';
import { showNotification } from '../components/notification';
import { Document } from '../models/document';
import { saveDocumentsToLocalStorage, getDocumentsFromLocalStorage } from '../utils/localStorage';

export async function renderApp(): Promise<HTMLElement> {
    const localDocuments = getDocumentsFromLocalStorage() || [];
    const apiDocuments = await fetchDocuments() || [];

    const documents = [
        ...apiDocuments,
        ...localDocuments.filter(localDoc => 
            !apiDocuments.some(apiDoc => apiDoc.ID === localDoc.ID)
        )
    ];

    saveDocumentsToLocalStorage(documents);

    const appDiv = document.createElement('div');
    const title = document.createElement('h1');
    title.classList.add('page-title');
    title.textContent = 'Documents';
    appDiv.appendChild(title);

    const sortDocuments = (criteria: 'Title' | 'Version' | 'CreatedAt') => {
        documents.sort((a, b) => {
            if (criteria === 'Title') return a.Title.localeCompare(b.Title);
            if (criteria === 'Version') return parseFloat(a.Version) - parseFloat(b.Version);
            if (criteria === 'CreatedAt') return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
            return 0;
        });

        const newList = renderDocumentList(documents.slice(0, 10), sortDocuments);
        appDiv.replaceChild(newList, list);
        list = newList;
    };

    let list = renderDocumentList(documents.slice(0, 10), sortDocuments);
    appDiv.appendChild(list);

    const form = renderDocumentForm((updateFunc) => {
        const newDocs = updateFunc(documents);
        console.log("Documents after addition:", newDocs);

        documents.length = 0;
        documents.push(...newDocs);

        saveDocumentsToLocalStorage(documents);

        const newList = renderDocumentList(documents.slice(0, 10), sortDocuments);
        appDiv.replaceChild(newList, list);
        list = newList;

        const newDoc = newDocs[newDocs.length - 1];
        showNotification(`Document added: <br>${newDoc.Title} by Current User`, 'success');
    }, 'Current User');
    
    appDiv.appendChild(form);

    const closeWebSocket = useWebSocket('ws://localhost:8080/notifications', (data) => {
        const message = `New document created: <br>${data.DocumentTitle} by ${data.UserName}`;
        showNotification(message, 'info');
    });

    return appDiv;
}