import { renderApp } from '../../views/app';
import { fetchDocuments } from '../../services/api';
import { saveDocumentsToLocalStorage, getDocumentsFromLocalStorage } from '../../utils/localStorage';
import { showNotification } from '../../components/notification';
import { Document } from '../../models/document';

jest.mock('../../services/api', () => ({
    fetchDocuments: jest.fn(),
}));

jest.mock('../../utils/localStorage', () => ({
    saveDocumentsToLocalStorage: jest.fn(),
    getDocumentsFromLocalStorage: jest.fn(),
}));

jest.mock('../../components/notification', () => ({
    showNotification: jest.fn(),
}));

describe('App View', () => {
    const mockDocuments: Document[] = [
        { ID: '1', Title: 'Document 1', Version: '1.0', Contributors: [], Attachments: [], CreatedAt: '2024-01-01' },
        { ID: '2', Title: 'Document 2', Version: '1.1', Contributors: [], Attachments: [], CreatedAt: '2024-01-02' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (getDocumentsFromLocalStorage as jest.Mock).mockReturnValue([]);
        (fetchDocuments as jest.Mock).mockResolvedValue(mockDocuments);
    });

    it('should render the app and load documents', async () => {
        const appElement = await renderApp();
        expect(fetchDocuments).toHaveBeenCalled();
        expect(saveDocumentsToLocalStorage).toHaveBeenCalledWith(mockDocuments);
        expect(appElement.querySelector('.page-title')?.textContent).toBe('Documents');
        expect(appElement.querySelectorAll('.document-item').length).toBe(mockDocuments.length);
    });

    it('should sort documents when sort button is clicked', async () => {
        const appElement = await renderApp();
        const sortButton = appElement.querySelector('.sort-button') as HTMLButtonElement;
        sortButton?.dispatchEvent(new MouseEvent('click'));
        expect(appElement.querySelectorAll('.document-item')[0].textContent).toBe('Document 1');
    });

    it('should show a notification when a document is added', async () => {
        const appElement = await renderApp();
        const form = appElement.querySelector('form');
        form?.dispatchEvent(new Event('submit'));
        expect(showNotification).toHaveBeenCalled();
    });
});