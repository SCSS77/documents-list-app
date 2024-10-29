import { renderDocumentList } from '../components/documentList';
import { Document } from '../models/document';

describe('renderDocumentList', () => {
    const sortDocuments = jest.fn();

    it('renders a list of documents correctly', () => {
        const documents: Document[] = [
            { ID: '1', Title: 'Document 1', Version: '1.0', Contributors: [], Attachments: [], CreatedAt: '2024-10-01' },
            { ID: '2', Title: 'Document 2', Version: '1.1', Contributors: [], Attachments: [], CreatedAt: '2024-10-02' }
        ];

        const listElement = renderDocumentList(documents, sortDocuments);

        expect(listElement.tagName).toBe('DIV');
        expect(listElement.children.length).toBe(3);

        const documentsContainer = listElement.querySelector('.documents-container');
        expect(documentsContainer).not.toBeNull();

        if (documentsContainer) {
            expect(documentsContainer.children.length).toBe(2);
            expect(documentsContainer.children[0].textContent).toContain('Document 1');
            expect(documentsContainer.children[1].textContent).toContain('Document 2');
        }
    });

    it('renders an empty list when no documents are provided', () => {
        const documents: Document[] = [];
        
        const listElement = renderDocumentList(documents, sortDocuments);

        expect(listElement.tagName).toBe('DIV');
        expect(listElement.children.length).toBe(3);

        const documentsContainer = listElement.querySelector('.documents-container');
        expect(documentsContainer).not.toBeNull();

        if (documentsContainer) {
            expect(documentsContainer.children.length).toBe(0);
        }
    });

    it('calls sortDocuments when sorting criteria is changed', () => {
        const documents: Document[] = [
            { ID: '1', Title: 'Document 1', Version: '1.0', Contributors: [], Attachments: [], CreatedAt: '2024-10-01' }
        ];

        renderDocumentList(documents, sortDocuments);

        sortDocuments('Title');
        expect(sortDocuments).toHaveBeenCalledWith('Title');
    });
});