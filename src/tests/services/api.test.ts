import { fetchDocuments } from '../../services/api';

describe('API Service - fetchDocuments', () => {
    const mockDocuments = [
        { ID: '1', Title: 'Document 1', Version: '1.0', Contributors: [], Attachments: [], CreatedAt: '2023-01-01' },
        { ID: '2', Title: 'Document 2', Version: '1.1', Contributors: [], Attachments: [], CreatedAt: '2023-02-01' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch documents successfully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockDocuments)
            })
        ) as jest.Mock;

        const result = await fetchDocuments();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE}/documents`);
        expect(result).toEqual(mockDocuments);
    });

    it('should handle fetch error', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error'))) as jest.Mock;

        try {
            await fetchDocuments();
        } catch (error) {
            expect(error).toEqual(new Error('Fetch error'));
        }

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE}/documents`);
    });
});