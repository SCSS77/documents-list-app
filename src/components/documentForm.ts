export function renderDocumentForm(setDocuments: (newDocs: any[]) => void): HTMLElement {
    const form = document.createElement('form');
    
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = '+ Add Document';
    addButton.classList.add('add-document-btn');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container', 'hidden');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Document Title';
    input.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Document';

    inputContainer.appendChild(input);
    inputContainer.appendChild(submitButton);
    form.appendChild(addButton);
    form.appendChild(inputContainer);

    addButton.addEventListener('click', () => {
        addButton.classList.add('hidden');
        inputContainer.classList.remove('hidden');
        input.focus();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDoc = { ID: Date.now(), Title: input.value, Contributors: [] };
        
        const updatedDocuments = [...(setDocuments as any), newDoc];
        setDocuments(updatedDocuments);

        input.value = '';
        inputContainer.classList.add('hidden');
        addButton.classList.remove('hidden');
    });

    return form;
}