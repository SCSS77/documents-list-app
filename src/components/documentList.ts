import { Document } from '../models/document';

export function renderDocumentList(documents: Document[]): HTMLElement {
    const ul = document.createElement('ul');
    documents.forEach((doc) => {
        const li = document.createElement('li');
        li.textContent = `${doc.Title} - Contributors: ${doc.Contributors.map((c) => c.Name).join(', ')}`;
        ul.appendChild(li);
    });
    return ul;
}