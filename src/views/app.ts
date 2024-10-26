import { renderDocumentList } from '../components/DocumentList';
import { renderDocumentForm } from '../components/documentForm';
import { fetchDocuments } from '../services/api';

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

    return appDiv;
}