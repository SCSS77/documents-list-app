import { fetchDocuments } from '../services/api';

jest.mock('../services/api', () => ({
  fetchDocuments: jest.fn(() => Promise.resolve([{ id: 1, name: 'Document 1' }])),
}));

describe('fetchDocuments', () => {
  it('fetches documents from the API', async () => {
    const documents = await fetchDocuments();
    expect(documents).toEqual([{ id: 1, name: 'Document 1' }]);
  });
});