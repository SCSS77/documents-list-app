export function renderDocumentForm(setDocuments: (newDocs: any[]) => void): HTMLElement {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Document Title';
    input.required = true;

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Create Document';

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDoc = { ID: Date.now(), Title: input.value, Contributors: [] };
        
        const updatedDocuments = [...(setDocuments as any), newDoc];
        setDocuments(updatedDocuments);

        input.value = '';
    });

    return form;
}