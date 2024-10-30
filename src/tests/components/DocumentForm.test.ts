import '@testing-library/jest-dom';
import { renderDocumentForm } from '../../components/documentForm';
import { Document } from '../../models/document';

describe('renderDocumentForm', () => {
    let setDocuments: jest.Mock;
    let currentUserName: string;

    beforeEach(() => {
        setDocuments = jest.fn();
        currentUserName = 'Test User';
    });

    test('renders the document form', () => {
        const formElement = renderDocumentForm(setDocuments, currentUserName);
        document.body.appendChild(formElement);

        const addButton = formElement.querySelector('.add-document-btn') as HTMLButtonElement;
        const inputContainer = formElement.querySelector('.input-container');

        expect(addButton).toBeInTheDocument();
        expect(inputContainer).toBeInTheDocument();
        expect(inputContainer).toHaveClass('hidden');
    });

    test('shows input container when add button is clicked', () => {
        const formElement = renderDocumentForm(setDocuments, currentUserName);
        document.body.appendChild(formElement);

        const addButton = formElement.querySelector('.add-document-btn') as HTMLButtonElement;
        const inputContainer = formElement.querySelector('.input-container');

        addButton?.click();

        expect(inputContainer).not.toHaveClass('hidden');
        expect(addButton).toHaveClass('hidden');
    });

    test('creates a new document on form submit', () => {
        const formElement = renderDocumentForm(setDocuments, currentUserName);
        document.body.appendChild(formElement);

        const addButton = formElement.querySelector('.add-document-btn') as HTMLButtonElement;
        const inputContainer = formElement.querySelector('.input-container');
        const input = inputContainer?.querySelector('input') as HTMLInputElement;
        const submitButton = inputContainer?.querySelector('button[type="submit"]') as HTMLButtonElement;

        addButton?.click();
        input.value = 'New Document Title';

        submitButton?.click();

        expect(setDocuments).toHaveBeenCalledWith(expect.any(Function));

        const updater = setDocuments.mock.calls[0][0];
        const newDocs = updater([]);
        expect(newDocs).toHaveLength(1);
        expect(newDocs[0]).toMatchObject({
            Title: 'New Document Title',
            Version: '1.0',
            Contributors: [{ Name: currentUserName }],
            Attachments: [],
        });

        expect(input.value).toBe('');
        expect(inputContainer).toHaveClass('hidden');
        expect(addButton).not.toHaveClass('hidden');
    });
});