import { Document } from '../models/document';

export function renderDocumentList(
    documents: Document[],
    onSort: (criteria: 'Title' | 'Version' | 'CreatedAt') => void
): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('document-list');

    const sortBar = document.createElement('div');
    sortBar.classList.add('sort-bar');

    const sortLabel = document.createElement('span');
    sortLabel.textContent = 'Sort by:';
    sortLabel.classList.add('sort-by');
    sortBar.appendChild(sortLabel);

    const customSelect = document.createElement('div');
    customSelect.classList.add('custom-select');

    const selectedOption = document.createElement('div');
    selectedOption.classList.add('selected-option');
    selectedOption.textContent = 'Select one...';
    customSelect.appendChild(selectedOption);

    const options = document.createElement('div');
    options.classList.add('options');

    const optionTitle = document.createElement('div');
    optionTitle.classList.add('option');
    optionTitle.textContent = 'Name';
    optionTitle.dataset.value = 'Title';
    options.appendChild(optionTitle);

    const optionVersion = document.createElement('div');
    optionVersion.classList.add('option');
    optionVersion.textContent = 'Version';
    optionVersion.dataset.value = 'Version';
    options.appendChild(optionVersion);

    const optionDate = document.createElement('div');
    optionDate.classList.add('option');
    optionDate.textContent = 'Date';
    optionDate.dataset.value = 'CreatedAt';
    options.appendChild(optionDate);

    customSelect.appendChild(options);
    sortBar.appendChild(customSelect);
    container.appendChild(sortBar);

    selectedOption.addEventListener('click', () => {
        customSelect.classList.toggle('open');
    });

    options.childNodes.forEach(option => {
        option.addEventListener('click', () => {
            selectedOption.textContent = (option as HTMLElement).textContent || 'Select one...';
            customSelect.classList.remove('open');
            onSort((option as HTMLElement).dataset.value as 'Title' | 'Version' | 'CreatedAt');
        });
    });

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