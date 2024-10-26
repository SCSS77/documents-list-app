import { Document } from '../models/document';

export function renderDocumentList(documents: Document[]): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('document-list');

    documents.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('document-item');

        const title = document.createElement('div');
        title.classList.add('document-name');
        title.textContent = doc.Title;

        const version = document.createElement('div');
        version.classList.add('document-version');
        version.textContent = `Version ${doc.Version}`;

        const contributors = document.createElement('div');
        contributors.classList.add('document-contributors');
        contributors.textContent = `Contributors: ${doc.Contributors.map((c) => c.Name).join(', ')}`;

        card.appendChild(title);
        card.appendChild(version);
        card.appendChild(contributors);
        
        container.appendChild(card);
    });

    return container;
}