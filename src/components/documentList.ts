import { Document } from '../models/document';

export function renderDocumentList(documents: Document[]): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('document-list');

    const header = document.createElement('div');
    header.classList.add('document-header');

    const nameHeader = document.createElement('div');
    nameHeader.textContent = 'Name';
    nameHeader.classList.add('column-header');

    const contributorsHeader = document.createElement('div');
    contributorsHeader.textContent = 'Contributors';
    contributorsHeader.classList.add('column-header');

    const attachmentsHeader = document.createElement('div');
    attachmentsHeader.textContent = 'Attachments';
    attachmentsHeader.classList.add('column-header');

    header.appendChild(nameHeader);
    header.appendChild(contributorsHeader);
    header.appendChild(attachmentsHeader);
    container.appendChild(header);

    documents.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('document-item');

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('document-name-version');

        const title = document.createElement('div');
        title.classList.add('document-name');
        title.textContent = doc.Title;

        const version = document.createElement('div');
        version.classList.add('document-version');
        version.textContent = `Version ${doc.Version}`;

        nameContainer.appendChild(title);
        nameContainer.appendChild(version);

        const contributors = document.createElement('div');
        contributors.classList.add('document-contributors');
        contributors.innerHTML = doc.Contributors.map((c) => `<div>${c.Name}</div>`).join('');

        const attachments = document.createElement('div');
        attachments.classList.add('document-attachments');
        attachments.innerHTML = doc.Attachments.map((a) => `<div>${a}</div>`).join('');

        card.appendChild(nameContainer);
        card.appendChild(contributors);
        card.appendChild(attachments);
        
        container.appendChild(card);
    });

    return container;
}