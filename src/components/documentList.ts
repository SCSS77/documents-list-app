import { Document } from '../models/document';

export function renderDocumentList(
    documents: Document[],
    onSort: (criteria: 'Title' | 'Version' | 'CreatedAt') => void
): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('document-list');

    const controls = document.createElement('div');
    controls.classList.add('controls');

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
    controls.appendChild(sortBar);

    selectedOption.addEventListener('click', () => {
        customSelect.classList.toggle('open');
    });

    options.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            const optionElement = option as HTMLElement;
            selectedOption.textContent = optionElement.textContent || 'Select one...';
            customSelect.classList.remove('open');
            onSort(optionElement.dataset.value as 'Title' | 'Version' | 'CreatedAt');
        });
    });

    const viewToggle = document.createElement('div');
    viewToggle.classList.add('view-toggle');

    const listViewButton = document.createElement('button');
    listViewButton.classList.add('view-button', 'active');
    listViewButton.innerHTML = '<i class="fas fa-list"></i>';
    viewToggle.appendChild(listViewButton);

    const gridViewButton = document.createElement('button');
    gridViewButton.classList.add('view-button');
    gridViewButton.innerHTML = '<i class="fas fa-th"></i>';
    viewToggle.appendChild(gridViewButton);

    controls.appendChild(viewToggle);
    container.appendChild(controls);

    const documentsContainer = document.createElement('div');
    documentsContainer.classList.add('documents-container', 'list-view');

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const header = document.createElement('div');
    header.classList.add('document-header');

    ['Name', 'Contributors', 'Attachments'].forEach((text) => {
        const columnHeader = document.createElement('div');
        columnHeader.classList.add('column-header');
        columnHeader.textContent = text;
        header.appendChild(columnHeader);
    });

    headerContainer.appendChild(header);
    container.appendChild(headerContainer);
    container.appendChild(documentsContainer);

    documents.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('document-item');

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('document-name-version');

        const title = document.createElement('div');
        title.classList.add('document-name');
        title.textContent = doc.Title;

        const versionText = document.createElement('div');
        versionText.classList.add('document-version');
        versionText.textContent = `Version: ${doc.Version}`;

        const contributors = document.createElement('div');
        contributors.classList.add('document-contributors');
        contributors.innerHTML = doc.Contributors.map((c) => `<div>${c.Name}</div>`).join('');

        const attachments = document.createElement('div');
        attachments.classList.add('document-attachments');
        attachments.innerHTML = doc.Attachments.map((a) => `<div>${a}</div>`).join('');

        nameContainer.appendChild(title);
        nameContainer.appendChild(versionText);
        card.appendChild(nameContainer);
        card.appendChild(contributors);
        card.appendChild(attachments);

        documentsContainer.appendChild(card);
    });

    const toggleView = (isGridView: boolean) => {
        documentsContainer.classList.toggle('grid-view', isGridView);
        documentsContainer.classList.toggle('list-view', !isGridView);
        headerContainer.style.display = isGridView ? 'none' : 'block';
    };

    listViewButton.addEventListener('click', () => {
        toggleView(false);
        listViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
    });

    gridViewButton.addEventListener('click', () => {
        toggleView(true);
        gridViewButton.classList.add('active');
        listViewButton.classList.remove('active');
    });

    return container;
}