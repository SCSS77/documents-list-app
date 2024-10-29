import { saveDocumentsToLocalStorage, getDocumentsFromLocalStorage } from '../utils/localStorage';
import { Document } from '../models/document';

describe('LocalStorage Utilities', () => {
    const documentKey = 'documents';

    beforeEach(() => {
        localStorage.clear();
    });

    it('should save documents to localStorage', () => {
        const documents: Document[] = [
            { ID: '1', Title: 'Document 1', Version: '1.0', Contributors: [], Attachments: [], CreatedAt: '2024-10-01' },
            { ID: '2', Title: 'Document 2', Version: '1.1', Contributors: [], Attachments: [], CreatedAt: '2024-10-02' },
        ];

        saveDocumentsToLocalStorage(documents);

        const savedDocuments = localStorage.getItem(documentKey);
        expect(savedDocuments).not.toBeNull();
        expect(JSON.parse(savedDocuments!)).toEqual(documents);
    });

    it('should retrieve documents from localStorage', () => {
        const documents: Document[] = [
            { ID: '1', Title: 'Document 1', Version: '1.0', Contributors: [], Attachments: [], CreatedAt: '2024-10-01' },
        ];

        localStorage.setItem(documentKey, JSON.stringify(documents));

        const retrievedDocuments = getDocumentsFromLocalStorage();

        expect(retrievedDocuments).toEqual(documents);
    });

    it('should return an empty array when no documents are saved', () => {
        const retrievedDocuments = getDocumentsFromLocalStorage();
        expect(retrievedDocuments).toEqual([]);
    });
});