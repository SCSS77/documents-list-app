import { Document } from '../models/document';

export function saveDocumentsToLocalStorage(documents: Document[]): void {
    localStorage.setItem('documents', JSON.stringify(documents));
}

export function getDocumentsFromLocalStorage(): Document[] {
    const documents = localStorage.getItem('documents');
    return documents ? JSON.parse(documents) : [];
}