export function saveDocumentsToLocalStorage(documents: any[]): void {
    localStorage.setItem('documents', JSON.stringify(documents));
}

export function getDocumentsFromLocalStorage(): any[] {
    const documents = localStorage.getItem('documents');
    return documents ? JSON.parse(documents) : [];
}